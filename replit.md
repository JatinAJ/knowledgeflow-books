# Knowledge Flow Books

A full multi-page website for knowledgeflowbooks.com — an educational and lifestyle book publisher serving readers who want to grow their minds and enrich their lives.

## Run & Operate

- `pnpm --filter @workspace/knowledgeflow run dev` — run the frontend (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS
- Routing: Wouter
- Animations: Framer Motion
- UI Components: Radix UI + shadcn/ui
- API: Express 5 (backend scaffold)

## Where things live

- `artifacts/knowledgeflow/` — Main website (React + Vite)
- `artifacts/knowledgeflow/src/pages/` — Home, Shop, About, Contact pages
- `artifacts/knowledgeflow/src/lib/data.ts` — Book catalog data
- `artifacts/api-server/src/` — Express API server

## Architecture decisions

- Presentation-first static frontend — no backend calls needed for this site
- AI-generated book cover images embedded directly in the site
- Wouter routing with BASE_URL prefix for proxy compatibility
- Real brand logo loaded from knowledgeflowbooks.com CDN
- Sharp 2px border-radius matching the brand's aesthetic

## Product

Knowledge Flow Books website with:
- **Home page** — hero, featured books grid, category grid, newsletter signup
- **Shop page** — filterable book grid with search and category sidebar
- **About page** — brand story, mission, values
- **Contact page** — contact form with success state

## Brand

- Primary: #B69D78 (warm gold)
- Secondary: #0274BE (rich blue)
- Background: #EFEFEF
- Text: #413E3A
- Headings: DM Serif Display
- Body: Raleway
- Border radius: 2px

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Always use `import.meta.env.BASE_URL` for routing base path in Vite
- Logo is loaded from the live knowledgeflowbooks.com CDN URL

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
