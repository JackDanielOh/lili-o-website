import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Pyramid } from "@/components/Pyramid";
import foundryImg from "@/assets/foundry.jpg";

export const metadata: Metadata = {
  title: "The Foundry",
  description:
    "Robots running use cases autonomously. Real home environments. Zero human operators. 24/7.",
  openGraph: {
    title: "The Foundry — Lili-o",
    description: "How Lili-o generates the data Physical AI needs.",
  },
};

const modalities = [
  { t: "RGB Video", d: "Multi-view synchronized capture" },
  { t: "Depth Maps", d: "Aligned to RGB at every frame" },
  { t: "Tactile / Force-Torque", d: "The signal almost no dataset has" },
  { t: "Joint Encoders", d: "Full proprioceptive state" },
  { t: "Episode Metadata", d: "Auto-labeled, structured, ready-to-train" },
];

const tableRows: { label: string; values: (string | { v: string; hi?: boolean })[] }[] = [
  { label: "Rich Metadata", values: ["Low", "Medium", "High", { v: "High", hi: true }] },
  { label: "Environment Diversity", values: ["High", "High", "Low", { v: "High", hi: true }] },
  { label: "Price", values: ["Medium", "Low", "High", { v: "High", hi: true }] },
  { label: "Cross-embodiment", values: ["No", "Yes", "No", { v: "Yes", hi: true }] },
  { label: "Scalable", values: ["High", "Medium", "Low", { v: "High", hi: true }] },
  {
    label: "Companies",
    values: [
      "Lightwheel · NVIDIA",
      "Scale · Senseirobotic",
      "Tutor · Figure · Agibot",
      { v: "Lili-o", hi: true },
    ],
  },
];

