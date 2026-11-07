<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { sections } from "./data/content";
import { useSectionSpy } from "./composables/useSectionSpy";

import SiteRail from "./components/SiteRail.vue";
import MobileChrome from "./components/MobileChrome.vue";

const route = useRoute();
const menuOpen = ref(false);

const { active, refresh } = useSectionSpy(
  sections.map((section) => section.id),
  () => route.name === "home"
);

watch(menuOpen, (open) => {
  document.body.classList.toggle("menu-open", open);
});

watch(
  () => route.fullPath,
  async () => {
    menuOpen.value = false;
    await nextTick();
    refresh();
  }
);

let desktopQuery;
let onKeydown;

function handleDesktopChange(event) {
  if (event.matches) menuOpen.value = false;
}

onMounted(() => {
  menuOpen.value = false;

  desktopQuery = window.matchMedia("(min-width: 1081px)");
  desktopQuery.addEventListener("change", handleDesktopChange);

  onKeydown = (event) => {
    if (event.key === "Escape") menuOpen.value = false;
  };
  document.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  if (desktopQuery) {
    desktopQuery.removeEventListener("change", handleDesktopChange);
  }
  if (onKeydown) document.removeEventListener("keydown", onKeydown);
  document.body.classList.remove("menu-open");
});
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>

  <SiteRail :active="active" />

  <MobileChrome
    :open="menuOpen"
    @toggle="menuOpen = !menuOpen"
    @close="menuOpen = false"
  />

  <main id="main">
    <RouterView />
  </main>
</template>
