<template>
  <section id="blog" v-if="posts.length || loading">
    <div class="container">
      <div class="sec-tag">Blog</div>
      <div class="blog-header">
        <h2 class="sec-h">Things I've <span class="grad-text">written</span></h2>
        <RouterLink to="/blog" class="view-all" v-if="posts.length > 3">
          View all <i class="fa-solid fa-arrow-right"></i>
        </RouterLink>
      </div>

      <div v-if="loading" class="state-msg">Loading posts…</div>

      <div v-else class="blog-grid">
        <BlogCard v-for="post in posts.slice(0, 3)" :key="post.gist || post.id" :post="post" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchPosts } from '../services/blogService.js'
import BlogCard from './BlogCard.vue'

const posts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    posts.value = await fetchPosts()
  } catch {
    // Sheet not set up yet — hide section
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.state-msg { color: var(--muted); text-align: center; padding: 2rem; }

.blog-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; margin-bottom: 2.5rem; }
.blog-header .sec-h { margin-bottom: 0; }

.view-all {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .85rem; font-weight: 600; color: var(--a2);
  white-space: nowrap; transition: gap .2s;
}
.view-all:hover { gap: .7rem; }

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 480px) { .blog-grid { grid-template-columns: 1fr; } }
</style>
