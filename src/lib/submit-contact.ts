import { createServerFn } from "@tanstack/react-start";
import { notionFetch } from "@/lib/notion";

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  budget: string;
  services: string[];
  message: string;
};

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: ContactPayload) => data)
  .handler(async ({ data }) => {
    try {
      const token = process.env.NOTION_TOKEN;
      const db = process.env.NOTION_CONTACT_DB;
      if (!token) return { ok: false, error: "NOTION_TOKEN is not set" };
      if (!db) return { ok: false, error: "NOTION_CONTACT_DB is not set" };

      const res = await notionFetch("/pages", {
        method: "POST",
        body: JSON.stringify({
          parent: { database_id: db },
          properties: {
            Name: {
              title: [{ text: { content: `${data.firstName} ${data.lastName}` } }],
            },
            Email: { email: data.email },
            Company: { rich_text: [{ text: { content: data.company } }] },
            Role: { rich_text: [{ text: { content: data.role } }] },
            Budget: data.budget ? { select: { name: data.budget } } : undefined,
            Services: {
              multi_select: data.services.map((s) => ({ name: s })),
            },
            Message: { rich_text: [{ text: { content: data.message } }] },
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
  });
