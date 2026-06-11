"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/blog";
import { getTagCounts } from "@/lib/blog-tags";
import { BlogPostRow } from "./BlogPostRow";

type Props = { posts: BlogPost[] };

export function BlogPostList({ posts }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const tagCounts = useMemo(() => getTagCounts(posts), [posts]);

  const filtered = useMemo(
    () => (activeTag ? posts.filter((p) => p.tag === activeTag) : posts),
    [posts, activeTag],
  );

  if (posts.length === 0) {
    return <p className="text-paper/40 text-lg">No posts published yet.</p>;
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`rounded-full px-3.5 py-1.5 text-sm transition border ${
            activeTag === null
              ? "border-[var(--violet)] bg-[var(--violet)]/15 text-[var(--violet)]"
              : "border-white/10 text-paper/50 hover:border-white/20 hover:text-paper/70"
          }`}
        >
          All <span className="text-paper/40 ml-1">{posts.length}</span>
        </button>
        {tagCounts.map(({ tag, count }) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-3.5 py-1.5 text-sm transition border ${
              activeTag === tag
                ? "border-[var(--violet)] bg-[var(--violet)]/15 text-[var(--violet)]"
                : "border-white/10 text-paper/50 hover:border-white/20 hover:text-paper/70"
            }`}
          >
            {tag} <span className="text-paper/40 ml-1">{count}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-paper/40 text-lg">No posts in this category yet.</p>
      ) : (
        <div className="flex flex-col divide-y divide-white/10">
          {filtered.map((post) => (
            <BlogPostRow key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
