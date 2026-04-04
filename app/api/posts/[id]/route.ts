import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        const id = params.id;

        const post = await sql`SELECT * FROM posts WHERE id = ${id} LIMIT 1`;

        if (post.length === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post[0]);
    } catch (error) {
        console.error('Fetch post error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const params = await props.params;
        const id = params.id;
        
        const contentType = request.headers.get('content-type') || '';
        let content, status, finalMedia = [];

        if (contentType.includes('application/json')) {
            const body = await request.json();
            content = body.content;
            status = body.status;
            finalMedia = body.media || [];
        } else {
            const formData = await request.formData();
            content = formData.get('content') as string;
            status = formData.get('status') as string;
            
            const existingMediaStr = formData.get('existingMedia') as string;
            const existingMedia = existingMediaStr ? JSON.parse(existingMediaStr) : [];
            
            const newMediaFiles = formData.getAll('media') as File[];
            interface IMediaItem { url: string; type: string; public_id: string }
            let newMediaData: IMediaItem[] = [];

            if (newMediaFiles.length > 0) {
                const uploadPromises = newMediaFiles.map(async (file) => {
                    const arrayBuffer = await file.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    return new Promise<any>((resolve, reject) => {
                        cloudinary.uploader.upload_stream(
                            {
                                folder: 'acf/posts',
                                resource_type: 'auto'
                            },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        ).end(buffer);
                    });
                });

                const results = await Promise.all(uploadPromises);
                newMediaData = results.map(r => ({
                    url: r.secure_url,
                    type: r.resource_type,
                    public_id: r.public_id
                }));
            }

            finalMedia = [...existingMedia, ...newMediaData];
        }

        const post = await sql`
            UPDATE posts 
            SET 
                content = ${content}, 
                status = ${status || 'published'},
                media = ${JSON.stringify(finalMedia)},
                updated_at = NOW()
            WHERE id = ${id}
            RETURNING *
        `;

        if (post.length === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post[0]);
    } catch (error) {
        console.error('Post update error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const params = await props.params;
        const id = params.id;

        // Get post to delete media from cloudinary
        const post = await sql`SELECT media FROM posts WHERE id = ${id} LIMIT 1`;

        if (post.length > 0 && post[0].media) {
            const mediaItems = Array.isArray(post[0].media) ? post[0].media : JSON.parse(post[0].media);

            // Delete media from Cloudinary
            for (const item of mediaItems) {
                if (item.public_id) {
                    try {
                        await cloudinary.uploader.destroy(item.public_id);
                    } catch (err) {
                        console.error('Failed to delete media from Cloudinary:', err);
                    }
                }
            }
        }

        await sql`DELETE FROM posts WHERE id = ${id}`;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Post deletion error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
