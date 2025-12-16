<template>
  <section id="projects">
    <h2 class="section-title">Projects</h2>
    <GlassCard v-for="project in projects" :key="project.id" :title="project.title">
      <div class="project-content">
        <img v-if="project.image" :src="project.image" :alt="project.title" class="project-image" />
        <div class="project-details">
          <p>{{ project.content }}</p>
          <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="project-link">
            View Project <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    </GlassCard>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import GlassCard from './GlassCard.vue';

const projects = ref([
      {
        id: 1,
        title: 'SnapChef',
        content: 'Turn your ingredients into delicious meals instantly with AI-powered recipe discovery. SnapChef is your smart kitchen assistant that helps you reduce food waste and cook creative meals with what you already have.',
        image: 'https://raw.githubusercontent.com/praveen-pravi6B/SnapChef/main/src/assets/logo.png',
        link: 'https://snap-chef-khaki.vercel.app/'
      }
]);
</script>

<style scoped>
.section-title {
  font-size: 2rem;
  color: var(--light-text);
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 4px solid var(--primary-blue);
}

p {
  color: var(--medium-text);
  line-height: 1.6;
}

.project-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.5rem;
}

.project-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: bold;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  align-self: flex-start;
}

.project-link:hover {
  color: var(--light-text);
  text-decoration: underline;
}

@media (max-width: 600px) {
  .project-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .project-details {
    align-items: center;
  }
}


</style>