import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Pyramid } from "@/components/Pyramid";
import { HomeHero } from "@/components/HomeHero";
import foundryImg from "@/assets/foundry.jpg";
import researchImg from "@/assets/research.jpg";

export const metadata: Metadata = {
  title: "Lili-o — The autonomous Data Foundry for Physical AI",
  description:
    "We run robots 24/7 in home environments to generate the training data Physical AI needs.",
  openGraph: {
    title: "Lili-o — Data Foundry for Physical AI",
    description: "Autonomous data generation for the next era of robotics.",
  },
};

export default function Home() {
  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <SiteHeader variant="dark" />

      <HomeHero />

      <section className="border-t border-white/5 bg-[#141414]">
        <div className="container-x py-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-paper/30 mr-4">Household tasks</span>
            {[
              "Dish washing",
              "Laundry folding",
              "Surface cleaning",
              "Meal prep",
              "Object sorting",
              "Bin handling",
              "Table setting",
              "Drawer organisation",
              "Vacuuming",
              "Appliance use",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-paper/60"
              >
                {t}
              </span>
            ))}
            <span className="text-sm text-paper/30 ml-2">+ more</span>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5">
        <div className="container-x py-28 md:py-40 grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div>
            <div className="eyebrow text-[var(--violet)]">Our belief</div>
            <h2 className="display-lg mt-4">Household </h2>
            <h2 className="display-lg mt-0">is the final frontier.</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-paper/80 max-w-2xl">
            <p>
              We believe the next revolution in robotics won&apos;t happen in warehouses or
              factories. It will happen at home.
            </p>
            <p>
              What made GPT a cultural moment wasn&apos;t the technology — it was mass market
              accessibility. Millions of people using it, every day, in their own lives. Robots will
              follow the same path.
            </p>
            <p>
              We don&apos;t know which technology will get us there. World Models? VLAs? Something
              we haven&apos;t invented yet? What we know is this: whatever wins, it will need{" "}
              <span className="text-[var(--violet)]">data</span>. Real-world, contact-rich, home
              environment data. At scale.
            </p>
            <p className="text-paper/60 border-l-2 border-[var(--violet)] pl-6">
              To build this foundry, we had to solve a hard problem first: how do you make a robot
              autonomous on a task without months of engineering? From hours of demonstration to
              minutes. From months of engineering to days.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-28 md:py-40">
        <div className="eyebrow text-[var(--violet)] mb-6">Entry points</div>
        <h2 className="display-lg max-w-3xl mb-16">Two doors into Lili-o.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
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
          ].map((c) => (
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
                {[
                  "Early data access",
                  "Co-designed use cases",
                  "Direct team access",
                  "Priority support",
                ].map((t) => (
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

      <SiteFooter />
    </div>
  );
}
