import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const built = process.argv.includes('--dist');
const root = fileURLToPath(new URL(built ? '../dist/' : '../', import.meta.url));
const allowed = new Set(['index.html', 'works/index.html', 'skills/index.html', 'contact/index.html', 'styles.css', 'main.js', 'landing.js', 'navigation.js', 'pointer-effects.js', 'design-settings.js', 'materials/content.json']);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.pdf': 'application/pdf' };

const server = createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, `.${pathname}`);
    if (file !== path.resolve(root) && !file.startsWith(root)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const relative = path.relative(root, file).split(path.sep).join('/');
    if (!allowed.has(relative) && !(relative.startsWith('materials/data/') && !relative.split('/').some(part => part.startsWith('.')))) {
      res.writeHead(404).end('Not found');
      return;
    }
    const content = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch (error) {
    const status = error instanceof URIError ? 400 : ['ENOENT', 'ENOTDIR', 'EISDIR'].includes(error.code) ? 404 : 500;
    res.writeHead(status).end(status === 404 ? 'Not found' : 'Request failed');
  }
});

server.on('error', (error) => {
  console.error(`Could not start server: ${error.message}`);
  process.exitCode = 1;
});
server.listen(8100, '127.0.0.1', () => console.log('Local site: http://localhost:8100'));
