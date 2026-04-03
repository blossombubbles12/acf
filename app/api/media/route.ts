import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const formData = await request.formData();
        const files = formData.getAll('files') as File[];
        const folder = formData.get('folder') as string || ''; // empty means root (acf)

        if (files.length === 0) {
            return NextResponse.json({ error: 'No files provided' }, { status: 400 });
        }

        // Self-healing: Ensure notifications table exists
        const { sql } = await import('@/lib/db');
        try {
            await sql`SELECT id FROM notifications LIMIT 1`;
        } catch (err: any) {
            if (err.message?.includes('relation "notifications" does not exist')) {
                console.log('Creating missing notifications table...');
                await sql`
                    CREATE TABLE IF NOT EXISTS notifications (
                        id SERIAL PRIMARY KEY,
                        type TEXT NOT NULL,
                        message TEXT NOT NULL,
                        link TEXT,
                        read BOOLEAN DEFAULT FALSE,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    )
                `;
            }
        }

        const uploadPromises = files.map(async (file) => {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const rootBasePath = formData.get('root') as string || 'acf';
            const uploadPath = folder ? `${rootBasePath}/${folder}` : rootBasePath;

            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: uploadPath,
                        resource_type: 'auto',
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(buffer);
            });
        });

        const results = await Promise.all(uploadPromises);

        // Log notification
        await sql`
            INSERT INTO notifications (type, message, link)
            VALUES ('media', ${`Batch of ${files.length} media items uploaded to ${folder || 'root'}`}, '/admin/media')
        `;

        return NextResponse.json({ success: true, results });
    } catch (error) {
        console.error('Batch upload error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const folder = searchParams.get('folder') || ''; // Default to root
        const root = searchParams.get('root') || 'acf';
        const excludeSystem = searchParams.get('exclude_system') === 'true';

        let expression = '';
        if (folder) {
            expression = `folder:"${root}/${folder}"`;
        } else {
            if (excludeSystem) {
                const systemFolders = ['admins', 'events', 'profiles', 'slider', 'home', 'about'];
                const exclusions = systemFolders.map(f => `-folder:"${root}/${f}/*"`).join(' AND ');
                expression = `folder:"${root}/*" AND ${exclusions}`;
            } else {
                expression = `folder:"${root}/*"`;
            }
        }

        // Using search API as it is more robust than prefix filtering
        const result = await cloudinary.search
            .expression(expression)
            .sort_by('created_at', 'desc')
            .max_results(500)
            .execute();

        return NextResponse.json(result.resources);
    } catch (error) {
        console.error('Fetch resources error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { public_id, resource_type } = await request.json();
        if (!public_id) return NextResponse.json({ error: 'Public ID is required' }, { status: 400 });

        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: resource_type || 'image'
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Delete media error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
