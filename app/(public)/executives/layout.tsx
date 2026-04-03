import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Executive Board",
    description:
        "Meet the leadership team of the Actors Charity Foundation (ACF) — the visionary executives driving social change through the entertainment industry in Nigeria.",
    keywords: [
        "ACF executives",
        "Actors Charity Foundation leadership",
        "Ejike Asiegbu",
        "Nollywood leaders",
        "ACF board of directors",
        "Nigerian entertainment philanthropy",
    ],
    alternates: {
        canonical: "/executives",
    },
    openGraph: {
        title: "Executive Board | Actors Charity Foundation (ACF)",
        description: "The leadership team driving social change through the entertainment industry.",
        url: "/executives",
        images: [{ url: "/acflogo.png", width: 1200, height: 630, alt: "ACF Executive Board" }],
    },
    twitter: {
        card: "summary",
        title: "Executive Board | Actors Charity Foundation",
        description: "Leadership driving Nollywood's humanitarian mission.",
        images: ["/acflogo.png"],
    },
};

export default function ExecutivesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
