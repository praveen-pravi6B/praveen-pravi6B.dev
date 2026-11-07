import { watchEffect } from "vue";

const DEFAULT_TITLE = "Praveen Kumar — Frontend Developer & AI Builder";
const DEFAULT_DESCRIPTION =
  "Portfolio of Praveen Kumar — frontend developer building fast, local-first products and AI tools.";

/**
 * Keeps `document.title` and the description meta in sync with the current
 * view. Pass a getter so values can update once data finishes loading.
 */
export function usePageMeta(getMeta) {
  watchEffect(() => {
    const meta = getMeta() || {};

    document.title = meta.title
      ? `${meta.title} — Praveen Kumar`
      : DEFAULT_TITLE;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        "content",
        meta.description || DEFAULT_DESCRIPTION
      );
    }
  });
}
