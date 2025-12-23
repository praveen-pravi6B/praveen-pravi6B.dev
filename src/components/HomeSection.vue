<template>
  <section id="home" class="home-section">
    <div class="intro-text">
      <h1>Praveen Kumar</h1>
      <p>Front-end Developer | Gen AI Enthusiast</p>
      <SocialLinks />
      <a href="#projects" class="cta-button">View My Work</a>
    </div>
  </section>
</template>

<script setup>
import SocialLinks from './SocialLinks.vue';
</script>

<style scoped>
.home-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
}

.intro-text h1 {
  font-size: 4rem;
  color: var(--light-text);
  margin-bottom: 1rem;
}

.intro-text p {
  font-size: 1.5rem;
  color: var(--medium-text);
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: var(--primary-blue);
  color: var(--light-text);
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-top: 2rem; /* Added margin */
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(25, 118, 210, 0.3);
}

@media (max-width: 768px) {
  .intro-text h1 {
    font-size: 2.5rem;
  }

  .intro-text p {
    font-size: 1.1rem;
  }
  
  .home-section {
    height: 70vh;
  }
}

@media (max-width: 375px) {
  .intro-text h1 {
    font-size: 2rem;
  }
  
  .intro-text p {
    font-size: 1rem;
  }
  
  .cta-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>