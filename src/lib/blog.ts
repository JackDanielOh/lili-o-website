import { createServerFn } from "@tanstack/react-start";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  tag: string;
  excerpt: string;
  content: string;
  image: string;
  featured: boolean;
  publishedAt: string;
  status: "Draft" | "Published";
};

export type CreatePostInput = Omit<BlogPost, "id" | "publishedAt">;

async function notionFetch(path: string, options: RequestInit = {}) {
  const token = process.env.NOTION_TOKEN;
  return fetch(`https://api.notion.com/v1${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
      ...(options.headers ?? {}),
    },
  });
}

function pageToPost(page: any): BlogPost {
  const p = page.properties;
  return {
    id: page.id,
    title: p.Title?.title?.[0]?.text?.content ?? "",
    slug: p.Slug?.rich_text?.[0]?.text?.content ?? page.id,
    tag: p.Tag?.select?.name ?? "",
    excerpt: p.Excerpt?.rich_text?.[0]?.text?.content ?? "",
    content: p.Content?.rich_text?.[0]?.text?.content ?? "",
    image: p.Image?.url ?? "",
    featured: p.Featured?.checkbox ?? false,
    publishedAt: p.Published?.date?.start ?? page.created_time?.split("T")[0],
    status: p.Status?.select?.name ?? "Draft",
  };
}

export const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  const token = process.env.NOTION_TOKEN;
  const db = process.env.NOTION_BLOG_DB;
  if (!token || !db) return { posts: [] as BlogPost[], configured: false };

  const res = await notionFetch(`/databases/${db}/query`, {
    method: "POST",
    body: JSON.stringify({
      filter: { property: "Status", select: { equals: "Published" } },
      sorts: [{ property: "Published", direction: "descending" }],
    }),
  });

  if (!res.ok) return { posts: [] as BlogPost[], configured: true };
  const data = await res.json();
  return { posts: data.results.map(pageToPost) as BlogPost[], configured: true };
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const token = process.env.NOTION_TOKEN;
    const db = process.env.NOTION_BLOG_DB;
    if (!token || !db) return { post: null as BlogPost | null };

    const res = await notionFetch(`/databases/${db}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: { property: "Slug", rich_text: { equals: data.slug } },
        page_size: 1,
      }),
    });

    if (!res.ok) return { post: null };
    const json = await res.json();
    const page = json.results?.[0];
    return { post: page ? pageToPost(page) : null };
  });

export const getAllPosts = createServerFn({ method: "GET" }).handler(async () => {
  const token = process.env.NOTION_TOKEN;
  const db = process.env.NOTION_BLOG_DB;
  if (!token || !db) return { posts: [] as BlogPost[] };

  const res = await notionFetch(`/databases/${db}/query`, {
    method: "POST",
    body: JSON.stringify({
      sorts: [{ property: "Published", direction: "descending" }],
    }),
  });

  if (!res.ok) return { posts: [] as BlogPost[] };
  const data = await res.json();
  return { posts: data.results.map(pageToPost) as BlogPost[] };
});

export const createPost = createServerFn({ method: "POST" })
  .inputValidator((data: CreatePostInput) => data)
  .handler(async ({ data }) => {
    const token = process.env.NOTION_TOKEN;
    const db = process.env.NOTION_BLOG_DB;
    if (!token || !db) return { ok: false, error: "Notion not configured — set NOTION_TOKEN and NOTION_BLOG_DB" };

    const res = await notionFetch("/pages", {
      method: "POST",
      body: JSON.stringify({
        parent: { database_id: db },
        properties: {
          Title: { title: [{ text: { content: data.title } }] },
          Slug: { rich_text: [{ text: { content: data.slug } }] },
          Tag: data.tag ? { select: { name: data.tag } } : undefined,
          Excerpt: { rich_text: [{ text: { content: data.excerpt } }] },
          Content: { rich_text: [{ text: { content: data.content } }] },
          Image: data.image ? { url: data.image } : undefined,
          Featured: { checkbox: data.featured },
          Published: { date: { start: new Date().toISOString().split("T")[0] } },
          Status: { select: { name: data.status } },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { ok: false, error: `Notion error: ${err}` };
    }
    return { ok: true };
  });

export const updatePost = createServerFn({ method: "POST" })
  .inputValidator((data: Partial<CreatePostInput> & { id: string }) => data)
  .handler(async ({ data }) => {
    const token = process.env.NOTION_TOKEN;
    if (!token) return { ok: false, error: "NOTION_TOKEN not set" };

    const { id, ...fields } = data;
    const properties: Record<string, any> = {};
    if (fields.title !== undefined) properties.Title = { title: [{ text: { content: fields.title } }] };
    if (fields.slug !== undefined) properties.Slug = { rich_text: [{ text: { content: fields.slug } }] };
    if (fields.tag !== undefined) properties.Tag = { select: { name: fields.tag } };
    if (fields.excerpt !== undefined) properties.Excerpt = { rich_text: [{ text: { content: fields.excerpt } }] };
    if (fields.content !== undefined) properties.Content = { rich_text: [{ text: { content: fields.content } }] };
    if (fields.image !== undefined) properties.Image = fields.image ? { url: fields.image } : { url: null };
    if (fields.featured !== undefined) properties.Featured = { checkbox: fields.featured };
    if (fields.status !== undefined) properties.Status = { select: { name: fields.status } };

    const res = await notionFetch(`/pages/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { ok: false, error: `Notion error: ${err}` };
    }
    return { ok: true };
  });

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) return { ok: false, error: "ADMIN_PASSWORD env var not set" };
    return { ok: data.password === adminPassword };
  });
