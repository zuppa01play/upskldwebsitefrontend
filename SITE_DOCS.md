# Site Documentation — upskldai.com & shop.zuppa.io

---

## 1. upskldai.com

### Stack
- React (Create React App), single-page app
- Puppeteer-based postbuild prerendering (`prerender.mjs`)
- Served via Nginx from `/var/www/upskldai/`
- Repo: `~/upskld_com/upskldwebsitefrontend`

### Routes
| Route | Priority | Change Freq |
|---|---|---|
| `/` | 1.0 | weekly |
| `/aboutus` | 0.8 | monthly |
| `/privacypolicy` | 0.3 | yearly |
| `/termsandconditions` | 0.3 | yearly |

### Key Files
| File | Purpose |
|---|---|
| `src/Components/HomeAiPage/HomeAiPage.js` | Main landing page — Impact Explorer metrics (Professional + Student) |
| `src/Components/HomeAiPage/HomeAiPage.css` | Styles — `.impac_ai_home_pg_x_heading` for value headings |
| `public/index.html` | SEO meta, OG tags, Twitter card, JSON-LD EducationalOrganization schema |
| `public/robots.txt` | Allows all crawlers + explicit AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) |
| `public/sitemap.xml` | 4 URLs with lastmod 2025-07-01 |
| `prerender.mjs` | Puppeteer script — visits 4 routes, saves full HTML into `build/` |
| `package.json` | `"postbuild": "node prerender.mjs"` — prerender runs automatically after build |

### Impact Explorer Data Structure
```js
// professionalMetrics & studentMetrics — same shape
{
  id: 'sales',
  name: 'Sales',           // sidebar label
  value: 'Heading text',   // large heading in panel
  unit: 'Subheading text', // subheading in panel
  taught: '...',           // unused / future
  // bars: [],             // commented out — future use
  text: 'Body copy...'     // paragraph in panel
}
```

### Local Development
```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm start

# Production build + prerender
npm run build
```

### Deploy to Server
```bash
cd ~/upskld_com/upskldwebsitefrontend

git pull

npm install

npm run build
# ↑ also runs prerender.mjs automatically (postbuild)

sudo rm -rf /var/www/upskldai/*

sudo cp -a build/. /var/www/upskldai/

sudo chown -R root:www-data /var/www/upskldai

sudo find /var/www/upskldai -type d -exec chmod 755 {} \;

sudo find /var/www/upskldai -type f -exec chmod 644 {} \;

# Verify live
curl -I https://upskldai.com
```

### Verify Prerendering (check HTML in source)
```bash
# Should return full HTML with content inside <div id="root">
curl https://upskldai.com/ | grep -o '<div id="root">.\{0,200\}'

# Check all 4 prerendered routes exist in build/
ls build/aboutus/index.html
ls build/privacypolicy/index.html
ls build/termsandconditions/index.html
```

### Verify SEO Files
```bash
curl https://upskldai.com/robots.txt
curl https://upskldai.com/sitemap.xml
```

### Google Search Console
- URL: https://search.google.com/search-console
- Submit sitemap: `https://upskldai.com/sitemap.xml`
- Request indexing for each route after deploy
- Crawl takes 3–14 days after submission

---

## 2. shop.zuppa.io

### Stack
- React (Create React App), single-page app
- Puppeteer-based postbuild prerendering (same pattern as upskldai.com)
- Served via Nginx
- Same team, same architecture

### SEO Status (verified 2025-07)
- Fully prerendered — complete HTML returned by curl
- Header, products, solutions, case studies, clients, footer all in source
- Comprehensive sitemap: 75+ URLs with lastmod/changefreq/priority
- robots.txt: `User-agent: * Allow: /` with correct Disallow for admin/cart/auth pages
- AI crawlers covered by `User-agent: *` (no explicit listing needed, but can be added)

### robots.txt — Recommended Addition
```
# Current (covers AI bots via wildcard — sufficient)
User-agent: *
Allow: /

# Optional explicit AI bot entries (for clarity)
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /
```

### Verify Prerendering
```bash
curl https://shop.zuppa.io/ | grep -o '<div id="root">.\{0,200\}'
```

### Verify SEO Files
```bash
curl https://shop.zuppa.io/robots.txt
curl https://shop.zuppa.io/sitemap.xml
```

### Check HTTP Headers
```bash
curl -I https://shop.zuppa.io
```

---

## 3. Shared Prerender Architecture

