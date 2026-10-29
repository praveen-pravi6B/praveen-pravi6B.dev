<template>
  <section id="about">
    <div class="container">
      <div class="sec-tag">About</div>
      <div class="about-grid">
        <div class="about-text">
          <h2 class="sec-h">I build things <span class="grad-text">end-to-end.</span></h2>
          <p>I'm a <strong>Frontend Developer</strong> with a passion for building intuitive, performant web apps.
            Currently deep into <strong>Generative AI</strong> and local-first tooling — building things that work without sending your data to the cloud.</p>
          <p>I love shipping projects that feel <strong>polished and purposeful</strong> — from Vue 3 SPAs to Python-backed AI tools.
            I care as much about the code as the experience.</p>
          <a href="mailto:kumarpraveen92829@gmail.com" class="email-inline">
            <i class="fa-solid fa-envelope"></i> kumarpraveen92829@gmail.com
          </a>
        </div>
        <div class="about-bento">
          <div class="a-block">
            <div class="a-num grad-text">3+</div>
            <div class="a-lbl">Years Exp</div>
          </div>
          <div class="a-block">
            <div class="a-num grad-text">6+</div>
            <div class="a-lbl">Projects</div>
          </div>
          <div class="a-block a-wide">
            <i class="fa-solid fa-location-dot a-icon"></i>
            <div>
              <div class="a-info-title">India 🇮🇳</div>
              <div class="a-info-sub">Available remotely worldwide</div>
            </div>
          </div>
          <div class="a-block a-wide">
            <i class="fa-solid fa-graduation-cap a-icon"></i>
            <div>
              <div class="a-info-title">Frontend Dev + Gen AI</div>
              <div class="a-info-sub">Always building, always learning</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: start;
}

.about-text p {
  font-size: 1.05rem; color: var(--muted); line-height: 1.8; margin-bottom: 1rem;
}
.about-text p strong { color: var(--text); }

.email-inline {
  display: inline-flex; align-items: center; gap: .5rem;
  font-size: .88rem; color: var(--a2); margin-top: .5rem;
  transition: opacity .2s;
}
.email-inline:hover { opacity: .75; }

/* Bento */
.about-bento { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem; }

.a-block {
  background: var(--s1); border: 1px solid var(--border);
  border-radius: var(--r); padding: 1.2rem;
  text-align: center; transition: border-color .2s;
}
.a-block:hover { border-color: rgba(99,102,241,.35); }

.a-block.a-wide {
  grid-column: 1 / -1; text-align: left;
  display: flex; align-items: center; gap: 1rem;
}

.a-num { font-size: 2rem; font-weight: 900; }
.a-lbl { font-size: .68rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; margin-top: .2rem; }
.a-icon { font-size: 1.3rem; color: var(--a2); flex-shrink: 0; }
.a-info-title { font-size: .9rem; font-weight: 600; }
.a-info-sub { font-size: .75rem; color: var(--muted); margin-top: .2rem; }

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .about-bento { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .about-bento { grid-template-columns: 1fr; }
  .a-block.a-wide { grid-column: 1; }
}
</style>
