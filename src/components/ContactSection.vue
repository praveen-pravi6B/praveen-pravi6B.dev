<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="contact-inner">
        <div>
          <div class="sec-tag">Contact</div>
          <h2 class="sec-h">Let's build something<br/><span class="grad-text">great together.</span></h2>
          <p class="contact-sub">Always open to new projects, creative ideas, or opportunities to be part of something amazing.</p>
        </div>
        <div class="contact-right">
          <a href="mailto:kumarpraveen92829@gmail.com" class="email-chip">
            <i class="fa-solid fa-envelope"></i>
            kumarpraveen92829@gmail.com
          </a>
          <div class="contact-socials">
            <a v-for="s in socials" :key="s.name" :href="s.url" :title="s.name"
               target="_blank" rel="noopener" @click="track(s.name)">
              <i :class="s.icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const socials = [
  { name:'GitHub',    url:'https://github.com/praveen-pravi6B',                  icon:'fa-brands fa-github' },
  { name:'LinkedIn',  url:'https://www.linkedin.com/in/praveen-kumar-44a7811a9/', icon:'fa-brands fa-linkedin' },
  { name:'Twitter/X', url:'https://x.com/PraveenKum6066',                        icon:'fa-brands fa-x-twitter' },
  { name:'Instagram', url:'https://www.instagram.com/i_am._praveen._.kumar/',    icon:'fa-brands fa-instagram' },
  { name:'Telegram',  url:'https://t.me/Praveenkumar006',                        icon:'fa-brands fa-telegram' },
]

const track = (name) => {
  if (typeof window.gtag === 'function')
    window.gtag('event','social_click',{ social_platform: name })
}
</script>

<style scoped>
.contact-section {
  background: var(--s1);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.contact-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
}

.contact-sub { color: var(--muted); font-size: 1rem; line-height: 1.7; max-width: 420px; margin-top: .5rem; }

.contact-right { display: flex; flex-direction: column; gap: 1.2rem; align-items: flex-end; }

.email-chip {
  display: inline-flex; align-items: center; gap: .6rem;
  padding: .8rem 1.5rem; border-radius: 999px;
  background: var(--bg); border: 1px solid var(--border);
  font-size: .9rem; font-weight: 500;
  transition: border-color .2s, background .2s; white-space: nowrap; color: var(--text);
}
.email-chip:hover { border-color: rgba(99,102,241,.45); background: rgba(99,102,241,.08); }
.email-chip i { color: var(--a2); }

.contact-socials { display: flex; gap: .8rem; }
.contact-socials a {
  width: 38px; height: 38px; border-radius: 9px;
  border: 1px solid var(--border); background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  font-size: .9rem; color: var(--muted);
  transition: all .2s;
}
.contact-socials a:hover { border-color: rgba(99,102,241,.4); color: var(--a2); transform: translateY(-2px); }

@media (max-width: 768px) {
  .contact-inner { grid-template-columns: 1fr; gap: 2rem; }
  .contact-right { align-items: flex-start; }
  .email-chip { font-size: .82rem; }
}
</style>
