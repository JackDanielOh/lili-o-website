# Lili-o Website

Marketing site for [Lili-o](https://github.com/Lili-0-FR/lili-o-website) — the autonomous Data Foundry for Physical AI. We run robots 24/7 in real home environments to generate household-specific training data for robotics.

Repository: https://github.com/Lili-0-FR/lili-o-website

## Pages

| Route          | Description                                    |
| -------------- | ---------------------------------------------- |
| `/`            | Home                                           |
| `/product`     | Product                                        |
| `/blog`        | Blog index (Notion when configured)            |
| `/blog/$slug`  | Blog post                                      |
| `/contact`     | Contact / request access                       |
| `/recruitment` | Careers / recruitment                          |
| `/admin`       | Blog CMS (password + Notion; optional locally) |

## Tech stack

- React 19 + TypeScript
- [TanStack Start](https://tanstack.com/start) / [TanStack Router](https://tanstack.com/router) — file-based routes in `src/routes/`
- Vite 7 + [`@lovable.dev/vite-tanstack-config`](https://www.npmjs.com/package/@lovable.dev/vite-tanstack-config) (bundled plugins; do not add TanStack/Tailwind plugins manually in `vite.config.ts`)
- Tailwind CSS v4
- Server functions for blog and contact in `src/lib/blog.ts`, `src/lib/submit-contact.ts`
- SSR entry: `src/server.ts` (Node preset)

## Prerequisites

- Node.js 22+
- npm

## Getting started

```bash
git clone https://github.com/Lili-0-FR/lili-o-website.git
cd lili-o-website
npm install
cp .env.example .env   # optional — fill in for blog/contact/admin
npm run dev
```

The dev server usually runs at http://localhost:5173 (exact host/port may depend on the Lovable/TanStack preset).

## Scripts

| Script      | Command             | Purpose                  |
| ----------- | ------------------- | ------------------------ |
| `dev`       | `npm run dev`       | Development server       |
| `build`     | `npm run build`     | Production build         |
| `build:dev` | `npm run build:dev` | Development-mode build   |
| `preview`   | `npm run preview`   | Preview production build |
| `typecheck` | `npm run typecheck` | TypeScript check         |
| `lint`      | `npm run lint`      | ESLint                   |
| `format`    | `npm run format`    | Prettier                 |

## Environment variables (optional)

Copy `.env.example` to `.env` (gitignored). Static pages work without these; blog, contact, and admin need Notion and admin credentials.

| Variable            | Used for                  | Notes                                      |
| ------------------- | ------------------------- | ------------------------------------------ |
| `NOTION_TOKEN`      | Blog, contact form, admin | Notion integration token                   |
| `NOTION_BLOG_DB`    | Blog, `/admin`            | Notion database ID for posts               |
| `NOTION_CONTACT_DB` | Contact form              | Notion database ID for contact submissions |
| `ADMIN_PASSWORD`    | `/admin` login            | Checked server-side in `src/lib/blog.ts`   |

Example:

```env
NOTION_TOKEN=secret_...
NOTION_BLOG_DB=your-blog-database-id
NOTION_CONTACT_DB=your-contact-database-id
ADMIN_PASSWORD=your-admin-password
```

## Project structure

```
src/
  routes/       # File-based pages (index, product, blog, contact, recruitment, admin)
  components/   # SiteHeader, SiteFooter, Pyramid, Dither, GradientText
  lib/          # Blog, contact server functions, error handling
  assets/       # Images, logos, video
  server.ts     # SSR error wrapper
public/         # Static images (hero, partner logos)
```

## Deployment (Vercel)

1. Import the repository in [Vercel](https://vercel.com).
2. Set the Framework Preset to **TanStack Start** (or let Vercel auto-detect).
3. Add environment variables from the table above in **Project Settings → Environment Variables**.
4. Deploy. Preview deployments run on every push; production on merge to your default branch.

If the build fails on Vercel, see [TanStack Start on Vercel](https://vercel.com/docs/frameworks/full-stack/tanstack-start) for Nitro plugin setup.

## License

No license file is included in this repository. Contact the maintainers for usage terms.
