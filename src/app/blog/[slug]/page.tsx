import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { getPostBySlug } from "@/lib/blog";
import { getStaticPostBySlug } from "@/lib/blog-fallback";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { post: notionPost } = await getPostBySlug(slug);
  const post = notionPost ?? getStaticPostBySlug(slug);
  const title = post?.title ?? "Post";
  const description = post?.excerpt ?? "";

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${title} — Lili-o`,
      description,
      type: "article",
      publishedTime: post?.publishedAt,
      authors: ["Lili-o"],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { post: notionPost } = await getPostBySlug(slug);
  const post = notionPost ?? getStaticPostBySlug(slug);

  if (!post) notFound();

  const img = post.image || null;
  const articleUrl = `${SITE_URL}/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "Lili-o" },
    publisher: {
      "@type": "Organization",
      name: "Lili-o",
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    url: articleUrl,
  };

  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <JsonLd data={articleJsonLd} />
      <SiteHeader variant="dark" />

      {img && (
        <div className="relative aspect-[21/9] overflow-hidden">
          <img src={img} alt="" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        </div>
      )}

      <div className="container-x py-16 md:py-24 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-paper/40 hover:text-paper transition mb-10"
        >
          ← All posts
        </Link>

        <div className="flex items-center gap-4 mb-6">
          {post.tag && (
            <span className="rounded-full border border-[var(--violet)]/40 text-[var(--violet)] px-3 py-1 text-xs">
              {post.tag}
            </span>
          )}
          {post.publishedAt && <span className="text-xs text-paper/30">{post.publishedAt}</span>}
        </div>

        <h1 className="display-lg leading-tight">{post.title}</h1>
        <p className="mt-4 text-lg text-paper/60 leading-relaxed">{post.excerpt}</p>

        {post.content && (
          <div className="mt-12 border-t border-white/10 pt-12 space-y-6 text-paper/80 leading-relaxed text-lg">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-white/10">
          <Link href="/blog" className="text-sm text-[var(--violet)] hover:underline">
            ← Back to all posts
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
