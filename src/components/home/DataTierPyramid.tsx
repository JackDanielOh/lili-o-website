"use client";

/**
 * Single continuous frustum split into three bands. All band edges sit on the
 * same two slope lines, so the trapezium angle stays smooth across every tier.
 * Text is overlaid with HTML positioned at each band's vertical center.
 */
const TIERS = [
  {
    id: "robo-centric",
    tier: "Tier 1",
    title: "Robo-centric",
    description: "Cross-embodiment data generated directly by robots",
    from: "#8B45E8",
    to: "#4C158F",
    band: "M 120 0 L 280 0 L 313.6 86 L 86.4 86 Z",
    gloss: "M 120 0 L 280 0 L 284.7 13 L 115.3 13 Z",
    centerPct: 15.25,
    textWidthPct: 46,
    highlight: true,
  },
  {
    id: "interface-centric",
    tier: "Tier 2",
    title: "Interface-centric",
    description: "Human operator uses expensive hardware to control a physical robot",
    from: "#9A6AD0",
    to: "#5E2E96",
    band: "M 81.8 98 L 318.2 98 L 351.8 184 L 48.2 184 Z",
    gloss: "M 81.8 98 L 318.2 98 L 322.9 111 L 77.1 111 Z",
    centerPct: 50,
    textWidthPct: 64,
    highlight: false,
  },
  {
    id: "human-centric",
    tier: "Tier 3",
    title: "Human-centric & Ego-centric",
    description: "Human-centric ITW data and human-operated interaction capture",
    from: "#CDBBF2",
    to: "#9277CC",
    band: "M 43.6 196 L 356.4 196 L 390 282 L 10 282 Z",
    gloss: "M 43.6 196 L 356.4 196 L 361.1 209 L 38.9 209 Z",
    centerPct: 84.75,
    textWidthPct: 82,
    highlight: false,
  },
] as const;

export function DataTierPyramid() {
  return (
    <div
      className="relative mx-auto w-full max-w-xl"
      role="img"
      aria-label="Data tier pyramid: Tier 3 Human-centric at the base, Tier 2 Interface-centric in the middle, Tier 1 Robo-centric at the apex as the missing scalable layer"
    >
      <svg viewBox="0 0 400 282" className="h-auto w-full" aria-hidden="true">
        <defs>
          {TIERS.map((t) => (
            <linearGradient key={t.id} id={`tier-grad-${t.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={t.from} />
              <stop offset="100%" stopColor={t.to} />
            </linearGradient>
          ))}
          <filter id="tier-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {TIERS.map((t) => (
          <g key={t.id} filter={t.highlight ? "url(#tier-glow)" : undefined}>
            <path
              d={t.band}
              fill={`url(#tier-grad-${t.id})`}
              stroke={t.highlight ? "rgba(190,130,255,0.9)" : "rgba(255,255,255,0.12)"}
              strokeWidth={t.highlight ? 2 : 1}
            />
            <path d={t.gloss} fill="rgba(255,255,255,0.18)" />
          </g>
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-0">
        {TIERS.map((t) => (
          <div
            key={t.id}
            className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center text-white"
            style={{ top: `${t.centerPct}%`, width: `${t.textWidthPct}%` }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-widest text-white/70 sm:text-xs">
              {t.tier}
            </div>
            <div className="mt-1 text-base font-bold leading-tight tracking-tight sm:text-xl">
              {t.title}
            </div>
            <p className="mt-1.5 text-xs leading-snug text-white/85 sm:text-sm">{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
