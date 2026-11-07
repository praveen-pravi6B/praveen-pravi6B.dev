# praveen-pravi6B.dev

Personal portfolio of **Praveen Kumar** — Frontend Developer & Gen AI Builder.

Built with Vue 3 + Vite. Deployed on Cloudflare Pages at [praveen-pravi6b.pages.dev](https://praveen-pravi6b.pages.dev/).

---

## Features

- **4 switchable themes** — Dark, Cosmic (stars + cursor glow), Brutalist (stroke text), Minimal (white/clean)
- **Blog system** — posts managed via Google Sheet + GitHub Gists. No repo commits per post.
- **Projects** — fetched from Google Sheet CSV, shows tech stack tags
- **Skills** — dual auto-scrolling marquee
- **Routing** — `/blog` listing + `/blog/:gistId` for full post rendering
- **Satoshi font** — unified across all themes, zero layout shift on theme toggle
- **Dynamic stats** — Years Exp calculated automatically from Nov 10, 2022

---

## Tech Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Vue Router 4](https://router.vuejs.org/)
- [Marked](https://marked.js.org/) — markdown rendering
- [Satoshi](https://www.fontshare.com/fonts/satoshi) — Font Awesome 7
- Cloudflare Pages

---

## Project Setup

```bash
git clone https://github.com/praveen-pravi6B/praveen-pravi6B.dev.git
cd praveen-pravi6B.dev
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```

---

## Content Management

### Projects — Google Sheet

Projects are fetched from a public Google Sheet CSV (tab 1, gid=0).

**Columns:** `title | description | techStack | link | image`

- `techStack` — pipe-separated: `Vue3|Vite|Firebase`
- Add a project → add a row to the sheet. No deployment needed.

---

### Blog — Google Sheet + GitHub Gists

Blog posts use the **same Google Sheet, second tab (gid=1)**.

**Columns:** `title | date | summary | gist | image | tags | devto | medium`

| Column | Description | Example |
|--------|-------------|---------|
| `title` | Post title | Building PixelBreak |
| `date` | Date string | Oct 23 2026 |
| `summary` | One-liner for the card | How I built a local-first... |
| `gist` | GitHub Gist ID | `d4a8b2c1e5f3...` |
| `image` | Cover image URL | *(optional)* |
| `tags` | Pipe-separated | `ai\|frontend\|tools` |
| `devto` | Dev.to article URL | *(optional)* |
| `medium` | Medium article URL | *(optional)* |

#### How to publish a blog post

1. Write your post in markdown (any editor — VSCode, Obsidian, Notion, etc.)
2. Go to **[gist.github.com](https://gist.github.com)** → paste the markdown → **Create public gist**
3. Copy the **Gist ID** from the URL (the long hash after your username)
4. Add a row to the blog sheet tab with the metadata + Gist ID
5. ✅ Done — no deployment, no repo commits

#### If also published on Dev.to or Medium

Add the external URL in the `devto` or `medium` column.
The post page will automatically show **"Read at Dev.to ↗"** / **"Read on Medium ↗"** buttons.

#### Markdown file template (paste into Gist)

```markdown
---
title: My Post Title
date: 2026-10-29
summary: One-liner shown on the card
tags: ai|frontend
---

Your content here. Standard markdown.

## Section Heading

Paragraph text, **bold**, *italic*, `inline code`...

\`\`\`javascript
// Code blocks work too
const hello = 'world'
\`\`\`
```

> The `---` frontmatter block is optional. The app strips it before rendering.

---

## Routes

| Route | v3 (editorial) | v1 / v2 |
|-------|----------------|---------|
| `/` | Homepage — hero, work, about, capabilities, notes, contact | Same as before |
| `/blog` | Editorial note index with tag filter | v2 blog listing |
| `/blog/:gistId` | Single note — rendered markdown + comments | v2 single post |

Blog metadata comes from the published Google Sheet and article bodies from public GitHub Gists, so new posts still only need a new sheet row and a gist.

---

## Themes

Toggle in the navbar. Selection persists to `localStorage`.

| Theme | Style |
|-------|-------|
| **Dark** | Dark bg, blue/indigo gradient accents |
| **Cosmic** | Black + animated star field + neon cyan/purple + cursor glow trail |
| **Brutalist** | Cream bg + thick black borders + PRAVEEN/KUMAR stroke typography |
| **Minimal** | White + clean + scroll-aware navbar (white → dark on scroll) |

---

## ☁️ Versioned deployment (v1 / v2 / v3)

Three complete versions render on the **same domain and the same URL**. A `site_version` cookie decides which one is rendered at `/`:

| Cookie | Version | Source |
| --- | --- | --- |
| `site_version=v1` | Original glass portfolio | `archive/v1/` (prebuilt) |
| `site_version=v2` (default) | Current master — 4 themes, blog, projects, comments | `archive/v2/` (prebuilt) |
| `site_version=v3` | New editorial design (Vue 3 + Vite) | `v3/` → `dist/v3/` |

No cookie (or an unknown value) renders **v2**, the current stable version. Once v3 is stable, change `DEFAULT_VERSION` in `deploy/worker.js`.

The router lives in `deploy/worker.js` (copied to `dist/_worker.js`):

- `/api/version?to=v1|v2|v3` sets the cookie and redirects to `/`. Values `1`, `2`, `3` are also accepted.
- `?preview=v1|v2|v3` renders a version for one request **without changing the cookie**.
- HTML at `/` is served with `Cache-Control: no-store` and `Vary: Cookie`.
- `/blog` and `/blog/:id` follow the cookie: v3 renders its own editorial notes pages, while v1/v2 keep the v2 blog.
- `/projects` still serves the v2 shell (v3 has no separate projects route).
- A small floating **v1 / v2 / v3** switcher is injected into every variant.

### Branches

| Branch | Contents |
| --- | --- |
| `main_v1` | Original v1 source, frozen at `0e7fe58` |
| `main_v2` | Current v2 source, frozen at `efe3d27` |
| `v3` | This versioned deployment wrapper + the Vue 3 editorial app |
| `main` | Production — same commit as `v3` |

### Build output

`npm run build` compiles the v3 Vue app, then assembles the frozen v1/v2 builds:

```text
v3/                    Vue 3 editorial app (source)
└── src/               components, composables, content

dist/
├── v1/index.html        original build        (base /v1/)
├── v2/index.html        current master build  (base /v2/)
├── v3/index.html        Vue editorial build   (base /v3/)
├── v3/assets/           compiled v3 JS + CSS
├── favicon.* logo.png
└── _worker.js           cookie router + version switcher
```

`archive/v1/` and `archive/v2/` are committed Vite snapshots. Only v3 is compiled during the deploy (`npm run build:v3` → `dist-v3/` → `dist/v3/`), so the Cloudflare build still needs just one `npm install` and one `npm run build`.

`mockup-v4-editorial.html` remains in the repo as the static design reference; it is no longer part of the build.

To work on v3 locally:

```bash
npm run dev:v3      # http://localhost:5173/v3/ — try /v3/blog too
```

### Cloudflare Pages

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/`

The custom domain stays unchanged; the worker serves all three versions at `/`. Pushing to the production branch triggers the automatic deploy.

To test locally:

```bash
npm run preview:deploy     # wrangler pages dev dist
```

Then open `http://localhost:8788/` and use the floating switcher.

### Rebuilding an archived version

```bash
git worktree add --detach ../v1-src 0e7fe58
cd ../v1-src && npm ci && npx vite build --base=/v1/
rm -rf /path/to/repo/archive/v1 && cp -R dist /path/to/repo/archive/v1

git worktree add --detach ../v2-src efe3d27
cd ../v2-src && npm ci && npx vite build --base=/v2/
rm -rf /path/to/repo/archive/v2 && cp -R dist /path/to/repo/archive/v2
```

---

## License

MIT
