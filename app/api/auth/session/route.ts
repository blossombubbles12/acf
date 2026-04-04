import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ authenticated: false }, { status: 200 });
        }
        return NextResponse.json({ 
            authenticated: true, 
            user: {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                role: session.user.role
            }
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }
}
