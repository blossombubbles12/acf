import AdminPageLayout from "@/components/layout/AdminPageLayout";
import { NotificationsClient } from "@/components/admin/NotificationsClient";

export default function AdminNotificationsPage() {
    return (
        <AdminPageLayout
            title="Activity Log"
            subtitle="Track all administrative actions and community updates in real-time."
            activePage="notifications"
        >
            <div className="max-w-5xl mx-auto space-y-8">
                <NotificationsClient />
            </div>
        </AdminPageLayout>
    );
}
