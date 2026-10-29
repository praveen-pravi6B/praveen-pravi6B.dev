<template>
  <Navbar />
  <HomeSection />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
  <BlogSection />
  <ContactSection />
  <footer class="site-footer">
    <p>Designed &amp; built by <span class="grad-text">Praveen Kumar</span> · 2026</p>
  </footer>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import HomeSection from './components/HomeSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import BlogSection from './components/BlogSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<style scoped>
.site-footer {
  text-align: center;
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--border);
  font-size: .8rem;
  color: var(--muted);
}
</style>
