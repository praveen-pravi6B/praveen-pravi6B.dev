<script setup>
import { stats } from "../data/content";
</script>

<template>
  <section class="section" id="about">
    <div class="section-head" v-reveal>
      <div>
        <span class="sec-index">02 — About</span>
        <h2>A little <em>context.</em></h2>
      </div>
      <p class="head-note">
        Frontend developer, systems thinker, and persistent tinkerer.
      </p>
    </div>

    <div class="about-grid">
      <p class="pull" v-reveal>
        The best interface is the one you <em>stop noticing.</em>
      </p>

      <div class="about-body" v-reveal>
        <p>
          I'm <strong>Praveen Kumar</strong>, a frontend developer focused on
          the details that make a product feel considered — the spacing, the
          motion, the empty states, the thing that happens at exactly 1023px.
        </p>
        <p>
          Lately I've been building <strong>local-first AI tools</strong>:
          software that runs on your machine, keeps your data yours, and still
          feels like magic. I care about strong systems, accessible interfaces,
          and shipping work that survives contact with real users.
        </p>
        <div class="sig"><span></span> Praveen</div>
      </div>
    </div>

    <div class="stats" v-reveal>
      <div v-for="stat in stats" :key="stat.label" class="stat">
        <strong>
          {{ stat.value }}<sup v-if="stat.suffix">{{ stat.suffix }}</sup>
        </strong>
        <span>{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>
