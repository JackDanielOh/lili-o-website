import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPostBySlug } from "@/lib/blog";
import { getStaticPostBySlug } from "@/lib/blog-fallback";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { post } = await getPostBySlug({ data: { slug: params.slug } });
    if (post) return { post };
    const staticPost = getStaticPostBySlug(params.slug);
    if (!staticPost) throw notFound();
    return { post: staticPost };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post?.title ?? "Post"} — Lili-o` },
      { name: "description", content: loaderData?.post?.excerpt ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="theme-dark bg-ink text-paper min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-paper/40 text-lg">Post not found.</p>
        <Link to="/blog" className="mt-4 inline-block text-[var(--violet)] text-sm">
          ← Back to blog
        </Link>
      </div>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
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
          to="/blog"
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
          <Link to="/blog" className="text-sm text-[var(--violet)] hover:underline">
            ← Back to all posts
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
