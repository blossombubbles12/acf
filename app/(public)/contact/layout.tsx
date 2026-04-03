import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Actors Charity Foundation (ACF)",
    description:
        "Get in touch with the Actors Charity Foundation (ACF). Reach our coordination team for partnerships, donations, or volunteer inquiries.",
    openGraph: {
        title: "Contact Us | Actors Charity Foundation",
        description:
            "Reach out to the Actors Charity Foundation (ACF) — coordination, membership, and official channels.",
        url: "/contact",
        images: [{ url: "/acflogo.png", alt: "Actors Charity Foundation Logo" }],
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
