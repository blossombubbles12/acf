import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Industry Hub",
    description:
        "Connect with the global entertainment industry network at ACF. Browse the member directory, participate in advocacy programs, and become a registered volunteer.",
    keywords: [
        "ACF community",
        "Nollywood network",
        "ACF industry hub",
        "Nigerian entertainment directory",
        "ACF volunteer",
        "ACF membership",
    ],
    alternates: {
        canonical: "/community",
    },
    openGraph: {
        title: "Industry Hub | Actors Charity Foundation (ACF)",
        description: "Official industry directory and volunteer network for the Actors Charity Foundation.",
        url: "/community",
        images: [{ url: "/acflogo.png", width: 1200, height: 630, alt: "ACF Industry Hub" }],
    },
    twitter: {
        card: "summary",
        title: "Industry Hub | Actors Charity Foundation",
        description: "Join the ACF network — directory, volunteering, and advocacy.",
        images: ["/acflogo.png"],
    },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
