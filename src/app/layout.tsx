import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: {
    default: "Lili-o — The autonomous Data Foundry for Physical AI",
    template: "%s — Lili-o",
  },
  description:
    "We run robots 24/7 in home environments to generate the training data Physical AI needs.",
  authors: [{ name: "Lili-o" }],
  openGraph: {
    title: "Lili-o — Data Foundry for Physical AI",
    description: "Autonomous data generation for the next era of robotics.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Analytics />
      <body>{children}</body>
    </html>
  );
}
