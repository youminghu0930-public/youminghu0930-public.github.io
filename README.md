# Youming Hu's portfolio

Portfolio: https://youminghu0930-public.github.io/

## Structure

```text
index.html                 Page shell
main.js                    Renders materials/content.json
navigation.js              Collapsible left navigation
styles.css                 Page and navigation styles
materials/
  content.json             All page copy, navigation, and project URLs
  data/                    Images, videos, and other presentation assets
scripts/
  serve.mjs                Local preview on port 8100
  build-site.mjs           Packages publishable files into dist/
.github/workflows/pages.yml GitHub Pages deployment
```

Edit `materials/content.json` to change the portfolio text and links. Put future media in `materials/data/` and reference it from the content or renderer as needed. No media assets are required yet.

## Preview

Requires Node.js 22 or newer, with no dependencies to install.

```sh
node scripts/serve.mjs
```

Open http://localhost:8100. Refresh after edits; stop with Ctrl+C.

## Build and publish

```sh
node scripts/build-site.mjs
node scripts/serve.mjs --dist
```

GitHub Actions builds and deploys `dist/` on pushes to `main` or `master`. Set **Settings → Pages → Source** to **GitHub Actions**. Generated `dist/` is ignored by Git; only site files and `materials/` enter the deployment artifact.

## Navigation

The parent is https://github.com/youminghu0930-public. Its profile README links to this portfolio, and the portfolio's left navigator links back. The two major project pages link back to this site's `#projects` section. Public project repositories contain presentation frontends; confidential implementation code is not published.

## Parallel landing pages

The personal and public GitHub landing READMEs link to each other and to their own polished pages. The polished personal page and portfolio link to each other in the main content; each left navigator returns to its own GitHub parent.