export default function ProductPage() {
  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <SiteHeader variant="dark" />

      <section className="container-x pt-24 md:pt-36 pb-28 md:pb-36 grid md:grid-cols-2 gap-16 items-center border-b border-white/5">
        <div>
          <div className="eyebrow text-[var(--violet)] mb-6">Approach</div>
          <h2 className="display-lg">Not by hand.</h2>
          <h2 className="display-lg">But automated.</h2>
          <div className="mt-8 space-y-5 text-paper/70 leading-relaxed">
            <p>
              Today, most robotics data is collected through teleoperation — a human operates a
              robot, one task at a time. It&apos;s slow, expensive, and impossible to scale. And
              none of it happens in kitchens.
            </p>
            <p>
              The Lili-o foundry runs household tasks autonomously across 50+ purpose-built home
              environments — kitchens, living rooms, bathrooms, laundry rooms — robots operate 24/7,
              retry on failure, and generate episodes continuously. No human operator. No wage
              floor. No ceiling on scale.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Kitchen", "Living room", "Bathroom", "Laundry room", "Bedroom"].map((room) => (
              <span
                key={room}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-paper/50"
              >
                {room}
              </span>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "24/7", l: "operation" },
              { k: "50+", l: "home environments" },
              { k: "0", l: "operators" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-white/10 p-5">
                <div className="text-2xl font-bold text-[var(--violet)]">{s.k}</div>
                <div className="text-xs uppercase tracking-wider text-paper/50 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <Image
            src={foundryImg}
            alt="Lili-o foundry environments"
            className="w-full h-full object-cover rounded-2xl border border-white/10"
          />
        </div>
      </section>

      <section className="bg-[#141414] border-y border-white/5">
        <div className="container-x py-28 md:py-36">
          <div className="eyebrow text-[var(--violet)] mb-6">Comparison</div>
          <h2 className="display-lg max-w-3xl">
            The market settled for trade-offs. We didn&apos;t.
          </h2>

          <div className="mt-14 overflow-x-auto rounded-2xl border border-[var(--violet)]/60">
            <table className="w-full text-sm md:text-base border-collapse min-w-[720px]">
              <thead>
                <tr className="text-left">
                  <th className="py-5 px-6 text-paper/50 font-normal eyebrow"></th>
                  {["Simulation", "Human-Centric", "Téléopération", "Lili-o"].map((h, i) => (
                    <th
                      key={h}
                      className={`py-5 px-6 text-center font-bold tracking-tight ${i === 3 ? "text-[var(--violet)]" : "text-paper"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((r) => (
                  <tr key={r.label} className="border-t border-white/10">
                    <td className="py-5 px-6 text-paper/60">{r.label}</td>
                    {r.values.map((v, i) => {
                      const val = typeof v === "string" ? v : v.v;
                      const hi = typeof v === "object" && v.hi;
                      return (
                        <td
                          key={i}
                          className={`py-5 px-6 text-center ${hi ? "text-[var(--violet)] font-medium bg-[var(--violet)]/5" : "text-paper/80"}`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-xs text-paper/40">*EU AI Act compliant</p>
        </div>
      </section>

      <section className="container-x py-28 md:py-36">
        <div className="eyebrow text-[var(--violet)] mb-6">How it works</div>
        <h2 className="display-lg max-w-4xl">
          One use case. Deployed everywhere. Running forever.
        </h2>
        <p className="mt-8 max-w-3xl text-lg text-paper/70 leading-relaxed">
          Each use case is a self-contained, hardware-agnostic program that runs on any compatible
          robot without modification. Build it once — deploy it across the entire fleet.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-white/10">
          {[
            {
              n: "01",
              t: "Hardware agnostic",
              d: "One use case, any robot. Unitree, Rainbow, Agibot — no reprogramming.",
            },
            {
              n: "02",
              t: "One-Shot learning",
              d: "5-minute demonstration → autonomous skill. Industry standard: 1 hour+.",
            },
            {
              n: "03",
              t: "Perpetual output",
              d: "One build. Infinite episodes. 24/7 generation across the entire fleet.",
            },
          ].map((s) => (
            <div key={s.n} className="bg-ink p-10">
              <div className="text-[var(--violet)] text-sm font-mono mb-6">{s.n}</div>
              <h3 className="text-2xl font-bold tracking-tight">{s.t}</h3>
              <p className="mt-3 text-paper/60">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#141414] border-y border-white/5">
        <div className="container-x py-28 md:py-36">
          <div className="eyebrow text-[var(--violet)] mb-6">The data</div>
          <h2 className="display-lg max-w-3xl">The modalities that actually matter.</h2>
          <p className="mt-8 max-w-3xl text-lg text-paper/70 leading-relaxed">
            Force-torque and proprioceptive signals are absent from almost all existing public
            datasets. This is the gap that separates models that look like they&apos;re manipulating
            from models that can actually feel it.
          </p>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-3">
            {modalities.map((m, i) => (
              <div
                key={m.t}
                className="rounded-xl border border-white/10 p-6 hover:border-[var(--violet)] transition group"
              >
                <div className="text-xs font-mono text-[var(--violet)] mb-4">0{i + 1}</div>
                <h3 className="font-bold tracking-tight">{m.t}</h3>
                <p className="mt-2 text-xs text-paper/50">{m.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-paper/60 max-w-2xl">
            <span className="text-paper">5 modalities. Synchronized. Auto-labeled.</span>{" "}
            Cross-embodiment compatible. EU AI Act compliant.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <video
          src="/0521.mov"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/80" />
        <div className="relative container-x py-28 md:py-36">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 mb-16">
            <div>
              <div className="eyebrow text-[var(--violet)] mb-6">Second channel</div>
              <h2 className="display-lg">Real homes. Real people. Real tasks.</h2>
            </div>
            <div>
              <p className="text-lg text-paper/70 leading-relaxed">
                Our second collection channel sends instrumented participants into their own homes —
                kitchens, bathrooms, laundry rooms — wearing RGB-D cameras and haptic gloves,
                performing everyday household tasks as they naturally would.
              </p>
              <p className="mt-4 text-paper/60">
                This captures the environmental chaos, behavioral variance, and physical interaction
                that a controlled environment can never replicate. The mess on the counter. The wet
                dish. The awkward cabinet angle.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "RGB-D",
                  "Tactile / haptic",
                  "Diverse home layouts",
                  "Natural behavior",
                  "EU AI Act ✓",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--violet)]/40 text-[var(--violet)] px-4 py-2 text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {[
              {
                room: "Kitchen",
                tasks: ["Dish washing", "Meal prep", "Appliance use", "Counter cleaning"],
              },
              {
                room: "Living room",
                tasks: ["Object sorting", "Table setting", "Tidying", "Vacuuming"],
              },
              {
                room: "Laundry room",
                tasks: ["Folding clothes", "Loading washer", "Ironing", "Sorting laundry"],
              },
              {
                room: "Bathroom",
                tasks: ["Surface wiping", "Bin handling", "Towel folding", "Cleaning fixtures"],
              },
            ].map((c) => (
              <div key={c.room} className="bg-ink p-8">
                <div className="eyebrow text-[var(--violet)] mb-4">{c.room}</div>
                <ul className="space-y-2">
                  {c.tasks.map((t) => (
                    <li key={t} className="text-sm text-paper/60 flex items-center gap-2">
                      <span className="inline-block h-1 w-1 rotate-45 bg-[var(--violet)]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5">
        <Pyramid className="absolute -left-32 -bottom-32 w-[520px] opacity-25 pointer-events-none" />
        <div className="container-x py-32 md:py-40 relative text-center">
          <h2 className="display-xl max-w-4xl mx-auto">
            Ready to train on the data <span className="text-[var(--violet)]">Physical AI</span> has
            been missing?
          </h2>
          <Link
            href="/contact"
            className="mt-12 inline-flex rounded-xl bg-[var(--violet)] text-white px-10 py-5 font-medium text-lg hover:bg-[var(--violet-dark)] transition"
          >
            Request access
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
