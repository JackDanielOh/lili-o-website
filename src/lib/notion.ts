type NotionRichText = { text?: { content?: string } };
type NotionPageProperties = {
  Title?: { title?: NotionRichText[] };
  Slug?: { rich_text?: NotionRichText[] };
  Tag?: { select?: { name?: string } };
  Excerpt?: { rich_text?: NotionRichText[] };
  Content?: { rich_text?: NotionRichText[] };
  Image?: { url?: string };
  Featured?: { checkbox?: boolean };
  Published?: { date?: { start?: string } };
  Status?: { select?: { name?: string } };
};

export type NotionPage = {
  id: string;
  created_time?: string;
  properties: NotionPageProperties;
};

export type NotionPropertyValue =
  | { title: { text: { content: string } }[] }
  | { rich_text: { text: { content: string } }[] }
  | { select: { name: string } }
  | { url: string | null }
  | { checkbox: boolean };

export async function notionFetch(path: string, options: RequestInit = {}) {
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
