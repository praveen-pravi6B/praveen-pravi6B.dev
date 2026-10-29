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

| Route | Page |
|-------|------|
| `/` | Homepage — all sections |
| `/blog` | Full blog listing with tag filter |
| `/blog/:gistId` | Single post — full rendered markdown |

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

## License

MIT
