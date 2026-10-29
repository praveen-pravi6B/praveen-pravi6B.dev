<template>
  <div class="blog-page">
    <div class="container">
      <div class="bp-header">
        <RouterLink to="/" class="back-link">
          <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <div>
          <div class="sec-tag">Blog</div>
          <h1 class="sec-h">All posts</h1>
        </div>
      </div>

      <!-- Tag filter -->
      <div class="tag-filter" v-if="allTags.length">
        <button
          v-for="tag in ['all', ...allTags]" :key="tag"
          class="tf-btn" :class="{ active: activeTag === tag }"
          @click="activeTag = tag"
        >{{ tag }}</button>
      </div>

      <!-- Skeleton -->
      <div v-if="loading" class="post-grid">
        <BlogCard v-for="n in 6" :key="n" :skeleton="true" />
      </div>

      <div v-else-if="!filtered.length" class="state-msg">No posts found.</div>

      <!-- Posts -->
      <div v-else class="post-grid">
        <BlogCard
          v-for="post in filtered"
          :key="post.gist || post.id"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchPosts } from '../services/blogService.js'
import BlogCard from '../components/BlogCard.vue'

const posts = ref([])
const loading = ref(true)
const activeTag = ref('all')

onMounted(async () => {
  try { posts.value = await fetchPosts() }
  finally { loading.value = false }
})

const allTags = computed(() => {
  const set = new Set()
  posts.value.forEach(p => p.tags?.forEach(t => set.add(t)))
  return [...set]
})

const filtered = computed(() =>
  activeTag.value === 'all'
    ? posts.value
    : posts.value.filter(p => p.tags?.includes(activeTag.value))
)
</script>

<style scoped>
.blog-page { padding: 6rem 0 4rem; min-height: 100vh; }

.bp-header { margin-bottom: 2rem; }
.back-link {
  display: inline-flex; align-items: center; gap: .5rem;
  font-size: .85rem; font-weight: 500; color: var(--muted);
  margin-bottom: 1.5rem; transition: color .2s;
}
.back-link:hover { color: var(--text); }

.tag-filter { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 2rem; }
.tf-btn {
  padding: .35rem .9rem; border-radius: 999px; font-size: .8rem; font-weight: 500;
  border: 1px solid var(--border); background: transparent; color: var(--muted);
  cursor: pointer; transition: all .2s; font-family: var(--font-body);
}
.tf-btn:hover, .tf-btn.active { border-color: var(--a2); color: var(--a2); background: rgba(99,102,241,.08); }

.state-msg { color: var(--muted); text-align: center; padding: 3rem; }
.post-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
@media (max-width: 900px) { .post-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .post-grid { grid-template-columns: 1fr; } }
</style>
