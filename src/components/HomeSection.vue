<template>
  <section id="home" class="hero">

    <!-- ── BRUTALIST: tag above name ─────── -->
    <div class="hero-brut-tag">▶ Frontend Dev + Gen AI Builder</div>

    <!-- ── LEFT content ─────────────────── -->
    <div class="hero-left" style="position:relative;z-index:1">

      <!-- Default name (dark / minimal / cosmic) -->
      <h1 class="hero-name hero-name-default">
        <span class="fill">Frontend</span><br/>
        <span class="grad-text">Developer</span><br/>
        <span class="fill">&amp; AI Builder.</span>
      </h1>

      <!-- Brutalist name: PRAVEEN fill / KUMAR stroke -->
      <h1 class="hero-name hero-name-brut">
        <span class="fill">PRAVEEN</span><br/>
        <span class="stroke">KUMAR</span>
      </h1>

      <p class="hero-sub">
        I'm <strong>Praveen Kumar</strong> — I build fast, beautiful web apps
        and explore <strong>Generative AI</strong> to ship products that actually solve problems.
      </p>
      <div class="hero-btns">
        <a href="#projects" class="btn-solid">See my work</a>
        <a href="https://github.com/praveen-pravi6B" target="_blank" rel="noopener" class="btn-outline">
          <i class="fa-brands fa-github"></i> GitHub
        </a>
      </div>
      <div class="hero-socials">
        <a v-for="s in socials" :key="s.name" :href="s.url" :title="s.name"
           target="_blank" rel="noopener" @click="track(s.name)">
          <i :class="s.icon"></i>
        </a>
      </div>
    </div>

    <!-- ── Minimal / Dark: profile card ─── -->
    <div class="hero-profile-card">
      <div class="hpc-top">
        <img src="/logo.png" alt="Praveen Kumar" class="hpc-avatar-img" />
        <div>
          <div class="hpc-name">Praveen Kumar</div>
          <div class="hpc-role">Frontend Dev · Gen AI Builder</div>
        </div>
      </div>
      <div class="hpc-stats">
        <div class="hpc-s"><div class="hpc-n">{{ yearsExp }}</div><div class="hpc-l">Years Exp</div></div>
        <div class="hpc-s"><div class="hpc-n">6+</div><div class="hpc-l">Projects</div></div>
        <div class="hpc-s"><div class="hpc-n">10+</div><div class="hpc-l">Technologies</div></div>
      </div>
    </div>

    <!-- Terminal widget — shown on Dark / Minimal / Cosmic; hidden on Brutalist -->
    <div class="hero-terminal-wrap">
      <HeroTerminal :promptChar="termPrompt" />
    </div>

    <!-- Dark bento (unused — kept for mobile fallback) -->
    <div class="hero-right hero-right-bento"></div>

  </section>

  <!-- ── COSMIC: horizontal stats strip ── -->
  <div class="hero-stats-strip">
    <div class="hss-item"><div class="hss-num">{{ yearsExp }}</div><div class="hss-lbl">Years Exp</div></div>
    <div class="hss-item"><div class="hss-num">6+</div><div class="hss-lbl">Projects</div></div>
    <div class="hss-item"><div class="hss-num">10+</div><div class="hss-lbl">Technologies</div></div>
    <div class="hss-item"><div class="hss-num" style="font-size:1.4rem">●</div><div class="hss-lbl">Available</div></div>
  </div>

  <!-- ── BRUTALIST: black stats bar ─────── -->
  <div class="hero-stats-bar">
    <div class="hsb-item"><div class="hsb-num">{{ yearsExp }}</div><div class="hsb-lbl">Years Exp</div></div>
    <div class="hsb-item"><div class="hsb-num">6+</div><div class="hsb-lbl">Projects</div></div>
    <div class="hsb-item"><div class="hsb-num">10+</div><div class="hsb-lbl">Technologies</div></div>
    <div class="hsb-item"><div class="hsb-num">✓</div><div class="hsb-lbl">Open to work</div></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import HeroTerminal from './HeroTerminal.vue'
import { useTheme } from '../composables/useTheme.js'

const { current } = useTheme()
const termPrompt = computed(() => current.value === 'cosmic' ? '✦' : '~')

const startDate = new Date('2022-11-10')
const yearsExp = computed(() => {
  const now = new Date()
  const years = (now - startDate) / (1000 * 60 * 60 * 24 * 365.25)
  return Math.floor(years) + '+'
})

