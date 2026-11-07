<script setup>
import { onBeforeUnmount, ref } from "vue";
import { email } from "../data/content";
import SocialLinks from "./SocialLinks.vue";

const copyLabel = ref("Copy email");
let resetTimer;

async function copyEmail() {
  const done = () => {
    copyLabel.value = "Copied";
    if (resetTimer) window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      copyLabel.value = "Copy email";
    }, 1800);
  };

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(email);
      done();
      return;
    }
  } catch (error) {
    // Clipboard can be denied; fall through to mailto.
  }

  window.location.href = `mailto:${email}`;
}

onBeforeUnmount(() => {
  if (resetTimer) window.clearTimeout(resetTimer);
});
</script>

<template>
  <section class="contact" id="contact">
    <div class="section-head" v-reveal>
      <div>
        <span class="sec-index">05 — Contact</span>
        <h2>Let's make something <em>good.</em></h2>
      </div>
    </div>

    <p class="contact-sub" v-reveal>
      Have a product that deserves a sharper frontend? A local-first idea that
      needs to exist? I'm always up for a thoughtful conversation.
    </p>

    <div class="email-row" v-reveal>
      <a class="email-link" :href="`mailto:${email}`">{{ email }}</a>
      <button
        class="copy-email"
        type="button"
        :data-email="email"
        @click="copyEmail"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <rect x="5" y="5" width="9" height="9" rx="1.5" />
          <path
            d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"
          />
        </svg>
        <span aria-live="polite">{{ copyLabel }}</span>
      </button>
    </div>

    <div class="contact-bottom" v-reveal>
      <SocialLinks variant="contact" />
      <div class="contact-meta">
        <strong>Praveen Kumar</strong><br />
        Frontend developer &amp; AI builder<br />
        © 2026 — built with care
      </div>
    </div>
  </section>
</template>
