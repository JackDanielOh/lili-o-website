"use client";

import Image from "next/image";
import Link from "next/link";
import { oneShotLearning } from "@/content/blog/one-shot-learning";

export function OneShotInsightPanel() {
  const post = oneShotLearning;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-[var(--violet)]/50"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent"
          aria-hidden
        />
        <div className="absolute left-4 top-4 rounded-full bg-[var(--violet)] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
          From the blog
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center gap-2 text-xs text-paper/40">
          {post.tag && <span className="text-[var(--violet)]">{post.tag}</span>}
          {post.tag && post.publishedAt && <span>·</span>}
          {post.publishedAt && <span>{post.publishedAt}</span>}
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight transition group-hover:text-[var(--violet)] md:text-xl">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-paper/55 line-clamp-3">{post.excerpt}</p>
        <span className="mt-auto pt-6 text-sm font-medium text-[var(--violet)]">
          Read article →
        </span>
      </div>
    </Link>
  );
}
