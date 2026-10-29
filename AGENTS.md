# AGENTS.md — Jithin K Portfolio Build Contract

**Scope:** entire repository. Applies to Gemini, Codex, and any coding agent.

## Mission and source-of-truth order
Build a production-ready, responsive, multilingual executive portfolio presenting **Jithin K as a Chief Innovation Officer (Chief Innovation Officer, not Chief Information Officer)** with emphasis on AI-led innovation, intelligent systems, enterprise transformation, and responsible adoption.

Read this file first, then:
1. `docs/PRODUCT_BRIEF.md` — positioning, visitor journeys, page content.
2. `docs/DESIGN_SYSTEM.md` — mandatory colors, typography, layout, motion.
3. `docs/ARCHITECTURE.md` — Next.js architecture, localization, SEO, data.
4. `docs/CONTENT_AND_I18N.md` — multilingual copy and placeholder conventions.
5. `docs/ACCEPTANCE_CRITERIA.md` — testable completion gates.
6. `docs/GEMINI_IMPLEMENTATION_PROMPT.md` — end-to-end build directive.

If implementation details conflict, preserve the explicit user brief, then these repository documents, then framework conventions. Document material trade-offs rather than silently violating constraints.

## Non-negotiable engineering constraints

- Use **Next.js App Router + React + TypeScript + Tailwind CSS**.
- Use **Lucide React** for iconography. No emoji, icon-font packs, decorative emoji Unicode, or mismatched icon systems.
- Use **Motion for React (`motion/react`, formerly Framer Motion)** for purposeful UI transitions. Do **not** introduce Remotion unless an actual offline-rendered video is needed and justified.
- Use exactly **two typographic roles**: Apple system sans (SF Pro where available) and Apple system serif (New York where available). Implement using `system-ui` and `ui-serif` system APIs with standards-based fallbacks; do not download, commit, copy or self-host proprietary Apple font binaries. Allow OS language-specific glyph fallback (especially Arabic).
- **Strictly monochrome**: white `#FFFFFF`, light grey `#E5E5E5`, near black `#0A0A0A`. Variants may use alpha transparency of these values; do not introduce colored accent hues, gradients with other hues, neon, or emoji. Default light surfaces approximately 80% white and 20% grey; optional dark surfaces approximately 80% black and 20% grey. Contrast-critical text/buttons use black/white as needed.
- Support `en`, `it`, `ar` with locale-prefixed routes `/en`, `/it`, `/ar`. Arabic must set `lang="ar"`, `dir="rtl"`, and use logical CSS. Translation coverage includes menus, forms, metadata, case studies, aria-labels, validation and errors.
- Build server-first components. Mark only interactive islands `"use client"`. Keep animations from blocking semantic SSR content, navigation, indexing, or hydration.
- Accessible behavior is mandatory: semantic landmarks, skip link, visible focus, keyboard nav, touch targets, alt text, reduced motion, 4.5:1 text contrast (non-text UI indicators where relevant).
- SEO: localized metadata/title/description/canonical/hreflang, Open Graph, Twitter cards, robots, sitemap, `Person` and `WebSite` JSON-LD where claims are verified. Never invent credentials or social links.
- Avoid fabricated facts: personal work history, employer relationships, education, outcomes, statistics, speaking events, awards, testimonials and past deliveries are **not verified**. Label concept case studies and sample copy as illustrative; centralize fields for later replacement. Do not publish pretend evidence as real.
- Keep secrets server-side; no exposed keys. Contact CTA must work honestly: a configured secure endpoint OR a valid verified contact channel. Unconfigured forms must not claim successful sending.

## Operating instructions for agents

1. Inspect the current repository before writing. This repository began as an empty GitHub repository and was initialized with specifications; expect later work to change that.
2. Produce a short file plan before generating code. Keep a cohesive architecture, avoid placeholder imports, dead links and partial implementations.
3. Prefer typed, maintainable primitives over copied page fragments; centralize design tokens, locale resources, content entries and site config.
4. Implement real, localized routes and nav. Every visible link/button must have a real target or be disabled with a clear explanation; never point to `#` unless it is an existing anchor.
5. Manage focus and announcements for language menus, mobile navigation and dialogs; reflect locale, theme, and active navigation state.
6. Verify with available dependency scripts: lint, TypeScript, unit/component tests, end-to-end browser checks if available, production build. Check actual output, not assumptions.
7. Report the file changes, tests executed and any honest blockers. Do not declare deployment, email delivery, or SEO results verified without execution.
8. Never overwrite user-supplied real content or assets with placeholders. Respect existing work if added after this specification.

## Definition of done
All requirements in `docs/ACCEPTANCE_CRITERIA.md` must pass. If not, report exact failures and leave a prioritized remediation list.

## References
- Apple system typography: https://developer.apple.com/documentation/technologyoverviews/fonts
- Apple fonts and license: https://developer.apple.com/fonts/
- Next.js App Router localization: https://nextjs.org/docs/app/guides/internationalization
- Motion React: https://motion.dev/docs/react
