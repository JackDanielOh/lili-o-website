import { notionFetch } from "@/lib/notion";

export type Role = {
  id: string;
  title: string;
  slug: string;
  team: string;
  type: string;
  location: string;
  experience: string;
  duration: string;
  compensation: string;
  domain: string;
  summary: string;
  status: "Draft" | "Open" | "Closed";
  featured: boolean;
  postedAt: string;
};

export type RoleBlock =
  | { kind: "heading"; level: 2 | 3; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "bullet"; text: string }
  | { kind: "number"; text: string };

type RichText = { plain_text?: string; text?: { content?: string } };

type RolePageProperties = {
  Title?: { title?: RichText[] };
  Slug?: { rich_text?: RichText[] };
  Team?: { select?: { name?: string } | null };
  Type?: { select?: { name?: string } | null };
  Location?: { rich_text?: RichText[] };
  Experience?: { rich_text?: RichText[] };
  Duration?: { rich_text?: RichText[] };
  Compensation?: { rich_text?: RichText[] };
  Domain?: { rich_text?: RichText[] };
  Summary?: { rich_text?: RichText[] };
  Status?: { select?: { name?: string } | null };
  Featured?: { checkbox?: boolean };
  Posted?: { date?: { start?: string } | null };
};

type RolePage = {
  id: string;
  created_time?: string;
  properties: RolePageProperties;
};

function plainText(parts?: RichText[]): string {
  return (parts ?? []).map((t) => t.plain_text ?? t.text?.content ?? "").join("");
}

function pageToRole(page: RolePage): Role {
  const p = page.properties;
  const status = p.Status?.select?.name;
  return {
    id: page.id,
    title: plainText(p.Title?.title),
    slug: plainText(p.Slug?.rich_text) || page.id,
    team: p.Team?.select?.name ?? "",
    type: p.Type?.select?.name ?? "",
    location: plainText(p.Location?.rich_text),
    experience: plainText(p.Experience?.rich_text),
    duration: plainText(p.Duration?.rich_text),
    compensation: plainText(p.Compensation?.rich_text),
    domain: plainText(p.Domain?.rich_text),
    summary: plainText(p.Summary?.rich_text),
    status: (status === "Open" || status === "Closed" ? status : "Draft") as Role["status"],
    featured: p.Featured?.checkbox ?? false,
    postedAt: p.Posted?.date?.start ?? page.created_time?.split("T")[0] ?? "",
  };
}

function careersConfig() {
  const token = process.env.NOTION_TOKEN;
  const db = process.env.NOTION_CAREERS_DB;
  return { token, db, configured: Boolean(token && db) };
}

export async function getOpenRoles(): Promise<{ roles: Role[]; configured: boolean }> {
  const { db, configured } = careersConfig();
  if (!configured) return { roles: [], configured: false };

  try {
    const res = await notionFetch(`/databases/${db}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: { property: "Status", select: { equals: "Open" } },
        sorts: [
          { property: "Featured", direction: "descending" },
          { property: "Posted", direction: "descending" },
        ],
      }),
    });

    if (!res.ok) return { roles: [], configured: true };
    const data = await res.json();
    return { roles: (data.results as RolePage[]).map(pageToRole), configured: true };
  } catch {
    return { roles: [], configured: true };
  }
}

export async function getRoleBySlug(slug: string): Promise<{ role: Role | null }> {
  const { db, configured } = careersConfig();
  if (!configured) return { role: null };

  try {
    const res = await notionFetch(`/databases/${db}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: { property: "Slug", rich_text: { equals: slug } },
        page_size: 1,
      }),
    });

    if (!res.ok) return { role: null };
    const json = await res.json();
    const page = json.results?.[0] as RolePage | undefined;
    return { role: page ? pageToRole(page) : null };
  } catch {
    return { role: null };
  }
}

type NotionBlock = {
  type: string;
  heading_1?: { rich_text?: RichText[] };
  heading_2?: { rich_text?: RichText[] };
  heading_3?: { rich_text?: RichText[] };
  paragraph?: { rich_text?: RichText[] };
  bulleted_list_item?: { rich_text?: RichText[] };
  numbered_list_item?: { rich_text?: RichText[] };
};

export async function getRoleBlocks(pageId: string): Promise<RoleBlock[]> {
  const { configured } = careersConfig();
  if (!configured) return [];

  let data: { results?: NotionBlock[] };
  try {
    const res = await notionFetch(`/blocks/${pageId}/children?page_size=100`);
    if (!res.ok) return [];
    data = await res.json();
  } catch {
    return [];
  }

  const blocks: RoleBlock[] = [];

  for (const block of (data.results ?? []) as NotionBlock[]) {
    switch (block.type) {
      case "heading_1":
      case "heading_2": {
        const text = plainText(block.heading_2?.rich_text ?? block.heading_1?.rich_text);
        if (text) blocks.push({ kind: "heading", level: 2, text });
        break;
      }
      case "heading_3": {
        const text = plainText(block.heading_3?.rich_text);
        if (text) blocks.push({ kind: "heading", level: 3, text });
        break;
      }
      case "paragraph": {
        const text = plainText(block.paragraph?.rich_text);
        if (text) blocks.push({ kind: "paragraph", text });
        break;
      }
      case "bulleted_list_item": {
        const text = plainText(block.bulleted_list_item?.rich_text);
        if (text) blocks.push({ kind: "bullet", text });
        break;
      }
      case "numbered_list_item": {
        const text = plainText(block.numbered_list_item?.rich_text);
        if (text) blocks.push({ kind: "number", text });
        break;
      }
      default:
        break;
    }
  }

  return blocks;
}
