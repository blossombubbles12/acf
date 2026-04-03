import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with the Actors Charity Foundation (ACF). Reach our coordination team for partnerships, donations, volunteer inquiries, or media requests. Located in Surulere, Lagos, Nigeria.",
    keywords: [
        "contact ACF",
        "Actors Charity Foundation contact",
        "ACF Lagos address",
        "Nigerian charity contact",
        "donate to ACF",
        "volunteer ACF",
    ],
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "Contact Us | Actors Charity Foundation (ACF)",
        description:
            "Reach out to the Actors Charity Foundation — coordination, membership, partnerships, and official channels.",
        url: "/contact",
        images: [{ url: "/acflogo.png", width: 1200, height: 630, alt: "Contact Actors Charity Foundation" }],
    },
    twitter: {
        card: "summary",
        title: "Contact Us | Actors Charity Foundation",
        description: "Get in touch with ACF for partnerships, donations, or volunteering.",
        images: ["/acflogo.png"],
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
