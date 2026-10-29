<template>
  <div class="blog-page">
    <div class="container">
      <!-- Header -->
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
          class="tf-btn"
          :class="{ active: activeTag === tag }"
          @click="activeTag = tag"
        >{{ tag }}</button>
      </div>

      <!-- Skeleton -->
      <div v-if="loading">
        <div class="featured-sk">
          <div class="sk-img-feat"></div>
          <div class="sk-feat-body">
            <div class="sk-line sk-date"></div>
            <div class="sk-line sk-title-feat"></div>
            <div class="sk-line sk-title-feat" style="width:65%"></div>
            <div class="sk-line sk-summary"></div>
            <div class="sk-line sk-summary" style="width:80%"></div>
          </div>
        </div>
        <div class="posts-grid">
          <BlogCard v-for="n in 4" :key="n" :skeleton="true" />
        </div>
      </div>

      <div v-else-if="!posts.length" class="state-msg">No posts yet.</div>

      <div v-else>
        <!-- Featured first post (always shown regardless of filter) -->
        <RouterLink v-if="filtered[0]" :to="`/blog/${filtered[0].gist}`" class="featured-card">
          <div class="feat-img-wrap">
            <img v-if="filtered[0].image" :src="filtered[0].image" :alt="filtered[0].title"
                 class="feat-img" @error="e => e.target.parentElement.classList.add('no-img')" />
            <div v-else class="feat-default-cover">
              <span class="feat-initial">{{ filtered[0].title?.charAt(0) }}</span>
              <span class="feat-words">{{ filtered[0].title?.split(' ').slice(0,3).join(' ') }}</span>
            </div>
          </div>
          <div class="feat-body">
            <div class="feat-meta">
              <span class="feat-date">{{ filtered[0].date }}</span>
              <div class="feat-tags">
                <span v-for="tag in filtered[0].tags" :key="tag" class="bc-tag">{{ tag }}</span>
              </div>
            </div>
            <h2 class="feat-title">{{ filtered[0].title }}</h2>
            <p class="feat-summary">{{ filtered[0].summary }}</p>
            <div class="feat-actions">
              <span class="feat-read">Read more <i class="fa-solid fa-arrow-right"></i></span>
              <a v-if="filtered[0].devto" :href="filtered[0].devto" target="_blank" rel="noopener"
                 class="bc-ext-btn" @click.stop>
                <i class="fa-brands fa-dev"></i> Dev.to
              </a>
              <a v-if="filtered[0].medium" :href="filtered[0].medium" target="_blank" rel="noopener"
                 class="bc-ext-btn" @click.stop>
                <i class="fa-brands fa-medium"></i> Medium
              </a>
            </div>
          </div>
        </RouterLink>

        <!-- Rest of posts grid -->
        <div class="posts-grid" v-if="filtered.slice(1).length">
          <BlogCard
            v-for="post in filtered.slice(1)" :key="post.gist || post.id"
            :post="post"
          />
        </div>
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

/* ── Featured card ─────────────────── */
.featured-card {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 0; background: var(--card-bg);
  border: var(--border-width) var(--border-style) var(--card-border);
  border-radius: var(--r); overflow: hidden;
  margin-bottom: 1rem; text-decoration: none;
  transition: border-color .25s, transform .25s, box-shadow .25s;
}
.featured-card:hover { border-color: var(--card-hover-border); transform: translateY(-3px); box-shadow: var(--card-shadow); }

.feat-img-wrap { height: 300px; overflow: hidden; position: relative; }
.feat-img { width: 100%; height: 100%; object-fit: cover; }
.feat-default-cover {
  position: absolute; inset: 0; background: var(--grad);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}
.feat-initial {
  font-size: 9rem; font-weight: 900; color: rgba(255,255,255,.2);
  line-height: 1; letter-spacing: -.05em;
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
}
.feat-words {
  position: relative; z-index: 1;
  font-size: .85rem; font-weight: 700; color: rgba(255,255,255,.9);
  text-transform: uppercase; letter-spacing: .05em; text-align: center; max-width: 80%;
}

.feat-body { padding: 2.5rem; display: flex; flex-direction: column; gap: .9rem; justify-content: center; }
.feat-meta { display: flex; align-items: center; gap: .8rem; flex-wrap: wrap; }
.feat-date { font-size: .72rem; font-weight: 600; color: var(--a2); text-transform: uppercase; letter-spacing: .08em; }
.feat-tags { display: flex; gap: .4rem; flex-wrap: wrap; }
.bc-tag { font-size: .65rem; font-weight: 500; padding: .15rem .5rem; border-radius: 999px; background: var(--tag-bg); border: 1px solid var(--tag-border); color: var(--tag-color); }
.feat-title { font-size: 1.6rem; font-weight: 700; line-height: 1.2; color: var(--text); letter-spacing: -.03em; }
.feat-summary { font-size: .9rem; color: var(--muted); line-height: 1.75; flex: 1; }
.feat-actions { display: flex; align-items: center; gap: .6rem; flex-wrap: wrap; }
.feat-read { display: inline-flex; align-items: center; gap: .35rem; font-size: .85rem; font-weight: 600; color: var(--a2); transition: gap .2s; }
.featured-card:hover .feat-read { gap: .6rem; }
.bc-ext-btn {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .72rem; font-weight: 600; padding: .25rem .65rem; border-radius: 999px;
  border: 1px solid var(--border); background: var(--bg2); transition: all .2s; color: var(--muted);
}
.bc-ext-btn:hover { border-color: var(--a2); color: var(--a2); }

/* ── Posts grid ────────────────────── */
.posts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }

/* ── Skeleton ──────────────────────── */
@keyframes shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
.featured-sk { display: grid; grid-template-columns: 1fr 1fr; background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--r); margin-bottom: 1rem; overflow: hidden; }
.sk-img-feat { height: 300px; background: linear-gradient(90deg,var(--s1) 25%,var(--bg2,#0f0f1c) 50%,var(--s1) 75%); background-size: 1200px 100%; animation: shimmer 1.6s infinite linear; }
.sk-feat-body { padding: 2.5rem; display: flex; flex-direction: column; gap: .9rem; }
.sk-line { border-radius: 6px; background: linear-gradient(90deg,var(--s1) 25%,var(--bg2,#0f0f1c) 50%,var(--s1) 75%); background-size: 1200px 100%; animation: shimmer 1.6s infinite linear; }
.sk-date { height: 10px; width: 80px; }
.sk-title-feat { height: 22px; width: 100%; }
.sk-summary { height: 12px; width: 100%; }

/* ── Responsive ────────────────────── */
@media (max-width: 768px) {
  .featured-card { grid-template-columns: 1fr; }
  .feat-img-wrap { height: 220px; }
  .feat-body { padding: 1.4rem; }
  .feat-title { font-size: 1.3rem; }
  .posts-grid { grid-template-columns: 1fr 1fr; }
  .featured-sk { grid-template-columns: 1fr; }
  .sk-img-feat { height: 200px; }
}
@media (max-width: 480px) { .posts-grid { grid-template-columns: 1fr; } }
</style>
