import { lazy, Suspense } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Pyramid } from "@/components/Pyramid";
import GradientText from "@/components/GradientText/GradientText";
const Dither = lazy(() => import("@/components/Dither/Dither"));
import foundryImg from "@/assets/foundry.jpg";
import researchImg from "@/assets/research.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lili-o — The autonomous Data Foundry for Physical AI" },
      { name: "description", content: "We run robots 24/7 in home environments to generate the training data Physical AI needs." },
      { property: "og:title", content: "Lili-o — Data Foundry for Physical AI" },
      { property: "og:description", content: "Autonomous data generation for the next era of robotics." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <SiteHeader variant="dark" />

      {/* HERO — image → Dither → content */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/hero-landing.webp" alt="" className="w-full h-full object-cover opacity-80" width={1600} height={1100} />
        </div>
        <div className="absolute inset-0 z-10 opacity-60">
          <Suspense fallback={null}>
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
          </Suspense>
        </div>
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-ink/10 via-ink/40 to-ink pointer-events-none" aria-hidden />
        <Pyramid className="absolute -bottom-20 right-[-6rem] z-20 w-[480px] opacity-30 pointer-events-none" />
        <div className="container-x relative z-30 pt-28 md:pt-40 pb-32 md:pb-48">
          <div
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/25 px-4 py-2.5 backdrop-blur-sm"
            aria-label="Antler VC backed"
          >
            <span className="text-sm font-medium text-paper/85">Invested By Global VC</span>
            <img src="/antler-logo.svg" alt="" className="h-[18px] w-auto shrink-0" width={75} height={18} />
          </div>
          <h1 className="display-xl max-w-4xl">
            World's first <span className="text-[var(--violet)]">24/7 Data Foundry</span> for household.
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-paper/70 leading-relaxed">
            <GradientText
              colors={["#5227FF", "#FF9FFC", "#B497CF"]}
              animationSpeed={8}
              showBorder={false}
            >
              Autonomous data foundry
            </GradientText>{" "}
            running robots in real home environments to generate contact-rich, household-specific training data Physical AI needs.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="rounded-xl bg-[var(--violet)] text-white px-7 py-4 font-medium hover:bg-[var(--violet-dark)] transition">
              Request access
            </a>
            <Link to="/product" className="rounded-xl px-7 py-4 border border-white/20 hover:border-[var(--violet)] transition">
              Explore the foundry →
            </Link>
          </div>
        </div>
      </section>

      {/* HOUSEHOLD USE CASES */}
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
              <span key={t} className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-paper/60">
                {t}
              </span>
            ))}
            <span className="text-sm text-paper/30 ml-2">+ more</span>
          </div>
        </div>
      </section>

      {/* OUR BELIEF */}
      <section className="relative border-t border-white/5">
        <div className="container-x py-28 md:py-40 grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div>
            <div className="eyebrow text-[var(--violet)]">Our belief</div>
            <h2 className="display-lg mt-4">Household </h2>
            <h2 className="display-lg mt-0">is the final frontier.</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-paper/80 max-w-2xl">
            <p>We believe the next revolution in robotics won't happen in warehouses or factories. It will happen at home.</p>
            <p>What made GPT a cultural moment wasn't the technology — it was mass market accessibility. Millions of people using it, every day, in their own lives. Robots will follow the same path.</p>
            <p>We don't know which technology will get us there. World Models? VLAs? Something we haven't invented yet? What we know is this: whatever wins, it will need <span className="text-[var(--violet)]">data</span>. Real-world, contact-rich, home environment data. At scale.</p>
            <p className="text-paper/60 border-l-2 border-[var(--violet)] pl-6">
              To build this foundry, we had to solve a hard problem first: how do you make a robot autonomous on a task without months of engineering? From hours of demonstration to minutes. From months of engineering to days.
            </p>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="container-x py-28 md:py-40">
        <div className="eyebrow text-[var(--violet)] mb-6">Entry points</div>
        <h2 className="display-lg max-w-3xl mb-16">Two doors into Lili-o.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { to: "/product", title: "The Foundry", line: "How we run robots 24/7 to generate the data Physical AI needs.", cta: "Explore the product", img: foundryImg },
            { to: "/blog", title: "Blog", line: "Research updates, team posts, and thinking on household robotics and Physical AI.", cta: "Read the blog", img: researchImg },
          ].map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="group relative rounded-2xl bg-[#141414] border border-white/10 hover:border-[var(--violet)] transition flex flex-col overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.img} alt="" loading="lazy" width={1280} height={960} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
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

      {/* DESIGN PARTNERS */}
      <section className="bg-[#141414] border-y border-white/5">
        <div className="container-x py-24 md:py-32">
          <div className="eyebrow text-[var(--violet)] mb-6">Design partners</div>
          <div className="grid md:grid-cols-[2fr_1fr] gap-16 items-end">
            <div>
              <h2 className="display-lg max-w-3xl">We're looking for the teams building household robots.</h2>
              <p className="mt-8 max-w-xl text-lg text-paper/60 leading-relaxed">
                We're opening the foundry to a small number of design partners — robotics companies and research labs who want early access to household manipulation data and are willing to help shape what we build.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {["Early data access", "Co-designed use cases", "Direct team access", "Priority support"].map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-4 py-2 text-sm text-paper/60">{t}</span>
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
              <Link to="/contact" className="rounded-xl bg-[var(--violet)] text-white px-6 py-4 font-medium text-center hover:bg-[var(--violet-dark)] transition">
                Apply to be a design partner →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <Pyramid className="absolute -right-20 -bottom-32 w-[520px] opacity-25 pointer-events-none" />
        <div className="container-x py-32 md:py-44 relative text-center">
          <h2 className="display-xl max-w-4xl mx-auto">
            The household data <span className="text-[var(--violet)]">your robots</span> have been waiting for.
          </h2>
          <a href="#contact" className="mt-12 inline-flex rounded-xl bg-[var(--violet)] text-white px-10 py-5 font-medium text-lg hover:bg-[var(--violet-dark)] transition">
            Request access
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
