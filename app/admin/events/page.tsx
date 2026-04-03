import AdminPageLayout from "@/components/layout/AdminPageLayout";
import { EventsManagerClient } from "@/components/admin/EventsManagerClient";

export default function AdminEventsPage() {
    return (
        <AdminPageLayout
            title="Events & Activities"
            subtitle="Schedule reunions, meetings, and programs."
            activePage="events"
        >
            <EventsManagerClient />
        </AdminPageLayout>
    );
}
