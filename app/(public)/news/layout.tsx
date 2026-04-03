import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Latest News & Updates",
    description:
        "The latest news, announcements, and updates from the Actors Charity Foundation (ACF). Stay connected with our mission and follow our impact stories.",
    keywords: [
        "ACF news",
        "Actors Charity Foundation updates",
        "Nollywood charity news",
        "Nigerian NGO announcements",
        "ACF impact stories",
        "entertainment philanthropy news",
    ],
    alternates: {
        canonical: "/news",
    },
    openGraph: {
        title: "Latest News & Updates | Actors Charity Foundation (ACF)",
        description: "Announcements, updates, and stories of impact from the Actors Charity Foundation.",
        url: "/news",
        images: [{ url: "/acflogo.png", width: 1200, height: 630, alt: "ACF News" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "ACF News | Actors Charity Foundation",
        description: "Latest updates, stories, and announcements from ACF.",
        images: ["/acflogo.png"],
    },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
