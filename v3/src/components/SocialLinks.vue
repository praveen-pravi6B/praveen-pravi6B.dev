<script setup>
import { socials } from "../data/content";

defineProps({
  variant: {
    type: String,
    default: "rail",
    validator: (value) => ["rail", "contact"].includes(value),
  },
});
</script>

<template>
  <div :class="variant === 'contact' ? 'contact-socials' : 'rail-socials'">
    <a
      v-for="social in socials"
      :key="social.label"
      :class="variant === 'contact' ? 'social-btn' : undefined"
      :href="social.href"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="social.label"
    >
      <svg
        v-if="social.icon === 'github'"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M12 .7C5.7.7.6 5.8.6 12.1c0 5 3.2 9.3 7.7 10.8.6.1.8-.3.8-.6v-2.2c-3.1.7-3.8-1.5-3.8-1.5-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.5-.3-5.2-1.3-5.2-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C18 4.1 19 4.4 19 4.4c.6 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.2 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6a11.4 11.4 0 0 0 7.7-10.8C23.4 5.8 18.3.7 12 .7Z"
        />
      </svg>
      <svg
        v-else-if="social.icon === 'linkedin'"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.8-2.1 3.7-2.1 4 0 4.7 2.6 4.7 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21h-4V9Z"
        />
      </svg>
      <svg
        v-else
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.5L6.5 22H3.4l7.3-8.3L2.7 2h6.4l4.4 5.9L18.9 2Zm-1.1 18.2h1.7L8.3 3.7H6.5l11.3 16.5Z"
        />
      </svg>
    </a>
  </div>
</template>
