<template>
  <section id="projects">
    <div class="container">
      <div class="sec-tag">Projects</div>
      <h2 class="sec-h">Things I've <span class="grad-text">shipped</span></h2>

      <div v-if="loading" class="state-msg">Loading projects…</div>
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
</style>
