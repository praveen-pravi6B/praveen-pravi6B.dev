<script setup>
import { onMounted, reactive, ref } from "vue";
import { works } from "../data/content";

const previewEl = ref(null);
const previewOn = ref(false);
const previewSrc = ref("");
const previewAlt = ref("");
const previewPosition = reactive({ left: "0px", top: "0px" });

let enabled = false;

onMounted(() => {
  enabled =
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
});

function showPreview(item) {
  if (!enabled) return;
  previewSrc.value = item.image;
  previewAlt.value = item.title;
  previewOn.value = true;
}

function movePreview(event) {
  if (!enabled) return;

  const preview = previewEl.value;
  if (!preview) return;

  const gap = 26;
  const width = preview.offsetWidth;
  const height = preview.offsetHeight;
  let left = event.clientX + gap;
  let top = event.clientY - height * 0.55;

  if (left + width > window.innerWidth - 20) {
    left = event.clientX - width - gap;
  }
  if (top < 20) top = 20;
  if (top + height > window.innerHeight - 20) {
    top = window.innerHeight - height - 20;
  }

  previewPosition.left = `${left}px`;
  previewPosition.top = `${top}px`;
}

function hidePreview() {
  previewOn.value = false;
}
</script>

<template>
  <section class="section" id="work">
    <div class="section-head" v-reveal>
      <div>
        <span class="sec-index">01 — Selected work</span>
        <h2><em>Things</em> I've shipped.</h2>
      </div>
      <p class="head-note">
        Products, tools, and experiments built end-to-end — from first sketch
        to production.
      </p>
    </div>

    <div class="work-list">
      <a
        v-for="(item, index) in works"
        :key="item.title"
        class="work-row"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
        v-reveal
        @mouseenter="showPreview(item)"
        @mousemove="movePreview"
        @mouseleave="hidePreview"
      >
        <span class="work-num">{{ String(index + 1).padStart(2, "0") }}</span>
        <span class="work-title">
          {{ item.title }}
          <span v-if="item.isNew" class="new">New</span>
        </span>
        <span class="work-cat">{{ item.category }}</span>
        <span class="work-year">{{ item.year }}</span>
        <span class="work-arrow">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 12 12 4M5 4h7v7" />
          </svg>
        </span>
      </a>
    </div>

    <div
      ref="previewEl"
      class="work-preview"
      :class="{ on: previewOn }"
      :style="previewPosition"
      aria-hidden="true"
    >
      <img :src="previewSrc || undefined" :alt="previewAlt" />
    </div>
  </section>
</template>
