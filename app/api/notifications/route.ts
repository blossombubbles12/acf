import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const notifications = await sql`
            SELECT * FROM notifications 
            ORDER BY created_at DESC 
            LIMIT 50
        `;

        return NextResponse.json(notifications);
    } catch (error) {
        console.error("Notifications fetch error:", error);
        // Ensure we return an empty array on error so frontend doesn't break
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { type, message, link } = await request.json();

        const result = await sql`
      INSERT INTO notifications (type, message, link)
      VALUES (${type}, ${message}, ${link})
      RETURNING *
    `;

        return NextResponse.json(result[0]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create notification" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id, markAllAsRead } = await request.json();

        if (markAllAsRead) {
            await sql`UPDATE notifications SET is_read = TRUE`;
        } else {
            await sql`UPDATE notifications SET is_read = TRUE WHERE id = ${id}`;
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
    }
}
