<template>
  <section id="blog" v-if="posts.length || loading">
    <div class="container">
      <div class="sec-tag">Blog</div>
      <h2 class="sec-h">Things I've <span class="grad-text">written</span></h2>

      <div v-if="loading" class="state-msg">Loading posts…</div>

      <div v-else class="blog-grid">
        <a
          v-for="p in posts" :key="p.title"
          :href="p.link || '#'" target="_blank" rel="noopener"
          class="blog-card"
        >
          <div class="blog-img-wrap">
            <img v-if="p.image" :src="p.image" :alt="p.title" />
            <span v-else class="blog-img-placeholder">✍️</span>
          </div>
          <div class="blog-body">
            <div class="blog-meta">
              <span class="blog-date">{{ p.date }}</span>
            </div>
            <div class="blog-title">{{ p.title }}</div>
            <div class="blog-summary">{{ p.summary }}</div>
            <span class="blog-read">Read more <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Second sheet tab — user adds gid parameter when they set up the blog sheet
const BLOG_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQxFWwjf1vyxRQiaLkdsl-OomxIPYHLdCNNNqtsnjj-wswqT0SiiHOT8lW4tNAvqIHxDuNiCpK-LW6U/pub?gid=1&single=true&output=csv'

const posts = ref([])
const loading = ref(true)

const parseCsv = (text) => {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map(h => h.trim())
  return lines.slice(1).map((line, i) => {
    const vals = line.split(',').map(v => v.trim())
    const obj = { id: i }
    headers.forEach((h, idx) => { obj[h] = vals[idx] ?? '' })
    return obj
  })
}

onMounted(async () => {
  try {
    const r = await fetch(BLOG_CSV_URL)
    if (!r.ok) { loading.value = false; return }
    const text = await r.text()
    const parsed = parseCsv(text).filter(p => p.title)
    posts.value = parsed
  } catch {
    // Blog sheet not set up yet — hide section
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.state-msg { color: var(--muted); text-align: center; padding: 2rem; }

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.blog-card {
  background: var(--s1); border: 1px solid var(--border);
  border-radius: 16px; overflow: hidden;
  display: flex; flex-direction: column;
  transition: transform .25s, border-color .25s;
  cursor: pointer;
}
.blog-card:hover { transform: translateY(-3px); border-color: rgba(99,102,241,.35); }

.blog-img-wrap {
  height: 130px; background: var(--s2);
  display: flex; align-items: center; justify-content: center;
  border-bottom: 1px solid var(--border); overflow: hidden;
}
.blog-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.blog-img-placeholder { font-size: 2rem; }

.blog-body { padding: 1.1rem; display: flex; flex-direction: column; gap: .5rem; flex: 1; }
.blog-meta { display: flex; align-items: center; justify-content: space-between; }
.blog-date { font-size: .68rem; color: var(--a2); font-weight: 600; text-transform: uppercase; letter-spacing: .08em; }
.blog-title { font-size: .95rem; font-weight: 700; line-height: 1.35; flex: 1; color: var(--text); }
.blog-summary { font-size: .8rem; color: var(--muted); line-height: 1.6; }
.blog-read {
  font-size: .78rem; font-weight: 600; color: var(--a2); margin-top: .3rem;
  display: inline-flex; align-items: center; gap: .3rem; transition: gap .2s;
}
.blog-card:hover .blog-read { gap: .6rem; }

@media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 480px) { .blog-grid { grid-template-columns: 1fr; } }
</style>
