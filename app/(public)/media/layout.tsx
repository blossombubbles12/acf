import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Media Gallery",
    description:
        "Explore the visual archive of the Actors Charity Foundation (ACF). Browse photo albums and videos from our humanitarian outreaches, community events, and industry milestones.",
    keywords: [
        "ACF media gallery",
        "Nollywood charity photos",
        "ACF photo albums",
        "Nigerian NGO gallery",
        "humanitarian event photos",
        "ACF videos",
    ],
    alternates: {
        canonical: "/media",
    },
    openGraph: {
        title: "Media Gallery | Actors Charity Foundation (ACF)",
        description:
            "Browse the official photo and video archive of the Actors Charity Foundation — impact stories, milestones, and gallery.",
        url: "/media",
        images: [{ url: "/acflogo.png", width: 1200, height: 630, alt: "ACF Media Gallery" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Media Gallery | Actors Charity Foundation",
        description: "Photos and videos from ACF humanitarian outreaches and community events.",
        images: ["/acflogo.png"],
    },
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
