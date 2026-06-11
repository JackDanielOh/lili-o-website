"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import type { BlogPost } from "@/lib/blog";

type Props = { post: BlogPost };

export function BlogPostRow({ post }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleWraps, setTitleWraps] = useState(false);

  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const check = () => {
      const style = window.getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.25;
      setTitleWraps(el.scrollHeight > lineHeight + 2);
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [post.title]);

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="flex gap-5 md:gap-8 py-8 hover:bg-ink/40 transition rounded-xl px-4 -mx-4">
        {post.image && (
          <div className="relative shrink-0 w-36 md:w-48 aspect-video rounded-lg overflow-hidden border border-white/10">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 144px, 192px"
            />
          </div>
        )}
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-3 text-xs text-paper/40">
            {post.tag && <span className="text-[var(--violet)]">{post.tag}</span>}
            {post.tag && post.publishedAt && <span>·</span>}
            {post.publishedAt && <span>{post.publishedAt}</span>}
          </div>
          <h2
            ref={titleRef}
            className="mt-2 text-xl md:text-2xl font-bold tracking-tight leading-tight group-hover:text-[var(--violet)] transition line-clamp-2"
          >
            {post.title}
          </h2>
          <p
            className={`mt-2 text-paper/50 text-sm md:text-base leading-relaxed ${
              titleWraps ? "line-clamp-1" : "line-clamp-2"
            }`}
          >
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
