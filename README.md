# Jithin K — Chief Innovation Officer Portfolio

A high-trust, production-ready, executive portfolio for **Jithin K — Chief Innovation Officer**, specializing in AI innovation, intelligent systems, enterprise transformation, autonomous operations, and responsible governance.

Built with **Next.js App Router, React 19, TypeScript (strict mode), Tailwind CSS, Lucide React, and Motion for React**.

---

## Key Highlights

- **Executive Aesthetic:** Apple-inspired minimalism paired with Swiss editorial typography.
- **Strictly Monochrome Palette:** `#FFFFFF` (white), `#E5E5E5` (light grey), and `#0A0A0A` (near-black). No chromatic accents or neon gradients.
- **Two System Typographic Roles:** Apple SF Pro style via `system-ui` for UI, navigation, and body; Apple New York style via `ui-serif` for editorial headlines. Platform-compatible Arabic glyph fallback with native shaping.
- **Full Localization (i18n):** English (`/en`), Italian (`/it`), and Arabic (`/ar`) with full RTL layout, logical CSS properties, and language-aware typography.
- **Truthful Content Model:** Illustrative concepts (`AI Opportunity Radar`, `Enterprise Copilot Blueprint`, `Autonomous Operations Layer`) and draft essays are transparently badged and replaceable in typed data files. No fabricated achievements, credentials, or client relationships.
- **Technical SEO:** Localized canonicals, `hreflang` mappings (including `x-default`), dynamic Open Graph image, `robots.txt`, `sitemap.xml`, and verified Schema.org `Person` and `WebSite` JSON-LD.
- **Accessibility & Motion:** Fully keyboard operable, accessible landmarks, skip link, accessible touch targets, and automatic compliance with `prefers-reduced-motion`.

---

## Architecture & Source Structure

```text
├── messages/                     # Multilingual dictionary files
│   ├── en.json                   # English UI and section copy
│   ├── it.json                   # Italian UI and section copy
│   └── ar.json                   # Arabic UI and section copy (RTL)
├── src/
│   ├── app/
│   │   ├── [locale]/             # Localized routes (/en, /it, /ar)
│   │   │   ├── layout.tsx        # HTML lang/dir, metadata base, JSON-LD
│   │   │   ├── page.tsx          # Homepage (Hero, Pillars, Work, Approach, Insights, About, Contact)
│   │   │   ├── work/[slug]/      # Case study detail pages
│   │   │   ├── insights/[slug]/  # Editorial insight detail pages
│   │   │   └── not-found.tsx     # Localized 404
│   │   ├── opengraph-image.tsx   # Dynamic monochrome OG artwork (1200x630)
│   │   ├── robots.ts             # Crawl rules and sitemap reference
│   │   ├── sitemap.ts            # Indexable route sitemap
│   │   └── not-found.tsx         # Global 404 fallback
│   ├── components/
│   │   ├── layout/               # Header, Footer, ThemeToggle, LanguageSwitcher, SkipLink
│   │   ├── sections/             # Hero, Pillars, Work, Approach, Insights, About, Contact
│   │   └── ui/                   # Container, Button, Badge, SectionHeader, Schematics
│   ├── content/                  # Typed source-of-truth content files
│   │   ├── site.ts               # Name, title, positioning, verified links, disclaimer
│   │   ├── pillars.ts            # 4 enterprise capability pillars
│   │   ├── work.ts               # 3 illustrative AI architecture blueprints
│   │   ├── approach.ts           # 4-stage operating philosophy (Discover → Validate → Design → Scale)
│   │   └── insights.ts           # 3 executive draft perspectives
│   ├── i18n/                     # Routing, locales, dictionary loaders
│   ├── lib/                      # SEO, canonicals, Schema.org JSON-LD generators
│   ├── styles/                   # globals.css with strict monochrome design tokens
│   ├── types/                    # Strict TypeScript content models
│   └── middleware.ts             # App Router locale detection & root redirection
├── tests/
│   ├── content.test.ts           # Content integrity & truthfulness unit tests
│   ├── i18n.test.ts              # 100% key-parity tests across EN/IT/AR
│   ├── seo.test.ts               # Canonical, hreflang, and JSON-LD tests
│   ├── components.test.tsx       # UI component & accessibility tests
│   ├── routes.test.ts            # Route matrix and sitemap validation
│   ├── smoke-server.mjs          # Live HTTP production smoke test suite
│   └── browser.e2e.mjs           # Playwright headless browser tests (320-1440px, RTL, theme)
└── reports/                      # Visual inspection screenshots
```

---

## Customization Guide for Jithin K

All profile facts, initiatives, and publications are centralized in typed files. To replace sample copy with verified real-world data, update these files:

### 1. Executive Identity & Contact Channels
**File:** `src/content/site.ts`
- `name`: Executive name (currently `"Jithin K"`).
- `role`: Localized job title.
- `siteUrl`: Configured production URL (or via `NEXT_PUBLIC_SITE_URL`).
- `verifiedLinks`:
  - `email`: Set via `NEXT_PUBLIC_CONTACT_EMAIL` or directly in `site.ts`. When unset, the contact section displays an honest pending-verification status.
  - `linkedin`: Set via `NEXT_PUBLIC_LINKEDIN_URL` or directly in `site.ts`.
  - `github`: Optional verified GitHub profile.

### 2. Selected Case Studies & Initiatives
**File:** `src/content/work.ts`
- Each case study has `status: 'illustrative' | 'verified'`.
- Update `title`, `tagline`, `summary`, `challenge`, `approach`, `architecture`, and `targetOutcomes`.
- Change `status` to `'verified'` once actual client engagement facts are approved.

### 3. Capability Pillars
**File:** `src/content/pillars.ts`
- Customize the 4 core domains (`title`, `summary`, and `capabilities` lists) in English, Italian, and Arabic.

### 4. Editorial Insights
**File:** `src/content/insights.ts`
- Change `status` from `'draft'` to `'published'` for published articles.
- Replace or add essays, key takeaways, topics, and publication dates.

### 5. UI Strings & Translations
**Files:** `messages/en.json`, `messages/it.json`, `messages/ar.json`
- Update button copy, section eyebrows, leadership narrative paragraphs, and system feedback.
- Key parity is enforced by automated test `tests/i18n.test.ts`.

---

## Development & Verification Commands

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000`. The root path automatically redirects to `/en`.

### Run TypeScript Verification
```bash
npm run typecheck
```

### Run ESLint Verification
```bash
npm run lint
```

### Run Unit and Component Tests
```bash
npm test
```

### Production Build
```bash
npm run build
```

### Run Production Server HTTP Smoke Tests
```bash
npm run test:smoke
```

### Run Headless Browser E2E Tests (Playwright)
```bash
npm run test:e2e
```
Executes responsive checks across 320px, 375px, 768px, 1024px, and 1440px viewports, tests Arabic RTL layout, verifies mobile menu drawer keyboard behavior, and checks theme toggling.

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Base canonical domain for SEO, OG images, and sitemaps | `http://localhost:3000` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional verified direct email address | *(empty — displays honest pending status)* |
| `NEXT_PUBLIC_LINKEDIN_URL` | Optional verified LinkedIn profile URL | *(empty)* |

---

## License & Compliance Notice

This executive portfolio features illustrative concepts and strategic frameworks designed to demonstrate AI leadership capabilities. No unverified personal credentials, client engagements, or quantified results are asserted.
