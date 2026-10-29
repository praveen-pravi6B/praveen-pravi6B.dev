<template>
  <article class="blog-card">
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
          <a v-if="post.devto" :href="post.devto" target="_blank" rel="noopener" class="bc-ext-btn bc-devto">
            <i class="fa-brands fa-dev"></i> Dev.to
          </a>
          <a v-if="post.medium" :href="post.medium" target="_blank" rel="noopener" class="bc-ext-btn bc-medium">
            <i class="fa-brands fa-medium"></i> Medium
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({ post: Object })
</script>

<style scoped>
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

.bc-title {
  font-size: 1rem; font-weight: 700; line-height: 1.3;
  color: var(--text);
}
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
.bc-ext-btn:hover { border-color: var(--a2); color: var(--a2); background: var(--card-bg); }
</style>
