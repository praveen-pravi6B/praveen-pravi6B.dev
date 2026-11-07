<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useTheme } from "../composables/useTheme";

/**
 * GitHub Discussions comments for blog posts. Reuses the v2 discussion thread
 * because giscus maps by pathname (`/blog/<gist>`).
 */
const REPO = "praveen-pravi6B/praveen-pravi6B.dev";
const REPO_ID = "R_kgDOQp20ig";
const CATEGORY = "Blog Comments";
const CATEGORY_ID = "DIC_kwDOQp20is4DJ_bR";

const wrap = ref(null);
const { isDark } = useTheme();

function giscusTheme() {
  return isDark.value ? "dark" : "light";
}

function loadScript() {
  if (!wrap.value) return;

  wrap.value.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.setAttribute("data-repo", REPO);
  script.setAttribute("data-repo-id", REPO_ID);
  script.setAttribute("data-category", CATEGORY);
  script.setAttribute("data-category-id", CATEGORY_ID);
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "top");
  script.setAttribute("data-theme", giscusTheme());
  script.setAttribute("data-lang", "en");
  script.setAttribute("crossorigin", "anonymous");
  script.async = true;

  wrap.value.appendChild(script);
}

onMounted(loadScript);

watch(isDark, (dark) => {
  const iframe = document.querySelector("iframe.giscus-frame");
  if (!iframe) return;

  iframe.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
    "https://giscus.app"
  );
});

onBeforeUnmount(() => {
  if (wrap.value) wrap.value.innerHTML = "";
});
</script>

<template>
  <section class="comments" aria-label="Comments">
    <span class="sec-index">Discussion</span>
    <h2>Leave a <em>note.</em></h2>
    <div ref="wrap" class="giscus-wrap"></div>
  </section>
</template>
