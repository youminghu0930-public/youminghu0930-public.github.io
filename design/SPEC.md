# Shared polished-page design

This directory in `main-public.github.io` is the canonical appearance source for both polished pages.

- Edit `theme.json` for common colors and corner radii.
- Edit `styles.template.css` for typography, spacing, layout, responsive rules, navigation, and all other styling. `{{tokenName}}` values come from the theme.
- Do not edit either generated `styles.css` directly or add page-specific style overrides.
- Keep page-specific copy and destinations in each page’s `materials/content.json`.

## Shared markup contract

Both renderers use `.hero` with `.eyebrow`, `h1`, `.intro`, and one cross-page button; `main section` with `h2`; `.projects` containing `.project` cards with `h3` and paragraphs; and the same collapsible left navigation with `.return-main-page`. Use the same font, heading hierarchy, button treatment, card treatment, navigation labels for equivalent actions, and responsive behavior. Content and section counts may differ. The GitHub parent link belongs in the navigator. The cross-page entrance appears once in the hero.

## Update both pages

From `main-public.github.io`:

```sh
node scripts/sync-design.mjs
node scripts/sync-design.mjs --check
```

The default personal checkout is `../../Private/main-private.github.io`. For another location, pass `--personal /absolute/path/to/main-private.github.io`. The script validates both checkouts before writing. Commit the generated stylesheet in each repository so GitHub Pages builds remain independent.

`node scripts/sync-design.mjs --local --check` checks only this repository and runs automatically before its build. The cross-repository check requires both checkouts and should run after appearance or renderer changes. CSS equality is checked automatically; the markup contract above still requires review when editing renderers.
