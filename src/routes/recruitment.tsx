import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Pyramid } from "@/components/Pyramid";

export const Route = createFileRoute("/recruitment")({
  head: () => ({
    meta: [
      { title: "Careers — Lili-o" },
      {
        name: "description",
        content: "Join Lili-o and help build the autonomous Data Foundry for Physical AI.",
      },
      { property: "og:title", content: "Careers — Lili-o" },
      {
        property: "og:description",
        content: "We're building the team that will bring household robotics data to scale.",
      },
    ],
  }),
  component: RecruitmentPage,
});

const values = [
  {
    n: "01",
    t: "Hard problems, real impact",
    d: "We're solving autonomy in unstructured home environments — the kind of work that changes what robots can do.",
  },
  {
    n: "02",
    t: "Move fast, build carefully",
    d: "We're early-stage and shipping fast, but we care about rigour. Good ideas win, regardless of where they come from.",
  },
  {
    n: "03",
    t: "EU-built, globally minded",
    d: "Based in Europe, building for the world. AI Act compliant from day one, with a team that thinks long-term.",
  },
];

function RecruitmentPage() {
  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <SiteHeader variant="dark" />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        <Pyramid className="absolute -top-20 -right-32 w-[520px] opacity-20 pointer-events-none" />
        <div className="container-x pt-24 md:pt-36 pb-24 md:pb-32 relative">
          <div className="eyebrow text-[var(--violet)] mb-8">// Careers</div>
          <h1 className="display-xl max-w-5xl">
            Help us build the <span className="text-[var(--violet)]">Data Foundry</span> for
            Physical AI.
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-paper/70 leading-relaxed">
            We're assembling a small team of engineers, researchers, and operators who want to solve
            one of the hardest problems in robotics — at home, at scale.
          </p>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="container-x py-28 md:py-36">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div>
            <div className="eyebrow text-[var(--violet)] mb-6">Why Lili-o</div>
            <h2 className="display-lg">Small team. Big frontier.</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-paper/80 max-w-2xl">
            <p>
              Lili-o runs robots 24/7 in real home environments to generate the training data
              Physical AI needs. We're backed by global investors and working with design partners
              who are building the next generation of household robots.
            </p>
            <p className="text-paper/60">
              If you're excited about robotics, autonomy, or data at scale — and you want to work on
              problems that matter — we'd love to hear from you.
            </p>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-px bg-white/10">
          {values.map((v) => (
            <div key={v.n} className="bg-ink p-10">
              <div className="text-[var(--violet)] text-sm font-mono mb-6">{v.n}</div>
              <h3 className="text-2xl font-bold tracking-tight">{v.t}</h3>
              <p className="mt-3 text-paper/60">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OPEN POSITIONS — empty state */}
      <section className="bg-[#141414] border-y border-white/5">
        <div className="container-x py-28 md:py-36">
          <div className="eyebrow text-[var(--violet)] mb-6">Open roles</div>
          <h2 className="display-lg max-w-3xl">Current openings.</h2>
          <p className="mt-8 max-w-2xl text-lg text-paper/70 leading-relaxed">
            We don't have any open positions right now, but we're always interested in meeting
            exceptional people.
          </p>

          <div className="mt-14 rounded-2xl border border-white/10 border-dashed p-12 md:p-16 text-center">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-ink">
              <span className="text-2xl text-paper/40" aria-hidden>
                —
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">No open positions yet</h3>
            <p className="mt-4 max-w-md mx-auto text-paper/60 leading-relaxed">
              We're not actively hiring for specific roles at the moment. Check back soon — or reach
              out if you'd like to introduce yourself for future opportunities.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/jiseongoh/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[var(--violet)] text-white px-7 py-4 font-medium hover:bg-[var(--violet-dark)] transition"
              >
                Say hello →
              </a>
              <Link
                to="/contact"
                className="rounded-xl px-7 py-4 border border-white/20 hover:border-[var(--violet)] transition"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE LOOK FOR */}
      <section className="container-x py-28 md:py-36">
        <div className="eyebrow text-[var(--violet)] mb-6">What we look for</div>
        <h2 className="display-lg max-w-3xl">The kind of people we want to work with.</h2>
        <div className="mt-14 flex flex-wrap gap-3">
          {[
            "Robotics & autonomy",
            "ML & computer vision",
            "Data engineering",
            "Full-stack engineering",
            "Hardware & mechatronics",
            "Research & experimentation",
            "Operations & logistics",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-paper/60"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-paper/60 leading-relaxed">
          When we do open roles, they'll likely sit across these areas. If any of this sounds like
          you, we'd still love to hear from you — even before a job goes live.
        </p>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/5">
        <Pyramid className="absolute -left-32 -bottom-32 w-[520px] opacity-25 pointer-events-none" />
        <div className="container-x py-32 md:py-40 relative text-center">
          <h2 className="display-xl max-w-4xl mx-auto">
            Interested in what we're <span className="text-[var(--violet)]">building</span>?
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-lg text-paper/60">
            Drop us a line — we'll keep your details on file for when the right role opens up.
          </p>
          <a
            href="https://www.linkedin.com/in/jiseongoh/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex rounded-xl bg-[var(--violet)] text-white px-10 py-5 font-medium text-lg hover:bg-[var(--violet-dark)] transition"
          >
            Say hello →
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
