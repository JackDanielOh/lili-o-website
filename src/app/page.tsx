import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeHero } from "@/components/HomeHero";
import { TrustedBySection } from "@/components/TrustedBySection";

const OurBeliefSection = dynamic(() =>
  import("@/components/home/OurBeliefSection").then((m) => ({ default: m.OurBeliefSection })),
);
const DataBottleneckSection = dynamic(() =>
  import("@/components/home/DataBottleneckSection").then((m) => ({
    default: m.DataBottleneckSection,
  })),
);
const OneShotSection = dynamic(() =>
  import("@/components/home/OneShotSection").then((m) => ({ default: m.OneShotSection })),
);
// const EntryPointsSection = dynamic(() =>
//   import("@/components/home/EntryPointsSection").then((m) => ({ default: m.EntryPointsSection })),
// );
const DesignPartnersSection = dynamic(() =>
  import("@/components/home/DesignPartnersSection").then((m) => ({
    default: m.DesignPartnersSection,
  })),
);
const HomeCtaSection = dynamic(() =>
  import("@/components/home/HomeCtaSection").then((m) => ({ default: m.HomeCtaSection })),
);
const SiteFooter = dynamic(() =>
  import("@/components/SiteFooter").then((m) => ({ default: m.SiteFooter })),
);

export const metadata: Metadata = {
  title: "Lili-o — The autonomous Data Foundry for Physical AI",
  description:
    "Robo-Centric data foundry powered by One-Shot execution. We run robots 24/7 to mass-produce the training data Physical AI needs.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lili-o — Data Foundry for Physical AI",
    description: "Autonomous data generation for the next era of robotics.",
  },
};

export default function Home() {
  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
<SiteHeader variant="dark" />
      <HomeHero />
      <TrustedBySection />
      <OurBeliefSection />
      <DataBottleneckSection />
      <OneShotSection />
      {/* <EntryPointsSection /> */}
      <DesignPartnersSection />
      <HomeCtaSection />
      <SiteFooter />
    </div>
  );
}
