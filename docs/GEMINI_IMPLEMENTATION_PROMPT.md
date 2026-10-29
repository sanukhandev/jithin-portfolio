# Gemini build prompt — Jithin K CIO Portfolio

You are **Gemini acting as a senior creative director, principal Next.js engineer, UX motion designer, technical SEO specialist, and accessibility reviewer**. Your task is to **implement, verify, and deliver** the complete application in the existing GitHub repository:

**Repository:** https://github.com/sanukhandev/jithin-portfolio.git

The repository was initialized with **specification documents but no application code**. First clone/open it and inspect the actual state, including the latest `main`; do not assume the repo remains empty if new commits have appeared. Treat `AGENTS.md` and the linked documentation as mandatory source of truth. Do not stop after generating a plan or a static screenshot: deliver working production-grade source code.

## 0. Mandatory reading
Before writing application code, read, in order:
1. `AGENTS.md`
2. `docs/PRODUCT_BRIEF.md`
3. `docs/DESIGN_SYSTEM.md`
4. `docs/ARCHITECTURE.md`
5. `docs/CONTENT_AND_I18N.md`
6. `docs/ACCEPTANCE_CRITERIA.md`

Resolve conflicts in favor of the user's explicit project brief and these files. Summarize any genuine implementation trade-off in the final delivery report.

## 1. Objective and narrative
Build a distinctive, futuristic, minimalistic **CIO (Chief Innovation Officer) portfolio for Jithin K**. The site should position Jithin as an AI innovation and enterprise transformation leader able to turn strategic vision into intelligent, scalable, responsible systems. Aim for an Awwwards-quality editorial visual identity restrained enough for board-level executive credibility.

This is **not** a generic template, crypto landing page, product dashboard, developer CV, or a scrolling catalogue of unverified badges. The brand voice is analytical, strategic, confident and precise, with memorable short statements and genuine information hierarchy. Replaceable content is encouraged, invented credentials are forbidden.

Primary audiences: executive leadership, board members, transformation leads, industry partners, innovation teams, investors, speaking organizers and recruiters.

## 2. Exact technical requirements
- Stable compatible **Next.js App Router, React, TypeScript strict mode, Tailwind CSS**.
- **Lucide React** for icons, used consistently. **No emojis** anywhere in interface or metadata.
- **Motion for React** (the modern Framer Motion package, `motion`, imported from `motion/react`) for reveal, layout and navigation transitions. Honor `prefers-reduced-motion`. Keep core content server-rendered; use client components only for interactivity.
- **Do not install Remotion** unless you identify a genuinely justified need for a pre-rendered video asset, obtain that asset or produce it, and show why a lightweight Motion/SVG design would not suffice. No autoplay performance burden.
- Multi-lingual EN/IT/AR with actual indexable routes `/en`, `/it`, `/ar`; elegant, accessible locale selector and complete Arabic RTL.
- SEO first: metadata, titles, descriptions, alternates/hreflang, canonical, sitemap, robots, structured data, Open Graph/Twitter image and semantic HTML.
- Fully responsive from compact phones to large desktops with keyboard accessibility, focus indicators and WCAG AA contrast.
- Maintainable, typed content system where I can easily replace sample copy, case studies, imagery, CTAs and future links without altering layout.
- No unnecessary CMS, database, authentication, AI API calls or third-party trackers for a static portfolio.

## 3. Color system — strictly monochrome
Use exactly these base colors throughout the visual brand:
- `#FFFFFF` WHITE — light mode main surfaces
- `#E5E5E5` LIGHT GREY — supporting panels, understated structure
- `#0A0A0A` NEAR BLACK — text, primary interactive elements and dark mode surfaces

Interpret the requested split as **surface usage**, not RGB blending:
- **Primary LIGHT theme:** roughly 80% white surface / 20% light-grey surface, with near-black readable text and controls.
- **Secondary DARK theme:** roughly 80% black surface / 20% light-grey surface, with white readable text and appropriately contrasted grey panels.

