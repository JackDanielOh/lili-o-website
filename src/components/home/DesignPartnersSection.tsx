"use client";

import Link from "next/link";

const BENEFITS = [
  "Early data access",
  "Co-designed use cases",
  "Direct team access",
  "Priority support",
] as const;

export function DesignPartnersSection() {
  return (
    <section className="bg-[#141414] border-y border-white/5">
      <div className="container-x py-24 md:py-32">
        <div className="eyebrow text-[var(--violet)] mb-6">Design partners</div>
        <div className="grid md:grid-cols-[2fr_1fr] gap-16 items-end">
          <div>
            <h2 className="display-lg max-w-3xl">
              We&apos;re looking for the teams building household robots.
            </h2>
            <p className="mt-8 max-w-xl text-lg text-paper/60 leading-relaxed">
              We&apos;re opening the foundry to a small number of design partners — robotics
              companies and research labs who want early access to household manipulation data and
              are willing to help shape what we build.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {BENEFITS.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-paper/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="border border-white/10 rounded-xl p-6">
              <div className="text-2xl font-bold text-[var(--violet)]">5</div>
              <div className="mt-1 text-sm text-paper/50">design partner slots open</div>
            </div>
            <div className="border border-white/10 rounded-xl p-6">
              <div className="text-2xl font-bold text-[var(--violet)]">Q3 2025</div>
              <div className="mt-1 text-sm text-paper/50">first data delivery target</div>
            </div>
            <Link
              href="/contact"
              className="rounded-xl bg-[var(--violet)] text-white px-6 py-4 font-medium text-center hover:bg-[var(--violet-dark)] transition"
            >
              Apply to be a design partner →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
