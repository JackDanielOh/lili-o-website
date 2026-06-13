"use client";

import { DataTierPyramid } from "@/components/home/DataTierPyramid";

const TIER_COPY = [
  {
    tier: "Tier 1",
    title: "Robo-centric",
    body: "High-fidelity, cross-embodiment data generated directly by autonomous robots. The layer no one was able to scale. Until now.",
    highlight: true,
  },
  {
    tier: "Tier 2",
    title: "Interface-centric",
    body: "High-fidelity teleoperation and haptic rigs. Fundamentally unscalable — capped at a 1:1 human-to-robot operational hour ratio.",
    highlight: false,
  },
  {
    tier: "Tier 3",
    title: "Human-centric & Ego-centric",
    body: "Cheap and abundant — YouTube, wearables, ego-video. Lacks precision, modality, and contact fidelity. Good for VLMs, not manipulation.",
    highlight: false,
  },
] as const;

export function DataBottleneckSection() {
  return (
    <section className="bg-[#141414] border-y border-white/5">
      <div className="container-x py-28 md:py-40">
        <div className="eyebrow text-[var(--violet)]">The bottleneck</div>
        <h2 className="display-lg mt-4 max-w-3xl">Physical AI is stuck in the lab.</h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">
          The &ldquo;perfect run&rdquo; flaw: robots are trained only on flawless trajectories, so
          they collapse on minor real-world variation. Tier 1 Robo-Centric data — with real failure
          and recovery — is the only path to models that survive outside the lab.
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <div className="space-y-8">
            {TIER_COPY.map((item) => (
              <div
                key={item.tier}
                className={
                  item.highlight
                    ? "border-l-2 border-[var(--violet)] pl-6"
                    : "border-l-2 border-white/10 pl-6"
                }
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[var(--violet)]">
                    {item.tier}
                  </div>
                  {item.highlight && (
                    <span className="rounded-full bg-[var(--violet)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                      Missing layer
                    </span>
                  )}
                </div>
                <h3 className="mt-1.5 text-xl font-bold tracking-tight md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[17px] leading-relaxed text-paper/60 md:text-lg">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <DataTierPyramid />
        </div>
      </div>
    </section>
  );
}
