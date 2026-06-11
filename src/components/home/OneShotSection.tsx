"use client";

import { OneShotInsightPanel } from "@/components/home/OneShotInsightPanel";

const STEPS = [
  {
    n: "01",
    title: "Demonstrate once",
    body: "One human demonstration. Multimodal sensing captures the full contact sequence.",
  },
  {
    n: "02",
    title: "Extract & adapt",
    body: "Task logic extracted and adapted to the local environment — no hand-coded waypoints.",
  },
  {
    n: "03",
    title: "Run forever",
    body: "Skills deploy across fleets 24/7. Recovery loops capture real failure and recovery data.",
  },
] as const;

export function OneShotSection() {
  return (
    <section className="border-y border-white/5 bg-[#141414]">
      <div className="container-x py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-[var(--violet)]">Our solution</div>
          <h2 className="display-lg mt-3">Demonstrate once. Run forever.</h2>
          <p className="mt-4 text-lg leading-relaxed text-paper/65">
            One-Shot execution turns data generation from a manual engineering bottleneck into an
            autonomous factory — synchronized, contact-rich Robo-Centric data, around the clock.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <ol className="flex flex-1 flex-col">
              {STEPS.map((step) => (
                <li key={step.n} className="relative flex gap-4 pb-7">
                  <span
                    className="absolute left-[17px] top-9 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[var(--violet)]/60 to-white/10"
                    aria-hidden
                  />
                  <span className="relative z-10 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-[var(--violet)]/40 bg-[var(--violet)]/10 font-mono text-xs font-medium text-[var(--violet)]">
                    {step.n}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-base font-bold tracking-tight md:text-lg">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-paper/55">{step.body}</p>
                  </div>
                </li>
              ))}

              <li className="relative flex items-center gap-4">
                <span className="relative z-10 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[var(--violet)] text-white shadow-[0_0_20px_rgba(138,69,232,0.45)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span className="text-sm text-paper/40 line-through">
                    Industry: 1+ hr / skill
                  </span>
                  <span className="text-lg font-bold text-[var(--violet)]">Lili-o: &lt;5 min</span>
                </div>
              </li>
            </ol>

            <p className="mt-7 border-t border-white/10 pt-6 text-sm text-paper/50">
              From months of engineering to days.
            </p>
          </div>

          <OneShotInsightPanel />
        </div>
      </div>
    </section>
  );
}