Create Tailwind-compatible semantic tokens and color variables. Derived opacity/alpha variants are acceptable. No chromatic accent colors, blue/cyan glows, purple, green, beige, neon or colored gradients. Do not undermine text contrast to enforce the ratio. Include a robust theme toggle and avoid hydration flashes.

## 4. Typography — two Apple-inspired system font roles only
Typography should mix:
1. **SF Pro via Apple system sans**: `system-ui, -apple-system, BlinkMacSystemFont, sans-serif` for UI, paragraphs, data labels and navigation.
2. **New York via Apple system serif**: `ui-serif, serif` for large editorial headlines and selected pull-quotes.

Use these CSS system identifiers, which surface the appropriate Apple fonts on supported Apple platforms and safe system fallbacks elsewhere. Apple's downloadable SF Pro/New York binaries are restricted; **do not bundle, redistribute, self-host or fetch Apple font files**. Other OS fallback glyphs, including script-specific Arabic shaping, are allowed as necessary for legibility while maintaining exactly two typographic **roles**. Do not install Google Fonts or a third brand typeface.

Pair oversized elegant editorial serif headlines with highly disciplined, modern sans subheads/body. Maintain fluid type size and natural Arabic tracking (no Latin-style uppercase tracking applied to Arabic).

## 5. Design an extraordinary actual experience
Deliver a cohesive custom design, not an off-the-shelf template. Suggested creative system:
- Thin modular lines, restrained architectural grids and a tasteful abstract intelligence-network illustration in SVG/CSS with only the approved palette.
- Fluid serif hero typography with refined hierarchy and a compact sticky nav.
- Editorial whitespace; purposeful asymmetry and contemporary Swiss-grid precision.
- Strong black CTA on white / white CTA on black with subtle arrow icon.
- Distinctive concept cards with sophisticated monotone patterns; no unauthorized photography or fake company logos.
- Understated scroll reveals and small responsive hover/tap interactions that also work with mouse, touch and keyboard.
- Theme and language control accessible from every page.
- Excellent mobile navigation and RTL layout; no horizontal scroll.

Implement all homepage sections:
1. Header + Jithin K wordmark + section nav + theme + EN/IT/AR.
2. Hero that clearly says **Jithin K / Chief Innovation Officer** with AI-focused mission, strategic headline, work CTA and contact CTA.
3. Four Innovation Domains: AI Strategy & Adoption; Intelligent Products & Agents; Enterprise Automation; Responsible Innovation & Governance.
4. Three Selected Initiatives as **clearly labeled illustrative concepts**:
   - AI Opportunity Radar
   - Enterprise Copilot Blueprint
   - Autonomous Operations Layer
5. Four-phase operating philosophy: Discover → Validate → Design → Scale.
6. Perspectives on enterprise AI, governance and deploying intelligent systems.
7. About / Leadership narrative without invented biographical facts.
8. Contact / collaboration CTA with honest functionality status until a real destination is configured.
9. Useful footer.

If you implement detail pages for work/insights, every card linked must open a complete localized route. Otherwise use honest unlinked preview cards. Avoid fake `href="#"`, empty `onClick`, `alert()` and "Coming soon" pages misrepresented as completed content.

## 6. Real internationalization, not just toggle labels
All visible text, accessible strings, SEO metadata, case-study fields, approach copy, content badges, error states, form feedback and menus must be translated to **English, Italian and Arabic**. Start from the seed examples in `docs/CONTENT_AND_I18N.md`, refine grammar carefully and supply missing full translations.

Arabic:
- Set `html lang="ar" dir="rtl"` for Arabic routes; `ltr` for English/Italian.
- Use logical CSS properties and adapt appropriate directional icons, control positions, reading order and alignment.
- Test Arabic line-height, typography, shaping, nested LTR technical terms and nav overflow.
- Do not simply mirror decorative logic without checking usability.

Use a framework-appropriate, typed locale route strategy. Preserve the equivalent route when switching language. Missing locale resources must fail tests/build or use an explicit reviewed fallback; never silently leave English scattered inside Arabic pages.

