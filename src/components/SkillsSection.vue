<template>
  <section id="skills">
    <h2 class="section-title">Skills</h2>
    <GlassCard>
      <div class="skills-grid">
        <div class="skill-category">
          <h3>Languages</h3>
          <ul>
            <li v-for="skill in languages" :key="skill.name">
              <img v-if="skill.imgSrc" :src="skill.imgSrc" :alt="skill.name" class="skill-icon-img" />
              <i v-else :class="skill.icon"></i>
              {{ skill.name }}
            </li>
          </ul>
        </div>
        <div class="skill-category">
          <h3>Frameworks & Libraries</h3>
          <ul>
            <li v-for="skill in frameworks" :key="skill.name">
              <img v-if="skill.imgSrc" :src="skill.imgSrc" :alt="skill.name" class="skill-icon-img" />
              <i v-else :class="skill.icon"></i>
              {{ skill.name }}
            </li>
          </ul>
        </div>
        <div class="skill-category">
          <h3>Tools & Platforms</h3>
          <ul>
            <li v-for="skill in tools" :key="skill.name">
              <img v-if="skill.imgSrc" :src="skill.imgSrc" :alt="skill.name" class="skill-icon-img" />
              <i v-else :class="skill.icon"></i>
              {{ skill.name }}
            </li>
          </ul>
        </div>
      </div>
    </GlassCard>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import GlassCard from './GlassCard.vue';

const languages = ref([
  { name: 'JavaScript', icon: 'devicon-javascript-plain', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Java', icon: 'devicon-java-plain', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Shell/Bash', icon: 'devicon-bash-plain', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
  { name: 'HTML5', icon: 'devicon-html5-plain', imgSrc: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg' },
  { name: 'CSS3', icon: 'devicon-css3-plain', imgSrc: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg' },
]);

const frameworks = ref([
  { name: 'Vue.js', icon: 'devicon-vuejs-plain', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'React', icon: 'devicon-react-original', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'devicon-nextjs-original', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express', icon: 'devicon-express-original', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'Astro', icon: 'devicon-astro-original', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg' },
]);

const tools = ref([
  { name: 'Figma', icon: 'devicon-figma-plain', imgSrc: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg' },
  { name: 'Docker', icon: 'devicon-docker-plain', imgSrc: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg' },
  { name: 'GitHub', icon: 'devicon-github-original', imgSrc: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg' },
  { name: 'Firebase', icon: 'devicon-firebase-plain', imgSrc: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg' },
  { name: 'Vercel', icon: 'devicon-vercel-original', imgSrc: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vercel/vercel-original.svg' },
  { name: 'Linux', icon: 'devicon-linux-plain', imgSrc: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg' },
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.skill-category h3 {
  color: var(--light-text);
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.skill-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skill-category li {
  color: var(--medium-text);
  margin-bottom: 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.skill-category li i {
  font-size: 2rem;
  color: var(--primary-blue);
}

.skill-icon-img {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.skill-category li:hover .skill-icon-img,
.skill-category li:hover i {
  transform: scale(1.2);
  filter: drop-shadow(0 0 8px var(--primary-blue));
}

.skill-category li i {
  transition: transform 0.3s ease, text-shadow 0.3s ease;
}

.skill-category li:hover i {
  text-shadow: 0 0 8px var(--primary-blue);
  filter: none; /* filter drop-shadow doesn't work well on text/font icons in some contexts, text-shadow is better for <i> */
}
</style>