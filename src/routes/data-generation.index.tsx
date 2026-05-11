import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, Fingerprint, Camera, RotateCcw, SlidersHorizontal, BadgeCheck, Plug } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
const gridVideo = "https://lili-o-assets.cellar-c2.services.clever-cloud.com/3x3%20human%20centric.mp4";
import washingVideo from "@/assets/washing.mov";
import logoUnitree from "@/assets/logos/unitree.png";
import logoAgibot from "@/assets/logos/agibot.png";
import logoNiryo from "@/assets/logos/niryo.png";
import logoOpenArm from "@/assets/logos/openarm.png";

export const Route = createFileRoute("/data-generation/")({
  component: DataGenerationPage,
  head: () => ({
    meta: [
      { title: "Data Generation — Lili-o" },
      {
        name: "description",
        content:
          "The world's most diverse real-world robotics dataset — human demonstrations, robot foundries, and every modality your model needs.",
      },
    ],
  }),
});


function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-card border border-white/10">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div className="grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/5">
          <Play className="h-5 w-5 translate-x-0.5" />
        </div>
        <span className="text-xs uppercase tracking-[0.2em]">{label}</span>
      </div>
    </div>
  );
}

const stats = [
  { value: "100+", label: "Task categories" },
  { value: "80+", label: "Environments" },
  { value: "4", label: "Platforms" },
  { value: "24/7", label: "Robotic foundry" },
];

const modalities = [
  {
    Icon: Fingerprint,
    title: "Tactile Sensor Data",
    desc: "Contact forces and fingertip pressure signals paired with visual streams — the signal simulation can't reproduce faithfully, and no competitor provides at scale.",
  },
  {
    Icon: RotateCcw,
    title: "Recovery Trajectories",
    desc: "Failures, corrections, and out-of-distribution recoveries — the rarest and most valuable training signal for robust real-world deployment.",
  },
  {
    Icon: Camera,
    title: "RGB-D Streams",
    desc: "Full depth + colour at every frame, time-synchronised across all sensors — giving your model the spatial understanding it needs to reason about objects and scenes in 3D.",
  },
  {
    Icon: SlidersHorizontal,
    title: "Scene Variation Metadata",
    desc: "Every episode is tagged with its exact conditions — lighting, object positions, layout. Systematically engineered variety so you always know what you have and can target the gaps.",
  },
  {
    Icon: BadgeCheck,
    title: "Episode Success Labels",
    desc: "Every episode is marked succeeded or failed. A basic metadata point missing from 95% of public datasets — we include it on every single recording.",
  },
  {
    Icon: Plug,
    title: "Format Compatibility",
    desc: "Data ships ready for LeRobot, ACT, and Diffusion Policy. Plug directly into your training pipeline — no weeks of preprocessing.",
  },
];

const robots = [
  { name: "Unitree", src: logoUnitree, href: "https://www.unitree.com" },
  { name: "AgIBot", src: logoAgibot, href: "https://www.agibot.com" },
  { name: "Niryo", src: logoNiryo, href: "https://niryo.com" },
  { name: "OpenArm", src: logoOpenArm, href: "https://openarm.dev" },
];

