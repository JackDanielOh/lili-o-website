import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Database, ShieldCheck } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import heroImg from "@/assets/hero.jpg";
import dashboardImg from "@/assets/dashboard.png";
import cookingVideo from "@/assets/cooking.mov";
import washingVideo from "@/assets/washing.mov";
import logoNvidia from "@/assets/logos/nvidia.svg";
import logoBpi from "@/assets/logos/bpifrance.svg";
import logoAtalian from "@/assets/logos/atalian.svg";

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
    title: "The datasets your robots are starving for.",
    desc: "Real-world variety, recovery trajectories and edge cases — at scale, across 12 countries, 24/7.",
    video: cookingVideo,
    fallback: washingVideo,
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
    title: "Bad data is worse than no data.",
    desc: "Every frame scored, flagged or discarded before it reaches your training pipeline.",
    video: null,
    fallback: dashboardImg,
    chips: [
      { label: "Auto Validation", to: "/data-quality/auto-validation" as const },
      { label: "Expert Review", to: "/data-quality/expert-review" as const },
      { label: "Explore", to: "/data-quality" as const },
    ],
  },
];

const trusted = [
  { name: "NVIDIA", src: logoNvidia },
  { name: "BPIFrance", src: logoBpi },
  { name: "Atalian", src: logoAtalian },
];

function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden pt-16">
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
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
          Training Data Management Infrastructure
        </div>
        <h1 className="max-w-5xl text-5xl leading-[1.05] text-gradient drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)] md:text-7xl lg:text-8xl">
          Physical AI World Data to <span className="text-gradient-purple">Accelerate</span> Your Robotic Deployment
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
    <div className="group relative mx-4 overflow-hidden rounded-2xl border border-white/10 shadow-[var(--shadow-soft)] transition hover:border-secondary/40">
      <Link to={block.to} className="block">
        <div className="relative aspect-[21/10] overflow-hidden">
          {block.video ? (
            <video
              src={block.video}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={block.fallback}
              alt={block.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs backdrop-blur">
            <Icon className="h-3.5 w-3.5 text-secondary" />
            {block.eyebrow}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-4xl md:text-5xl">{block.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">{block.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {block.chips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-background/50 px-4 py-2 text-sm backdrop-blur transition hover:border-secondary/60 hover:bg-secondary/10 hover:text-foreground"
                >
                  {chip.label}
                  <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function TrustedBy() {
  return (
    <section className="border-y border-border/50 bg-card/30 py-20">
      <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        They trust Lili-o
      </p>
      <div className="mt-12 flex items-center justify-center gap-20">
        {trusted.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="h-8 opacity-50 transition hover:opacity-100"
          />
        ))}
      </div>
    </section>
  );
}

function BrandStatement() {
  return (
    <section className="relative isolate overflow-hidden border-y border-white/5 py-28">
      <div className="absolute inset-0 -z-10 bg-hero-glow opacity-60" />
      <div className="mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-secondary">Our mission</p>
        <h2 className="mt-6 text-4xl leading-[1.1] text-gradient md:text-6xl">
          Lili-o is the training data infrastructure company powering the next generation of{" "}
          <span className="text-gradient-purple">physical AI</span>.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
          We generate real-world robotic data at scale — with variety, recovery trajectories, and
          edge cases — then guarantee its quality before it ever reaches your training pipeline.
        </p>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="relative overflow-x-clip">
      <SiteNav />
      <Hero />
      <BrandStatement />
      <section id="explore" className="py-24 md:py-32">
        <div className="mb-12 px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">What we do</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-6xl">
            Two streams. <span className="text-gradient-purple">One engine.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          {blocks.map((b) => (
            <BlockCard key={b.title} block={b} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
