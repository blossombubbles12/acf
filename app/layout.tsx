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
    default: "Actors Charity Foundation (ACF) — Social Change Through Storytelling",
    template: "%s | Actors Charity Foundation",
  },
  description:
    "Actors Charity Foundation (ACF) is a Nigerian non-governmental organization that harnesses the influence, creativity, and compassion of the entertainment industry—especially Nollywood—to drive sustainable social change in education, healthcare, and human rights.",
  keywords: [
    "ACF",
    "Actors Charity Foundation",
    "Nollywood Charity",
    "Social Change Nigeria",
    "Entertainment Philanthropy",
    "NGO Nigeria",
    "Human Rights Advocacy",
    "Nollywood Foundation",
    "Nigerian Charity",
    "Ejike Asiegbu",
    "Actors Guild of Nigeria",
    "Nollywood social impact",
    "donate to Nigerian charity",
    "education charity Nigeria",
    "healthcare charity Nigeria",
  ],
  authors: [{ name: "Actors Charity Foundation", url: siteUrl }],
  creator: "ACF Media",
  publisher: "Actors Charity Foundation",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "Actors Charity Foundation",
    title: "Actors Charity Foundation (ACF) — Social Change Through Storytelling",
    description:
      "Bringing together actors, filmmakers, and artists with communities in need to address urgent challenges in education, healthcare, and human rights across Nigeria.",
    images: [
      {
        url: "/acflogo.png",
        width: 1200,
        height: 630,
        alt: "Actors Charity Foundation — Harnessing the Power of Nollywood for Good",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Actors Charity Foundation (ACF)",
    description:
      "Harnessing the power of Nollywood to drive sustainable social change in education, healthcare, and human rights.",
    images: ["/acflogo.png"],
    creator: "@actorscharity",
  },
  icons: {
    icon: [{ url: "/acflogo.png", type: "image/png" }],
    apple: [{ url: "/acflogo.png" }],
    shortcut: "/acflogo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "non-profit",
};

// JSON-LD Structured Data for the entire site
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NGO",
      "@id": `${siteUrl}/#organization`,
      name: "Actors Charity Foundation",
      alternateName: "ACF",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/acflogo.png`,
        width: 512,
        height: 512,
      },
      description:
        "A Nigerian non-governmental organization harnessing the influence of Nollywood to drive sustainable social change.",
      foundingDate: "2024",
      founder: {
        "@type": "Person",
        name: "Ejike Asiegbu",
        jobTitle: "Executive Director",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "17 Modupe Johnson Crescent, off Adeniran Ogunsanya",
        addressLocality: "Surulere",
        addressRegion: "Lagos",
        addressCountry: "NG",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+234-802-342-4770",
          contactType: "general",
          areaServed: "NG",
          availableLanguage: ["English"],
        },
        {
          "@type": "ContactPoint",
          email: "support@actorscharityfoundation.org",
          contactType: "customer service",
        },
      ],
      sameAs: [
        "https://www.facebook.com/actorscharityfoundation",
        "https://twitter.com/actorscharity",
        "https://www.linkedin.com/company/actors-charity-foundation",
      ],
      areaServed: {
        "@type": "Country",
        name: "Nigeria",
      },
      knowsAbout: [
        "Entertainment Philanthropy",
        "Education",
        "Healthcare",
        "Human Rights",
        "Nollywood",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Actors Charity Foundation",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-NG",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href={siteUrl} />
      </head>
      <body
        className={`${sans.variable} ${outfit.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
