<script setup>
import { computed, onMounted, ref } from "vue";
import { fetchPosts } from "../services/blogService";

const posts = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    posts.value = (await fetchPosts()).slice(0, 3);
  } finally {
    loading.value = false;
  }
});

const items = computed(() =>
  posts.value.map((post, index) => ({
    number: `N° 0${index + 1}`,
    tag: post.tags[0] || "Note",
    title: post.title,
    excerpt: post.summary,
    date: post.date,
    href: `/blog/${post.gist}`,
  }))
);
</script>

<template>
  <section class="section" id="notes">
    <div class="section-head" v-reveal>
      <div>
        <span class="sec-index">04 — Notes</span>
        <h2>Written <em>in public.</em></h2>
      </div>
      <div class="head-links">
        <p class="head-note">
          Short notes on building, local AI, and the messy middle of product
          work.
        </p>
        <RouterLink class="head-link" to="/blog">
          All notes
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </RouterLink>
      </div>
    </div>

    <div v-if="loading" class="notes-grid">
      <div v-for="n in 3" :key="n" class="note note--skeleton">
        <span class="sk-line sk-line--short"></span>
        <span class="sk-line sk-line--title"></span>
        <span class="sk-line"></span>
      </div>
    </div>

    <div v-else-if="items.length" class="notes-grid">
      <RouterLink
        v-for="note in items"
        :key="note.href"
        class="note"
        :to="note.href"
        v-reveal
      >
        <div class="note-top">
          <span class="note-num">{{ note.number }}</span>
          <span class="note-tag">{{ note.tag }}</span>
        </div>
        <h3>{{ note.title }}</h3>
        <p>{{ note.excerpt }}</p>
        <div class="note-foot">
          <span>{{ note.date }}</span>
          <span class="read">
            Read
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3 9 9 3M4 3h5v5" />
            </svg>
          </span>
        </div>
      </RouterLink>
    </div>

    <p v-else class="state-note">
      No notes yet. <RouterLink to="/blog">Visit the blog</RouterLink> to see
      what lands next.
    </p>
  </section>
</template>
