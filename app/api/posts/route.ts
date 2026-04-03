import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const formData = await request.formData();
        const content = formData.get('content') as string;
        const mediaFiles = formData.getAll('media') as File[];
        const status = (formData.get('status') as string) || 'published';

        let mediaUrls: string[] = [];
        let mediaData: any[] = [];

        if (mediaFiles.length > 0) {
            const uploadPromises = mediaFiles.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                return new Promise((resolve, reject) => {
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

            const results = await Promise.all(uploadPromises) as any[];
            mediaUrls = results.map(r => r.secure_url);
            mediaData = results.map(r => ({
                url: r.secure_url,
                type: r.resource_type,
                public_id: r.public_id
            }));
        }

        const post = await sql`
      INSERT INTO posts (content, media, status, author_id)
      VALUES (${content}, ${JSON.stringify(mediaData)}, ${status}, ${session.user.id || 1})
      RETURNING *
    `;

        // Log notification
        if (status === 'published') {
            await sql`
                INSERT INTO notifications (type, message, link)
                VALUES ('news', ${`New post published by ${session.user.name}`}, '/news')
            `;
        }

        return NextResponse.json(post[0]);
    } catch (error) {
        console.error('Post creation error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getSession();

        // If admin, show all posts including drafts
        if (session && session.user.role === 'admin') {
            const posts = await sql`
                SELECT * FROM posts 
                ORDER BY created_at DESC
            `;
            return NextResponse.json(posts);
        }

        // For public, only show published posts
        const posts = await sql`
            SELECT * FROM posts 
            WHERE status = 'published' 
            ORDER BY created_at DESC
        `;
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Fetch posts error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
