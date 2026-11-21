import puppeteer from 'puppeteer';
import handler from 'serve-handler';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BUILD = 'build';
const ROUTES = ['/', '/aboutus', '/privacypolicy', '/termsandconditions'];

const indexHtml = readFileSync(join(BUILD, 'index.html'));

const server = createServer((req, res) => {
  const isAsset = /\.\w+$/.test(req.url.split('?')[0]);
  if (isAsset) return handler(req, res, { public: BUILD });
  res.setHeader('Content-Type', 'text/html');
  res.end(indexHtml);
}).listen(4173);

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

for (const route of ROUTES) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:4173${route}`, { waitUntil: 'networkidle0' });
  const html = await page.content();
  if (route !== '/') mkdirSync(join(BUILD, route), { recursive: true });
  writeFileSync(join(BUILD, route, 'index.html'), html);
  console.log('prerendered', route);
  await page.close();
}

await browser.close();
server.close();