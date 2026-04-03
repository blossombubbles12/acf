import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Events Calendar",
    description:
        "Stay updated on ACF humanitarian outreaches, fundraising galas, community health drives, and industry networking events across Nigeria.",
    keywords: [
        "ACF events",
        "Nollywood charity events",
        "Nigerian charity fundraiser",
        "humanitarian outreach Nigeria",
        "ACF calendar",
        "entertainment philanthropy events",
    ],
    alternates: {
        canonical: "/events",
    },
    openGraph: {
        title: "Events Calendar | Actors Charity Foundation (ACF)",
        description: "Official calendar of humanitarian and social impact events organized by Nollywood's finest actors and filmmakers.",
        url: "/events",
        images: [{ url: "/acflogo.png", width: 1200, height: 630, alt: "Actors Charity Foundation Events" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "ACF Events | Actors Charity Foundation",
        description: "Humanitarian outreaches, fundraisers, and more — mark your calendar.",
        images: ["/acflogo.png"],
    },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
