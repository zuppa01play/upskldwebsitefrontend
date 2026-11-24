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

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  headless: true,
});

for (const route of ROUTES) {
  const page = await browser.newPage();

  // Block video/font/image requests to speed up rendering
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const type = req.resourceType();
    if (['media', 'font', 'image'].includes(type)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(`http://localhost:4173${route}`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  // Wait for React root to have content
  await page.waitForSelector('#root > *', { timeout: 15000 });

  // Wait until Helmet has set this route's canonical (path must match route)
  await page.waitForFunction(() => {
    const c = document.querySelector('link[rel="canonical"]');
    if (!c) return false;
    const norm = (p) => p.replace(/\/+$/, '') || '/';
    return norm(new URL(c.href).pathname) === norm(location.pathname);
  }, { timeout: 15000 });

  // Remove popup/modal/overlay elements that shouldn't be in the snapshot
  await page.evaluate(() => {
    const selectors = [
      '[class*="popup"]',
      '[class*="modal"]',
      '[class*="overlay"]',
      '[class*="Popup"]',
      '[class*="Modal"]',
      '[class*="video"]',
      '[class*="Video"]',
    ];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => el.remove());
    });

    // Remove scripts/iframes injected at runtime by GTM/GA.
    // The original inline GTM snippet in <head> has no src, so it stays.
    document
      .querySelectorAll(
        'script[src*="googletagmanager.com"], script[src*="google-analytics.com"], iframe[src*="googletagmanager.com"]:not(noscript iframe)'
      )
      .forEach((el) => el.remove());
  });

  const html = await page.content();

  if (route === '/') {
    writeFileSync(join(BUILD, 'index.html'), html);
  } else {
    mkdirSync(join(BUILD, route), { recursive: true });
    writeFileSync(join(BUILD, route, 'index.html'), html);
  }

  console.log('✓ prerendered', route);
  await page.close();
}

await browser.close();
server.close();
console.log('\n✅ Prerender complete. All routes have static HTML.');