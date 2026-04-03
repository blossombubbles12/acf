import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const membersData = await request.json();

        if (!Array.isArray(membersData)) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
        }

        let importCount = 0;
        const errors: string[] = [];

        for (const data of membersData) {
            try {
                // Basic validation
                if (!data.full_name || !data.email) {
                    continue;
                }

                // Check if email already exists
                const existing = await sql`SELECT id FROM members WHERE email = ${data.email} LIMIT 1`;
                if (existing.length > 0) {
                    continue; // Skip duplicates for now, or could update
                }

                await sql`
                    INSERT INTO members (
                        full_name, 
                        email, 
                        phone, 
                        occupation, 
                        location, 
                        status, 
                        industry, 
                        cohort, 
                        is_visible
                    )
                    VALUES (
                        ${data.full_name}, 
                        ${data.email}, 
                        ${data.phone || null}, 
                        ${data.occupation || null}, 
                        ${data.location || null}, 
                        ${data.status || 'active'}, 
                        ${data.industry || null}, 
                        ${data.cohort || '2024'}, 
                        true
                    )
                `;
                importCount++;
            } catch (err: any) {
                errors.push(`Error importing ${data.full_name}: ${err.message}`);
            }
        }

        // Log notification
        if (importCount > 0) {
            await sql`
                INSERT INTO notifications (type, message, link)
                VALUES ('member', ${`Bulk import: ${importCount} members added.`}, '/admin/members')
            `;
        }

        return NextResponse.json({
            success: true,
            count: importCount,
            errors: errors.length > 0 ? errors : undefined
        });
    } catch (error) {
        console.error('Bulk import error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
