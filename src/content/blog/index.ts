import type { BlogPost } from "@/lib/blog";
import { founderInterview } from "./founder-interview";
import { oneShotLearning } from "./one-shot-learning";
import { qualityData } from "./quality-data";
import type { ContentBlock, StaticArticle } from "./types";

const STATIC_ARTICLES: StaticArticle[] = [oneShotLearning, founderInterview, qualityData];

function blocksToPlainContent(blocks: ContentBlock[]): string {
  return blocks
    .filter((b): b is Extract<ContentBlock, { type: "paragraph" }> => b.type === "paragraph")
    .map((b) => b.text)
    .join("\n\n");
}

export function parsePublishedAt(date: string): number {
  const dotted = date.match(/(\d+)\.\s*(\d+)\.\s*(\d+)/);
  if (dotted) {
    return new Date(Number(dotted[1]), Number(dotted[2]) - 1, Number(dotted[3])).getTime();
  }
  return new Date(date).getTime();
}

function articleToPost(article: StaticArticle): BlogPost {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    tag: article.tag,
    excerpt: article.excerpt,
    content: blocksToPlainContent(article.blocks),
    image: article.image,
    featured: article.featured,
    publishedAt: article.publishedAt,
    status: article.status,
  };
}

export function sortBlogPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => parsePublishedAt(b.publishedAt) - parsePublishedAt(a.publishedAt),
  );
}

export const STATIC_BLOG_POSTS: BlogPost[] = STATIC_ARTICLES.map(articleToPost);

export function getStaticPostBySlug(slug: string): BlogPost | undefined {
  return STATIC_BLOG_POSTS.find((p) => p.slug === slug);
}

export function getStaticBlocksBySlug(slug: string): ContentBlock[] | undefined {
  return STATIC_ARTICLES.find((a) => a.slug === slug)?.blocks;
}

export function mergeStaticAndNotion(notionPosts: BlogPost[], staticPosts: BlogPost[]): BlogPost[] {
  const notionSlugs = new Set(notionPosts.map((p) => p.slug));
  const staticOnly = staticPosts.filter((p) => !notionSlugs.has(p.slug));
  return sortBlogPosts([...notionPosts, ...staticOnly]);
}
