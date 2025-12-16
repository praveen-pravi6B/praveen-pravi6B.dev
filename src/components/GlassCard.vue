<template>
  <div class="glass-card">
    <div class="card-header" v-if="title">
      {{ title }}
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
});
</script>

<style scoped>
.glass-card {
  background: rgba(30, 30, 40, 0.4);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border-radius: 12px;
  border: 1px solid rgba(var(--primary-blue), 0.2);
  margin-bottom: 2rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-blue);
  border-bottom: 1px solid rgba(var(--primary-blue), 0.2);
}

.card-content {
  padding: 1.5rem;
  line-height: 1.7;
}
</style>
