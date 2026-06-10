import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

const OG_IMAGE = "/hero-landing.webp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lili-o — The autonomous Data Foundry for Physical AI",
    template: "%s — Lili-o",
  },
  description:
    "We run robots 24/7 in home environments to generate the training data Physical AI needs.",
  authors: [{ name: "Lili-o" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Lili-o — Data Foundry for Physical AI",
    description: "Autonomous data generation for the next era of robotics.",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1600, height: 1100, alt: "Lili-o autonomous data foundry" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/favicon.webp",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Lili-o",
      url: SITE_URL,
      description: "The autonomous Data Foundry for Physical AI",
      email: "hello@lili-o.com",
    },
    {
      "@type": "WebSite",
      name: "Lili-o",
      url: SITE_URL,
      description: "The autonomous Data Foundry for Physical AI",
      publisher: { "@type": "Organization", name: "Lili-o" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Analytics />
      <body>
        <JsonLd data={organizationJsonLd} />
        {children}
      </body>
    </html>
  );
}
