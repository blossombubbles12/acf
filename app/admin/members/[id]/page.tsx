import { sql } from "@/lib/db";
import AdminPageLayout from "@/components/layout/AdminPageLayout";
import { MemberDetailClient } from "@/components/admin/MemberDetailClient";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Member } from "@/types/members";

export default async function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const result = await sql`SELECT * FROM members WHERE id = ${id} LIMIT 1` as unknown as Member[];
    const member = result[0];

    if (!member) {
        return notFound();
    }

    return (
        <AdminPageLayout
            title={member.full_name}
            subtitle={`Alumni Profile • ID #${member.id}`}
            activePage="members"
            actions={
                <Link
                    href="/admin/members"
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl font-bold text-gray-400 hover:text-gray-900 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to List
                </Link>
            }
        >
            <MemberDetailClient member={member} />
        </AdminPageLayout>
    );
}
