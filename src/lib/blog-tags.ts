import type { BlogPost } from "@/lib/blog";

/** Canonical blog tags — shared with admin and filter UI. New posts should use one of these. */
export const BLOG_TAGS = [
  "Company · Story",
  "Company · Update",
  "Manipulation · Learning",
  "Planning · Automation",
  "Autonomy · Robotics",
  "Hardware · Generalization",
  "Data · Human behavior",
] as const;

export type BlogTag = (typeof BLOG_TAGS)[number];

export type TagCount = { tag: string; count: number };

export function getTagCounts(posts: BlogPost[]): TagCount[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    if (post.tag) counts.set(post.tag, (counts.get(post.tag) ?? 0) + 1);
  }

  const ordered = BLOG_TAGS.filter((tag) => counts.has(tag)).map((tag) => ({
    tag,
    count: counts.get(tag)!,
  }));

  const extra = [...counts.entries()]
    .filter(([tag]) => !BLOG_TAGS.includes(tag as BlogTag))
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));

  return [...ordered, ...extra];
}
