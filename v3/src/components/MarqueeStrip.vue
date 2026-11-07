<script setup>
import { marqueeItems } from "../data/content";
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      <template v-for="item in marqueeItems" :key="item">
        <span>{{ item }}</span><b>✳</b>
      </template>
    </div>
    <div class="marquee-track" aria-hidden="true">
      <template v-for="item in marqueeItems" :key="`${item}-dup`">
        <span>{{ item }}</span><b>✳</b>
      </template>
    </div>
  </div>
</template>
