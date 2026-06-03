# Lili-o Website

Marketing site for [Lili-o](https://github.com/Lili-0-FR/lili-o-website) — the autonomous Data Foundry for Physical AI. We run robots 24/7 in real home environments to generate household-specific training data for robotics.

Repository: https://github.com/Lili-0-FR/lili-o-website

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/product` | Product |
| `/blog` | Blog index (Notion when configured) |
| `/blog/$slug` | Blog post |
| `/contact` | Contact / request access |
| `/admin` | Blog CMS (password + Notion; optional locally) |

## Tech stack

- React 19 + TypeScript
- [TanStack Start](https://tanstack.com/start) / [TanStack Router](https://tanstack.com/router) — file-based routes in `src/routes/`
- Vite 7 + [`@lovable.dev/vite-tanstack-config`](https://www.npmjs.com/package/@lovable.dev/vite-tanstack-config) (bundled plugins; do not add TanStack/Tailwind/Cloudflare plugins manually in `vite.config.ts`)
- Tailwind CSS v4, shadcn/ui (Radix) in `src/components/ui/`
- Server functions for blog and contact in `src/lib/blog.ts`, `src/lib/submit-contact.ts`
- SSR entry: `src/server.ts` (Node preset)

## Prerequisites

- Node.js 22+
- npm (or [Bun](https://bun.sh) — `bun.lock` is present; use `bun install` / `bun run dev` if you prefer)

## Getting started

```bash
git clone https://github.com/Lili-0-FR/lili-o-website.git
cd lili-o-website
npm install
npm run dev
```

The dev server usually runs at http://localhost:5173 (exact host/port may depend on the Lovable/TanStack preset).

## Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `npm run dev` | Development server |
| `build` | `npm run build` | Production build |
| `build:dev` | `npm run build:dev` | Development-mode build |
| `preview` | `npm run preview` | Preview production build |
| `lint` | `npm run lint` | ESLint |
| `format` | `npm run format` | Prettier |

## Environment variables (optional)

Create a `.env` file in the project root (gitignored). Static pages work without these; blog, contact, and admin need Notion and admin credentials.

| Variable | Used for | Notes |
|----------|----------|-------|
| `NOTION_TOKEN` | Blog, contact form, admin | Notion integration token |
| `NOTION_BLOG_DB` | Blog, `/admin` | Notion database ID for posts |
| `ADMIN_PASSWORD` | `/admin` login | Checked server-side in `src/lib/blog.ts` |

The contact form only requires `NOTION_TOKEN`; it writes to a fixed Notion database ID in `src/lib/submit-contact.ts` (no separate contact DB env var).

Example:

```env
NOTION_TOKEN=secret_...
NOTION_BLOG_DB=your-blog-database-id
ADMIN_PASSWORD=your-admin-password
```

## Project structure

```
src/
  routes/       # File-based pages (index, product, blog, contact, admin)
  components/   # SiteHeader, SiteFooter, Pyramid, ui/*
  lib/          # Blog, contact server functions, utils, error handling
  assets/       # Images, logos
  server.ts     # SSR error wrapper
public/         # Static favicons
```

## Deployment

Docker (`Dockerfile`) and Cloudflare (`wrangler.jsonc`) configs exist in-repo for deployment; see those files when needed. Local development is the primary workflow documented here.

## License

No license file is included in this repository. Contact the maintainers for usage terms.
