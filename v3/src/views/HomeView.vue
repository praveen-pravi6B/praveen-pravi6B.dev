<script setup>
import HeroSection from "../components/HeroSection.vue";
import MarqueeStrip from "../components/MarqueeStrip.vue";
import WorkSection from "../components/WorkSection.vue";
import AboutSection from "../components/AboutSection.vue";
import CapabilitiesSection from "../components/CapabilitiesSection.vue";
import NotesSection from "../components/NotesSection.vue";
import ContactSection from "../components/ContactSection.vue";
import { usePageMeta } from "../composables/usePageMeta";

usePageMeta(() => ({}));
</script>

<template>
  <HeroSection />
  <MarqueeStrip />
  <WorkSection />
  <AboutSection />
  <CapabilitiesSection />
  <NotesSection />
  <ContactSection />
</template>
