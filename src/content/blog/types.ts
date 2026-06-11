export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; attribution?: string };

export type StaticArticle = {
  id: string;
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  image: string;
  featured: boolean;
  publishedAt: string;
  status: "Draft" | "Published";
  blocks: ContentBlock[];
};
