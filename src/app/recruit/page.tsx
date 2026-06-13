import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Pyramid } from "@/components/Pyramid";
import { RoleList } from "@/components/careers/RoleList";
import { getOpenRoles } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Lili-o and help build the autonomous Data Foundry for Physical AI.",
  alternates: { canonical: "/recruit" },
  openGraph: {
    title: "Careers — Lili-o",
    description: "We're building the team that will bring household robotics data to scale.",
  },
};

export const revalidate = 300;

export default async function RecruitPage() {
  const { roles } = await getOpenRoles();

  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <SiteHeader variant="dark" />

      <section className="relative overflow-hidden border-b border-white/5">
        <Pyramid className="absolute -top-20 -right-32 w-[520px] opacity-20 pointer-events-none" />
        <div className="container-x pt-24 md:pt-36 pb-28 md:pb-36 relative">
          <div className="eyebrow text-[var(--violet)] mb-8">{"// Careers"}</div>
          <h1 className="display-xl max-w-5xl">
            Help us build the <span className="text-[var(--violet)]">Data Foundry</span> for
            Physical AI.
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-paper/70 leading-relaxed">
            Small team. Household robotics. At home, at scale.
          </p>

          <div className="mt-14">
            {roles.length > 0 ? (
              <>
                <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-paper/40">
                  Open positions
                </h2>
                <RoleList roles={roles} />
              </>
            ) : (
              <div className="rounded-2xl border border-white/10 border-dashed bg-[#141414] p-12 md:p-16 text-center">
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-ink">
                  <span className="text-2xl text-paper/40" aria-hidden>
                    —
                  </span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">No open positions yet</h2>
                <p className="mt-4 max-w-md mx-auto text-paper/60 leading-relaxed">
                  We&apos;re not actively hiring for specific roles at the moment. Check back soon —
                  or reach out if you&apos;d like to introduce yourself for future opportunities.
                </p>
                <Link
                  href="/contact"
                  className="mt-10 inline-flex rounded-xl bg-[var(--violet)] text-white px-7 py-4 font-medium hover:bg-[var(--violet-dark)] transition"
                >
                  Say hello →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
