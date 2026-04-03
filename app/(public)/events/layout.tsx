import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Events Calendar | Actors Charity Foundation (ACF)",
    description: "Stay updated on our humanitarian outreaches, fundraisers, and industry networking events.",
    openGraph: {
        title: "ACF Events | Actors Charity Foundation",
        description: "Official calendar of humanitarian and social impact events from actors and filmmakers.",
        url: "/events",
        images: [{ url: "/acflogo.png", alt: "Actors Charity Foundation Events" }],
    },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
