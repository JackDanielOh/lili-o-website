import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPosts, type BlogPost } from "@/lib/blog";
import { STATIC_BLOG_POSTS } from "@/lib/blog-fallback";

export const metadata: Metadata = {
  title: "Blog",
  description: "Research updates, team posts, and thinking on household robotics and Physical AI.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Lili-o",
    description: "Research updates, team posts, and thinking on household robotics and Physical AI.",
  },
};

function FeaturedCard({ post }: { post: BlogPost }) {
  const img = post.image || null;
  return (
    <Link href={`/blog/${post.slug}`} className="block mb-6">
      <article className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-[var(--violet)] transition">
        <div className="relative aspect-[21/9] overflow-hidden">
          {img && (
            <img
              src={img}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <span className="absolute top-5 left-5 rounded-full bg-[var(--violet)] px-3 py-1 text-xs font-medium text-white">
            Featured
          </span>
          <div className="absolute bottom-0 left-0 p-8 md:p-10">
            {post.tag && <span className="eyebrow text-[var(--violet)]">{post.tag}</span>}
            <h3 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight leading-tight max-w-3xl">
              {post.title}
            </h3>
            <p className="mt-3 text-paper/60 max-w-2xl">{post.excerpt}</p>
            <span className="mt-5 inline-block text-[var(--violet)] text-sm font-medium">
              Read more →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ListCard({ post }: { post: BlogPost }) {
  const img = post.image || null;
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="group cursor-pointer flex gap-6 md:gap-10 py-6 hover:bg-ink/40 transition rounded-xl px-4 -mx-4">
        {img && (
          <div className="shrink-0 w-36 md:w-52 aspect-[4/3] rounded-xl overflow-hidden">
            <img
              src={img}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          </div>
        )}
        <div className="flex flex-col justify-center min-w-0">
          {post.tag && <span className="eyebrow text-[var(--violet)] mb-2">{post.tag}</span>}
          <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
            {post.title}
          </h3>
          <p className="mt-2 text-paper/50 text-sm md:text-base line-clamp-2">{post.excerpt}</p>
          <span className="mt-4 text-[var(--violet)] text-sm font-medium">Read more →</span>
        </div>
      </article>
    </Link>
  );
}

export default async function BlogPage() {
  const { posts, configured } = await getPosts();
  const displayPosts = configured ? posts : STATIC_BLOG_POSTS;

  const featured = displayPosts.find((p) => p.featured) ?? displayPosts[0];
  const rest = displayPosts.filter((p) => p.id !== featured?.id);

  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <SiteHeader variant="dark" />

      <div className="container-x pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="mb-14">
          <h1 className="display-xl">Blog</h1>
          <p className="mt-4 text-lg text-paper/50 max-w-xl">
            Research, thinking, and updates from the Lili-o team.
          </p>
        </div>

        {displayPosts.length === 0 ? (
          <p className="text-paper/40 text-lg mt-8">No posts published yet.</p>
        ) : (
          <>
            {featured && <FeaturedCard post={featured} />}
            <div className="flex flex-col divide-y divide-white/10">
              {rest.map((post) => (
                <ListCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
