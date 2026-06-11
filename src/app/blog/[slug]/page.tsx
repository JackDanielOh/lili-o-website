import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticleContent } from "@/components/blog/BlogArticleContent";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { getPostBySlug } from "@/lib/blog";
import { getStaticBlocksBySlug, getStaticPostBySlug, STATIC_BLOG_POSTS } from "@/lib/blog-fallback";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

function absoluteImageUrl(image: string): string {
  return image.startsWith("http") ? image : `${SITE_URL}${image}`;
}

export async function generateStaticParams() {
  return STATIC_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { post: notionPost } = await getPostBySlug(slug);
  const post = notionPost ?? getStaticPostBySlug(slug);
  const title = post?.title ?? "Post";
  const description = post?.excerpt ?? "";
  const imageUrl = post?.image ? absoluteImageUrl(post.image) : undefined;

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
      ...(imageUrl && { images: [{ url: imageUrl, alt: title }] }),
    },
    twitter: {
      card: "summary_large_image",
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { post: notionPost } = await getPostBySlug(slug);
  const staticPost = getStaticPostBySlug(slug);
  const post = notionPost ?? staticPost;

  if (!post) notFound();

  const blocks = !notionPost ? getStaticBlocksBySlug(slug) : undefined;
  const articleUrl = `${SITE_URL}/blog/${slug}`;
  const ogImage = post.image ? absoluteImageUrl(post.image) : undefined;

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
    ...(ogImage && { image: ogImage }),
  };

  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <JsonLd data={articleJsonLd} />
      <SiteHeader variant="dark" />

      <div className="container-x pt-28 pb-24 md:pt-36 md:pb-32 max-w-3xl">
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

        {post.image && (
          <div className="relative mt-8 aspect-video rounded-xl overflow-hidden border border-white/10">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <BlogArticleContent blocks={blocks} plainContent={notionPost ? post.content : undefined} />

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
