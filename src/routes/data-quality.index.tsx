import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import dashboardImg from "@/assets/dashboard.png";
import datasetPageImg from "@/assets/dataset_page.png";

export const Route = createFileRoute("/data-quality/")({
  component: DataQualityPage,
  head: () => ({
    meta: [
      { title: "Data Quality — Lili-o" },
      {
        name: "description",
        content: "A quality platform for robotic training data — coming soon.",
      },
    ],
  }),
});

const pillars = [
  {
    title: "Automated scoring",
    desc: "Every frame checked for integrity, label fidelity, sensor sync and trajectory smoothness — at ingestion.",
  },
  {
    title: "Expert review",
    desc: "Human-in-the-loop reviewers trained in robotics catch what automation misses.",
  },
  {
    title: "Recovery flagging",
    desc: "Failure moments and corrections are automatically identified and tagged as high-value recovery signals.",
  },
  {
    title: "Quality SLAs",
    desc: "Delivery comes with a signed quality report. If it doesn't pass our bar, it doesn't ship.",
  },
];

function DataQualityPage() {
  return (
    <main className="relative overflow-x-clip">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="relative isolate min-h-screen overflow-hidden pt-16">
        <div className="absolute inset-0 -z-10 bg-hero-glow opacity-80" />
        <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
            Coming soon
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Data Quality</p>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[1.05] text-gradient md:text-7xl lg:text-8xl">
            More data won't save you.{" "}
            <span className="text-gradient-purple">Better data</span> will.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            We're building a quality platform that ensures every frame that reaches your training
            pipeline is worth training on. Get early access.
          </p>
          <Link
            to="/contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-purple px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
          >
            Get early access <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </div>
      </section>

      {/* ── Dashboard preview ── */}
      <section className="border-b border-white/5 px-6 py-20">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Platform preview
        </p>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[var(--shadow-soft)]">
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent" />
          <img
            src={dashboardImg}
            alt="Lili-o quality platform dashboard"
            className="w-full object-cover object-top"
          />
        </div>
      </section>

      {/* ── The argument ── */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Why it matters</p>
          <h2 className="mt-6 text-4xl leading-tight text-gradient md:text-5xl">
            Scaling broken data just scales broken models.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              A mislabelled joint pose, a blurry frame, a trajectory with a missing recovery
              step — individually harmless. At scale, they become systematic noise that teaches
              your model the wrong things with great confidence.
            </p>
            <p>
              In robotics, the cost of bad data is paid at deployment, not at training time.
              A robot that mishandles a fragile object doesn't get a second chance.
            </p>
          </div>
        </div>
      </section>

      {/* ── Dataset page preview ── */}
      <section className="border-y border-white/5 px-6 py-20">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Dataset explorer
        </p>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[var(--shadow-soft)]">
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent" />
          <img
            src={datasetPageImg}
            alt="Lili-o dataset explorer"
            className="w-full object-cover object-top"
          />
        </div>
      </section>

      {/* ── What we're building ── */}
      <section className="border-t border-white/5 py-28">
        <div className="px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">What we're building</p>
          <h2 className="mt-6 max-w-2xl text-4xl leading-tight text-gradient md:text-5xl">
            A pipeline built to reject by default.
          </h2>
          <div className="mt-14 grid gap-px border border-white/5 md:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.title} className="bg-card p-8">
                <div className="mb-4 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-secondary" />
                  <h3 className="text-lg text-foreground">{p.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative isolate overflow-hidden border-t border-white/5 py-32">
        <div className="absolute inset-0 -z-10 bg-hero-glow opacity-60" />
        <div className="px-6 text-center">
          <h2 className="mx-auto max-w-2xl text-4xl leading-tight text-gradient md:text-5xl">
            Interested in early access?
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            We're onboarding a small number of early partners to shape the platform.
            Tell us about your pipeline.
          </p>
          <Link
            to="/contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-purple px-8 py-4 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
          >
            Get in touch <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
