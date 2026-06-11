import type { Metadata } from "next";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPosts } from "@/lib/blog";
import { mergeStaticAndNotion, sortBlogPosts, STATIC_BLOG_POSTS } from "@/lib/blog-fallback";

export const metadata: Metadata = {
  title: "Blog",
  description: "Research updates, team posts, and thinking on household robotics and Physical AI.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Lili-o",
    description:
      "Research updates, team posts, and thinking on household robotics and Physical AI.",
  },
};

export default async function BlogPage() {
  const { posts, configured } = await getPosts();
  const displayPosts = sortBlogPosts(
    configured ? mergeStaticAndNotion(posts, STATIC_BLOG_POSTS) : STATIC_BLOG_POSTS,
  );

  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <SiteHeader variant="dark" />

      <div className="container-x pt-28 pb-24 md:pt-36 md:pb-32 max-w-3xl">
        <div className="mb-12">
          <h1 className="display-xl">Blog</h1>
          <p className="mt-4 text-lg text-paper/50">
            Research, thinking, and updates from the Lili-o team.
          </p>
        </div>

        <BlogPostList posts={displayPosts} />
      </div>

      <SiteFooter />
    </div>
  );
}
