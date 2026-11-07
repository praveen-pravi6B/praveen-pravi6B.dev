/**
 * Blog service for the v3 app.
 *
 * Metadata comes from the published Google Sheet (blog tab, TSV) and the
 * article body from a public GitHub Gist. No API keys required.
 *
 * Sheet columns: title | date | summary | gist | image | tags | devto | medium
 */

const BLOG_TSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxFWwjf1vyxRQiaLkdsl-OomxIPYHLdCNNNqtsnjj-wswqT0SiiHOT8lW4tNAvqIHxDuNiCpK-LW6U/pub?gid=888445754&single=true&output=tsv";

function parseTsv(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split("\t").map((header) => header.trim());

  return lines
    .slice(1)
    .map((line, index) => {
      const values = line.split("\t").map((value) => value.trim());
      const post = { id: index };

      headers.forEach((header, column) => {
        post[header] = values[column] ?? "";
      });

      post.tags = post.tags
        ? post.tags
            .split("|")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [];

      return post;
    })
    .filter((post) => post.title);
}

/** Fetch every post's metadata from the published sheet. */
export async function fetchPosts() {
  try {
    const response = await fetch(BLOG_TSV_URL);
    if (!response.ok) return [];
    return parseTsv(await response.text());
  } catch (error) {
    return [];
  }
}

/** Fetch the raw markdown for one public gist. */
export async function fetchGistContent(gistId) {
  if (!gistId) throw new Error("No gist ID provided");

  const meta = await fetch(`https://api.github.com/gists/${gistId}`);
  if (!meta.ok) throw new Error(`Gist not found: ${gistId}`);

  const data = await meta.json();
  const files = Object.values(data.files || {});
  if (!files.length) throw new Error("Gist has no files");

  const content = await fetch(files[0].raw_url);
  if (!content.ok) throw new Error("Failed to fetch gist content");

  return content.text();
}

/** Only return URLs so optional columns never render broken links. */
export function asUrl(value) {
  return /^https?:\/\//i.test(value || "") ? value : "";
}
