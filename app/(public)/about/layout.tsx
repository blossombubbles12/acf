import type { Metadata } from "next";
import { AboutSubNav } from "@/components/about/AboutSubNav";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about the Actors Charity Foundation (ACF) — our mission, history, strategic pillars, and how we harness the influence of Nollywood to drive sustainable social change in Nigeria.",
    keywords: [
        "ACF mission",
        "Actors Charity Foundation history",
        "Nollywood philanthropy",
        "Nigerian NGO",
        "entertainment social impact",
        "ACF about",
    ],
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "About Us | Actors Charity Foundation (ACF)",
        description:
            "Discover how ACF harnesses the influence of Nollywood and the entertainment industry for social good — education, healthcare, and human rights advocacy.",
        url: "/about",
        images: [{ url: "/acflogo.png", width: 1200, height: 630, alt: "About Actors Charity Foundation" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us | Actors Charity Foundation",
        description:
            "Our mission, leadership, and strategic approach to sustainable social change through entertainment.",
        images: ["/acflogo.png"],
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AboutSubNav />
            {children}
        </>
    );
}
