<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { sections } from "./data/content";
import { useSectionSpy } from "./composables/useSectionSpy";

import SiteRail from "./components/SiteRail.vue";
import MobileChrome from "./components/MobileChrome.vue";
import HeroSection from "./components/HeroSection.vue";
import MarqueeStrip from "./components/MarqueeStrip.vue";
import WorkSection from "./components/WorkSection.vue";
import AboutSection from "./components/AboutSection.vue";
import CapabilitiesSection from "./components/CapabilitiesSection.vue";
import NotesSection from "./components/NotesSection.vue";
import ContactSection from "./components/ContactSection.vue";

const menuOpen = ref(false);
const { active } = useSectionSpy(sections.map((section) => section.id));

watch(menuOpen, (open) => {
  document.body.classList.toggle("menu-open", open);
});

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
    <HeroSection />
    <MarqueeStrip />
    <WorkSection />
    <AboutSection />
    <CapabilitiesSection />
    <NotesSection />
    <ContactSection />
  </main>
</template>
