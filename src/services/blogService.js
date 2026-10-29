/**
 * Blog Service
 *
 * Metadata comes from the Google Sheet (same spreadsheet, 2nd tab — gid=1).
 * Content comes from public GitHub Gists (no API key needed).
 *
 * Google Sheet blog tab columns:
 *   title | date | summary | gist | image | tags | devto | medium
 *
 * To add a blog post:
 *   1. Paste your markdown into a NEW public GitHub Gist
 *   2. Copy the Gist ID (long hash in the URL)
 *   3. Add a row in the blog sheet with the metadata + Gist ID
 *   4. (Optional) paste the dev.to / medium URL in the respective columns
 */

const BLOG_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQxFWwjf1vyxRQiaLkdsl-OomxIPYHLdCNNNqtsnjj-wswqT0SiiHOT8lW4tNAvqIHxDuNiCpK-LW6U/pub?gid=1&single=true&output=csv'

function parseCsv(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map(h => h.trim())
  return lines.slice(1)
    .map((line, i) => {
      const vals = line.split(',').map(v => v.trim())
      const obj = { id: i }
      headers.forEach((h, idx) => { obj[h] = vals[idx] ?? '' })
      // tags: pipe-separated → array
      if (obj.tags) obj.tags = obj.tags.split('|').map(t => t.trim()).filter(Boolean)
      else obj.tags = []
      return obj
    })
    .filter(p => p.title)
}

/** Fetch all blog post metadata from Google Sheet */
export async function fetchPosts() {
  try {
    const r = await fetch(BLOG_CSV_URL)
    if (!r.ok) return []
    return parseCsv(await r.text())
  } catch {
    return []
  }
}

/** Fetch raw markdown content from a public GitHub Gist */
export async function fetchGistContent(gistId) {
  if (!gistId) throw new Error('No gist ID provided')
  // First get the gist metadata to find the raw URL for the first file
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
