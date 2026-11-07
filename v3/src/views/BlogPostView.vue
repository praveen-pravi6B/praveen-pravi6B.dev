<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";
import {
  asUrl,
  fetchDevtoArticles,
  fetchGistContent,
  fetchPosts,
  resolveDevtoUrl,
} from "../services/blogService";
import { usePageMeta } from "../composables/usePageMeta";
import GiscusComments from "../components/GiscusComments.vue";

marked.setOptions({ breaks: true, gfm: true });

const route = useRoute();

const loading = ref(true);
const error = ref("");
const meta = ref(null);
const rendered = ref("");
const fallbackTitle = ref("");
const devtoUrl = ref("");

const title = computed(
  () => meta.value?.title || fallbackTitle.value || "Note"
);

const mediumUrl = computed(() => asUrl(meta.value?.medium));

usePageMeta(() => ({
  title: title.value,
  description: meta.value?.summary,
}));

async function load() {
  loading.value = true;
  error.value = "";
  meta.value = null;
  rendered.value = "";
  fallbackTitle.value = "";
  devtoUrl.value = "";

  try {
    const gistId = route.params.gistId;

    const [posts, rawMarkdown, devtoArticles] = await Promise.all([
      fetchPosts(),
      fetchGistContent(gistId),
      fetchDevtoArticles(),
    ]);

    meta.value = posts.find((post) => post.gist === gistId) ?? null;

    const body = rawMarkdown.replace(/^---[\s\S]*?---\n*/m, "").trim();
    const heading = body.match(/^#\s+(.+)$/m);
    fallbackTitle.value = heading ? heading[1].trim() : "";
    rendered.value = marked(body);

    devtoUrl.value = resolveDevtoUrl(
      meta.value || { title: fallbackTitle.value },
      devtoArticles
    );
  } catch (caught) {
    error.value = caught.message ?? "Failed to load this note.";
  } finally {
    loading.value = false;
  }
}

onMounted(load);
watch(() => route.params.gistId, load);
</script>

<template>
  <div class="post-page">
    <RouterLink to="/blog" class="back-link">
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M13 8H3M7 4 3 8l4 4" />
      </svg>
      All notes
    </RouterLink>

    <div v-if="loading" class="post-loading" aria-live="polite">
      <span class="sk-line sk-line--short"></span>
      <span class="sk-line sk-line--title"></span>
      <span class="sk-line"></span>
      <span class="sk-line"></span>
    </div>

    <div v-else-if="error" class="post-error" role="alert">
      <span class="sec-index">Nothing here</span>
      <h1>That note could not be loaded.</h1>
      <p>{{ error }}</p>
      <RouterLink to="/blog" class="btn btn-dark">
        Back to all notes
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 12 12 4M5 4h7v7" />
        </svg>
      </RouterLink>
    </div>

    <article v-else class="post-article">
      <header class="post-header">
        <div class="post-kicker">
          <time v-if="meta?.date">{{ meta.date }}</time>
          <span v-if="meta?.date && meta?.tags?.length" aria-hidden="true">·</span>
          <span v-if="meta?.tags?.length">{{ meta.tags.join(" / ") }}</span>
        </div>

        <h1>{{ title }}</h1>

        <p v-if="meta?.summary" class="post-summary">{{ meta.summary }}</p>

        <div class="post-actions" v-if="devtoUrl || mediumUrl">
          <a
            v-if="devtoUrl"
            :href="devtoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-dark"
          >
            Read at Dev.to
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 12 12 4M5 4h7v7" />
            </svg>
          </a>
          <a
            v-if="mediumUrl"
            :href="mediumUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-ghost"
          >
            Read on Medium
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 12 12 4M5 4h7v7" />
            </svg>
          </a>
        </div>
      </header>

      <img
        v-if="meta?.image"
        class="post-cover"
        :src="meta.image"
        :alt="title"
        loading="lazy"
        referrerpolicy="no-referrer"
      />

      <div class="prose" v-html="rendered"></div>

      <GiscusComments />
    </article>
  </div>
</template>
