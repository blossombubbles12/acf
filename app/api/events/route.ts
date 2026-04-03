import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const all = searchParams.get('all') === 'true';

        const session = await getSession();
        const isAdmin = session?.user?.role === 'admin';

        let events;
        if (all && isAdmin) {
            events = await sql`
                SELECT * FROM events 
                ORDER BY date DESC, time DESC
            `;
        } else {
            events = await sql`
                SELECT * FROM events 
                WHERE status = 'published' 
                ORDER BY date DESC, time DESC
            `;
        }

        return NextResponse.json(events);
    } catch (error) {
        console.error('Fetch events error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const date = formData.get('date') as string;
        const time = formData.get('time') as string;
        const location = formData.get('location') as string;
        const status = (formData.get('status') as string) || 'published';
        const imageFile = formData.get('image') as File | null;

        let imageUrl = '';

        if (imageFile && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const result: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'acf/events',
                        resource_type: 'auto'
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(buffer);
            });
            imageUrl = result.secure_url;
        }

        const event = await sql`
            INSERT INTO events (title, description, date, time, location, image_url, status, author_id)
            VALUES (${title}, ${description}, ${date}, ${time || null}, ${location || null}, ${imageUrl || null}, ${status}, ${session.user.id})
            RETURNING *
        `;

        // Log notification
        if (status === 'published') {
            await sql`
                INSERT INTO notifications (type, message, link)
                VALUES ('event', ${`New event: ${title} scheduled for ${date}`}, '/events')
            `;
        }

        return NextResponse.json(event[0]);
    } catch (error) {
        console.error('Event creation error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
