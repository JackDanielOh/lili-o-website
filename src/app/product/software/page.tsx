import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Pyramid } from "@/components/Pyramid";
import researchImg from "@/assets/research.webp";

export const metadata: Metadata = {
  title: "One-Shot Imitation Learning Software",
  description:
    "A deterministic, one-shot execution engine. Record a single demonstration and deploy a repeatable skill that adapts to pose, clutter, and new objects — no retraining, no cloud.",
  alternates: { canonical: "/product/software" },
  openGraph: {
    title: "One-Shot Imitation Learning Software — Lili-o",
    description: "One demonstration per task, not 300 to 8,000. Runs on local embedded hardware.",
  },
};

const audiences = [
  {
    tag: "For Hardware Manufacturers",
    headline: "Accelerate Sales.",
    body: "Stop wasting weeks programming custom proof-of-concept demos. Record one demonstration on-site via kinesthetic teaching or VR, and Lili-o instantly converts it into a repeatable live demo that adapts to real-world clutter, pose shifts, and new object geometry — proving your hardware's value to prospects on the spot.",
  },
  {
    tag: "For Software Integrators",
    headline: "Fail-Safe Redundancy.",
    body: "Protect your AI brain from edge-case failures. When end-to-end foundation models or RL policies collapse on out-of-distribution shifts, Lili-o acts as a zero-shot, deterministic fallback — mapping trajectories to any shared Cartesian task space and running entirely on local embedded hardware with zero cloud dependencies.",
  },
];

const pipeline = [
  {
    n: "01",
    t: "Demonstrate once",
    d: "Via VR/AR teleoperation or kinesthetic teaching, we capture two things at once: the full 6-DOF gripper trajectory in the robot base frame, and a coloured 3D point cloud of the scene. Each atomic interaction — grasp, place — is its own demonstration unit.",
  },
  {
    n: "02",
    t: "Register at execution",
    d: "We segment the current scene and align the live point cloud against the reference using geometric registration, then project the updated object pose into the robot base frame.",
  },
  {
    n: "03",
    t: "Recompute & run",
    d: "The full trajectory is recomputed for the new pose and executed. No retraining. No fine-tuning. No additional data collection — a task learned once, executed repeatedly across varying poses, positions, and lighting.",
  },
];

const outcomes = [
  { k: "1", l: "demonstration per task — not 300 to 8,000" },
  { k: "0", l: "cloud inference dependency" },
  { k: "10×", l: "lower data & deployment cost at equal coverage" },
];

const outcomeList = [
  "Semantic transfer to new object instances without retraining — covering objects that share functional geometry with demonstrated ones.",
  "Runs on an embedded GPU for perception and a standard CPU for trajectory execution. No GPU server, no cloud.",
  "Deploys across robot embodiments without embodiment-specific retraining, given a shared Cartesian task space.",
];

