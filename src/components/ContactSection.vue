<template>
  <section id="contact" class="contact-section">
     <h2 class="section-title">Get In Touch</h2>
     <GlassCard>
        <p>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
            Feel free to reach out to me via email.
        </p>
        <a href="mailto:kumarpraveen92829@gmail.com" class="email-link">kumarpraveen92829@gmail.com</a>
     </GlassCard>
  </section>
</template>

<script setup>
import GlassCard from './GlassCard.vue';
</script>

<style scoped>
.contact-section {
    text-align: center;
}
.section-title {
  font-size: 2rem;
  color: var(--light-text);
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 4px solid var(--primary-blue);
  text-align: left;
}
p {
    color: var(--medium-text);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
}
.email-link {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    border: 1px solid var(--primary-blue);
    color: var(--primary-blue);
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
}
.email-link:hover {
    background-color: var(--primary-blue);
    color: var(--light-text);
}
</style>
