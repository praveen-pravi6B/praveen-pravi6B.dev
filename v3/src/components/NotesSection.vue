<script setup>
import { notes } from "../data/content";
</script>

<template>
  <section class="section" id="notes">
    <div class="section-head" v-reveal>
      <div>
        <span class="sec-index">04 — Notes</span>
        <h2>Written <em>in public.</em></h2>
      </div>
      <p class="head-note">
        Short notes on building, local AI, and the messy middle of product
        work.
      </p>
    </div>

    <div class="notes-grid">
      <a
        v-for="note in notes"
        :key="note.number"
        class="note"
        :href="note.href"
        v-reveal
      >
        <div class="note-top">
          <span class="note-num">{{ note.number }}</span>
          <span class="note-tag">{{ note.tag }}</span>
        </div>
        <h3>{{ note.title }}</h3>
        <p>{{ note.excerpt }}</p>
        <div class="note-foot">
          <span>{{ note.date }}</span>
          <span class="read">
            Read
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3 9 9 3M4 3h5v5" />
            </svg>
          </span>
        </div>
      </a>
    </div>
  </section>
</template>
