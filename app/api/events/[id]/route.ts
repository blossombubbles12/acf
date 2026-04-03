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

        const event = await sql`SELECT * FROM events WHERE id = ${id} LIMIT 1`;

        if (event.length === 0) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json(event[0]);
    } catch (error) {
        console.error('Fetch event error:', error);
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
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const date = formData.get('date') as string;
        const time = formData.get('time') as string;
        const location = formData.get('location') as string;
        const status = formData.get('status') as string;
        const imageFile = formData.get('image') as File | null;

        let imageUrl = formData.get('existing_image_url') as string || null;

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
            UPDATE events 
            SET title = ${title}, 
                description = ${description}, 
                date = ${date}, 
                time = ${time || null}, 
                location = ${location || null}, 
                image_url = ${imageUrl}, 
                status = ${status}
            WHERE id = ${id}
            RETURNING *
        `;

        if (event.length === 0) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json(event[0]);
    } catch (error) {
        console.error('Event update error:', error);
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

        // Get event to delete image from cloudinary
        const event = await sql`SELECT image_url FROM events WHERE id = ${id} LIMIT 1`;

        if (event.length > 0 && event[0].image_url) {
            try {
                // Extract public_id from Cloudinary URL
                const urlParts = event[0].image_url.split('/');
                const filename = urlParts[urlParts.length - 1];
                const publicId = `acf/events/${filename.split('.')[0]}`;
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.error('Failed to delete image from Cloudinary:', err);
            }
        }

        await sql`DELETE FROM events WHERE id = ${id}`;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Event deletion error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
