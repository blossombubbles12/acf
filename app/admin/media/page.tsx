import AdminPageLayout from "@/components/layout/AdminPageLayout";
import { MediaGalleryClient } from "@/components/media/MediaGalleryClient";

export default function AdminMediaPage() {
    return (
        <AdminPageLayout
            title="Media Gallery"
            subtitle="Manage high-quality photos, videos, and class memories."
            activePage="media"
        >
            <MediaGalleryClient />
        </AdminPageLayout>
    );
}
