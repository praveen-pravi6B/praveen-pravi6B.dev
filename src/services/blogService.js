/**
 * Blog Service
 *
 * Metadata from Google Sheet (blog tab) — published as TSV (tab-separated).
 * Content from public GitHub Gists — no API key needed.
 *
 * Sheet columns: title | date | summary | gist | image | tags | devto | medium
 *
 * Using TSV (not CSV) so commas in summaries don't break parsing.
 * Publish: File → Share → Publish to web → blog tab → Tab-separated values → Publish
 *
 * To add a blog post:
 *   1. Write markdown in any editor
 *   2. Paste into gist.github.com → Create public gist
 *   3. Copy the Gist ID from the URL
 *   4. Add a row in the blog sheet with metadata + Gist ID
 *   5. (Optional) add dev.to / medium URL in those columns
 */

// Update after publishing the blog sheet as TSV:
// File → Share → Publish to web → blog tab → Tab-separated values (.tsv) → Publish
const BLOG_TSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQxFWwjf1vyxRQiaLkdsl-OomxIPYHLdCNNNqtsnjj-wswqT0SiiHOT8lW4tNAvqIHxDuNiCpK-LW6U/pub?gid=888445754&single=true&output=tsv'

function parseTsv(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split('\t').map(h => h.trim())
  return lines.slice(1)
    .map((line, i) => {
      const vals = line.split('\t').map(v => v.trim())
      const obj = { id: i }
      headers.forEach((h, idx) => { obj[h] = vals[idx] ?? '' })
      // tags: pipe-separated → array
      obj.tags = obj.tags ? obj.tags.split('|').map(t => t.trim()).filter(Boolean) : []
      return obj
    })
    .filter(p => p.title)
}

/** Fetch all blog post metadata from Google Sheet (TSV) */
export async function fetchPosts() {
  try {
    const r = await fetch(BLOG_TSV_URL)
    if (!r.ok) return []
    return parseTsv(await r.text())
  } catch {
    return []
  }
}

/** Fetch raw markdown content from a public GitHub Gist */
export async function fetchGistContent(gistId) {
  if (!gistId) throw new Error('No gist ID provided')
  const meta = await fetch(`https://api.github.com/gists/${gistId}`)
  if (!meta.ok) throw new Error(`Gist not found: ${gistId}`)
  const data = await meta.json()
  const files = Object.values(data.files)
  if (!files.length) throw new Error('Gist has no files')
  const rawUrl = files[0].raw_url
  const content = await fetch(rawUrl)
  if (!content.ok) throw new Error('Failed to fetch gist content')
  return content.text()
}
