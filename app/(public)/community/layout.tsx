import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Industry Hub | Actors Charity Foundation (ACF)",
    description: "Connect with the global entertainment industry network and participate in advocacy.",
    openGraph: {
        title: "Industry Hub | Actors Charity Foundation",
        description: "Official industry directory and network for Actors Charity Foundation members.",
        url: "/community",
        images: [{ url: "/acflogo.png", alt: "ACF Industry Hub" }],
    },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
