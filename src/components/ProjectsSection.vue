<template>
  <section id="projects">
    <h2 class="section-title">Projects</h2>
    <GlassCard v-for="project in projects" :key="project.id" :title="project.title">
      <div class="project-content">
        <img v-if="project.image" :src="project.image" :alt="project.title" class="project-image" />
        <div class="project-details">
          <p>{{ project.description }}</p>
          <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="project-link">
            View Project <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
    </div>
    </GlassCard>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import GlassCard from './GlassCard.vue';

const googleSheetCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQxFWwjf1vyxRQiaLkdsl-OomxIPYHLdCNNNqtsnjj-wswqT0SiiHOT8lW4tNAvqIHxDuNiCpK-LW6U/pub?gid=0&single=true&output=csv';

const projects = ref([]);
const loading = ref(true);
const error = ref(null);

const parseCsv = (csvText) => {
  const lines = csvText.trim().split('\n');
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(header => header.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(value => value.trim());
    const entry = {
      id: i,
    };
    headers.forEach((header, index) => {
      entry[header] = values[index];
    });
    data.push(entry);
  }
  return data;
};

onMounted(async () => {
  try {
    const response = await fetch(googleSheetCsvUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    projects.value = parseCsv(csvText);
    console.log("parseCsv", parseCsv(csvText));
  } catch (err) {
    error.value = err.message;
    console.error("Failed to fetch Google Sheet data:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.section-title {
  font-size: 2rem;
  color: var(--light-text);
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 4px solid var(--primary-blue);
}

.loading-message, .error-message {
  color: var(--medium-text);
  text-align: center;
  font-size: 1.1rem;
  margin-top: 2rem;
}

.error-message {
  color: #ff5f56;
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

  .project-image {
    width: 100%;
    max-width: 300px;
    height: auto;
    aspect-ratio: 16/9;
    margin-bottom: 1rem;
  }

  .project-details {
    align-items: center;
  }
  
  .project-link {
    align-self: center;
  }
}

@media (max-width: 375px) {
  .project-image {
    max-width: 100%;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}


</style>