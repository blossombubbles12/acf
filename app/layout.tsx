import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const siteUrl = "https://actorscharity.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Actors Charity Foundation (ACF)",
    template: "%s | Actors Charity Foundation",
  },
  description:
    "Actors Charity Foundation (ACF) is a non-governmental organization that harnesses the influence, creativity, and compassion of the entertainment industry—especially Nollywood—to drive sustainable social change.",
  keywords: [
    "ACF", "Actors Charity Foundation", "Nollywood Charity", "Social Change Nigeria",
    "Entertainment Philanthropy", "NGO Nigeria", "Human Rights Advocacy",
  ],
  authors: [{ name: "Actors Charity Foundation" }],
  creator: "ACF Media",
  publisher: "Actors Charity Foundation",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "Actors Charity Foundation",
    title: "Actors Charity Foundation (ACF) | Social Change through Storytelling",
    description:
      "Bringing together actors, filmmakers, and artists with communities in need to address urgent challenges in education, healthcare, and human rights.",
    images: [
      {
        url: "/acflogo.png",
        width: 1200,
        height: 630,
        alt: "Actors Charity Foundation Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Actors Charity Foundation (ACF)",
    description:
      "Harnessing the power of Nollywood to drive sustainable social change.",
    images: ["/acflogo.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png" },
    ],
    shortcut: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${outfit.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
