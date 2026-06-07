"use client";

import { Pyramid } from "@/components/Pyramid";

export function HomeCtaSection() {
  return (
    <section className="relative overflow-hidden">
      <Pyramid className="absolute -right-20 -bottom-32 w-[520px] opacity-25 pointer-events-none" />
      <div className="container-x py-32 md:py-44 relative text-center">
        <h2 className="display-xl max-w-4xl mx-auto">
          The household data <span className="text-[var(--violet)]">your robots</span> have been
          waiting for.
        </h2>
        <a
          href="#contact"
          className="mt-12 inline-flex rounded-xl bg-[var(--violet)] text-white px-10 py-5 font-medium text-lg hover:bg-[var(--violet-dark)] transition"
        >
          Request access
        </a>
      </div>
    </section>
  );
}
