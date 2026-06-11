import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { parsePublishedAt, STATIC_BLOG_POSTS } from "@/lib/blog-fallback";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  "/",
  "/product",
  "/product/data",
  "/product/software",
  "/blog",
  "/recruit",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" || path === "/blog" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const { posts } = await getPosts();
  const notionSlugs = new Set(posts.map((p) => p.slug));
  const fallbackSlugs = STATIC_BLOG_POSTS.map((p) => p.slug).filter((s) => !notionSlugs.has(s));

  const blogSlugs = [...notionSlugs, ...fallbackSlugs];
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => {
    const post =
      posts.find((p) => p.slug === slug) ?? STATIC_BLOG_POSTS.find((p) => p.slug === slug);
    return {
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: post?.publishedAt ? new Date(parsePublishedAt(post.publishedAt)) : new Date(),
      changeFrequency: "monthly" as const,
      priority: ["1", "2", "3"].includes(slug) ? 0.8 : 0.6,
    };
  });

  return [...staticEntries, ...blogEntries];
}
