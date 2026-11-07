<script setup>
import { sections } from "../data/content";
import { useClock } from "../composables/useClock";
import SocialLinks from "./SocialLinks.vue";
import ThemeToggle from "./ThemeToggle.vue";

defineProps({
  active: { type: String, default: "top" },
});

const { time } = useClock();
</script>

<template>
  <aside class="rail" aria-label="Site navigation">
    <div class="rail-top">
      <a class="brand" href="#top" aria-label="Praveen Kumar — back to top">
        <span class="brand-mark"
          ><img src="/logo.png" alt="" width="27" height="27"
        /></span>
        <span class="brand-text">
          <span class="brand-name">Praveen Kumar</span>
          <span class="brand-role">Frontend<br />&amp; AI builder</span>
        </span>
      </a>
    </div>

    <nav class="rail-nav" aria-label="Primary">
      <a
        v-for="item in sections"
        :key="item.id"
        :href="`#${item.id}`"
        :class="{ active: active === item.id }"
      >
        <i></i>{{ item.label }}<span>{{ item.index }}</span>
      </a>
    </nav>

    <div class="rail-bottom">
      <ThemeToggle />
      <div class="available">
        <span class="dot"></span> Available for select projects
      </div>
      <div class="time-block">
        <span>Local time</span><strong>{{ time }}</strong>
      </div>
      <SocialLinks />
    </div>
  </aside>
</template>
