import AdminPageLayout from "@/components/layout/AdminPageLayout";
import { ProfileClient } from "@/components/admin/ProfileClient";

export default function AdminProfilePage() {
    return (
        <AdminPageLayout
            title="Profile Management"
            subtitle="Update your personal information and security credentials."
            activePage="profile"
        >
            <ProfileClient />
        </AdminPageLayout>
    );
}
