<template>
  <!-- Skeleton loader -->
  <div v-if="skeleton" class="blog-card blog-skeleton">
    <div class="sk-img"></div>
    <div class="sk-body">
      <div class="sk-line sk-date"></div>
      <div class="sk-tags">
        <div class="sk-line sk-tag"></div>
        <div class="sk-line sk-tag"></div>
      </div>
      <div class="sk-line sk-title"></div>
      <div class="sk-line sk-title sk-title-short"></div>
      <div class="sk-line sk-summary"></div>
      <div class="sk-line sk-summary"></div>
      <div class="sk-line sk-summary sk-summary-short"></div>
      <div class="sk-footer">
        <div class="sk-line sk-btn"></div>
      </div>
    </div>
  </div>

  <!-- Real card -->
  <article v-else class="blog-card">
    <!-- Cover image -->
    <div class="bc-img-wrap" v-if="post.image">
      <img :src="post.image" :alt="post.title" class="bc-img"
           @error="e => e.target.parentElement.style.display='none'" />
    </div>
    <div class="bc-img-wrap bc-img-placeholder" v-else>
      <span>✍️</span>
    </div>

    <div class="bc-body">
      <!-- Meta row -->
      <div class="bc-meta">
        <span class="bc-date">{{ post.date }}</span>
        <div class="bc-tags">
          <span v-for="tag in post.tags" :key="tag" class="bc-tag">{{ tag }}</span>
        </div>
      </div>

      <!-- Title + summary -->
      <h3 class="bc-title">{{ post.title }}</h3>
      <p class="bc-summary">{{ post.summary }}</p>

      <!-- Actions -->
      <div class="bc-actions">
        <RouterLink :to="`/blog/${post.gist}`" class="bc-read">
          Read more <i class="fa-solid fa-arrow-right"></i>
        </RouterLink>
        <div class="bc-external">
          <a v-if="post.devto" :href="post.devto" target="_blank" rel="noopener" class="bc-ext-btn">
            <i class="fa-brands fa-dev"></i> Dev.to
          </a>
          <a v-if="post.medium" :href="post.medium" target="_blank" rel="noopener" class="bc-ext-btn">
            <i class="fa-brands fa-medium"></i> Medium
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  post: { type: Object, default: () => ({}) },
  skeleton: { type: Boolean, default: false },
})
</script>

<style scoped>
/* ── Real card ──────────────────────── */
.blog-card {
  background: var(--card-bg);
  border: var(--border-width) var(--border-style) var(--card-border);
  border-radius: var(--r);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color .25s, transform .25s, box-shadow .25s;
}
.blog-card:hover {
  border-color: var(--card-hover-border);
  transform: translateY(-3px);
  box-shadow: var(--card-shadow);
}

.bc-img-wrap { height: 160px; overflow: hidden; flex-shrink: 0; }
.bc-img { width: 100%; height: 100%; object-fit: cover; }
.bc-img-placeholder {
  background: var(--bg2);
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem;
}

.bc-body { padding: 1.2rem; display: flex; flex-direction: column; gap: .6rem; flex: 1; }

.bc-meta { display: flex; align-items: center; gap: .8rem; flex-wrap: wrap; }
.bc-date { font-size: .7rem; color: var(--a2); font-weight: 600; text-transform: uppercase; letter-spacing: .08em; }
.bc-tags { display: flex; gap: .4rem; flex-wrap: wrap; }
.bc-tag {
  font-size: .65rem; font-weight: 500;
  padding: .15rem .5rem; border-radius: 999px;
  background: var(--tag-bg); border: 1px solid var(--tag-border);
  color: var(--tag-color);
}

.bc-title { font-size: 1rem; font-weight: 700; line-height: 1.3; color: var(--text); }
.bc-summary { font-size: .82rem; color: var(--muted); line-height: 1.6; flex: 1; }

.bc-actions { display: flex; align-items: center; justify-content: space-between; gap: .5rem; flex-wrap: wrap; margin-top: auto; padding-top: .4rem; }

.bc-read {
  display: inline-flex; align-items: center; gap: .35rem;
  font-size: .8rem; font-weight: 600; color: var(--a2);
  transition: gap .2s;
}
.bc-read:hover { gap: .6rem; }

.bc-external { display: flex; gap: .5rem; }
.bc-ext-btn {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .72rem; font-weight: 600;
  padding: .25rem .65rem; border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg2);
  transition: all .2s; color: var(--muted);
}
.bc-ext-btn:hover { border-color: var(--a2); color: var(--a2); }

/* ── Skeleton ───────────────────────── */
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}

.blog-skeleton { pointer-events: none; }

.sk-img {
  height: 160px;
  background: linear-gradient(90deg, var(--bg2) 25%, var(--bg3, #1a1a2a) 50%, var(--bg2) 75%);
  background-size: 800px 100%;
  animation: shimmer 1.6s infinite linear;
}

.sk-body { padding: 1.2rem; display: flex; flex-direction: column; gap: .7rem; }

.sk-line {
  border-radius: 6px;
  background: linear-gradient(90deg, var(--bg2) 25%, var(--bg3, #1a1a2a) 50%, var(--bg2) 75%);
  background-size: 800px 100%;
  animation: shimmer 1.6s infinite linear;
}

.sk-date  { height: 10px; width: 90px; }
.sk-tags  { display: flex; gap: .4rem; }
.sk-tag   { height: 20px; width: 60px; border-radius: 999px; }
.sk-title { height: 16px; width: 90%; }
.sk-title-short { width: 60%; }
.sk-summary { height: 12px; width: 100%; }
.sk-summary-short { width: 75%; }
.sk-footer { margin-top: .3rem; }
.sk-btn { height: 14px; width: 80px; }

/* Adjust shimmer for light themes */
[data-theme="minimal"] .sk-line,
[data-theme="minimal"] .sk-img,
[data-theme="brutalist"] .sk-line,
[data-theme="brutalist"] .sk-img {
  background: linear-gradient(90deg, #e8e8e8 25%, #d0d0d0 50%, #e8e8e8 75%);
  background-size: 800px 100%;
  animation: shimmer 1.6s infinite linear;
}
</style>
