<template>
  <section id="skills" class="skills-section">
    <div class="container">
      <div class="sec-tag">Skills</div>
      <h2 class="sec-h">What I <span class="grad-text">work with</span></h2>
    </div>

    <!-- Row 1 marquee -->
    <div class="marquee-wrap">
      <div class="marquee-track">
        <span v-for="s in [...row1, ...row1]" :key="s + Math.random()" class="sk-pill">
          <span class="sk-dot"></span>{{ s }}
        </span>
      </div>
    </div>

    <!-- Row 2 reverse -->
    <div class="marquee-wrap" style="margin-top:.7rem">
      <div class="marquee-track rev">
        <span v-for="s in [...row2, ...row2]" :key="s + Math.random()" class="sk-pill">
          <span class="sk-dot"></span>{{ s }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
const row1 = ['JavaScript','TypeScript','Vue 3','React','Next.js','Node.js','Python','FastAPI','HTML5','CSS3','Astro','Express']
const row2 = ['Playwright','Vite','Docker','GitHub','Figma','Firebase','SQLite','llama.cpp','BirdNET ONNX','Zod','HuggingFace','Gemini API']
</script>

<style scoped>
.skills-section { padding: 5rem 0; overflow: hidden; }

.marquee-wrap {
  position: relative;
  overflow: hidden;
}
.marquee-wrap::before, .marquee-wrap::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 120px; z-index: 2; pointer-events: none;
}
.marquee-wrap::before { left: 0; background: linear-gradient(to right, var(--bg), transparent); }
.marquee-wrap::after  { right: 0; background: linear-gradient(to left,  var(--bg), transparent); }

.marquee-track {
  display: flex; gap: .7rem; width: max-content;
  animation: marquee 30s linear infinite;
  padding: .3rem 0;
}
.marquee-track:hover { animation-play-state: paused; }
.marquee-track.rev { animation-direction: reverse; animation-duration: 24s; }

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.sk-pill {
  white-space: nowrap; display: inline-flex; align-items: center; gap: .5rem;
  padding: .45rem 1.1rem; border-radius: 999px; font-size: .82rem; font-weight: 500;
  border: 1px solid rgba(99,102,241,.25); background: rgba(99,102,241,.07);
  color: var(--text); transition: all .2s; cursor: default;
}
.sk-pill:hover {
  background: rgba(99,102,241,.18);
  border-color: rgba(99,102,241,.5);
  transform: translateY(-2px);
}
.sk-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--a2); flex-shrink: 0; }
</style>
