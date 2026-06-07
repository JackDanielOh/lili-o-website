import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPostBySlug } from "@/lib/blog";
import { getStaticPostBySlug } from "@/lib/blog-fallback";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { post: notionPost } = await getPostBySlug(slug);
  const post = notionPost ?? getStaticPostBySlug(slug);
  return {
    title: post?.title ?? "Post",
    description: post?.excerpt ?? "",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { post: notionPost } = await getPostBySlug(slug);
  const post = notionPost ?? getStaticPostBySlug(slug);

  if (!post) notFound();

  const img = post.image || null;

  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
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
