<script setup>
import { useTheme } from "../composables/useTheme";

defineProps({
  compact: { type: Boolean, default: false },
});

const { isDark, toggle, label, ariaLabel } = useTheme();
</script>

<template>
  <button
    class="theme-toggle"
    :class="{ 'theme-toggle--icon': compact }"
    type="button"
    :aria-pressed="String(isDark)"
    :aria-label="ariaLabel"
    @click="toggle"
  >
    <svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
    <svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      />
    </svg>
    <span class="theme-label">{{ label }}</span>
  </button>
</template>
