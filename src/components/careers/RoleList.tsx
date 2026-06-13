"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Role } from "@/lib/careers";

type Props = { roles: Role[] };

export function RoleList({ roles }: Props) {
  const [activeTeam, setActiveTeam] = useState<string | null>(null);

  const teamCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const role of roles) {
      if (!role.team) continue;
      counts.set(role.team, (counts.get(role.team) ?? 0) + 1);
    }
    return [...counts.entries()].map(([team, count]) => ({ team, count }));
  }, [roles]);

  const filtered = useMemo(
    () => (activeTeam ? roles.filter((r) => r.team === activeTeam) : roles),
    [roles, activeTeam],
  );

  return (
    <>
      {teamCounts.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTeam(null)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
              activeTeam === null
                ? "border-[var(--violet)] bg-[var(--violet)]/15 text-[var(--violet)]"
                : "border-white/10 text-paper/50 hover:border-white/20 hover:text-paper/70"
            }`}
          >
            All <span className="ml-1 text-paper/40">{roles.length}</span>
          </button>
          {teamCounts.map(({ team, count }) => (
            <button
              key={team}
              type="button"
              onClick={() => setActiveTeam(team)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                activeTeam === team
                  ? "border-[var(--violet)] bg-[var(--violet)]/15 text-[var(--violet)]"
                  : "border-white/10 text-paper/50 hover:border-white/20 hover:text-paper/70"
              }`}
            >
              {team} <span className="ml-1 text-paper/40">{count}</span>
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {filtered.map((role) => (
          <Link
            key={role.id}
            href={`/recruit/${role.slug}`}
            className="group rounded-2xl border border-white/10 bg-[#141414] p-6 transition hover:border-[var(--violet)]/50 md:p-8"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
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
            <h3 className="mt-4 text-xl font-bold tracking-tight transition group-hover:text-[var(--violet)] md:text-2xl">
              {role.title}
            </h3>
            {role.summary && (
              <p className="mt-3 max-w-2xl leading-relaxed text-paper/60">{role.summary}</p>
            )}
            <span className="mt-5 inline-flex items-center gap-1 text-sm text-[var(--violet)]">
              View role &amp; apply
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
