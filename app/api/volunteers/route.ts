import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            full_name,
            email,
            phone,
            location,
            skills,
            availability
        } = body;

        if (!full_name || !email) {
            return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
        }

        const volunteer = await sql`
            INSERT INTO volunteers (
                full_name,
                email,
                phone,
                location,
                skills,
                availability,
                status
            )
            VALUES (
                ${full_name},
                ${email},
                ${phone || null},
                ${location || null},
                ${skills || null},
                ${availability || null},
                'pending'
            )
            RETURNING *
        `;

        // Log notification for admin
        await sql`
            INSERT INTO notifications (type, message, link)
            VALUES ('volunteer', ${`New volunteer application: ${full_name}`}, '/admin/volunteers')
        `;

        return NextResponse.json(volunteer[0]);
    } catch (error) {
        console.error('Volunteer registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
