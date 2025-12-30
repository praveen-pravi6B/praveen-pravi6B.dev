<template>
  <Navbar />
  <main class="content-wrapper">
    <HomeSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
  </main>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import HomeSection from './components/HomeSection.vue';
import AboutSection from './components/AboutSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import ContactSection from './components/ContactSection.vue';
</script>

<style scoped>
.content-wrapper {
  padding: 0 2rem 2rem;
  width: 100%;
  max-width: 900px;
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 0 1rem 1rem;
  }
}

/* Add some space between sections */
main > section {
  margin-bottom: 6rem;
}
</style>