import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Media Gallery | Actors Charity Foundation (ACF)",
    description:
        "Explore the visual archive of the Actors Charity Foundation (ACF). Browse photo albums and videos from our humanitarian outreaches and industry events.",
    openGraph: {
        title: "Media Gallery | Actors Charity Foundation (ACF)",
        description:
            "Browse the official photo and video archive of the Actors Charity Foundation (ACF) — impact, milestones, and gallery.",
        url: "/media",
        images: [{ url: "/acflogo.png", alt: "Actors Charity Foundation (ACF) Media" }],
    },
    twitter: {
        title: "Media Gallery | Actors Charity Foundation (ACF)",
        description:
            "Browse the official photo and video archive of the Actors Charity Foundation (ACF).",
    },
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
