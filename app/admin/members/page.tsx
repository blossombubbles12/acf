import AdminPageLayout from "@/components/layout/AdminPageLayout";
import { MembersListClient } from "@/components/admin/MembersListClient";

export default function AdminMembersPage() {
    return (
        <AdminPageLayout
            title="Alumni Members"
            subtitle="Manage registered brothers and track community growth."
            activePage="members"
        >
            <MembersListClient />
        </AdminPageLayout>
    );
}
