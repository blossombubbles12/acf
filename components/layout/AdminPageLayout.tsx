import { getSession } from "@/lib/auth";
import AdminLayoutClient from "./AdminLayoutClient";

interface AdminPageLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    activePage: string;
    actions?: React.ReactNode;
}

export default async function AdminPageLayout({ children, title, subtitle, activePage, actions }: AdminPageLayoutProps) {
    const session = await getSession();

    return (
        <AdminLayoutClient
            title={title}
            subtitle={subtitle}
            activePage={activePage}
            actions={actions}
            session={session}
        >
            {children}
        </AdminLayoutClient>
    );
}
