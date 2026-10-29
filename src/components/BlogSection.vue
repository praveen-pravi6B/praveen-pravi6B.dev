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

      <!-- Skeleton -->
      <div v-if="loading">
        <div class="featured-sk sk-card">
          <div class="sk-img-feat"></div>
          <div class="sk-feat-body">
            <div class="sk-line sk-date"></div>
            <div class="sk-line sk-title-feat"></div>
            <div class="sk-line sk-title-feat" style="width:70%"></div>
            <div class="sk-line sk-summary"></div>
            <div class="sk-line sk-summary" style="width:80%"></div>
          </div>
        </div>
        <div class="sub-grid">
          <BlogCard v-for="n in 2" :key="n" :skeleton="true" />
        </div>
      </div>

      <!-- Real content -->
      <div v-else>
        <!-- Featured first post -->
        <RouterLink v-if="posts[0]" :to="`/blog/${posts[0].gist}`" class="featured-card">
          <div class="feat-img-wrap">
            <img v-if="posts[0].image" :src="posts[0].image" :alt="posts[0].title"
                 class="feat-img" @error="e => e.target.parentElement.classList.add('no-img')" />
            <div v-else class="feat-default-cover">
              <span class="feat-initial">{{ posts[0].title?.charAt(0) }}</span>
              <span class="feat-words">{{ posts[0].title?.split(' ').slice(0,3).join(' ') }}</span>
            </div>
          </div>
          <div class="feat-body">
            <div class="feat-meta">
              <span class="feat-date">{{ posts[0].date }}</span>
              <div class="feat-tags">
                <span v-for="tag in posts[0].tags" :key="tag" class="bc-tag">{{ tag }}</span>
              </div>
            </div>
            <h3 class="feat-title">{{ posts[0].title }}</h3>
            <p class="feat-summary">{{ posts[0].summary }}</p>
            <div class="feat-actions">
              <span class="feat-read">Read more <i class="fa-solid fa-arrow-right"></i></span>
              <a v-if="posts[0].devto" :href="posts[0].devto" target="_blank" rel="noopener"
                 class="bc-ext-btn" @click.stop>
                <i class="fa-brands fa-dev"></i> Dev.to
              </a>
              <a v-if="posts[0].medium" :href="posts[0].medium" target="_blank" rel="noopener"
                 class="bc-ext-btn" @click.stop>
                <i class="fa-brands fa-medium"></i> Medium
              </a>
            </div>
          </div>
        </RouterLink>

        <!-- Remaining posts grid -->
        <div class="sub-grid" v-if="posts.slice(1, 3).length">
          <BlogCard v-for="post in posts.slice(1, 3)" :key="post.gist || post.id" :post="post" />
        </div>
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
  try { posts.value = await fetchPosts() }
  catch { } finally { loading.value = false }
})
</script>

<style scoped>
.blog-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; margin-bottom: 2rem; }
.blog-header .sec-h { margin-bottom: 0; }

.view-all {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .85rem; font-weight: 600; color: var(--a2);
  white-space: nowrap; transition: gap .2s;
}
.view-all:hover { gap: .7rem; }

/* ── Featured card ─────────────────── */
.featured-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  background: var(--card-bg);
  border: var(--border-width) var(--border-style) var(--card-border);
  border-radius: var(--r);
  overflow: hidden;
  margin-bottom: 1rem;
  transition: border-color .25s, transform .25s, box-shadow .25s;
  text-decoration: none;
}
.featured-card:hover {
  border-color: var(--card-hover-border);
  transform: translateY(-3px);
  box-shadow: var(--card-shadow);
}

.feat-img-wrap { height: 280px; overflow: hidden; position: relative; }
.feat-img { width: 100%; height: 100%; object-fit: cover; }
.feat-default-cover {
  position: absolute; inset: 0;
  background: var(--grad);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: .5rem;
}
.feat-initial {
  font-size: 8rem; font-weight: 900; color: rgba(255,255,255,.2);
  line-height: 1; letter-spacing: -.05em;
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
}
.feat-words {
  position: relative; z-index: 1;
  font-size: .85rem; font-weight: 700; color: rgba(255,255,255,.9);
  text-transform: uppercase; letter-spacing: .05em; text-align: center; max-width: 80%;
}

.feat-body {
  padding: 2rem;
  display: flex; flex-direction: column; gap: .8rem; justify-content: center;
}
.feat-meta { display: flex; align-items: center; gap: .8rem; flex-wrap: wrap; }
.feat-date { font-size: .72rem; font-weight: 600; color: var(--a2); text-transform: uppercase; letter-spacing: .08em; }
.feat-tags { display: flex; gap: .4rem; flex-wrap: wrap; }
.bc-tag {
  font-size: .65rem; font-weight: 500; padding: .15rem .5rem; border-radius: 999px;
  background: var(--tag-bg); border: 1px solid var(--tag-border); color: var(--tag-color);
}
.feat-title { font-size: 1.4rem; font-weight: 700; line-height: 1.2; color: var(--text); letter-spacing: -.02em; }
.feat-summary { font-size: .9rem; color: var(--muted); line-height: 1.7; flex: 1; }

.feat-actions { display: flex; align-items: center; gap: .6rem; flex-wrap: wrap; }
.feat-read {
  display: inline-flex; align-items: center; gap: .35rem;
  font-size: .85rem; font-weight: 600; color: var(--a2); transition: gap .2s;
}
.featured-card:hover .feat-read { gap: .6rem; }
.bc-ext-btn {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .72rem; font-weight: 600;
  padding: .25rem .65rem; border-radius: 999px;
  border: 1px solid var(--border); background: var(--bg2);
  transition: all .2s; color: var(--muted);
}
.bc-ext-btn:hover { border-color: var(--a2); color: var(--a2); }

/* ── Sub grid ──────────────────────── */
.sub-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

/* ── Skeleton ──────────────────────── */
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
}
.sk-card { border-radius: var(--r); overflow: hidden; margin-bottom: 1rem; }
.featured-sk { display: grid; grid-template-columns: 1fr 1fr; background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--r); }
.sk-img-feat {
  height: 280px;
  background: linear-gradient(90deg, var(--s1) 25%, var(--bg2, #0f0f1c) 50%, var(--s1) 75%);
  background-size: 1200px 100%; animation: shimmer 1.6s infinite linear;
}
.sk-feat-body { padding: 2rem; display: flex; flex-direction: column; gap: .8rem; }
.sk-line { border-radius: 6px; background: linear-gradient(90deg, var(--s1) 25%, var(--bg2, #0f0f1c) 50%, var(--s1) 75%); background-size: 1200px 100%; animation: shimmer 1.6s infinite linear; }
.sk-date  { height: 10px; width: 80px; }
.sk-title-feat { height: 20px; width: 100%; }
.sk-summary { height: 12px; width: 100%; }

/* ── Responsive ────────────────────── */
@media (max-width: 768px) {
  .featured-card { grid-template-columns: 1fr; }
  .feat-img-wrap { height: 200px; }
  .feat-body { padding: 1.2rem; }
  .feat-title { font-size: 1.15rem; }
  .sub-grid { grid-template-columns: 1fr; }
  .featured-sk { grid-template-columns: 1fr; }
  .sk-img-feat { height: 180px; }
}
</style>
