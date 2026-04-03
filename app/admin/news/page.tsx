import AdminPageLayout from "@/components/layout/AdminPageLayout";
import { NewsFeedClient } from "@/components/posts/NewsFeedClient";

export default function AdminNewsPage() {
    return (
        <AdminPageLayout
            title="News & Insights"
            subtitle="Publish updates, stories, and milestones for the community."
            activePage="news"
        >
            <NewsFeedClient />
        </AdminPageLayout>
    );
}
