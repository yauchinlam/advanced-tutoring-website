import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('out');
const port = Number(process.env.PORT ?? 3000);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.txt': 'text/plain',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

await stat(resolve(root, 'index.html')).catch(() => {
  throw new Error('Production export missing. Run npm run build first.');
});
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, 'http://localhost').pathname,
    );
    const file = resolve(
      root,
      `.${pathname.endsWith('/') ? pathname + 'index.html' : pathname}`,
    );
    if (!file.startsWith(root + sep)) {
      res.writeHead(403).end();
      return;
    }
    const body = await readFile(file);
    res
      .writeHead(200, {
        'Content-Type': types[extname(file)] ?? 'application/octet-stream',
      })
      .end(body);
  } catch {
    const body = await readFile(resolve(root, '404.html'));
    res
      .writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
      .end(body);
  }
}).listen(port, '0.0.0.0', () =>
  console.log(`Production preview: http://localhost:${port}`),
);
