import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Pyramid } from "@/components/Pyramid";
import foundryImg from "@/assets/foundry.webp";

export const metadata: Metadata = {
  title: "Robo-Centric Data Foundry",
  description:
    "Lili-o's autonomous data foundry runs physical robot fleets 24/7 to mass-produce synchronized, contact-rich Robo-Centric datasets for VLA, VLM, and Diffusion Policy training.",
  alternates: { canonical: "/product/data" },
  openGraph: {
    title: "Robo-Centric Data Foundry — Lili-o",
    description:
      "Industrial-grade autonomous production of the Tier 1 data Physical AI is missing.",
  },
};

const tokens = [
  {
    t: "RGB-D Video",
    d: "Synchronized multi-view capture with aligned depth — 3D spatial structure and object tracking at every frame.",
  },
  {
    t: "Tactile / Force-Torque",
    d: "Contact forces at the end-effector. The signal almost no dataset has, and the one contact-rich policies need.",
  },
  {
    t: "Proprioceptive Trajectory",
    d: "Full closed-loop internal robot states mapped to hardware-agnostic Cartesian spaces. Retargeting included.",
  },
  {
    t: "Labellisation",
    d: "Pre-labeled task IDs, object classes, and success/failure logs. Zero downstream cleaning required.",
  },
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

const outcomes = [
  {
    t: "Unprecedented Scale",
    d: "Move past low-yield teleoperation to a continuous pipeline delivering multimodal episodes at a fractional marginal cost.",
  },
  {
    t: "Out-of-Distribution Resilience",
    d: "Feed your models the vital recovery loops needed to handle real-world chaos without collapsing.",
  },
  {
    t: "Cross-Embodiment Versatility",
    d: "Dataset outputs translate across completely different robot architectures — no embodiment-specific retraining.",
  },
  {
    t: "Immediate Revenue Acceleration",
    d: "Drastically reduce development and PoC deployment timelines, unlocking delayed ROI for Physical AI software and hardware.",
  },
];

export default function DataFoundryPage() {
  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <SiteHeader variant="dark" />
      <h1 className="sr-only">The Robo-Centric Data Foundry</h1>

      <section className="container-x pt-24 md:pt-36 pb-28 md:pb-36 grid md:grid-cols-2 gap-16 items-center border-b border-white/5">
        <div>
          <div className="eyebrow text-[var(--violet)] mb-6">Robo-Centric Data Foundry</div>
          <h2 className="display-lg">Not by hand.</h2>
          <h2 className="display-lg">But automated.</h2>
          <div className="mt-8 space-y-5 text-paper/70 leading-relaxed">
            <p>
              Today, most robotics data is collected through teleoperation — a human operates a
              robot, one task at a time. It&apos;s slow, expensive, and capped at a 1:1
              human-to-robot ratio. Generalizable physical AI stays bottlenecked by data scarcity.
            </p>
            <p>
              Lili-o replaces human-dependent collection with an industrial-grade autonomous
              foundry. Powered by our One-Shot/Zero-Shot execution architecture, robots run 24/7,
              retry on failure, and generate synchronized, contact-rich episodes continuously — with
              minimal operators per run.
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

      <section className="container-x py-24 md:py-32 border-b border-white/5">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-center">
          <div>
            <div className="eyebrow text-[var(--violet)] mb-6">The missing layer</div>
            <h2 className="display-lg">Tier 1 Robo-Centric data.</h2>
            <p className="mt-6 text-lg text-paper/70 leading-relaxed">
              High-fidelity, cross-embodiment data generated directly by autonomous robots. It is
              the only data that scales models — and no one had found a way to produce it
              efficiently. Until now.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block text-sm text-[var(--violet)] hover:underline"
            >
              See how the three data tiers compare →
            </Link>
          </div>
          <div className="rounded-2xl border border-[var(--violet)]/40 bg-[var(--violet)]/5 p-8 md:p-10">
            <div className="text-5xl font-bold text-[var(--violet)]">&lt;4%</div>
            <h3 className="mt-4 text-xl font-bold tracking-tight">
              The &ldquo;Perfect Run&rdquo; flaw
            </h3>
            <p className="mt-3 text-paper/65 leading-relaxed">
              Fewer than 4% of existing high-fidelity datasets contain failure or recovery episodes,
              and tactile data is nearly non-existent. Robots trained only on flawless trajectories
              fail the moment they meet minor real-world variation or unexpected slippage.
            </p>
            <p className="mt-4 text-paper/65 leading-relaxed">
              When a Lili-o robot fails an action, it automatically triggers autonomous recovery
              loops — capturing the rarest data in the industry: real physical failure and recovery.
            </p>
          </div>
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
        <div className="eyebrow text-[var(--violet)] mb-6">The product</div>
        <h2 className="display-lg max-w-3xl">Synchronized multimodal tokens.</h2>
        <p className="mt-8 max-w-3xl text-lg text-paper/70 leading-relaxed">
          Every episode is an enterprise-ready, synchronized data stream built for direct injection
          into cutting-edge training pipelines. Force-torque and proprioceptive signals — absent
          from almost all public datasets — are first-class here.
        </p>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tokens.map((m, i) => (
            <div
              key={m.t}
              className="rounded-xl border border-white/10 p-6 transition hover:border-[var(--violet)]"
            >
              <div className="text-xs font-mono text-[var(--violet)] mb-4">0{i + 1}</div>
              <h3 className="font-bold tracking-tight">{m.t}</h3>
              <p className="mt-2 text-sm text-paper/55 leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="text-xl font-bold tracking-tight">Targeted Pipeline Ingestion</h3>
            <p className="mt-3 text-paper/60 leading-relaxed">
              Access thousands of synchronized, real-world multimodal episodes tailored specifically
              to your token ingestion and model training specifications.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="text-xl font-bold tracking-tight">Turnkey Enterprise Bundling</h3>
            <p className="mt-3 text-paper/60 leading-relaxed">
              Ready-to-train datasets built to package directly into enterprise cloud infrastructure
              (such as AWS) for immediate client deployment.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#141414] border-y border-white/5">
        <div className="container-x py-28 md:py-36">
          <div className="eyebrow text-[var(--violet)] mb-6">Outcomes</div>
          <h2 className="display-lg max-w-3xl">What design &amp; cloud partners get.</h2>
          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2">
            {outcomes.map((o) => (
              <div key={o.t} className="bg-[#141414] p-8 md:p-10">
                <h3 className="text-xl font-bold tracking-tight text-[var(--violet)]">{o.t}</h3>
                <p className="mt-3 text-paper/60 leading-relaxed">{o.d}</p>
              </div>
            ))}
          </div>
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