## 7. Content and data: useful, clearly labeled samples
All case studies, example outcomes, portfolio narratives and article drafts are placeholders intended to be edited later. Use a typed data model with clear `status` indicators for `illustrative` or `draft`. Show disclosure in the UI.

Do **not** invent real employers, past roles, dates, degrees, awards, partners, client logos, testimonials, financial figures, deployed solutions, conference appearances, achievements, performance metrics, headshots, contact details or external profiles. The stated CIO position is the requested *portfolio positioning* and must not be presented as independent verification of actual employment.

Use meaningful sample strategic copy — not lorem ipsum — and ensure every visible sample is consistent across three locales.

Centralize config, for example `src/content/site.ts`, `work.ts`, `insights.ts` and locale messages. Add a README subsection identifying exactly which objects Jithin should replace later.

## 8. SEO, conversion and performance
- Titles/descriptions unique to each route, genuinely localized.
- Canonicals and `hreflang` for en/it/ar, plus sensible `x-default` behavior.
- Robots, sitemap with only existing routes, share image, and accurate `Person`/`WebSite` JSON-LD limited to defensible information.
- Configure `NEXT_PUBLIC_SITE_URL` via environment example; don't guess the real public domain or hardcode `example.com` as production canonical.
- Semantic headings, sensible anchor navigation, accurate OG previews and crawlable SSR content.
- Contact links must be verified/configured; if no real inbox/booking route is provided, present an honest localized unavailable status. Never simulate a successful submission.
- Prefer fast static/server rendering, optimized owned assets, minimal JavaScript, smooth hydration and Core Web Vitals.
- Target strong Lighthouse scores while reporting only measured results.

## 9. Quality assurance and test plan
Implement and execute:
1. Dependency install, lockfile, clean Next.js production build.
2. ESLint and strict TypeScript checks.
3. Unit/component tests for shared behavior, translations and content status.
4. Browser smoke tests (ideally Playwright) for `/en`, `/it`, `/ar`, locale switch, theme, mobile menu, keyboard controls, and correct `lang`/`dir`.
5. Responsive checks at 320, 375, 768, 1024 and 1440px; desktop and mobile in all 3 locales.
6. Check SEO metadata, sitemap, robots, OG output, canonical/hreflang and structured data.
7. Reduced-motion, keyboard focus, contrast, and obvious hydration/console errors.

Run actual commands (e.g. `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`; adapt to package scripts). If something cannot run in the environment, explicitly say which command was not run and why. Do not claim checks passed from code inspection alone.

## 10. Repository delivery workflow
- Inspect `main` for the current documentation and any newly added files.
- Work on a new branch called `feat/jithin-cio-ai-portfolio` (or a distinct suffixed branch if that name already exists). Do not force push or erase existing commits.
- Implement the **complete** app, not just the scaffolding. Include `package.json`, lockfile, source files, content, assets, config, tests, `.env.example`, and update `README.md` with clear local dev/build and customization instructions.
- Keep `AGENTS.md` and the docs, updating them only to reflect justified implementation decisions.
- Commit changes in logical commits, push the branch if authenticated permissions allow, and open a pull request against `main` if tooling permits. Do not merge automatically. If git push or PR creation is unavailable, provide exact git commands and a precise file-by-file status.
- **Do not stop to request cosmetic decisions:** make refined default decisions within this spec. Ask only for essential external credentials when needed; do not let missing domain or email block the functioning portfolio design or build.
- Finish with: created files, route matrix, implemented features, tests and actual outputs, screenshots if tooling supports them, SEO/i18n checks, outstanding verified profile/contact data needed, branch/commit/PR links where created, and limitations.

## 11. Mandatory completion standard
Use `docs/ACCEPTANCE_CRITERIA.md` as a real checklist. Continue implementation and defect fixes until all feasible items are satisfied. No "done" declaration for a static mockup, incomplete locale support, untested build, broken links, placeholder metrics passed off as truth, or an unconfigured contact form claiming success.

**Begin by reading the repository instructions and then implement the full application now.**
