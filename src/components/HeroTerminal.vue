<template>
  <div class="hero-terminal">
    <div class="term-bar">
      <span class="dot dot-r"></span>
      <span class="dot dot-y"></span>
      <span class="dot dot-g"></span>
      <span class="term-title">~/praveen-pravi6B — zsh</span>
    </div>
    <div class="term-body" ref="bodyRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  promptChar: { type: String, default: '~' },
})

const bodyRef = ref(null)

const lines = [
  { cmd: 'whoami',              out: 'praveen-pravi6B' },
  { cmd: 'git log --oneline -1',out: 'a1b2c3d feat: ship something great' },
  { cmd: 'pnpm build',          out: '✓ built in 2.4s  ·  0 errors' },
  { cmd: 'cat stack.json',      out: '{ vue, react, fastapi, llama.cpp }' },
  { cmd: 'ls projects/',        out: 'pixelbreak  hearwild  mailmate  lumaframe' },
]

let timers = []
let lineIdx = 0
let currentRow = null

function t(fn, ms) {
  const id = setTimeout(fn, ms)
  timers.push(id)
  return id
}

function addPromptRow() {
  const body = bodyRef.value
  currentRow = document.createElement('div')
  currentRow.className = 'tl'
  currentRow.innerHTML =
    `<span class="tp">${props.promptChar} $&nbsp;</span>` +
    `<span class="tc"></span>` +
    `<span class="tk"></span>`
  body.appendChild(currentRow)
  body.scrollTop = body.scrollHeight
}

function cmdSpan() { return currentRow?.querySelector('.tc') }
function removeCursor() { currentRow?.querySelector('.tk')?.remove() }

function addOutput(text) {
  const body = bodyRef.value
  const out = document.createElement('div')
  out.className = 'tl'
  out.innerHTML = `<span class="to">${text}</span>`
  body.appendChild(out)
  body.scrollTop = body.scrollHeight
}

function addSpacer() {
  const sp = document.createElement('div')
  sp.style.height = '.3rem'
  bodyRef.value.appendChild(sp)
}

function typeCmd(charIdx) {
  const line = lines[lineIdx]
  if (charIdx < line.cmd.length) {
    cmdSpan().textContent += line.cmd[charIdx]
    t(() => typeCmd(charIdx + 1), 60 + Math.random() * 25)
  } else {
    t(showOutput, 480)
  }
}

function showOutput() {
  removeCursor()
  addOutput(lines[lineIdx].out)
  const cycleEnd = lineIdx === lines.length - 1
  lineIdx = (lineIdx + 1) % lines.length
  t(cycleEnd ? doClear : nextLine, 700)
}

function doClear() {
  addSpacer()
  addPromptRow()
  t(() => typeClear(0), 150)
}

function typeClear(charIdx) {
  const clearCmd = 'clear'
  if (charIdx < clearCmd.length) {
    cmdSpan().textContent += clearCmd[charIdx]
    t(() => typeClear(charIdx + 1), 60 + Math.random() * 25)
  } else {
    t(() => {
      removeCursor()
      bodyRef.value.innerHTML = ''
      addPromptRow()
      t(() => typeCmd(0), 300)
    }, 500)
  }
}

function nextLine() {
  addSpacer()
  addPromptRow()
  t(() => typeCmd(0), 150)
}

onMounted(() => {
  addPromptRow()
  t(() => typeCmd(0), 400)
})

onUnmounted(() => {
  timers.forEach(clearTimeout)
  timers = []
})
</script>

<style scoped>
/* CSS variables set per-theme in main.css */
.hero-terminal {
  border-radius: var(--term-radius, 14px);
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: .82rem;
  background: var(--term-bg, #0d0d1a);
  border: 1px solid var(--term-border, rgba(124,58,237,.3));
  box-shadow: var(--term-shadow, 0 0 40px rgba(124,58,237,.12), 0 20px 60px rgba(0,0,0,.4));
}

.term-bar {
  padding: .7rem 1rem;
  display: flex;
  align-items: center;
  gap: .5rem;
  background: var(--term-bar-bg, #1a1a2e);
  border-bottom: 1px solid var(--term-border, rgba(124,58,237,.2));
}
.dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
.dot-r { background: #ff5f57; }
.dot-y { background: #febc2e; }
.dot-g { background: #28c840; }
.term-title {
  flex: 1; text-align: center;
  font-size: .72rem; font-family: var(--font-mono);
  color: var(--term-title-color, #555);
}

.term-body {
  padding: 1.2rem 1.4rem;
  min-height: 260px;
  max-height: 320px;
  overflow: hidden;
  line-height: 1.9;
  color: var(--term-text, #c9d1d9);
}

/* Injected spans */
:deep(.tl) { display: flex; gap: .3rem; flex-wrap: wrap; }
:deep(.tp) { color: var(--term-prompt, #a78bfa); flex-shrink: 0; }
:deep(.tc) { color: var(--term-cmd, #e2e8f0); }
:deep(.to) { color: var(--term-out, #7dd3a8); padding-left: 1.2rem; }
:deep(.tk) {
  display: inline-block; width: 8px; height: 1.1em;
  background: var(--term-cursor, #a78bfa);
  vertical-align: text-bottom;
  animation: blink 1.1s step-end infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
</style>
