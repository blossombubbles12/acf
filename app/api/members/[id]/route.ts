import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(
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
        const member = await sql`SELECT * FROM members WHERE id = ${id} LIMIT 1`;

        if (member.length === 0) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }

        return NextResponse.json(member[0]);
    } catch (error) {
        console.error('Fetch member error:', error);
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
            UPDATE members 
            SET 
                full_name = ${full_name}, 
                email = ${email}, 
                phone = ${phone || null}, 
                occupation = ${occupation || null}, 
                location = ${location || null}, 
                photo_url = ${photo_url || null}, 
                status = ${status || 'active'}, 
                industry = ${industry || null}, 
                cohort = ${cohort || null}, 
                is_visible = ${parsedVisible}, 
                biography = ${biography || null}
            WHERE id = ${id}
            RETURNING *
        `;

        if (member.length === 0) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }

        return NextResponse.json(member[0]);
    } catch (error) {
        console.error('Member update error:', error);
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
        await sql`DELETE FROM members WHERE id = ${id}`;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Member deletion error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
