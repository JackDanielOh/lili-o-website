import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { RoleDescription } from "@/components/careers/RoleDescription";
import { getRoleBlocks, getRoleBySlug } from "@/lib/careers";
import { SITE_URL } from "@/lib/site";
import { ApplicationForm } from "./ApplicationForm";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { role } = await getRoleBySlug(slug);
  if (!role) return { title: "Careers" };

  return {
    title: `${role.title} — Careers`,
    description: role.summary,
    alternates: { canonical: `/recruit/${slug}` },
    openGraph: {
      title: `${role.title} — Lili-o Careers`,
      description: role.summary,
    },
  };
}

export default async function RolePage({ params }: Props) {
  const { slug } = await params;
  const { role } = await getRoleBySlug(slug);

  if (!role || role.status !== "Open") notFound();

  const blocks = await getRoleBlocks(role.id);
  const roleUrl = `${SITE_URL}/recruit/${slug}`;

  const facts = [
    { label: "Location", value: role.location },
    { label: "Type", value: role.type },
    { label: "Experience", value: role.experience },
    { label: "Duration", value: role.duration },
    { label: "Compensation", value: role.compensation },
  ].filter((f) => f.value);

  const domains = role.domain
    .split(",")
    .map((d) => d.trim())
    .filter(Boolean);

  const jobJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.summary,
    ...(role.postedAt && { datePosted: role.postedAt }),
    employmentType: role.type,
    hiringOrganization: {
      "@type": "Organization",
      name: "Lili-o",
      sameAs: SITE_URL,
    },
    ...(role.location && {
      jobLocation: {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressLocality: role.location },
      },
    }),
    url: roleUrl,
  };

  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <JsonLd data={jobJsonLd} />
      <SiteHeader variant="dark" />

      <div className="container-x pt-28 pb-24 md:pt-36 md:pb-32 max-w-3xl">
        <Link
          href="/recruit"
          className="mb-10 inline-flex items-center gap-2 text-sm text-paper/40 transition hover:text-paper"
        >
          ← All roles
        </Link>

        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
          {role.team && (
            <span className="rounded-full border border-[var(--violet)]/40 px-3 py-1 text-[var(--violet)]">
              {role.team}
            </span>
          )}
          {role.type && (
            <span className="rounded-full border border-white/10 px-3 py-1 text-paper/50">
              {role.type}
            </span>
          )}
          {role.location && <span className="text-paper/40">{role.location}</span>}
        </div>

        <h1 className="display-lg leading-tight">{role.title}</h1>
        {role.summary && (
          <p className="mt-4 text-lg text-paper/60 leading-relaxed">{role.summary}</p>
        )}

        <div className="mt-8">
          <a
            href="#apply"
            className="inline-flex rounded-xl bg-[var(--violet)] px-7 py-4 font-medium text-white transition hover:bg-[var(--violet-dark)]"
          >
            Apply for this role →
          </a>
        </div>

        {facts.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {facts.map(({ label, value }) => (
              <div key={label} className="bg-[#141414] px-5 py-4">
                <dt className="text-xs uppercase tracking-widest text-paper/40">{label}</dt>
                <dd className="mt-1 text-sm font-medium text-paper">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {domains.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-paper/40">Focus</span>
            {domains.map((d) => (
              <span
                key={d}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-paper/60"
              >
                {d}
              </span>
            ))}
          </div>
        )}

        <RoleDescription blocks={blocks} />

        <ApplicationForm role={role.title} roleId={role.id} />
      </div>

      <SiteFooter />
    </div>
  );
}
