import { notionFetch } from "@/lib/notion";

export type ApplicationPayload = {
  name: string;
  email: string;
  role: string;
  roleId?: string;
  profile: string;
  resume: string;
  note: string;
};

function normalizeUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export async function submitApplication(data: ApplicationPayload) {
  try {
    const token = process.env.NOTION_TOKEN;
    const db = process.env.NOTION_APPLICANTS_DB;
    if (!token) return { ok: false, error: "NOTION_TOKEN is not set" };
    if (!db) return { ok: false, error: "NOTION_APPLICANTS_DB is not set" };

    const profile = normalizeUrl(data.profile);
    const resume = normalizeUrl(data.resume);

    const res = await notionFetch("/pages", {
      method: "POST",
      body: JSON.stringify({
        parent: { database_id: db },
        properties: {
          Name: { title: [{ text: { content: data.name } }] },
          Email: { email: data.email },
          Role: { rich_text: [{ text: { content: data.role } }] },
          Profile: profile ? { url: profile } : undefined,
          Resume: resume ? { url: resume } : undefined,
          Note: data.note ? { rich_text: [{ text: { content: data.note } }] } : undefined,
          Position: data.roleId ? { relation: [{ id: data.roleId }] } : undefined,
          Stage: { select: { name: "New" } },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { ok: false, error: `Notion API error: ${err}` };
    }

    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
