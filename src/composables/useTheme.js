import { ref } from 'vue'

const THEMES = ['dark', 'cosmic', 'brutalist', 'minimal']
const STORAGE_KEY = 'pk-theme'

// Singleton state — shared across all components
const current = ref('minimal')
let initialized = false

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(STORAGE_KEY, theme)

  document.getElementById('stars-layer')?.remove()
  document.getElementById('cursor-el')?.remove()
  document.getElementById('cursor-ring-el')?.remove()
  document.body.style.cursor = ''

  if (theme === 'cosmic') mountCosmicFx()
}

function mountCosmicFx() {
  const layer = document.createElement('div')
  layer.id = 'stars-layer'
  layer.style.cssText = 'position:fixed;inset:0;z-index:-2;pointer-events:none;overflow:hidden'
  for (let i = 0; i < 180; i++) {
    const s = document.createElement('div')
    const sz = Math.random() * 2 + 0.5
    const dur = (Math.random() * 4 + 2).toFixed(1)
    const delay = (-Math.random() * 6).toFixed(1)
    s.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;border-radius:50%;background:#fff;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${(Math.random()*.5+.1).toFixed(2)};animation:starTwinkle ${dur}s ease-in-out ${delay}s infinite`
    layer.appendChild(s)
  }
  document.body.prepend(layer)

  document.body.style.cursor = 'none'
  const cur = document.createElement('div')
  cur.id = 'cursor-el'
  cur.style.cssText = 'position:fixed;width:10px;height:10px;background:#00f5ff;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .15s,height .15s;mix-blend-mode:screen'
  const ring = document.createElement('div')
  ring.id = 'cursor-ring-el'
  ring.style.cssText = 'position:fixed;width:36px;height:36px;border:1px solid rgba(0,245,255,.4);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);mix-blend-mode:screen'
  document.body.append(cur, ring)

  let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my
  const onMove = e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px' }
  document.addEventListener('mousemove', onMove)
  const animRing = () => {
    rx += (mx - rx) * .12; ry += (my - ry) * .12
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
    if (document.getElementById('cursor-ring-el')) requestAnimationFrame(animRing)
  }
  animRing()
}

export function useTheme() {
  // Init only once (singleton) — runs synchronously so theme applies before first paint
  if (!initialized) {
    initialized = true
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && THEMES.includes(saved)) current.value = saved
    if (typeof document !== 'undefined') {
      // Apply theme tokens immediately
      document.documentElement.setAttribute('data-theme', current.value)
      // Mount special FX after DOM is ready
      if (current.value === 'cosmic') {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => mountCosmicFx())
        } else {
          mountCosmicFx()
        }
      }
    }
  }

  function set(theme) {
    current.value = theme
    applyTheme(theme)
  }

  function cycle() {
    const idx = (THEMES.indexOf(current.value) + 1) % THEMES.length
    set(THEMES[idx])
  }

  return { current, themes: THEMES, set, cycle }
}
