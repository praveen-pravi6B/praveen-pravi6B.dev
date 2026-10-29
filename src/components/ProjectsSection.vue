<template>
  <section id="projects">
    <div class="container">
      <div class="sec-tag">Projects</div>
      <h2 class="sec-h">Things I've <span class="grad-text">shipped</span></h2>

      <!-- Skeleton grid while loading -->
      <div v-if="loading" class="bento-grid">
        <div v-for="(n, i) in 5" :key="n" class="pc" :class="{ wide: i === 0 }">
          <div class="project-card sk-card">
            <div class="sk-top">
              <div class="sk-img-sq"></div>
              <div class="sk-ext"></div>
            </div>
            <div class="sk-title"></div>
            <div class="sk-desc"></div>
            <div class="sk-desc sk-desc-short"></div>
            <div class="sk-desc sk-desc-shorter"></div>
            <div class="sk-tags">
              <div class="sk-tag"></div>
              <div class="sk-tag"></div>
              <div class="sk-tag sk-tag-sm"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!projects.length" class="state-msg">No projects found.</div>

      <div v-else class="bento-grid">
        <div
          v-for="(p, i) in projects" :key="p.title"
          class="pc"
          :class="{ wide: i === 0 }"
        >
          <div class="project-card">
            <div class="pc-top">
              <img v-if="p.image" :src="p.image" :alt="p.title" class="pc-img"
                   @error="e => e.target.style.display='none'" />
              <a v-if="p.link" :href="p.link" target="_blank" rel="noopener" class="pc-ext">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
            <div class="pc-title">{{ p.title }}</div>
            <p class="pc-desc">{{ p.description }}</p>
            <div class="pc-tags" v-if="p.techStack">
              <span v-for="tag in parseTags(p.techStack)" :key="tag" class="pc-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQxFWwjf1vyxRQiaLkdsl-OomxIPYHLdCNNNqtsnjj-wswqT0SiiHOT8lW4tNAvqIHxDuNiCpK-LW6U/pub?gid=0&single=true&output=csv'

const projects = ref([])
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

const parseTags = (str) => {
  if (!str) return []
  return str.split('|').map(t => t.trim()).filter(Boolean)
}

onMounted(async () => {
  try {
    const r = await fetch(CSV_URL)
    const text = await r.text()
    projects.value = parseCsv(text).filter(p => p.title)
  } catch (e) {
    console.error('Failed to load projects', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.state-msg { color: var(--muted); text-align: center; padding: 2rem; }

.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.pc { grid-column: span 1; }
.pc.wide { grid-column: span 2; }

.project-card {
  background: var(--s1); border: 1px solid var(--border);
  border-radius: 16px; padding: 1.4rem;
  display: flex; flex-direction: column; gap: .9rem; height: 100%;
  transition: border-color .25s, transform .25s, box-shadow .25s;
}
.project-card:hover {
  border-color: rgba(99,102,241,.4);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(59,130,246,.12);
}

.pc-top { display: flex; align-items: flex-start; justify-content: space-between; gap: .5rem; }
.pc-img {
  width: 48px; height: 48px; border-radius: 10px;
  object-fit: cover; border: 1px solid var(--border);
  background: var(--s2); flex-shrink: 0;
}
.pc-ext {
  width: 32px; height: 32px; border-radius: 8px;
  border: 1px solid var(--border); background: var(--s2);
  display: flex; align-items: center; justify-content: center;
  font-size: .75rem; color: var(--muted); flex-shrink: 0;
  transition: all .2s;
}
.pc-ext:hover { border-color: rgba(99,102,241,.4); color: var(--a2); }

.pc-title { font-size: 1rem; font-weight: 700; }
.pc-desc { font-size: .83rem; color: var(--muted); line-height: 1.65; flex: 1; }

.pc-tags { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: auto; }
.pc-tag {
  font-size: .68rem; font-weight: 500;
  padding: .18rem .55rem; border-radius: 999px;
  background: rgba(59,130,246,.1); border: 1px solid rgba(99,102,241,.22);
  color: var(--a2); font-family: monospace;
}

@media (max-width: 900px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
  .pc.wide { grid-column: span 2; }
}
@media (max-width: 560px) {
  .bento-grid { grid-template-columns: 1fr; }
  .pc.wide { grid-column: span 1; }
}

/* ── Skeleton ─────────────────────── */
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
}

.sk-card {
  pointer-events: none;
  gap: 1rem;
}

.sk-card > * {
  border-radius: 8px;
  background: linear-gradient(90deg, var(--s1) 25%, var(--bg2, #0f0f1c) 50%, var(--s1) 75%);
  background-size: 1200px 100%;
  animation: shimmer 1.6s infinite linear;
}

.sk-top {
  display: flex; justify-content: space-between; align-items: flex-start;
  background: transparent !important; animation: none !important;
}
.sk-img-sq {
  width: 48px; height: 48px; border-radius: 10px;
  background: linear-gradient(90deg, var(--s1) 25%, var(--bg2, #0f0f1c) 50%, var(--s1) 75%);
  background-size: 1200px 100%;
  animation: shimmer 1.6s infinite linear;
}
.sk-ext {
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(90deg, var(--s1) 25%, var(--bg2, #0f0f1c) 50%, var(--s1) 75%);
  background-size: 1200px 100%;
  animation: shimmer 1.6s infinite linear;
}
.sk-title  { height: 16px; width: 55%; }
.sk-desc   { height: 11px; width: 100%; }
.sk-desc-short   { width: 80%; }
.sk-desc-shorter { width: 60%; }
.sk-tags { display: flex; gap: .4rem; background: transparent !important; animation: none !important; }
.sk-tag {
  height: 20px; width: 56px; border-radius: 999px;
  background: linear-gradient(90deg, var(--s1) 25%, var(--bg2, #0f0f1c) 50%, var(--s1) 75%);
  background-size: 1200px 100%;
  animation: shimmer 1.6s infinite linear;
}
.sk-tag-sm { width: 40px; }

/* Light theme adjustments */
[data-theme="minimal"] .sk-card > *,
[data-theme="minimal"] .sk-img-sq,
[data-theme="minimal"] .sk-ext,
[data-theme="minimal"] .sk-tag,
[data-theme="brutalist"] .sk-card > *,
[data-theme="brutalist"] .sk-img-sq,
[data-theme="brutalist"] .sk-ext,
[data-theme="brutalist"] .sk-tag {
  background: linear-gradient(90deg, #e8e8e8 25%, #d4d4d4 50%, #e8e8e8 75%);
  background-size: 1200px 100%;
  animation: shimmer 1.6s infinite linear;
}
</style>
