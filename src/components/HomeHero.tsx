"use client";

import Link from "next/link";
import { Pyramid } from "@/components/Pyramid";
import Dither from "@/components/Dither/Dither";
import GradientText from "@/components/GradientText/GradientText";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-landing.webp"
          alt="Lili-o autonomous data foundry running robots in real home environments"
          className="w-full h-full object-cover opacity-80"
          width={1600}
          height={1100}
        />
      </div>
      <div className="absolute inset-0 z-10 opacity-60">
        <Dither
          waveColor={[0.32, 0.15, 1]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.2}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={1}
          waveSpeed={0.04}
        />
      </div>
      <div
        className="absolute inset-0 z-20 bg-gradient-to-b from-ink/10 via-ink/40 to-ink pointer-events-none"
        aria-hidden
      />
      <Pyramid className="absolute -bottom-20 right-[-6rem] z-20 w-[480px] opacity-30 pointer-events-none" />
      <div className="container-x relative z-30 pt-28 md:pt-40 pb-32 md:pb-48">
        <div
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/25 px-4 py-2.5 backdrop-blur-sm"
          aria-label="Antler VC backed"
        >
          <span className="text-sm font-medium text-paper/85">Invested By Global VC</span>
          <img
            src="/antler-logo.svg"
            alt=""
            className="h-[18px] w-auto shrink-0"
            width={75}
            height={18}
          />
        </div>
        <h1 className="display-xl max-w-4xl">
          <span className="block">Fully Autonomous</span>
          <span className="block text-[var(--violet)]">Robo-Centric</span>
          <span className="block">Data Foundry</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-paper/70 leading-relaxed">
        World's first {" "}
          <GradientText
            colors={["#5227FF", "#FF9FFC", "#B497CF"]}
            animationSpeed={8}
            showBorder={false}
          >
            autonomous data foundry
          </GradientText>{" "}
          running robots in real home environments. Generating contact-rich, household-specific
          training data for Physical AI.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="rounded-xl bg-[var(--violet)] text-white px-7 py-4 font-medium hover:bg-[var(--violet-dark)] transition"
          >
            Request access
          </a>
          <Link
            href="/product"
            className="rounded-xl px-7 py-4 border border-white/20 hover:border-[var(--violet)] transition"
          >
            Explore the foundry →
          </Link>
        </div>
      </div>
    </section>
  );
}
