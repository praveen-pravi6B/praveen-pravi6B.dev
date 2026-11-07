<script setup>
import { sections } from "../data/content";
import ThemeToggle from "./ThemeToggle.vue";

defineProps({
  open: { type: Boolean, default: false },
});

defineEmits(["toggle", "close"]);
</script>

<template>
  <header class="mobile-bar">
    <a
      class="brand-mark brand-mark--sm"
      href="#top"
      aria-label="Praveen Kumar — back to top"
      @click="$emit('close')"
    >
      <img src="/logo.png" alt="" width="21" height="21" />
    </a>
    <div class="bar-meta">Portfolio 2026</div>
    <ThemeToggle compact />
    <button
      class="menu-toggle"
      type="button"
      :aria-expanded="String(open)"
      aria-controls="mobilePanel"
      @click="$emit('toggle')"
    >
      <span>{{ open ? "Close" : "Menu" }}</span>
      <span class="bars" aria-hidden="true"><b></b><b></b></span>
    </button>
  </header>

  <div class="mobile-panel" id="mobilePanel" :aria-hidden="String(!open)">
    <nav aria-label="Mobile navigation">
      <a
        v-for="item in sections"
        :key="item.id"
        class="m-link"
        :href="`#${item.id}`"
        @click="$emit('close')"
      >
        <span>{{ item.index }}</span>{{ item.label }}
      </a>
    </nav>
    <div class="m-foot">
      <div>
        <strong>Praveen Kumar</strong>Frontend developer<br />&amp; AI builder
      </div>
      <div>
        <strong>Get in touch</strong>kumarpraveen92829<br />@gmail.com
      </div>
    </div>
  </div>
</template>
