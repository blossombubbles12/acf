import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Latest News & Updates | Actors Charity Foundation (ACF)",
    description:
        "The latest news, announcements, and updates from the Actors Charity Foundation (ACF). Stay connected with our mission.",
    openGraph: {
        title: "ACF News | Actors Charity Foundation",
        description:
            "Latest announcements, updates, and stories of impact from the Actors Charity Foundation (ACF).",
        url: "/news",
        images: [{ url: "/acflogo.png", alt: "Actors Charity Foundation News" }],
    },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
