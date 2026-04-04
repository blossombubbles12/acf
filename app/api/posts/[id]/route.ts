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
        
        // Support both JSON (for quick text edits) and FormData (for media updates)
        const contentType = request.headers.get('content-type') || '';
        let content, status;

        if (contentType.includes('application/json')) {
            const body = await request.json();
            content = body.content;
            status = body.status;
        } else {
            // Placeholder for FormData support if we allow media upload during EDIT
            const formData = await request.formData();
            content = formData.get('content') as string;
            status = formData.get('status') as string;
            // Handle media upload logic here if needed...
        }

        const post = await sql`
            UPDATE posts 
            SET 
                content = ${content}, 
                status = ${status || 'published'},
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
