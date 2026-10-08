# Tenuva Textiles

Company profile site for **PT Tenuva Tekstil Nusantara**, a fictional B2B textile manufacturer. Built as a portfolio project.

Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, GSAP ScrollTrigger, Lenis, React Hook Form and Zod.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint     # type check
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New, Project** and import the repository. Framework preset: Next.js. No build settings to change.
3. Optional: set `NEXT_PUBLIC_SITE_URL` (for example `https://tenuva.vercel.app`) so the sitemap, robots file and Open Graph URLs use the real domain.
4. Deploy.

## Structure

- `app/` routes: `/`, `/about`, `/products`, `/products/[slug]`, `/industries`, `/capabilities`, `/sustainability`, `/contact`, plus `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` and the mock `api/inquiry` endpoint.
- `components/` layout shell, shared UI, page sections, product and form components.
- `data/` product catalog, industries and image sources (`images.ts` holds the credits block).
- `lib/i18n/` `en.ts` is the source of truth; `id.ts` is typed against it, so a missing Indonesian key fails the type check.

## Notes

- B2B only: no prices, cart or checkout anywhere. Forms validate on the client and post to a mock endpoint that stores nothing.
- All photos come from Pexels (free for commercial use). If one fails to load, `SafeImage` falls back to an indigo and linen gradient with the weave mark.
- Certification wording, statistics and sustainability targets are illustrative portfolio content, not real data.
