import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        // Check if any admin exists
        const existing = await sql`SELECT count(*) FROM admins`;
        if (parseInt(existing[0].count) > 0) {
            return NextResponse.json({ message: "Admin already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);
        await sql`
      INSERT INTO admins (name, email, password) 
      VALUES ('Super Admin', 'admin@actorscharity.org', ${hashedPassword})
    `;

        return NextResponse.json({ message: "Admin created successfully. Login with admin@actorscharity.org / admin123" });
    } catch (error) {
        console.error("Admin init error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
