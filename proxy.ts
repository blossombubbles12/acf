import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth-utils";

export async function proxy(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    const { pathname } = request.nextUrl;

    // Protect admin routes
    if (pathname.startsWith("/admin")) {
        if (pathname === "/admin/login") {
            if (session) {
                try {
                    await decrypt(session);
                    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
                } catch (e) {
                    // Invalid session, allow login page
                }
            }
            return NextResponse.next();
        }

        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        try {
            await decrypt(session);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
