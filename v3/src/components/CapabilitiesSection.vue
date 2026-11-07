<script setup>
import { capabilities } from "../data/content";
</script>

<template>
  <section class="section" id="capabilities">
    <div class="section-head" v-reveal>
      <div>
        <span class="sec-index">03 — Capabilities</span>
        <h2>The <em>toolbox.</em></h2>
      </div>
      <p class="head-note">
        The stack I reach for when turning an idea into something real.
      </p>
    </div>

    <div class="cap-grid" v-reveal>
      <div
        v-for="column in capabilities"
        :key="column.title"
        class="cap-col"
      >
        <h3>{{ column.title }}</h3>
        <div
          v-for="item in column.items"
          :key="item.name"
          class="cap-item"
        >
          {{ item.name }} <span>{{ item.level }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
