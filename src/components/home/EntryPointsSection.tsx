"use client";

import Link from "next/link";
import Image from "next/image";
import foundryImg from "@/assets/foundry.jpg";
import researchImg from "@/assets/research.jpg";

const CARDS = [
  {
    href: "/product",
    title: "The Foundry",
    line: "How we run robots 24/7 to generate the data Physical AI needs.",
    cta: "Explore the product",
    img: foundryImg,
  },
  {
    href: "/blog",
    title: "Blog",
    line: "Research updates, team posts, and thinking on household robotics and Physical AI.",
    cta: "Read the blog",
    img: researchImg,
  },
] as const;

export function EntryPointsSection() {
  return (
    <section className="container-x py-28 md:py-40">
      <div className="eyebrow text-[var(--violet)] mb-6">Entry points</div>
      <h2 className="display-lg max-w-3xl mb-16">Two doors into Lili-o.</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {CARDS.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="group relative rounded-2xl bg-[#141414] border border-white/10 hover:border-[var(--violet)] transition flex flex-col overflow-hidden"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <Image
                src={c.img}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-bold tracking-tight">{c.title}</h3>
              <p className="mt-3 text-paper/60 flex-1">{c.line}</p>
              <span className="mt-6 text-[var(--violet)] text-sm font-medium">{c.cta} →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
