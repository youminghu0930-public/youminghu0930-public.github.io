# Youming Hu's portfolio

Static landing page for https://youminghu0930-public.github.io/.

## Local preview

Requires Node.js 22 or newer. No dependencies to install.

```sh
node scripts/serve.mjs
```

Open http://localhost:8100. Stop with Ctrl+C. Refresh the browser after editing files in `public/`.

## Publish

1. In GitHub, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
2. Commit and push to `main` or `master`. `.github/workflows/pages.yml` publishes only `public/`.
3. Check the **Actions** tab for deployment progress.

For the initial commit (the local repository currently uses `master`):

```sh
git add .github .gitignore README.md scripts public
git commit -m "Set up landing page and GitHub Pages deployment"
git push -u origin master
```

If the remote already contains commits, fetch and reconcile them before pushing. Do not force push.

## Git workflow

Create feature branches from the current default branch, commit focused changes, and open a pull request. Merge into the default branch to deploy. Keep site files inside `public/`; the Node server is for local preview only, since GitHub Pages hosts static files.

## Project hierarchy

Local checkout: `/Users/youming/Documents/Personal/Public/main.github.io`. Its folder name is independent of the remote repository name. Keep the remote `youminghu0930-public.github.io` to publish at the account root.

- Main page: https://youminghu0930-public.github.io/
- 2D analysis: https://youminghu0930-public.github.io/golf-swing-analysis-poc/
- True 3D: https://youminghu0930-public.github.io/golf-true-3d-product/

The main page links to both independently deployed project repositories. Their “Return to main page” links point to the root site's `#projects` section. Commit and push each of the three repositories to publish these changes. Local preview on port 8100 uses the production project links.
