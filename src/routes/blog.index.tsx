import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPosts, type BlogPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  loader: () => getPosts(),
  head: () => ({
    meta: [
      { title: "Blog — Lili-o" },
      { name: "description", content: "Research updates, team posts, and thinking on household robotics and Physical AI." },
      { property: "og:title", content: "Blog — Lili-o" },
      { property: "og:description", content: "Research and thinking from the Lili-o team." },
    ],
  }),
  component: Blog,
});

const staticPosts: BlogPost[] = [
  {
    id: "1",
    tag: "Manipulation · Learning",
    title: "Teaching robots new skills in 5 minutes",
    excerpt: "Our proprietary One-Shot method reduces manipulation primitive creation from 1 hour to 5 minutes. Here's how.",
    content: "",
    image: "",
    featured: true,
    slug: "one-shot-learning",
    publishedAt: "",
    status: "Published",
  },
  {
    id: "2",
    tag: "Planning · Automation",
    title: "From primitives to full tasks — the logic layer",
    excerpt: "Chaining manipulation primitives into complex, long-horizon tasks is the hardest open problem we're working on.",
    content: "",
    image: "",
    featured: false,
    slug: "logic-layer",
    publishedAt: "",
    status: "Published",
  },
  {
    id: "3",
    tag: "Autonomy · Robotics",
    title: "How robots learn to retry — without asking for help",
    excerpt: "Vision-based failure detection and autonomous retry loops — how we keep the foundry running 24/7 without human operators.",
    content: "",
    image: "",
    featured: false,
    slug: "retry-loops",
    publishedAt: "",
    status: "Published",
  },
  {
    id: "4",
    tag: "Hardware · Generalization",
    title: "One use case. Any robot.",
    excerpt: "How we build hardware-agnostic task programs that run on Unitree, Rainbow Robotics, Agibot — without reprogramming.",
    content: "",
    image: "",
    featured: false,
    slug: "hardware-agnostic",
    publishedAt: "",
    status: "Published",
  },
  {
    id: "5",
    tag: "Data · Human behavior",
    title: "Capturing what robots can't — human behavior in real homes",
    excerpt: "Why we instrument real people in real households, and what that data adds to the training pipeline.",
    content: "",
    image: "",
    featured: false,
    slug: "human-behavior",
    publishedAt: "",
    status: "Published",
  },
];

function FeaturedCard({ post }: { post: BlogPost }) {
  const img = post.image || null;
  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="block mb-6">
      <article className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-[var(--violet)] transition">
        <div className="relative aspect-[21/9] overflow-hidden">
          {img && (
            <img src={img} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <span className="absolute top-5 left-5 rounded-full bg-[var(--violet)] px-3 py-1 text-xs font-medium text-white">
            Featured
          </span>
          <div className="absolute bottom-0 left-0 p-8 md:p-10">
            {post.tag && <span className="eyebrow text-[var(--violet)]">{post.tag}</span>}
            <h3 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight leading-tight max-w-3xl">{post.title}</h3>
            <p className="mt-3 text-paper/60 max-w-2xl">{post.excerpt}</p>
            <span className="mt-5 inline-block text-[var(--violet)] text-sm font-medium">Read more →</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ListCard({ post }: { post: BlogPost }) {
  const img = post.image || null;
  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
      <article className="group cursor-pointer flex gap-6 md:gap-10 py-6 hover:bg-ink/40 transition rounded-xl px-4 -mx-4">
        {img && (
          <div className="shrink-0 w-36 md:w-52 aspect-[4/3] rounded-xl overflow-hidden">
            <img src={img} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          </div>
        )}
        <div className="flex flex-col justify-center min-w-0">
          {post.tag && <span className="eyebrow text-[var(--violet)] mb-2">{post.tag}</span>}
          <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">{post.title}</h3>
          <p className="mt-2 text-paper/50 text-sm md:text-base line-clamp-2">{post.excerpt}</p>
          <span className="mt-4 text-[var(--violet)] text-sm font-medium">Read more →</span>
        </div>
      </article>
    </Link>
  );
}

function Blog() {
  const { posts, configured } = Route.useLoaderData();
  const displayPosts = configured ? posts : staticPosts;

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
            {featured && (
              <FeaturedCard post={featured} />
            )}
            <div className="flex flex-col divide-y divide-white/10">
              {rest.map((post, i) => (
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
