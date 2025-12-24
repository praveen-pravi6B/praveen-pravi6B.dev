<template>
  <nav class="navbar">
    <div class="nav-left">
      <a href="#" class="nav-logo">
        <img src="/logo.png" alt="Portfolio Logo" class="logo-image" />
      </a>
    </div>
    
    <!-- Hamburger Icon (Mobile Only) -->
    <button class="hamburger" @click="toggleMenu" :class="{ active: isMenuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Navigation Links -->
    <div class="nav-right" :class="{ active: isMenuOpen }">
      <a href="#about" class="nav-link" @click="closeMenu">About</a>
      <a href="#skills" class="nav-link" @click="closeMenu">Skills</a>
      <a href="#projects" class="nav-link" @click="closeMenu">Projects</a>
      <a href="#contact" class="nav-link" @click="closeMenu">Contact</a>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(10, 10, 16, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(25, 118, 210, 0.2);
  margin-bottom: 3rem;
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-image {
  height: 40px;
  width: auto;
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.05);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 11;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: var(--light-text);
  border-radius: 3px;
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

.nav-right {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--medium-text);
  text-decoration: none;
  transition: color 0.3s;
  padding: 0.5rem 0;
}

.nav-link:hover {
  color: var(--primary-blue);
  text-shadow: 0 0 5px rgba(25, 118, 210, 0.7);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-right {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 70%;
    max-width: 300px;
    background: rgba(10, 10, 16, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 5rem 2rem 2rem;
    gap: 2rem;
    transition: right 0.3s ease;
    border-left: 1px solid rgba(25, 118, 210, 0.2);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
    overflow-y: auto; /* Allow menu content to scroll if needed */
  }

  .nav-right.active {
    right: 0;
  }

  .nav-link {
    font-size: 1.2rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
