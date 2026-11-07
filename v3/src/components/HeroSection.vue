<script setup>
const logo = `${import.meta.env.BASE_URL}logo.png`;
</script>

<template>
  <section class="hero" id="top">
    <div class="hero-top">
      <div class="eyebrow">Independent frontend engineer — India</div>
      <div class="stamp" aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <defs>
            <path
              id="stampPath"
              d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
            />
          </defs>
          <text>
            <textPath href="#stampPath">Open for select projects · 2026 ·</textPath>
          </text>
        </svg>
        <div class="stamp-core">
          <span class="stamp-logo"
            ><img :src="logo" alt="" width="30" height="30"
          /></span>
        </div>
      </div>
    </div>

    <div class="hero-main">
      <h1>
        <span class="line">Frontend</span>
        <span class="line"><em>developer</em></span>
        <span class="line"><span class="amp">&amp;</span> AI builder.</span>
      </h1>

      <div class="hero-right">
        <p>
          I build interfaces that feel
          <strong>fast, clear, and a little inevitable</strong> — then make them
          hold up under real users, real breakpoints, and real commits.
        </p>
        <div class="hero-actions">
          <a href="#work" class="btn btn-dark">
            View selected work
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 12 12 4M5 4h7v7" />
            </svg>
          </a>
          <a href="#contact" class="btn btn-ghost">Start a conversation</a>
        </div>
        <dl class="hero-meta">
          <div><dt>Currently</dt><dd>Building PixelBreak</dd></div>
          <div><dt>Focus</dt><dd>Local-first AI</dd></div>
          <div><dt>Based in</dt><dd>India / remote</dd></div>
          <div><dt>Since</dt><dd>2022</dd></div>
        </dl>
      </div>
    </div>

    <div class="hero-foot">
      <span class="scroll">
        Scroll to explore
        <i>
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M6 1v9M2.5 6.5 6 10l3.5-3.5" />
          </svg>
        </i>
      </span>
      <span class="now">
        <b></b> Now shipping: PixelBreak — local-first visual regression checks
      </span>
    </div>
  </section>
</template>
