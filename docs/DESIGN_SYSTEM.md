# Design system — Monochrome AI Executive

## Strict palette
**Only three unique neutral hex values are authorized as base design colors:**

| Token | Hex | Role |
| --- | --- | --- |
| `--white` | `#FFFFFF` | primary light surface, dark-theme text |
| `--grey` | `#E5E5E5` | structural panels, dividers, secondary surfaces |
| `--black` | `#0A0A0A` | headings/body text, dark surfaces, primary CTAs |

The user describes two color *modes* (white/grey and black/grey), not two literal hexadecimal values. Interpret the requested 80/20 proportions as target **surface area coverage**, not an 80/20 RGB blend. Light mode: roughly 80% white, 20% grey surfaces; dark mode: roughly 80% black, 20% grey surfaces. Text and accessible action contrast may reverse black/white independent of the coverage. Use alpha/transparency and CSS `color-mix` derived exclusively from these three tokens if needed, no new hue or additional neutral base token. Do not show `#E5E5E5` text on white: insufficient contrast.

Suggested CSS:
```css
:root {
  --color-white: #FFFFFF;
  --color-grey: #E5E5E5;
  --color-black: #0A0A0A;
  --surface: var(--color-white);
  --surface-raised: var(--color-grey);
  --ink: var(--color-black);
  --action-bg: var(--color-black);
  --action-text: var(--color-white);
}
[data-theme="dark"] {
  --surface: var(--color-black);
  --surface-raised: var(--color-grey);
  --ink: var(--color-white);
  --action-bg: var(--color-white);
  --action-text: var(--color-black);
}
```

## Exactly two typographic roles
1. **UI / sans:** Apple system sans (`system-ui` / `-apple-system`, yielding SF Pro on applicable Apple platforms). Navigation, body, cards, buttons, captions.
2. **Editorial / serif:** platform system serif (`ui-serif`, yielding New York on applicable Apple platforms). Headlines and selected emphasized statements.

Example:
```css
:root {
  --font-ui: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-editorial: ui-serif, serif;
}
```
Apple specifically documents using system generic font identifiers in WebKit. **Do not download or bundle Apple SF Pro or New York font files**: these are reserved for system use and Apple's downloadable assets have restrictive licenses. Other platforms render their own compatible system faces, keeping two typographic roles. Arabic relies on language-aware OS glyph fallback; audit both roles for legibility in Arabic rather than forcing Latin glyph shaping. No Google Fonts, third-party fonts, or additional display families.

Recommended type scale (responsive with clamp):
- Hero headline: `clamp(3.5rem, 8vw, 8rem)`, editorial serif.
- Section headline: `clamp(2.25rem, 4.5vw, 4.75rem)`, editorial serif or sans based on hierarchy.
- Body: `1rem–1.125rem` sans; line-height 1.55–1.7.
- Eyebrow/labels: `0.75rem–0.875rem` sans, tracked only for Latin; avoid letter-spacing in Arabic.
- Max reading width: about 65 characters. RTL paragraph alignment naturally follows direction.

## Geometry and layout
- Grid: 12 columns desktop, 4 columns mobile; constrained max width ~1440px with fluid horizontal padding.
- Generous vertical breathing room and large editorial negative space.
- Hero split option: 7/5 columns with abstract vector intelligence network, or full-bleed text with faint schematic in grey.
- Corners: subtle 8–16px on cards; avoid excessive bubbly pills. Buttons 6–10px or strong rectangular edges.
- Hairline separators and generous card spacing rather than shadows everywhere.
- Use **one** black/white high-contrast CTA emphasis at a time per section.
- Inline abstract diagrams should remain decorative (`aria-hidden`) and not carry unique information.

## Interaction and iconography
- Icons **only Lucide React** (e.g. `ArrowUpRight`, `BrainCircuit`, `Workflow`, `ShieldCheck`, `Globe2`, `Menu`, `X`, `Sun`, `Moon`). Consistent 1.5–2px stroke; no emojis.
- Motion for React (`motion/react`): stagger entrance within 200–500ms, subtle opacity/translate, hover shift <= 6px, spring only when appropriate. Respect `prefers-reduced-motion` via MotionConfig and conditional effects.
- No looping exaggerated hero animations, pointer-following spotlight, heavy scroll-jacking, forced parallax, unbounded canvas or autoplay video.
- Optional animated schematic: pure SVG/CSS with grey nodes and black connector lines; static fallback present.
- Mobile nav menu: focus management, Escape to close, body scroll behavior, aria-expanded, focus visible.
- Locale switch must retain equivalent localized page if supported, otherwise navigate safely to locale homepage.

## Accessibility / performance
- WCAG AA contrast: normal text >=4.5:1 and large text >=3:1, including dark mode.
- 44x44px touch targets where practical, keyboard-operable controls, semantic region hierarchy, skip link.
- Motion is enhancement only; default HTML content must be visible for users, crawlers, and no-JS / reduced-motion cases.
- Optimize CLS/INP/LCP; don't add heavy WebGL for decorative effect.
