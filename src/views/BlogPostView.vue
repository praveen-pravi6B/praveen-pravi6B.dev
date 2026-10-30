<template>
  <div class="post-page">
    <div class="container">

      <!-- Back -->
      <RouterLink to="/blog" class="back-link">
        <i class="fa-solid fa-arrow-left"></i> All posts
      </RouterLink>

      <!-- Loading -->
      <div v-if="loading" class="state-msg">Loading post…</div>

      <!-- Error -->
      <div v-else-if="error" class="error-msg">
        <p>{{ error }}</p>
        <RouterLink to="/blog" class="btn-outline" style="margin-top:1rem;display:inline-flex">← Back to blog</RouterLink>
      </div>

      <!-- Post -->
      <article v-else class="post-article">

        <!-- Cover image -->
        <img v-if="meta?.image" :src="meta.image" :alt="meta?.title" class="post-cover"
             @error="e => e.target.style.display='none'" />

        <!-- Header -->
        <header class="post-header">
          <div class="post-meta">
            <span class="post-date">{{ meta?.date }}</span>
            <div class="post-tags">
              <span v-for="tag in meta?.tags" :key="tag" class="post-tag">{{ tag }}</span>
            </div>
          </div>
          <h1 class="post-title">{{ meta?.title }}</h1>
          <p class="post-summary" v-if="meta?.summary">{{ meta.summary }}</p>

          <!-- External platform links -->
          <div class="post-externals" v-if="meta?.devto || meta?.medium">
            <span class="post-ext-label">Also published on:</span>
            <a v-if="meta.devto" :href="meta.devto" target="_blank" rel="noopener" class="ext-btn ext-devto">
              <i class="fa-brands fa-dev"></i> Read at Dev.to
            </a>
            <a v-if="meta.medium" :href="meta.medium" target="_blank" rel="noopener" class="ext-btn ext-medium">
              <i class="fa-brands fa-medium"></i> Read on Medium
            </a>
          </div>
        </header>

        <hr class="post-divider" />

        <!-- Rendered markdown -->
        <div class="post-content" v-html="renderedContent"></div>

        <!-- Comments & Reactions -->
        <GiscusComments />

      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { fetchPosts, fetchGistContent } from '../services/blogService.js'
import GiscusComments from '../components/GiscusComments.vue'

const route = useRoute()
const loading = ref(true)
const error = ref(null)
const meta = ref(null)
const renderedContent = ref('')

// Configure marked
marked.setOptions({ breaks: true, gfm: true })

async function load() {
  loading.value = true
  error.value = null
  try {
    const gistId = route.params.gistId
    // Fetch metadata from sheet in parallel with gist content
    const [posts, rawMd] = await Promise.all([
      fetchPosts(),
      fetchGistContent(gistId),
    ])
    meta.value = posts.find(p => p.gist === gistId) ?? null
    // Strip YAML frontmatter if present
    const mdBody = rawMd.replace(/^---[\s\S]*?---\n*/m, '').trim()
    renderedContent.value = marked(mdBody)
  } catch (e) {
    error.value = e.message ?? 'Failed to load post.'
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => route.params.gistId, load)
</script>

<style scoped>
.post-page { padding: 6rem 0 5rem; min-height: 100vh; }

.back-link {
  display: inline-flex; align-items: center; gap: .5rem;
  font-size: .85rem; font-weight: 500; color: var(--muted);
  margin-bottom: 2.5rem; transition: color .2s;
}
.back-link:hover { color: var(--text); }

.state-msg { color: var(--muted); text-align: center; padding: 4rem; font-size: 1rem; }
.error-msg { text-align: center; padding: 4rem; color: #f87171; }

.post-article { max-width: 760px; margin: 0 auto; }

.post-cover {
  width: 100%; max-height: 420px; object-fit: cover;
  border-radius: var(--r); margin-bottom: 2rem;
  border: 1px solid var(--border);
}

.post-header { margin-bottom: 2rem; }
.post-meta { display: flex; align-items: center; gap: .8rem; flex-wrap: wrap; margin-bottom: 1rem; }
.post-date { font-size: .75rem; font-weight: 600; color: var(--a2); text-transform: uppercase; letter-spacing: .08em; }
.post-tags { display: flex; gap: .4rem; flex-wrap: wrap; }
.post-tag {
  font-size: .65rem; font-weight: 500; padding: .15rem .5rem; border-radius: 999px;
  background: var(--tag-bg); border: 1px solid var(--tag-border); color: var(--tag-color);
}

.post-title { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 700; line-height: 1.15; letter-spacing: -.03em; margin-bottom: .8rem; }
.post-summary { font-size: 1.05rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.5rem; }

.post-externals { display: flex; align-items: center; gap: .8rem; flex-wrap: wrap; }
.post-ext-label { font-size: .78rem; color: var(--muted); }
.ext-btn {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .4rem 1rem; border-radius: 999px; font-size: .82rem; font-weight: 600;
  border: 1px solid var(--border); background: var(--bg2); color: var(--text);
  transition: all .2s;
}
.ext-btn:hover { border-color: var(--a2); color: var(--a2); }

.post-divider { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }
</style>
