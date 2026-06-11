import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Pyramid } from "@/components/Pyramid";
import foundryImg from "@/assets/foundry.webp";
import researchImg from "@/assets/research.webp";

export const metadata: Metadata = {
  title: "Product — Data Foundry & One-Shot Software",
  description:
    "Two products, one architecture. Lili-o's autonomous Robo-Centric Data Foundry and its deterministic One-Shot imitation learning software.",
  alternates: { canonical: "/product" },
  openGraph: {
    title: "Product — Lili-o",
    description: "The Robo-Centric Data Foundry and the One-Shot execution engine that powers it.",
  },
};

const PRODUCTS = [
  {
    href: "/product/data",
    eyebrow: "For design & cloud partners",
    title: "Robo-Centric Data Foundry",
    line: "An industrial-grade autonomous foundry that runs physical robot fleets 24/7 to mass-produce synchronized, contact-rich datasets for VLA, VLM, and Diffusion Policy training.",
    cta: "Explore the foundry",
    img: foundryImg,
  },
  {
    href: "/product/software",
    eyebrow: "For hardware & integrators",
    title: "One-Shot Imitation Learning",
    line: "A deterministic, one-shot execution engine. Record a single demonstration, then deploy a repeatable skill that adapts to pose, clutter, and new objects — no retraining, no cloud.",
    cta: "Explore the software",
    img: researchImg,
  },
] as const;

export default function ProductPage() {
  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <SiteHeader variant="dark" />

      <section className="relative overflow-hidden border-b border-white/5">
        <Pyramid className="absolute -right-24 -top-24 w-[420px] opacity-20 pointer-events-none" />
        <div className="container-x relative pt-24 md:pt-36 pb-16 md:pb-24">
          <div className="eyebrow text-[var(--violet)] mb-6">Product</div>
          <h1 className="display-xl max-w-4xl">
            <span className="block">Two products.</span>
            <span className="block text-[var(--violet)]">One architecture.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-paper/70 leading-relaxed">
            Our One-Shot execution engine is the software that makes autonomous data generation
            possible. The Data Foundry is what it produces at industrial scale. Choose where you
            want to start.
          </p>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-6">
          {PRODUCTS.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition hover:border-[var(--violet)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.img}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent"
                  aria-hidden
                />
              </div>
              <div className="flex flex-1 flex-col p-8 md:p-10">
                <div className="eyebrow text-[var(--violet)] mb-4">{p.eyebrow}</div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{p.title}</h2>
                <p className="mt-4 flex-1 text-paper/60 leading-relaxed">{p.line}</p>
                <span className="mt-8 inline-flex items-center text-sm font-medium text-[var(--violet)]">
                  {p.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
