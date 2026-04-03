import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Executive Board | Actors Charity Foundation (ACF)",
    description:
        "The leadership team driving social change through the entertainment industry.",
    openGraph: {
        title: "Executive Board | Actors Charity Foundation (ACF)",
        description:
            "The leadership team driving social change through the entertainment industry.",
        url: "/executives",
        images: [{ url: "/acflogo.png", alt: "Actors Charity Foundation (ACF) Executives" }],
    },
};

export default function ExecutivesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
