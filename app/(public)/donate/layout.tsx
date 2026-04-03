import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Donate | Actors Charity Foundation (ACF)",
    description:
        "Support the Actors Charity Foundation with a one-time or monthly donation. 100% of your funds go directly to education, healthcare, and advocacy programs across Nigeria.",
    openGraph: {
        title: "Donate to Actors Charity Foundation (ACF)",
        description:
            "Your contribution fuels our mission to bridge gaps in education and healthcare through the influence of Nollywood.",
        url: "/donate",
        images: [{ url: "/acflogo.png", alt: "Donate to Actors Charity Foundation" }],
    },
    twitter: {
        title: "Donate | Actors Charity Foundation",
        description:
            "Support sustainable social change in Nigeria — donate to ACF today.",
        images: ["/acflogo.png"],
    },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
