import { createFileRoute } from "@tanstack/react-router";
import logoImg from "@/assets/logos/Logo Primaire.svg";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import {
  verifyAdminPassword,
  createPost,
  updatePost,
  getAllPosts,
  type BlogPost,
  type CreatePostInput,
} from "@/lib/blog";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Lili-o" }] }),
  component: AdminPage,
});

const TAGS = [
  "Manipulation · Learning",
  "Planning · Automation",
  "Autonomy · Robotics",
  "Hardware · Generalization",
  "Data · Human behavior",
  "Company · Update",
];

const SESSION_KEY = "lilio_admin";

// ─── Login ───────────────────────────────────────────────────────────────────

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await verifyAdminPassword({ data: { password } });
    if (result.ok) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setError("Wrong password.");
    }
    setLoading(false);
  }

  return (
    <div className="theme-dark bg-ink text-paper min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <img src={logoImg} alt="Lili-o" className="h-10 w-auto brightness-0 invert" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-paper/70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#141414] px-4 py-3 text-sm text-paper outline-none focus:border-[var(--violet)]/60"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--violet)] text-white py-3 font-medium hover:bg-[var(--violet-dark)] transition disabled:opacity-60"
          >
            {loading ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Post form ───────────────────────────────────────────────────────────────

const emptyForm: CreatePostInput = {
  title: "",
  slug: "",
  tag: "",
  excerpt: "",
  content: "",
  image: "",
  featured: false,
  status: "Draft",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function PostForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: BlogPost;
  onSave: () => void;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<CreatePostInput>(
    initial
      ? { title: initial.title, slug: initial.slug, tag: initial.tag, excerpt: initial.excerpt, content: initial.content, image: initial.image, featured: initial.featured, status: initial.status }
      : emptyForm
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CreatePostInput | "_", string>>>({});
  const isEditing = !!initial;

  function set(key: keyof CreatePostInput, value: any) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "title" && !isEditing) next.slug = slugify(value);
      return next;
    });
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.slug.trim()) next.slug = "Slug is required.";
    if (!form.excerpt.trim()) next.excerpt = "Excerpt is required.";
    if (!form.content.trim()) next.content = "Content is required.";
    if (Object.keys(next).length) { setErrors(next); return; }
    setLoading(true);
    setErrors({});
    const result = isEditing
      ? await updatePost({ data: { ...form, id: initial!.id } })
      : await createPost({ data: form });
    if (result.ok) {
      onSave();
    } else {
      setErrors({ _: result.error ?? "Something went wrong." });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-paper/50">Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Your post title"
          className={`mt-1.5 w-full rounded-lg border bg-ink px-4 py-3 text-sm text-paper outline-none focus:border-[var(--violet)]/60 ${errors.title ? "border-red-500/60" : "border-white/10"}`}
        />
        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
      </div>

      {/* Slug */}
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-paper/50">Slug *</label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => set("slug", slugify(e.target.value))}
          placeholder="auto-generated-from-title"
          className={`mt-1.5 w-full rounded-lg border bg-ink px-4 py-3 text-sm text-paper/60 font-mono outline-none focus:border-[var(--violet)]/60 ${errors.slug ? "border-red-500/60" : "border-white/10"}`}
        />
        {errors.slug && <p className="mt-1 text-xs text-red-400">{errors.slug}</p>}
      </div>

      {/* Tag + Status + Featured */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-paper/50">Tag</label>
          <select
            value={form.tag}
            onChange={(e) => set("tag", e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-paper outline-none focus:border-[var(--violet)]/60"
          >
            <option value="">— select —</option>
            {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-paper/50">Status</label>
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value as "Draft" | "Published")}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-paper outline-none focus:border-[var(--violet)]/60"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-paper/50">Image URL</label>
        <input
          type="url"
          value={form.image}
          onChange={(e) => set("image", e.target.value)}
          placeholder="https://…"
          className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-paper outline-none focus:border-[var(--violet)]/60"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-paper/50">Excerpt *</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          rows={2}
          placeholder="One-line summary shown in the blog list"
          className={`mt-1.5 w-full rounded-lg border bg-ink px-4 py-3 text-sm text-paper outline-none focus:border-[var(--violet)]/60 resize-none ${errors.excerpt ? "border-red-500/60" : "border-white/10"}`}
        />
        {errors.excerpt && <p className="mt-1 text-xs text-red-400">{errors.excerpt}</p>}
      </div>

      {/* Content */}
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-paper/50">Content *</label>
        <textarea
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          rows={10}
          placeholder="Full post content (markdown supported)"
          className={`mt-1.5 w-full rounded-lg border bg-ink px-4 py-3 text-sm text-paper font-mono outline-none focus:border-[var(--violet)]/60 resize-y ${errors.content ? "border-red-500/60" : "border-white/10"}`}
        />
        {errors.content && <p className="mt-1 text-xs text-red-400">{errors.content}</p>}
      </div>

      {/* Featured */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => set("featured", e.target.checked)}
          className="h-4 w-4 rounded accent-[var(--violet)]"
        />
        <span className="text-sm text-paper/70">Pin as featured post</span>
      </label>

      {errors._ && <p className="text-sm text-red-400">{errors._}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[var(--violet)] text-white px-6 py-3 font-medium hover:bg-[var(--violet-dark)] transition disabled:opacity-60"
        >
          {loading ? "Saving…" : isEditing ? "Save changes" : "Create post"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded-xl border border-white/10 px-6 py-3 text-sm text-paper/60 hover:border-white/30 transition">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "new" | { edit: BlogPost }>("list");

  async function loadPosts() {
    setLoading(true);
    const { posts } = await getAllPosts();
    setPosts(posts);
    setLoading(false);
  }

  useEffect(() => { loadPosts(); }, []);

  return (
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <SiteHeader variant="dark" />

      <div className="container-x py-16 max-w-4xl">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="eyebrow text-[var(--violet)] mb-2">Admin</div>
            <h1 className="text-3xl font-bold tracking-tight">Blog posts</h1>
          </div>
          <div className="flex gap-3">
            {view === "list" && (
              <button
                onClick={() => setView("new")}
                className="rounded-xl bg-[var(--violet)] text-white px-5 py-2.5 text-sm font-medium hover:bg-[var(--violet-dark)] transition"
              >
                + New post
              </button>
            )}
            <button
              onClick={onLogout}
              className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-paper/50 hover:border-white/30 transition"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* New post form */}
        {view === "new" && (
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-8 mb-10">
            <h2 className="text-xl font-bold mb-6">New post</h2>
            <PostForm
              onSave={() => { setView("list"); loadPosts(); }}
              onCancel={() => setView("list")}
            />
          </div>
        )}

        {/* Edit form */}
        {typeof view === "object" && "edit" in view && (
          <div className="rounded-2xl border border-[var(--violet)]/40 bg-[#141414] p-8 mb-10">
            <h2 className="text-xl font-bold mb-6">Edit post</h2>
            <PostForm
              initial={view.edit}
              onSave={() => { setView("list"); loadPosts(); }}
              onCancel={() => setView("list")}
            />
          </div>
        )}

        {/* Post list */}
        {view === "list" && (
          <div>
            {loading ? (
              <p className="text-paper/40 text-sm">Loading posts…</p>
            ) : posts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 p-16 text-center text-paper/40">
                <p className="text-lg">No posts yet.</p>
                <p className="text-sm mt-2">Create your first post to get started.</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-white/10">
                {posts.map((post) => (
                  <div key={post.id} className="flex items-center gap-6 py-5">
                    {post.image && (
                      <img src={post.image} alt="" className="w-16 h-12 rounded-lg object-cover shrink-0 opacity-80" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.status === "Published" ? "bg-emerald-500/15 text-emerald-400" : "bg-white/10 text-paper/50"}`}>
                          {post.status}
                        </span>
                        {post.featured && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--violet)]/15 text-[var(--violet)]">Featured</span>
                        )}
                        {post.tag && <span className="text-xs text-paper/40">{post.tag}</span>}
                      </div>
                      <p className="font-medium truncate">{post.title}</p>
                      <p className="text-sm text-paper/40 truncate mt-0.5">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-paper/30">{post.publishedAt}</span>
                      <button
                        onClick={() => setView({ edit: post })}
                        className="text-xs text-[var(--violet)] hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Setup notice */}
        <div className="mt-16 rounded-xl border border-white/5 bg-[#141414] p-6 text-xs text-paper/30 space-y-1">
          <p className="font-medium text-paper/50">Setup required</p>
          <p>Set <code className="text-paper/60">NOTION_BLOG_DB</code> to the ID of your Notion blog database.</p>
          <p>Set <code className="text-paper/60">ADMIN_PASSWORD</code> to your chosen admin password.</p>
          <p>The Notion database needs these properties: <code className="text-paper/60">Title, Slug, Tag, Excerpt, Content, Image, Featured, Published, Status</code>.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setLoggedIn(true);
  }, []);

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setLoggedIn(false);
  }

  if (!loggedIn) return <LoginForm onSuccess={() => setLoggedIn(true)} />;
  return <Dashboard onLogout={logout} />;
}
