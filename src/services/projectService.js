/**
 * Project Service
 *
 * Metadata from Google Sheet (projects tab, gid=0) — published as CSV.
 *
 * Sheet columns: title | description | techStack | image | link | blogurl
 *
 * blogurl — optional: gist ID (→ /blog/:gistId) or full URL (external)
 *   Leave blank if there's no associated blog post.
 *
 * To add a project: add a row to the Google Sheet.
 * To link a blog post: paste the gist ID or full URL in the blogurl column.
 */

const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQxFWwjf1vyxRQiaLkdsl-OomxIPYHLdCNNNqtsnjj-wswqT0SiiHOT8lW4tNAvqIHxDuNiCpK-LW6U/pub?gid=0&single=true&output=csv'

function parseCsv(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map(h => h.trim())
  return lines.slice(1)
    .map((line, i) => {
      // Handle quoted fields (commas inside quotes)
      const vals = []
      let cur = '', inQ = false
      for (const ch of line) {
        if (ch === '"') { inQ = !inQ }
        else if (ch === ',' && !inQ) { vals.push(cur.trim()); cur = '' }
        else cur += ch
      }
      vals.push(cur.trim())

      const obj = { id: i }
      headers.forEach((h, idx) => { obj[h] = vals[idx] ?? '' })
      return obj
    })
    .filter(p => p.title)
}

export function parseTags(str) {
  if (!str) return []
  return str.split('|').map(t => t.trim()).filter(Boolean)
}

/** Resolve blogurl → internal route or external URL */
export function resolveBlogUrl(blogurl) {
  if (!blogurl) return null
  if (blogurl.startsWith('http')) return { href: blogurl, external: true }
  return { href: `/blog/${blogurl}`, external: false }
}

let cache = null

export async function fetchProjects() {
  if (cache) return cache
  try {
    const r = await fetch(CSV_URL)
    if (!r.ok) return []
    cache = parseCsv(await r.text())
    return cache
  } catch {
    return []
  }
}