function DataGenerationPage() {
  return (
    <main className="relative overflow-x-clip">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="relative isolate min-h-screen overflow-hidden pt-16">
        <div className="absolute inset-0 -z-10 bg-hero-glow opacity-80" />
        <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Data Generation</p>
          <h1 className="mt-6 max-w-5xl text-5xl leading-[1.05] text-gradient md:text-7xl lg:text-8xl">
            The World's Most{" "}
            <span className="text-gradient-purple">Diverse</span>{" "}
            Robotics Dataset
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            From human demonstrations in the wild to a 24/7 robotic foundry — Lili-o
            covers every task, every environment, every modality your model needs.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-purple px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
            >
              Book a Demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#problem"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/10"
            >
              Read more
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </div>
      </section>

      {/* ── Main video ── */}
      <video
        src={gridVideo}
        autoPlay
        muted
        loop
        playsInline
        className="aspect-video w-full object-cover"
      />

      {/* ── Stats ── */}
      <section className="border-y border-white/5 bg-card/40 py-16">
        <div className="grid grid-cols-2 divide-x divide-white/5 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 py-4">
              <span className="font-display text-4xl font-bold text-gradient md:text-5xl">
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem ── */}
      <section id="problem" className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">The Problem</p>
          <h2 className="mt-6 text-4xl leading-tight text-gradient md:text-6xl">
            Robot learning is starving for data.
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Foundation models for robotics need what language models had: internet-scale,
              high-quality, diverse training data. But real-world robot data barely exists.
              Lab teleoperation is expensive, slow, and confined to a single rig in a single room.
              Simulation is clean but brittle — models trained in sim still fail the moment they
              encounter the real world.
            </p>
            <p>
              The deeper problem is <strong className="text-foreground">variety</strong>. A robot
              deployed in a Japanese kitchen, a French warehouse, and a Korean hospital will face
              completely different objects, layouts, lighting conditions, and failure modes. No
              single lab can replicate that. And no existing dataset even tries.
            </p>
            <p>
              Worse: almost no dataset captures{" "}
              <strong className="text-foreground">recovery trajectories</strong> — what happens
              when a grasp slips, a part drops, or an unexpected obstacle appears. These are exactly
              the situations where deployed robots fail. Without recovery data, your model never
              learns to recover.
            </p>
          </div>
        </div>
      </section>

      {/* ── Solution intro ── */}
      <section className="relative isolate overflow-hidden border-y border-white/5 py-28">
        <div className="absolute inset-0 -z-10 bg-hero-glow opacity-50" />
        <div className="px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Our Answer</p>
          <h2 className="mt-6 max-w-4xl text-4xl leading-tight text-gradient md:text-6xl">
            Two streams. High quality.{" "}
            <span className="text-gradient-purple">Infinite variety.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Lili-o combines a global network of human demonstrators — capturing tasks as they
            actually happen in the real world — with a fully automated robotic foundry running
            around the clock. Together, they produce a dataset unlike anything else: diverse,
            grounded, and rich in the edge cases your model needs to survive deployment.
          </p>
        </div>
      </section>

      {/* ── Human-centric stream ── */}
      <section className="py-28">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-12 md:py-0">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary">Stream 01</p>
            <h2 className="mt-6 text-4xl leading-tight text-gradient md:text-5xl">
              Human-Centric Demonstrations
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Our global network collects demonstrations across 12 countries — in real homes,
              factories, hospitals, restaurants, and outdoor environments. Every demonstrator wears
              our multi-modal capture rig, producing RGB-D video, upper-body joint and Cartesian
              trajectories, and tactile contact data simultaneously.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Crucially, we capture what others skip: the corrections. When a grasp fails or an
              object shifts, demonstrators continue — and our pipeline flags those moments as
              recovery trajectories, the rarest signal in robotics training data.
            </p>
          </div>
          <video
            src={washingVideo}
            autoPlay
            muted
            loop
            playsInline
            className="aspect-video w-full object-cover"
          />
        </div>
      </section>

      {/* ── Robot-centric stream ── */}
      <section className="border-t border-white/5 px-6 py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-secondary">Stream 02</p>
        <h2 className="mt-6 text-4xl leading-tight text-gradient md:text-5xl">
          The Robotic Foundry
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Our purpose-built robotic foundry runs 24 hours a day, 7 days a week.
          Fleets of robots execute structured tasks in controlled but varied scenes, generating
          consistent, high-throughput data from the robot's own sensors — not a human wearing a rig.
        </p>
        <div className="mt-16 grid grid-cols-4 gap-px border border-white/5 bg-white/5">
          {[
            { value: "24/7", label: "Continuous operation" },
            { value: "100+", label: "Task categories" },
            { value: "80+", label: "Environments" },
            { value: "4", label: "Robot platforms" },
          ].map((s) => (
            <div key={s.label} className="bg-background px-8 py-10">
              <p className="font-display text-5xl font-bold text-gradient">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <div className="mb-6 flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Compatible platforms</p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
              More coming soon
            </span>
          </div>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex w-max items-center marquee gap-x-20">
              {[...robots, ...robots].map((r, i) => (
                <a
                  key={`${r.name}-${i}`}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.name}
                >
                  <img
                    src={r.src}
                    alt={r.name}
                    className="h-10 opacity-40 transition hover:opacity-100"
                    style={{ width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Modalities ── */}
      <section className="border-t border-white/5 py-28">
        <div className="px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Data Modalities</p>
          <h2 className="mt-6 max-w-2xl text-4xl leading-tight text-gradient md:text-5xl">
            The signals others don't have.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            All modalities are time-synchronised and collected in parallel during every session —
            no post-hoc alignment, no missing channels, no preprocessing before you can train.
          </p>
          <div className="mt-14 grid gap-px border border-white/5 md:grid-cols-3">
            {modalities.map((m) => (
              <div key={m.title} className="bg-card p-8">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-purple text-white shadow-[var(--shadow-glow)]">
                  <m.Icon />
                </div>
                  <h3 className="text-xl text-foreground">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative isolate overflow-hidden border-t border-white/5 py-32">
        <div className="absolute inset-0 -z-10 bg-hero-glow opacity-60" />
        <div className="px-6 text-center">
          <h2 className="mx-auto max-w-3xl text-4xl leading-tight text-gradient md:text-6xl">
            Ready to power your robot with{" "}
            <span className="text-gradient-purple">real data</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Tell us your robot, your task, and your environment. We'll put together a sample
            dataset in under a week.
          </p>
          <Link
            to="/contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-purple px-8 py-4 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
          >
            Book a Demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
