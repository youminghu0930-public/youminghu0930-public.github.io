import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { cp, mkdir, rm } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
execFileSync(process.execPath, [fileURLToPath(new URL('scripts/sync-design.mjs', root)), '--local', '--check'], { stdio: 'inherit' });
await rm(new URL('dist/', root), { recursive: true, force: true });
await mkdir(new URL('dist/', root), { recursive: true });
for (const file of ['index.html', 'works', 'skills', 'contact', 'styles.css', 'main.js', 'landing.js', 'navigation.js', 'pointer-effects.js', '.nojekyll', 'design-settings.js', 'materials/content.json', 'materials/data']) {
  await mkdir(new URL(`dist/${file.includes('/') ? file.slice(0, file.lastIndexOf('/')) + '/' : ''}`, root), { recursive: true });
  await cp(new URL(file, root), new URL(`dist/${file}`, root), { recursive: true });
}
console.log('Built portfolio in dist/.');
