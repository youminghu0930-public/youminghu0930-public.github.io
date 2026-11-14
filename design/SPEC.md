# Shared polished-page design

`design/theme.json` is the canonical design control file for both public and personal polished pages. It controls the palette, type family, font sizes and weights, line heights, tracking, spacing, dimensions, borders, radii, focus styling, motion, and mobile breakpoint. Token names identify their selector and property. CSS structural behavior lives in `design/styles.template.css`; keep visual values in the JSON and use `{{tokenName}}` placeholders in the template.

The palette follows https://www.tajmirul.site/: charcoal background, gray surfaces and text, bright green primary, and cyan secondary. The font remains a local system stack; no external font download is required.

Run `node scripts/sync-design.mjs` after editing. It generates matching `styles.css` and `design-settings.js` in both checkouts. Do not edit those generated files. `--local` updates only this checkout; `--check` verifies synchronization. The breakpoint in the JSON drives both CSS and navigation JavaScript.

Keep copy in `materials/content.json`, assets in `materials/data/`, and rough background notes in `materials/draft.md`. The draft is excluded from preview serving and deployment artifacts. It can still be present in Git history if committed to a public repository. Never store confidential source or secrets there.

Both renderers use `.hero`, `.eyebrow`, `h1`, `.intro`, `main section`, `h2`, `.projects`, and `.project` cards with `h3` and paragraphs. Preserve this shared markup contract. The GitHub parent link belongs in the left navigator; the personal/portfolio cross-page entrance appears once in the hero.

Large titles use locally bundled Noto Sans TC at 700, with -0.025em tracking. Title entrances animate complete words so font kerning is preserved during and after motion. The SIL license is stored beside the font in materials/data/fonts.

Typography pairing: Noto Sans TC 700 for large titles, 500 for job titles and section headings, 600 for project headings; Inter for body text, navigation, buttons, and supporting UI. Both variable fonts and their licenses are stored locally. The public app waits for the font faces before measuring animated paragraph wraps.
