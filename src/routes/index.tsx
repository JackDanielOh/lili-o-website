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
    img: heroImg,
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

function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 -z-10">
        <img
          src={humanImg}
          alt=""
          width={1280}
          height={896}
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        <div className="absolute inset-0 bg-hero-glow" />
      </div>
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
          The Autonomous Data Foundry
        </div>
        <h1 className="mx-auto max-w-5xl text-5xl leading-[1.05] text-gradient md:text-7xl">
          Real World Data to <span className="text-gradient-purple">Accelerate</span> Your Robotic Deployment
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Lili-o generates real-world data with variety and recovery trajectories — while
          guaranteeing the quality your foundation models demand.
        </p>
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

function Index() {
  return (
    <main className="relative overflow-x-clip">
      <SiteNav />
      <Hero />
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="grid gap-8 md:grid-cols-2">
          {blocks.map((b) => (
            <BlockCard key={b.title} block={b} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