const socials = [
  { name:'GitHub',    url:'https://github.com/praveen-pravi6B',                         icon:'fa-brands fa-github' },
  { name:'LinkedIn',  url:'https://www.linkedin.com/in/praveen-kumar-44a7811a9/',        icon:'fa-brands fa-linkedin' },
  { name:'Twitter/X', url:'https://x.com/PraveenKum6066',                               icon:'fa-brands fa-x-twitter' },
  { name:'Instagram', url:'https://www.instagram.com/i_am._praveen._.kumar/',            icon:'fa-brands fa-instagram' },
  { name:'Discord',   url:'https://discordapp.com/users/praveenkumarm2240',              icon:'fa-brands fa-discord' },
  { name:'Telegram',  url:'https://t.me/Praveenkumar006',                               icon:'fa-brands fa-telegram' },
]

const track = (name) => {
  if (typeof window.gtag === 'function')
    window.gtag('event','social_click',{ social_platform: name })
}
</script>

<style scoped>
/* ── Base hero (dark / minimal) ─────────── */
.hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 420px;
  align-items: center;
  padding: 80px clamp(2rem, 5vw, 5rem) 3rem;
  gap: 3rem;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
}
.hero-left { max-width: 600px; }

.hero-name {
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 700; line-height: .95; letter-spacing: -.04em;
  margin-bottom: 1.5rem;
}
.hero-sub {
  font-size: 1.05rem; color: var(--muted); margin-bottom: 2.5rem;
  max-width: 500px; line-height: 1.75;
}
.hero-sub strong { color: var(--text); }
.hero-btns { display: flex; gap: .9rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
.hero-socials { display: flex; gap: 1rem; }
.hero-socials a { color: var(--muted); font-size: 1.1rem; transition: color .2s, transform .2s; }
.hero-socials a:hover { color: var(--a2); transform: translateY(-2px); }

/* Hidden by default — shown per theme */
.hero-brut-tag     { display: none; }
.hero-name-brut    { display: none; }
.hero-stats-strip  { display: none; }
.hero-stats-bar    { display: none; }
.hero-right-bento  { display: none; }
.hero-terminal-wrap { display: none; align-self: center; }

/* Profile card base */
.hero-profile-card {
  display: none;
  flex-direction: column; gap: 1.2rem;
  background: #fff; border: var(--border-width) solid #e8e8e8;
  border-radius: 24px; padding: 2rem;
}
.hpc-top { display: flex; align-items: center; gap: 1rem; }
.hpc-avatar-img {
  width: 56px; height: 56px; border-radius: 14px;
  object-fit: contain; flex-shrink: 0;
  border: none; background: #0d0d0d; padding: 8px;
}
.hpc-name { font-weight: 700; font-size: 1rem; }
.hpc-role { font-size: .78rem; color: var(--muted); }
.hpc-stats { display: flex; flex-direction: column; gap: .7rem; }
.hpc-s {
  background: #f4f4f0; border-radius: 12px; padding: .9rem 1.2rem;
  display: flex; align-items: center; justify-content: space-between;
}
.hpc-n { font-size: 1.6rem; font-weight: 900; color: #0066ff; line-height: 1; }
.hpc-l { font-size: .65rem; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; }

/* Bento mini (dark fallback) */
.b-mini { background: var(--s1); border: 1px solid var(--border); border-radius: var(--r); padding: 1.1rem 1.3rem; }
.b-num  { font-size: 2rem; font-weight: 900; }
.b-lbl  { font-size: .68rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; margin-top: .15rem; }

/* Cosmic stats strip */
.hero-stats-strip {
  border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  background: rgba(255,255,255,.02);
}
.hss-item { flex: 1; padding: 1.8rem 2rem; text-align: center; border-right: 1px solid var(--border); }
.hss-item:last-child { border-right: none; }
.hss-num { font-size: 2.2rem; font-weight: 900; background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hss-lbl { font-size: .68rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; margin-top: .2rem; }

/* Brutalist stats bar */
.hero-stats-bar { background: #0d0d0d; border-top: 3px solid #0d0d0d; border-bottom: 3px solid #0d0d0d; display: flex; overflow: hidden; }
.hsb-item { flex: 1; padding: 1.5rem 2rem; text-align: center; border-right: 2px solid #333; }
.hsb-item:last-child { border-right: none; }
.hsb-num { font-size: 2.5rem; font-weight: 900; color: #3fff8a; font-family: var(--font-mono); line-height: 1; }
.hsb-lbl { font-size: .7rem; color: #888; text-transform: uppercase; letter-spacing: .1em; margin-top: .2rem; }

/* Mobile */
@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; padding: 5rem 1.5rem 2rem; gap: 0; margin: 0; max-width: 100%; }
  .hero-left { max-width: 100%; }
  .hero-terminal-wrap { display: none !important; }
  .hss-item, .hsb-item { padding: 1.2rem 1rem; }
  .hss-num { font-size: 1.6rem; }
  .hsb-num { font-size: 1.8rem; }
}
@keyframes pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,.4); }
  50%      { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
}
</style>
