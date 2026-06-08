import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Pyramid } from "@/components/Pyramid";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Lili-o and help build the autonomous Data Foundry for Physical AI.",
  openGraph: {
    title: "Careers — Lili-o",
    description: "We're building the team that will bring household robotics data to scale.",
  },
};

export default function RecruitPage() {
  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <SiteHeader variant="dark" />

      <section className="relative overflow-hidden border-b border-white/5">
        <Pyramid className="absolute -top-20 -right-32 w-[520px] opacity-20 pointer-events-none" />
        <div className="container-x pt-24 md:pt-36 pb-24 md:pb-32 relative">
          <div className="eyebrow text-[var(--violet)] mb-8">{"// Careers"}</div>
          <h1 className="display-xl max-w-5xl">
            Help us build the <span className="text-[var(--violet)]">Data Foundry</span> for
            Physical AI.
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-paper/70 leading-relaxed">
            We&apos;re assembling a small team of engineers, researchers, and operators who want to
            solve one of the hardest problems in robotics — at home, at scale.
          </p>
        </div>
      </section>

      <section className="bg-[#141414] border-y border-white/5">
        <div className="container-x py-28 md:py-36">
          <div className="eyebrow text-[var(--violet)] mb-6">Open roles</div>
          <h2 className="display-lg max-w-3xl">Current openings.</h2>
          <p className="mt-8 max-w-2xl text-lg text-paper/70 leading-relaxed">
            We don&apos;t have any open positions right now, but we&apos;re always interested in
            meeting exceptional people.
          </p>

          <div className="mt-14 rounded-2xl border border-white/10 border-dashed p-12 md:p-16 text-center">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-ink">
              <span className="text-2xl text-paper/40" aria-hidden>
                —
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">No open positions yet</h3>
            <p className="mt-4 max-w-md mx-auto text-paper/60 leading-relaxed">
              We&apos;re not actively hiring for specific roles at the moment. Check back soon — or
              reach out if you&apos;d like to introduce yourself for future opportunities.
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
                href="/contact"
                className="rounded-xl px-7 py-4 border border-white/20 hover:border-[var(--violet)] transition"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5">
        <Pyramid className="absolute -left-32 -bottom-32 w-[520px] opacity-25 pointer-events-none" />
        <div className="container-x py-32 md:py-40 relative text-center">
          <h2 className="display-xl max-w-4xl mx-auto">
            Interested in what we&apos;re <span className="text-[var(--violet)]">building</span>?
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-lg text-paper/60">
            Drop us a line — we&apos;ll keep your details on file for when the right role opens up.
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
