# Definition of done and verification checklist

## Deliverable completeness
- [ ] Complete Next.js App Router application committed in this repository with dependency lockfile and setup instructions.
- [ ] Functional `/en`, `/it`, `/ar` pages with localized links, content, aria labels and metadata.
- [ ] Responsive, polished executive homepage with Hero, Focus Pillars, Selected Concepts, Approach, Perspectives, About, Contact and Footer.
- [ ] All visible navigation and actions work; no dead anchors, 404 work links, false button behavior, missing images, or broken contact submission.
- [ ] Content editable from typed data files; concepts unmistakably identified as illustrative; real biographical and client claims not invented.
- [ ] Correct light/dark mode behavior using only `#FFFFFF`, `#E5E5E5`, `#0A0A0A` base colors. Light/dark surface proportions broadly conform to 80/20 direction, adjusted for accessible UI needs.
- [ ] Two typographic roles only: Apple-compatible system UI sans and system editorial serif; no redistributed Apple fonts.
- [ ] Lucide React icons only, no emojis, no foreign chromatic accents.
- [ ] Motion for React used with tasteful entrances and `prefers-reduced-motion` respect. No compulsory Remotion dependency.

## Functional and accessibility checks
- [ ] Locale switch works on all supported page types and handles missing translations explicitly.
- [ ] `lang` and `dir` correct for all locale routes; Arabic layout is RTL throughout, not merely right-aligned text.
- [ ] English, Italian and Arabic hero, cards, nav, modal/menu and footer render without clipping at widths 320, 375, 768, 1024 and 1440px.
- [ ] Keyboard only: skip link, menu, theme, locale, CTAs, all cards; focus visible and logical.
- [ ] Semantic H1/H2 hierarchy, landmark roles, descriptive alt text; decorative SVG is hidden to screen readers.
- [ ] Color contrast WCAG AA for text; `#E5E5E5` is never used as light-on-white readable text.
- [ ] Reduced-motion setting removes nonessential transforms, scroll motion and animation loops.
- [ ] No hydration mismatch, runtime console errors, React warnings or obvious layout shifts.

## SEO and indexing
- [ ] Each locale and detail route has correctly localized unique title and description.
- [ ] Correct canonical URL and `hreflang` alternatives including EN/IT/AR; production site URL is configured, not invented.
- [ ] `sitemap.xml`, `robots.txt`, Open Graph/Twitter metadata and OG preview render correctly.
- [ ] Structured data includes only verified claims and safe site metadata; no fabricated employers, ratings, social profiles, awards or links.
- [ ] SSR/SSG visible meaningful content with JavaScript disabled where practical.
- [ ] No accidental `noindex` on real localized public pages; draft and concept indexing policy is explicit.

## Engineering and security
- [ ] `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` pass (or document equivalent scripts and real outcomes).
- [ ] Browser smoke tests cover `/en`, `/it`, `/ar`, menu, language switch and theme.
- [ ] Contact handling is verifiably configured or honestly unavailable; no data loss or fake success status.
- [ ] No credentials in Git; `.env.example` contains no secret values.
- [ ] No unexpected heavyweight dependencies, autoplay video or unnecessary client JavaScript.
- [ ] Record before/after screenshots or visual inspection at mobile and desktop if environment permits.
- [ ] Provide a brief implementation report listing changed files, tests with actual results, limitations, and remaining user-provided data needed.

## Recommended performance targets
Aim for Lighthouse Performance >=90 on desktop, >=85 on mobile, Accessibility >=95, SEO >=95 under a documented repeatable test setup. Treat these as targets, not results to assert without measuring. Aim for good Core Web Vitals (LCP, INP, CLS) on real target devices.

## Editorial launch blockers
Before publicly presenting the portfolio as a verified executive profile, confirm Jithin's bio, actual job title, employment, case studies, social links, headshot/brand assets, contact channel, location (if shown), and legal/privacy text where applicable. Placeholder copy must remain explicitly marked until approved.
