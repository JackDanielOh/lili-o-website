import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Database, ShieldCheck } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import heroImg from "@/assets/hero.jpg";
import humanImg from "@/assets/human-data.jpg";
import qualityImg from "@/assets/quality-data.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lili-o — Real World Data for Robotics" },
      {
        name: "description",
        content:
          "Lili-o is the first autonomous data foundry generating real-world data with variety and recovery trajectories to accelerate robotic deployment.",
      },
    ],
  }),
});

const blocks = [
  {
    to: "/data-generation" as const,
    icon: Database,
    eyebrow: "01 — Foundry",
    title: "Data Generation",
    desc: "An autonomous foundry producing real-world data with variety, recovery trajectories and edge cases — at scale.",
    img: humanImg,
    chips: [
      { label: "Human-Centric", to: "/data-generation/human-centric" as const },
      { label: "Robot-Centric", to: "/data-generation/robot-centric" as const },
      { label: "Explore", to: "/data-generation" as const },
    ],
  },
  {
    to: "/data-quality" as const,
    icon: ShieldCheck,
    eyebrow: "02 — Trust Layer",
    title: "Data Quality Management",
    desc: "Every frame is scored for coverage, integrity and label fidelity — only data that improves your model reaches your bucket.",
    img: qualityImg,
    chips: [
      { label: "Auto Validation", to: "/data-quality/auto-validation" as const },
      { label: "Expert Review", to: "/data-quality/expert-review" as const },
      { label: "Explore", to: "/data-quality" as const },
    ],
  },
];

const trusted = ["NVIDIA", "Figure", "1X", "Boston Dynamics", "Tesla", "Sanctuary", "Apptronik", "Agility", "Skild AI", "Physical Intelligence"];

function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Lili-o data foundry"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute inset-0 bg-hero-glow opacity-70" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
          The Autonomous Data Foundry
        </div>
        <h1 className="max-w-5xl text-5xl leading-[1.05] text-gradient drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)] md:text-7xl lg:text-8xl">
          Real World Data to <span className="text-gradient-purple">Accelerate</span> Your Robotic Deployment
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Lili-o generates real-world data with variety and recovery trajectories — while
          guaranteeing the quality your foundation models demand.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-purple px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#explore"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/10"
          >
            Explore the Foundry
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Scroll
      </div>
    </section>
  );
}

function BlockCard({ block }: { block: (typeof blocks)[number] }) {
  const Icon = block.icon;
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card shadow-[var(--shadow-soft)] transition hover:border-secondary/40">
      <Link to={block.to} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={block.img}
            alt={block.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs backdrop-blur">
            <Icon className="h-3.5 w-3.5 text-secondary" />
            {block.eyebrow}
          </div>
        </div>
        <div className="p-8">
          <h2 className="text-3xl md:text-4xl">{block.title}</h2>
          <p className="mt-3 text-muted-foreground">{block.desc}</p>
        </div>
      </Link>
      <div className="flex flex-wrap gap-2 px-8 pb-8">
        {block.chips.map((chip) => (
          <Link
            key={chip.label}
            to={chip.to}
            className="group/chip inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-secondary/60 hover:bg-secondary/10 hover:text-foreground"
          >
            {chip.label}
            <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover/chip:translate-x-0.5 group-hover/chip:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function TrustedBy() {
  return (
    <section className="border-y border-border/50 bg-card/30 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          They trust Lili-o
        </p>
        <p className="mt-4 text-center font-display text-2xl text-gradient md:text-3xl">
          The world's leading AI &amp; Robotics teams
        </p>
        <div className="relative mt-12 overflow-hidden">
          <div className="flex w-max marquee gap-16">
            {[...trusted, ...trusted].map((logo, i) => (
              <span
                key={i}
                className="font-display text-2xl font-bold text-muted-foreground/60 transition hover:text-foreground whitespace-nowrap"
              >
                {logo}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="relative overflow-x-clip">
      <SiteNav />
      <Hero />
      <section id="explore" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">What we do</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-6xl">
            Two streams. <span className="text-gradient-purple">One engine.</span>
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {blocks.map((b) => (
            <BlockCard key={b.title} block={b} />
          ))}
        </div>
      </section>
      <TrustedBy />
      <SiteFooter />
    </main>
  );
}
