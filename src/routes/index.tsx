import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Cpu, ShieldCheck, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import humanImg from "@/assets/human-data.jpg";
import robotImg from "@/assets/robot-data.jpg";
import qualityImg from "@/assets/quality-data.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lili-O — Real World Data for Robotics" },
      {
        name: "description",
        content:
          "Lili-O is the first autonomous data foundry generating real-world data with variety and recovery trajectories to accelerate robotic deployment.",
      },
      { property: "og:title", content: "Lili-O — Real World Data for Robotics" },
      { property: "og:description", content: "The autonomous data foundry powering Physical AI." },
    ],
  }),
});

const logos = ["NVIDIA", "Figure", "1X", "Boston Dynamics", "Tesla", "Sanctuary", "Apptronik", "Agility"];

function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-background/60 px-5 py-2.5 backdrop-blur-xl">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
            <span className="h-2 w-2 rounded-full bg-current" />
          </span>
          <span className="font-display text-xl">Lili-O</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#data" className="hover:text-foreground">Data Foundry</a>
          <a href="#capabilities" className="hover:text-foreground">Capabilities</a>
          <a href="#customers" className="hover:text-foreground">Customers</a>
          <a href="#about" className="hover:text-foreground">About</a>
        </div>
        <a
          href="#demo"
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
        >
          Book a Demo <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroImg} alt="Robot arm in a data foundry" width={1920} height={1088} className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        <div className="absolute inset-0 bg-hero-glow" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          The Autonomous Data Foundry
        </div>
        <h1 className="max-w-5xl text-5xl leading-[1.05] text-gradient md:text-7xl lg:text-8xl">
          Real World Data to <em className="italic text-primary">Accelerate</em> Your Robotic Deployment
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Lili-O generates real-world data with variety and recovery trajectories — while
          guaranteeing the quality your foundation models demand.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#demo"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
          <a
            href="#data"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/10"
          >
            See the Foundry
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Scroll
      </div>
    </section>
  );
}

function LogoCloud() {
  return (
    <section id="customers" className="border-y border-border/50 bg-card/30 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Trusted by the world's leading AI &amp; Robotics teams
        </p>
        <div className="relative mt-8 overflow-hidden">
          <div className="flex w-max marquee gap-16">
            {[...logos, ...logos].map((logo, i) => (
              <span key={i} className="font-display text-2xl text-muted-foreground/70 whitespace-nowrap">
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

function Intro() {
  return (
    <section id="data" className="relative mx-auto max-w-6xl px-6 py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">01 — The Engine</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
            The first autonomous data foundry for physical intelligence.
          </h2>
        </div>
        <div className="md:col-span-7 md:pt-12">
          <p className="text-lg text-muted-foreground md:text-xl">
            Robotic foundation models are starved for one thing: high-quality, diverse,
            real-world data. Lili-O is built to generate it — at scale, with recovery
            trajectories, edge cases and rigorous quality control baked into every frame.
          </p>
          <a href="#capabilities" className="mt-6 inline-flex items-center gap-1.5 text-sm text-foreground hover:text-primary">
            Explore capabilities <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

const capabilities = [
  {
    icon: Sparkles,
    tag: "Human-Centric",
    title: "Human Demonstrations in the Wild",
    desc: "A vast variety of real humans performing complex everyday tasks — cleaning, folding laundry, manipulating tools — captured across thousands of households.",
    img: humanImg,
  },
  {
    icon: Cpu,
    tag: "Robot-Centric",
    title: "Autonomous Robot Foundry",
    desc: "Fleets of robots operating 24/7 in our foundries, generating repetitive, edge-case and recovery trajectory data from the robot's own point of view.",
    img: robotImg,
  },
  {
    icon: ShieldCheck,
    tag: "Quality Management",
    title: "Every Frame, Verified",
    desc: "A multi-stage QA pipeline scores every clip on coverage, integrity and label fidelity — so only data that improves your model ever reaches your bucket.",
    img: qualityImg,
  },
];

function Capabilities() {
  return (
    <section id="capabilities" className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="mb-20 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">02 — Capabilities</p>
        <h2 className="mt-4 text-4xl leading-tight md:text-6xl">
          Three streams. One <em className="italic text-primary">data engine</em>.
        </h2>
      </div>

      <div className="space-y-32">
        {capabilities.map((c, i) => (
          <div
            key={c.title}
            className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
          >
            <div className="relative grain overflow-hidden rounded-3xl border border-white/10 shadow-[var(--shadow-soft)]">
              <img
                src={c.img}
                alt={c.title}
                width={1280}
                height={896}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs backdrop-blur">
                <c.icon className="h-3.5 w-3.5 text-primary" /> {c.tag}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">0{i + 1}</p>
              <h3 className="mt-3 text-3xl leading-tight md:text-5xl">{c.title}</h3>
              <p className="mt-5 text-lg text-muted-foreground">{c.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Diversity", "Recovery", "Edge cases", "Quality"].map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "10M+", l: "Real-world clips generated" },
    { v: "99.2%", l: "Frames passing QA" },
    { v: "24/7", l: "Foundries running" },
    { v: "1,200+", l: "Tasks covered" },
  ];
  return (
    <section className="border-y border-border/50 bg-card/40 py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="font-display text-5xl text-gradient md:text-6xl">{s.v}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="demo" className="relative mx-auto max-w-6xl px-6 py-32">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card p-12 text-center md:p-20">
        <div className="absolute inset-0 -z-10 bg-hero-glow opacity-80" />
        <p className="text-xs uppercase tracking-[0.3em] text-primary">03 — Get Started</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">
          Power your next robot with <em className="italic text-primary">real</em> data.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Talk to the Lili-O team. We'll spin up a sample dataset for your task in under a week.
        </p>
        <a
          href="mailto:hello@lili-o.ai"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
        >
          Book a Demo <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="about" className="border-t border-border/50 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
          </span>
          <span className="font-display text-lg">Lili-O</span>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Lili-O — The Autonomous Data Foundry.</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="relative overflow-x-clip">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&display=swap"
      />
      <Nav />
      <Hero />
      <LogoCloud />
      <Intro />
      <Capabilities />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
