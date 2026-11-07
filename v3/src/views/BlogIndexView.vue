<script setup>
import { computed, onMounted, ref } from "vue";
import { fetchPosts } from "../services/blogService";
import { usePageMeta } from "../composables/usePageMeta";

const posts = ref([]);
const loading = ref(true);
const activeTag = ref("all");

usePageMeta(() => ({
  title: "Notes",
  description:
    "Notes by Praveen Kumar on frontend engineering, local-first AI, and shipping products.",
}));

onMounted(async () => {
  try {
    posts.value = await fetchPosts();
  } finally {
    loading.value = false;
  }
});

const tags = computed(() => {
  const unique = new Set();
  posts.value.forEach((post) => post.tags.forEach((tag) => unique.add(tag)));
  return [...unique];
});

const filtered = computed(() => {
  if (activeTag.value === "all") return posts.value;
  return posts.value.filter((post) => post.tags.includes(activeTag.value));
});

function pad(index) {
  return String(index + 1).padStart(2, "0");
}
</script>

<template>
  <div class="blog-page">
    <header class="page-head" v-reveal>
      <div class="page-head-top">
        <span class="sec-index">04 — Notes</span>
        <span class="page-count">
          {{ loading ? "—" : `${posts.length} entries` }}
        </span>
      </div>
      <h1>Written <em>in public.</em></h1>
      <p class="page-lede">
        Short notes on building, local AI, and the messy middle of product work.
        Everything here is written while it is still fresh.
      </p>
    </header>

    <div class="tag-filter" v-if="tags.length" v-reveal>
      <button
        v-for="tag in ['all', ...tags]"
        :key="tag"
        type="button"
        :class="{ active: activeTag === tag }"
        @click="activeTag = tag"
      >
        {{ tag }}
      </button>
    </div>

    <div class="post-list" v-if="loading">
      <div class="post-row post-row--skeleton" v-for="n in 3" :key="n">
        <span class="post-num">0{{ n }}</span>
        <div class="post-body">
          <span class="sk-line sk-line--short"></span>
          <span class="sk-line sk-line--title"></span>
          <span class="sk-line"></span>
        </div>
        <span class="post-thumb"></span>
        <span class="post-arrow"></span>
      </div>
    </div>

    <div class="post-list" v-else-if="filtered.length">
      <RouterLink
        v-for="(post, index) in filtered"
        :key="post.gist || post.id"
        class="post-row"
        :to="`/blog/${post.gist}`"
        v-reveal
      >
        <span class="post-num">{{ pad(index) }}</span>

        <div class="post-body">
          <div class="post-meta">
            <time>{{ post.date }}</time>
            <span class="post-dot" aria-hidden="true"></span>
            <span class="post-tags">{{ post.tags.join(" / ") || "Note" }}</span>
          </div>
          <h2>{{ post.title }}</h2>
          <p>{{ post.summary }}</p>
        </div>

        <span class="post-thumb" v-if="post.image">
          <img
            :src="post.image"
            alt=""
            loading="lazy"
            referrerpolicy="no-referrer"
          />
        </span>
        <span class="post-thumb" v-else aria-hidden="true"></span>

        <span class="post-arrow">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 12 12 4M5 4h7v7" />
          </svg>
        </span>
      </RouterLink>
    </div>

    <p v-else class="state-note">
      No notes found<span v-if="activeTag !== 'all'"> for “{{ activeTag }}”</span>.
    </p>
  </div>
</template>
