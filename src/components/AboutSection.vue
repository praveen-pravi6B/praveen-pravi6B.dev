<template>
  <section id="about">
    <GlassCard title="About Me">
      <div class="about-content">
        <p>Hi, I'm <strong>Praveen Kumar</strong> 👋</p>
        <p><em>A Passionate Front-end Developer | Exploring Gen AI &amp; JS</em></p>
        <br>
        <p>A dedicated Front-end Developer with a passion for building intuitive and performant web applications. Currently exploring the exciting fields of Generative AI and modern DevOps practices to build next-generation projects.</p>
        <br>
        <p>📫 Get in touch: <strong>kumarpraveen92829@gmail.com</strong></p>
      </div>
    </GlassCard>
  </section>
</template>

<script setup>
import GlassCard from './GlassCard.vue';
</script>

<style scoped>
.about-content p {
  margin: 0 0 0.5rem 0;
  color: var(--medium-text);
  font-size: 1.1rem;
}
.about-content strong {
  color: var(--light-text);
  font-weight: bold;
}
</style>