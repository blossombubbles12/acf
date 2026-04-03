import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const session = await getSession();
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || '';
        const industry = searchParams.get('industry') || '';

        const searchParam = search ? `%${search}%` : null;
        const statusParam = status || null;
        const industryParam = industry || null;

        const members = await sql`
            SELECT * FROM members 
            WHERE 
                (${searchParam}::text IS NULL OR full_name ILIKE ${searchParam} OR email ILIKE ${searchParam} OR location ILIKE ${searchParam})
                AND (${statusParam}::text IS NULL OR status = ${statusParam})
                AND (${industryParam}::text IS NULL OR industry = ${industryParam})
            ORDER BY created_at DESC
        `;

        // Analytics
        const stats = await sql`
            SELECT 
                COUNT(*) as total,
                COUNT(*) FILTER (WHERE status = 'active') as active,
                COUNT(*) FILTER (WHERE status = 'inactive') as inactive
            FROM members
        `;

        return NextResponse.json({
            members,
            stats: stats[0]
        });
    } catch (error) {
        console.error('Fetch members error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const {
            full_name,
            email,
            phone,
            occupation,
            industry,
            location,
            cohort,
            status,
            is_visible,
            biography,
            photo_url
        } = body;

        const parsedVisible = typeof is_visible === 'string'
            ? is_visible === 'true'
            : (is_visible ?? true);

        const member = await sql`
            INSERT INTO members (
                full_name, 
                email, 
                phone, 
                occupation, 
                location, 
                photo_url, 
                status, 
                industry, 
                cohort, 
                is_visible, 
                biography
            )
            VALUES (
                ${full_name}, 
                ${email}, 
                ${phone || null}, 
                ${occupation || null}, 
                ${location || null}, 
                ${photo_url || null}, 
                ${status || 'active'}, 
                ${industry || null}, 
                ${cohort || null}, 
                ${parsedVisible}, 
                ${biography || null}
            )
            RETURNING *
        `;

        return NextResponse.json(member[0]);
    } catch (error) {
        console.error('Member creation error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
