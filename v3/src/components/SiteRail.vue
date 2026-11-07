<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { sections } from "../data/content";
import { useClock } from "../composables/useClock";
import SocialLinks from "./SocialLinks.vue";
import ThemeToggle from "./ThemeToggle.vue";

defineProps({
  active: { type: String, default: "top" },
});

const route = useRoute();
const { time } = useClock();
const logo = `${import.meta.env.BASE_URL}logo.png`;

const isBlog = computed(
  () => route.name === "blog" || route.name === "blog-post"
);
</script>

<template>
  <aside class="rail" aria-label="Site navigation">
    <div class="rail-top">
      <RouterLink class="brand" to="/" aria-label="Praveen Kumar — back to top">
        <span class="brand-mark"
          ><img :src="logo" alt="" width="27" height="27"
        /></span>
        <span class="brand-text">
          <span class="brand-name">Praveen Kumar</span>
          <span class="brand-role">Frontend<br />&amp; AI builder</span>
        </span>
      </RouterLink>
    </div>

    <nav class="rail-nav" aria-label="Primary">
      <RouterLink
        v-for="item in sections"
        :key="item.id"
        :to="{ path: '/', hash: `#${item.id}` }"
        :class="{ active: route.name === 'home' && active === item.id }"
      >
        <i></i>{{ item.label }}<span>{{ item.index }}</span>
      </RouterLink>

      <RouterLink to="/blog" class="rail-page" :class="{ active: isBlog }">
        <i></i>Blog<span>↗</span>
      </RouterLink>
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
