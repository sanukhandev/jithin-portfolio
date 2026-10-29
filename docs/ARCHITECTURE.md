# Technical architecture — Next.js portfolio

## Stack and boundaries
- **Framework:** modern stable Next.js App Router, React, TypeScript in strict mode.
- **Styling:** Tailwind CSS with CSS custom properties for the exact design tokens in `DESIGN_SYSTEM.md`.
- **Icons:** `lucide-react` only.
- **Animation:** `motion` package, import from `motion/react` (Framer Motion successor). Use `MotionConfig reducedMotion="user"` or equivalent and conditionally suppress sensory motion.
- **Localization:** locale-aware App Router paths. Prefer a mature type-safe i18n solution compatible with the installed Next.js version (e.g. next-intl), or Next.js documented dictionary routing with tests. Do not mix two competing internationalization systems.
- **Testing:** Vitest + React Testing Library for components, Playwright for browser smoke tests when feasible. ESLint, TypeScript check, production build.
- **Video:** Remotion is optional and out-of-scope unless a documented, useful pre-rendered film is approved. No Remotion requirement for UI animations.

## Suggested source tree
```text
src/
  app/
    [locale]/
      layout.tsx                  # locale-aware <html lang dir>, metadata base
      page.tsx                    # homepage/sections
      work/[slug]/page.tsx       # only if implemented with actual content
      insights/[slug]/page.tsx   # only if implemented with actual content
      not-found.tsx
    sitemap.ts
    robots.ts
    opengraph-image.tsx          # or verified static assets
  components/
    layout/                      # header, footer, language-switch, theme toggle
    sections/                    # hero, pillars, work, approach, insights, about, contact
    ui/                          # button, container, heading, card, reveal
  content/
    site.ts                      # source-of-truth profile/site config
    work.ts                      # typed illustrative/verified case studies
    insights.ts                  # typed sample or published articles
  i18n/
    routing.ts
    request.ts
  lib/
    seo.ts
    structured-data.ts
    urls.ts
    content-types.ts
  styles/
    globals.css
messages/
  en.json
  it.json
  ar.json
public/
  # only owned/licensed files, no Apple font binaries
tests/
  # unit, i18n, sitemap, accessibility and browser checks
```
This is a target pattern, not a demand to manufacture unused files. Choose convention-correct routing/configuration for the installed Next.js version.

## Routes and multilingual behavior
- Locale codes: `en` (default), `it`, `ar`. Stable indexable URLs `/en`, `/it`, `/ar`.
- Root URL `/` may redirect to `/en`, or use appropriately tested locale negotiation. Search engines must still see stable indexed localized pages.
- Unsupported locale must never render a 200 with mismatched content. Provide a localized 404 or safe redirect per framework behavior.
- Arabic: `<html lang="ar" dir="rtl">`; English/Italian: `dir="ltr"`. Prefer logical properties (`margin-inline`, `padding-inline`, `inset-inline-start`) and appropriately directional icons.
- Language selection should preserve page/slug where equivalent content exists. For missing translations, implement an explicit verified fallback strategy, not mixed-language sections.
- Use server-side/static translated content, no client-only essential text.

## Data and content model
Provide typed, centrally editable data:
- `SiteConfig`: owner name, displayed title, positioning, site URL, SEO default image config, verified social links, approved contact channel.
- `CaseStudy`: `id`, stable `slug`, `status: 'illustrative' | 'verified'`, localized title/summary/problem/approach/expectedOutcome, categories, optional verified result facts, optional permitted visuals.
- `Insight`: stable slug, `status: 'draft' | 'published'`, locale-aware title/excerpt/body/date if verified.
- All displayable work and insights must have full routes if linked. Don't render placeholder `href="#"` controls.
- Content and translation keys should be checked for missing values at build/test time. Use real source-controlled content rather than fake API loaders.

## SEO implementation
- Set `metadataBase` using a **validated configured public URL** (e.g., `NEXT_PUBLIC_SITE_URL` or equivalent). Locally allow localhost. Do not ship production canonical links using `example.com` or an assumed domain.
- Localized per-route `generateMetadata` (or version-equivalent static metadata): title, description, canonical, `alternates.languages`, Open Graph/Twitter, robots. Include `x-default` if appropriate, with consistent canonical locale strategy.
- Generate `sitemap.xml` for actual indexable localized routes and `robots.txt`; exclude drafts, illustrative detail pages when they should not rank, or provide clear labeled concept pages with correct metadata if made public.
- `Person` JSON-LD: actual name and defensible intended title only; no fictional organization, awards, reviews, educational affiliation or `sameAs` URLs. `WebSite` schema if site URL set.
- Make page content SSR/SSG friendly. Use headings logically (single meaningful H1 per page). Ensure metadata is properly localized and no accidental noindex in production.
- Add OG image with text, black/white/grey only and proper localized fallback.
- Avoid keyword stuffing or unverified SEO claims.

## Components, security and behavior
- Server Components by default; client islands only for menus/theme/motion where necessary.
- Reuse one shared Button, Container, Heading, SectionHeading, Card and motion primitive with a11y defaults.
- Support system theme initially, persistent user choice only if a safe client method is implemented without hydration mismatch.
- Contact: prefer a valid verified email/booking URL when supplied. If a real form is built, use server-side validation, rate limiting or abuse protection, honeypot where appropriate, secret server environment variables, accessible status, truthful failure/success handling. Never invent an inbox or silently discard inquiries.
- No unnecessary databases, AI API calls, analytics trackers, auth or CMS just to display a portfolio.
- Use image optimization only for approved assets; abstract geometry can be SVG/CSS.

## Quality and build workflow
Recommended scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:e2e` and `format` (scripts should be installed/implemented, not empty).
Check responsive rendering at 320, 375, 768, 1024 and 1440px; ensure Arabic and long Italian labels work. Check browser console/hydration failures. Include `.env.example` with non-secret configuration keys and a clear README setup guide.
