import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession, encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        // Self-healing: Check if avatar_url exists, if not add it
        try {
            await sql`SELECT avatar_url FROM admins LIMIT 1`;
        } catch (err: any) {
            if (err.message?.includes('column "avatar_url" does not exist')) {
                console.log('Adding missing avatar_url column to admins table...');
                await sql`ALTER TABLE admins ADD COLUMN IF NOT EXISTS avatar_url TEXT`;
            }
        }

        const admin = await sql`
            SELECT id, name, email, avatar_url 
            FROM admins 
            WHERE id = ${session.user.id}
        `;

        if (admin.length === 0) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });

        return NextResponse.json(admin[0]);
    } catch (error) {
        console.error('Fetch profile error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const { name, email, password, avatar_url } = body;

        // Self-healing: Ensure columns exist before update
        try {
            await sql`SELECT avatar_url FROM admins LIMIT 1`;
        } catch (err: any) {
            if (err.message?.includes('column "avatar_url" does not exist')) {
                await sql`ALTER TABLE admins ADD COLUMN IF NOT EXISTS avatar_url TEXT`;
            }
        }

        // Check if email is already taken by another admin
        if (email) {
            const existing = await sql`
                SELECT id FROM admins WHERE email = ${email} AND id != ${session.user.id}
            `;
            if (existing.length > 0) {
                return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
            }
        }

        let updatedAdmin;
        if (password && password.trim() !== "") {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedAdmin = await sql`
                UPDATE admins 
                SET name = COALESCE(${name}, name), 
                    email = COALESCE(${email}, email), 
                    password = ${hashedPassword},
                    avatar_url = COALESCE(${avatar_url}, avatar_url)
                WHERE id = ${session.user.id}
                RETURNING id, name, email, avatar_url
            `;
        } else {
            updatedAdmin = await sql`
                UPDATE admins 
                SET name = COALESCE(${name}, name), 
                    email = COALESCE(${email}, email),
                    avatar_url = COALESCE(${avatar_url}, avatar_url)
                WHERE id = ${session.user.id}
                RETURNING id, name, email, avatar_url
            `;
        }

        if (!updatedAdmin || updatedAdmin.length === 0) {
            return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
        }

        // Update the session cookie with new info
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const sessionData = await encrypt({
            user: {
                id: updatedAdmin[0].id,
                name: updatedAdmin[0].name,
                email: updatedAdmin[0].email,
                avatar_url: updatedAdmin[0].avatar_url,
                role: 'admin' // Maintain role consistency
            },
            expires
        });

        (await cookies()).set("session", sessionData, { expires, httpOnly: true });

        return NextResponse.json(updatedAdmin[0]);
    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
