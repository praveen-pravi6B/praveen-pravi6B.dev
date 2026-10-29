<template>
  <div class="theme-switcher">
    <button
      v-for="t in themes"
      :key="t"
      class="t-btn"
      :class="{ active: current === t }"
      :title="labels[t]"
      @click="set(t)"
    >
      <span class="t-dot" :style="{ background: dots[t] }"></span>
      <span class="t-name">{{ labels[t] }}</span>
    </button>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme.js'

const { current, themes, set } = useTheme()

const labels = {
  dark:      'Dark',
  cosmic:    'Cosmic',
  brutalist: 'Brutal',
  minimal:   'Minimal',
}

const dots = {
  dark:      'linear-gradient(135deg,#3b82f6,#8b5cf6)',
  cosmic:    'linear-gradient(135deg,#00f5ff,#bf5af2)',
  brutalist: '#ff3f3f',
  minimal:   '#0066ff',
}
</script>

<style scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  gap: 2px;
  background: var(--switcher-bg, rgba(255,255,255,.06));
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 3px;
}

.t-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 999px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: .72rem;
  font-weight: 600;
  /* Always light — switcher lives on dark navbars by default */
  color: rgba(255,255,255,.55);
  transition: all .2s;
  font-family: inherit;
  letter-spacing: .02em;
}

.t-btn:hover { color: rgba(255,255,255,.9); }

.t-btn.active {
  background: var(--switcher-active, rgba(255,255,255,.12));
  color: #fff;
}

.t-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .t-name { display: none; }
  .t-btn { padding: 5px 8px; }
}
</style>