export default function SoftwarePage() {
  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <SiteHeader variant="dark" />
      <h1 className="sr-only">One-Shot Imitation Learning Software</h1>

      <section className="container-x pt-24 md:pt-36 pb-28 md:pb-36 grid md:grid-cols-2 gap-16 items-center border-b border-white/5">
        <div>
          <div className="eyebrow text-[var(--violet)] mb-6">One-Shot Imitation Learning</div>
          <h2 className="display-lg">A deterministic</h2>
          <h2 className="display-lg">
            <span className="text-[var(--violet)]">one-shot</span> engine.
          </h2>
          <div className="mt-8 space-y-5 text-paper/70 leading-relaxed">
            <p>
              For hardware manufacturers and software integrators, the core bottleneck to scaling is
              the time, cost, and fragility of robot deployment. Lili-o replaces massive, data-heavy
              AI pipelines with a deterministic, one-shot execution engine.
            </p>
            <p>
              Record a single demonstration. We capture the trajectory and the scene geometry, then
              re-derive execution for whatever the environment throws at it — adapting to pose
              variation and semantically similar objects without ever retraining.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Kinesthetic / VR capture", "Local embedded", "Zero cloud", "Cross-embodiment"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-paper/50"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>
        <div className="relative">
          <Image
            src={researchImg}
            alt="Lili-o one-shot execution"
            className="w-full h-full object-cover rounded-2xl border border-white/10"
          />
        </div>
      </section>

      <section className="container-x py-24 md:py-32 border-b border-white/5">
        <div className="eyebrow text-[var(--violet)] mb-6">Who it&apos;s for</div>
        <h2 className="display-lg max-w-3xl">Two usage for teams.</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {audiences.map((a) => (
            <div
              key={a.tag}
              className="rounded-2xl border border-white/10 bg-[#141414] p-8 md:p-10"
            >
              <div className="eyebrow text-[var(--violet)] mb-4">{a.tag}</div>
              <h3 className="text-2xl font-bold tracking-tight">{a.headline}</h3>
              <p className="mt-4 text-paper/60 leading-relaxed">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#141414] border-y border-white/5">
        <div className="container-x py-28 md:py-36">
          <div className="eyebrow text-[var(--violet)] mb-6">The problem</div>
          <h2 className="display-lg max-w-3xl">It&apos;s a data treadmill.</h2>
          <p className="mt-8 max-w-3xl text-lg text-paper/70 leading-relaxed">
            Imitation learning and VLAs deliver impressive results in controlled settings — but they
            require hundreds to thousands of demonstrations per task, per robot, per environment, and
            collapse the moment objects or scenes drift out of distribution. RL offers a
            complementary path, but sim-to-real quality is tightly coupled to physics identification,
            and learned policies stay brittle to distribution shift. Every environment change resets
            the treadmill.
          </p>
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 p-8">
              <div className="text-4xl font-bold text-[var(--violet)]">300 – 8,000</div>
              <p className="mt-3 text-paper/60">
                demonstrations per task configuration to bring a Diffusion Policy to production
                quality.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 p-8">
              <div className="text-4xl font-bold text-[var(--violet)]">270,000 hrs</div>
              <p className="mt-3 text-paper/60">
                of demonstration data required to pretrain a frontier-scale VLA (GEN-0).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-28 md:py-36">
        <div className="eyebrow text-[var(--violet)] mb-6">How it works</div>
        <h2 className="display-lg max-w-4xl">Learned once. Executed repeatedly.</h2>
        <p className="mt-8 max-w-3xl text-lg text-paper/70 leading-relaxed">
          For repetitive operations in structurally stable environments, you don&apos;t need a
          policy that generalises across everything. You need one that executes reliably, adapts to
          pose variation, and transfers to semantically similar objects without retraining.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-white/10">
          {pipeline.map((s) => (
            <div key={s.n} className="bg-ink p-10">
              <div className="text-[var(--violet)] text-sm font-mono mb-6">{s.n}</div>
              <h3 className="text-2xl font-bold tracking-tight">{s.t}</h3>
              <p className="mt-3 text-paper/60 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>

        <Link
          href="/blog/1"
          className="mt-10 inline-block text-sm text-[var(--violet)] hover:underline"
        >
          Read the deep dive on the One-Shot method →
        </Link>
      </section>

      <section className="bg-[#141414] border-y border-white/5">
        <div className="container-x py-28 md:py-36">
          <div className="eyebrow text-[var(--violet)] mb-6">Outcomes</div>
          <h2 className="display-lg max-w-3xl">What it means operationally.</h2>

          <div className="mt-14 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-3">
            {outcomes.map((o) => (
              <div key={o.l} className="bg-[#141414] p-8">
                <div className="text-4xl font-bold text-[var(--violet)]">{o.k}</div>
                <div className="mt-2 text-sm text-paper/55">{o.l}</div>
              </div>
            ))}
          </div>

          <ul className="mt-10 max-w-3xl space-y-4">
            {outcomeList.map((item) => (
              <li key={item} className="flex gap-3 text-paper/65 leading-relaxed">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--violet)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-3xl border-l-2 border-[var(--violet)] pl-6 text-paper/60 leading-relaxed">
            The system is deliberately scoped: it performs at its best on repetitive tasks where the
            structural layout is stable but object pose, robot configuration, and object instances
            vary — a large fraction of commercially relevant manipulation deployments today.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5">
        <Pyramid className="absolute -left-32 -bottom-32 w-[520px] opacity-25 pointer-events-none" />
        <div className="container-x py-32 md:py-40 relative text-center">
          <h2 className="display-xl max-w-4xl mx-auto">
            One demonstration. <span className="text-[var(--violet)]">Deployed reliably.</span>
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
