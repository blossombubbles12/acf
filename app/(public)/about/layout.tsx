import type { Metadata } from "next";
import { AboutSubNav } from "@/components/about/AboutSubNav";

export const metadata: Metadata = {
    title: "About Us | Actors Charity Foundation (ACF)",
    description: "Learn about the mission, history, and strategic pillars of the Actors Charity Foundation (ACF).",
    openGraph: {
        title: "About Us | Actors Charity Foundation",
        description: "How we harness the influence of Nollywood and the entertainment industry for social good.",
        url: "/about",
        images: [{ url: "/acflogo.png", alt: "About Actors Charity Foundation" }],
    },
    twitter: {
        title: "About Us | Actors Charity Foundation",
        description: "How we harness the influence of Nollywood and the entertainment industry for social good.",
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
