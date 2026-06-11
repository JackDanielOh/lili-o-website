"use client";

import type { ReactNode } from "react";
import Image from "next/image";

const FOUNDERS = [
  { name: "Nicolas", image: "/founders/nicolas.png" },
  { name: "Ludovic", image: "/founders/ludovic.png" },
  { name: "Jiseong", image: "/founders/jiseong.png" },
] as const;

export function FounderQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="mt-16 max-w-3xl rounded-2xl border border-white/10 bg-[#141414] p-8 md:p-10">
      <p className="text-xl leading-relaxed text-paper/90 md:text-2xl md:leading-relaxed">
        &ldquo;{children}&rdquo;
      </p>

      <footer className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center">
          {FOUNDERS.map((founder, i) => (
            <div
              key={founder.name}
              className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-[#141414] bg-ink"
              style={{ marginLeft: i === 0 ? 0 : "-0.625rem", zIndex: FOUNDERS.length - i }}
            >
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
          ))}
        </div>
        <div>
          <cite className="not-italic text-sm font-medium text-paper">
            {FOUNDERS.map((f) => f.name).join(" · ")}
          </cite>
          <div className="mt-0.5 text-xs text-paper/50">Co-founders, Lili-o</div>
        </div>
      </footer>
    </blockquote>
  );
}
