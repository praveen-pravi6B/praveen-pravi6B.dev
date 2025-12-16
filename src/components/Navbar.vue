<template>
  <nav class="navbar">
    <div class="nav-left">
      <a href="#" class="nav-logo">Praveen Kumar</a>
    </div>
    <div class="nav-right">
      <a href="#about" class="nav-link">About</a>
      <a href="#skills" class="nav-link">Skills</a>
      <a href="#projects" class="nav-link">Projects</a>
      <a href="#contact" class="nav-link">Contact</a>
    </div>
  </nav>
</template>

<script setup>
// No script logic needed for this simple version
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
  max-width: 1200px;
}

.nav-logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--light-text);
  text-decoration: none;
}

.nav-right {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--medium-text);
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--primary-blue);
  text-shadow: 0 0 5px rgba(25, 118, 210, 0.7);
}
</style>