<template>
  <div class="social-links">
    <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer" :aria-label="social.name">
      <i :class="social.icon"></i>
    </a>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const socials = ref([
  { name: 'GitHub', url: 'https://github.com/praveen-pravi6B', icon: 'fab fa-github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/praveen-kumar-44a7811a9/', icon: 'fab fa-linkedin' },
  { name: 'Mobile', url: 'tel:+918925347231', icon: 'fas fa-mobile-alt' },
  { name: 'Instagram', url: 'https://www.instagram.com/i_am._praveen._.kumar/', icon: 'fab fa-instagram' },
  { name: 'Twitter (X)', url: 'https://x.com/PraveenKum6066', icon: 'fab fa-x-twitter' },
  { name: 'Discord', url: 'https://discordapp.com/users/praveenkumarm2240', icon: 'fab fa-discord' },
  { name: 'Telegram', url: 'https://t.me/Praveenkumar006', icon: 'fab fa-telegram' },
]);
</script>

<style scoped>
.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap; /* Allow wrapping for many links */
}

.social-links a {
  color: var(--medium-text);
  font-size: 1.5rem;
  transition: color 0.3s, transform 0.3s;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.social-links i {
  font-size: 2rem;
  vertical-align: middle;
}

.social-links a:hover {
  color: var(--primary-blue);
  transform: scale(1.1);
}

@media (max-width: 600px) {
  .social-links {
    gap: 1rem;
  }
  
  .social-links i {
    font-size: 1.5rem;
  }
  
  .social-links a {
    font-size: 1.2rem;
  }
}
</style>