`prerender.mjs` runs as `postbuild` in both projects. It:
1. Spins up a local static server on port 4173 pointing at `build/`
2. Launches headless Chromium via Puppeteer
3. Visits each route, waits for React to render
4. Removes any popups/modals from the DOM
5. Saves the full rendered HTML as `build/<route>/index.html`

This makes the React SPA crawlable by Google, Bing, and AI bots without needing Next.js or SSR.

### Prerender Flow
```
npm run build
  └── react-scripts build   → build/
  └── node prerender.mjs    → overwrites build/ routes with full HTML
        ├── build/index.html
        ├── build/aboutus/index.html
        ├── build/privacypolicy/index.html
        └── build/termsandconditions/index.html
```

---

## 4. Indexing & Visibility Timeline

### After Every Deploy — Action Checklist
| Step | Action | Where |
|---|---|---|
| 1 | Deploy site + verify `curl -I` returns 200 | Terminal |
| 2 | Submit sitemap | Google Search Console |
| 3 | Request indexing for `/`, `/aboutus` | Google Search Console → URL Inspection |
| 4 | Check `site:upskldai.com` in Google | Google Search |

### Google Search Timeline
| Milestone | Expected Time | Notes |
|---|---|---|
| Googlebot visits after sitemap submit | 1–3 days | Faster if site is new submission |
| First pages appear in Google index | 3–14 days | Homepage usually first |
| All 4 routes indexed | 1–4 weeks | Use URL Inspection to force-request each |
| Ranking for brand name (upskldai) | 1–2 weeks after indexing | Low competition, should rank fast |
| Ranking for generic keywords | 3–6 months | Depends on content quality + backlinks |

### AI Crawlers Timeline (ChatGPT, Perplexity, Claude)
| Bot | Crawl Frequency | When Content Appears in AI Answers |
|---|---|---|
| GPTBot (OpenAI) | Every few weeks | ChatGPT training data — months to years (next model update) |
| ChatGPT-User (live browsing) | On-demand per query | Immediate — if user asks ChatGPT to browse your URL |
| PerplexityBot | Every few days | 1–2 weeks — Perplexity uses live web index |
| ClaudeBot (Anthropic) | Periodic crawl | Training data only — months to years (next model update) |
| Google-Extended (Gemini) | Same as Googlebot | Gemini live answers: days after Google indexes the page |

> Key insight: AI bots like GPTBot and ClaudeBot crawl for **training data** — your content won't appear in ChatGPT/Claude answers until their next model is trained (months away). But **Perplexity** and **Gemini** use live web search, so they reflect your content within days of Google indexing it.

### Bing / Other Search Engines
| Engine | Timeline |
|---|---|
| Bing | Submit at https://www.bing.com/webmasters — 3–7 days |
| DuckDuckGo | Pulls from Bing — automatic after Bing indexes |
| Yahoo | Pulls from Bing — automatic |

### How to Check Indexing Status
```bash
# Check if Google has indexed your pages (run in browser)
# site:upskldai.com
# site:shop.zuppa.io

# Check when Googlebot last visited
curl -I https://upskldai.com
# Look for: X-Robots-Tag, Last-Modified headers

# Test if a specific URL is indexed
# Google Search Console → URL Inspection → paste URL → Request Indexing
```

### Sitemap Submission URLs
- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters
- upskldai.com sitemap: `https://upskldai.com/sitemap.xml`
- shop.zuppa.io sitemap: `https://shop.zuppa.io/sitemap.xml`

---

## 5. Quick Reference — All Commands

### upskldai.com — Full Deploy
```bash
cd ~/upskld_com/upskldwebsitefrontend && git pull && npm install && npm run build && sudo rm -rf /var/www/upskldai/* && sudo cp -a build/. /var/www/upskldai/ && sudo chown -R root:www-data /var/www/upskldai && sudo find /var/www/upskldai -type d -exec chmod 755 {} \; && sudo find /var/www/upskldai -type f -exec chmod 644 {} \; && curl -I https://upskldai.com
```

### Verify Both Sites Are Live & Prerendered
```bash
curl -I https://upskldai.com
curl -I https://shop.zuppa.io
curl https://upskldai.com/ | grep -c "<div"
curl https://shop.zuppa.io/ | grep -c "<div"
```

### Check Sitemaps
```bash
curl https://upskldai.com/sitemap.xml
curl https://shop.zuppa.io/sitemap.xml
```

### Check Robots
```bash
curl https://upskldai.com/robots.txt
curl https://shop.zuppa.io/robots.txt
```
