import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const index = searchParams.get('index') || ''; // For alphabetical filter

        const searchParam = search ? `%${search}%` : null;
        const indexParam = index ? `${index}%` : null;

        const members = await sql`
            SELECT 
                full_name, 
                occupation as role, 
                industry as portfolio, 
                location, 
                biography, 
                photo_url 
            FROM members 
            WHERE is_visible = true AND status = 'active'
            AND (
                ${searchParam}::text IS NULL 
                OR full_name ILIKE ${searchParam} 
                OR occupation ILIKE ${searchParam} 
                OR industry ILIKE ${searchParam} 
                OR location ILIKE ${searchParam}
            )
            AND (${indexParam}::text IS NULL OR full_name ILIKE ${indexParam})
            ORDER BY full_name ASC
        `;

        return NextResponse.json(members);
    } catch (error) {
        console.error('Fetch directory error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
