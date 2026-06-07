# Lili-o Website

Marketing site for [Lili-o](https://github.com/Lili-0-FR/lili-o-website) — the autonomous Data Foundry for Physical AI. We run robots 24/7 in real home environments to generate household-specific training data for robotics.

Repository: https://github.com/Lili-0-FR/lili-o-website

## Pages

| Route          | Description                                    |
| -------------- | ---------------------------------------------- |
| `/`            | Home                                           |
| `/product`     | Product                                        |
| `/blog`        | Blog index (Notion when configured)            |
| `/blog/[slug]` | Blog post                                      |
| `/contact`     | Contact / request access                       |
| `/recruitment` | Careers / recruitment                          |
| `/admin`       | Blog CMS (password + Notion; optional locally) |

## Tech stack

- React 19 + TypeScript
- [Next.js 16](https://nextjs.org/) — App Router in `src/app/`
- Tailwind CSS v4
- Notion API for blog and contact form (`src/lib/blog.ts`, `src/lib/submit-contact.ts`)

## Prerequisites

- Node.js 22+
- pnpm (via [Corepack](https://nodejs.org/api/corepack.html): `corepack enable`)

## Getting started

```bash
git clone https://github.com/Lili-0-FR/lili-o-website.git
cd lili-o-website
corepack enable
pnpm install
cp .env.example .env   # optional — fill in for blog/contact/admin
pnpm dev
```

The dev server runs at http://localhost:3000.

## Scripts

| Script      | Command             | Purpose                 |
| ----------- | ------------------- | ----------------------- |
| `dev`       | `pnpm dev`       | Development server      |
| `build`     | `pnpm build`     | Production build        |
| `start`     | `pnpm start`     | Start production server |
| `typecheck` | `pnpm typecheck` | TypeScript check        |
| `lint`      | `pnpm lint`      | ESLint                  |
| `format`    | `pnpm format`    | Prettier                |

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
  app/          # Next.js App Router pages and API routes
  components/   # SiteHeader, SiteFooter, Pyramid, Dither, GradientText
  lib/          # Blog, contact helpers, Notion client
  assets/       # Images and video
public/         # Static files (hero, logos, favicon)
```

## Deployment (Vercel)

1. Import the repository in [Vercel](https://vercel.com).
2. Set the Framework Preset to **Next.js** (auto-detected).
3. Add environment variables from the table above in **Project Settings → Environment Variables**.
4. Deploy. Preview deployments run on every push; production on merge to your default branch.

## License

No license file is included in this repository. Contact the maintainers for usage terms.
