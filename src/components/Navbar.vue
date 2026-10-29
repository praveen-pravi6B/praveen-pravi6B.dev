<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, 'theme-minimal': isMinimal }">
    <a href="#home" class="nav-logo">
      <img src="/logo.png" alt="Praveen Kumar" class="logo-img" />
    </a>
    <div class="nav-right">
      <div class="nav-links">
        <a href="/#about" class="nav-link">About</a>
        <a href="/#skills" class="nav-link">Skills</a>
        <a href="/#projects" class="nav-link">Projects</a>
        <RouterLink to="/blog" class="nav-link">Blog</RouterLink>
      </div>
      <div class="theme-switcher-wrap"><ThemeSwitcher /></div>
      <a href="#contact" class="nav-cta">Let's talk</a>
    </div>

    <!-- Mobile hamburger -->
    <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Menu">
      <span /><span /><span />
    </button>

  </nav>

  <!-- Teleported to body so backdrop-filter on nav doesn't clip it -->
  <Teleport to="body">
    <div class="mobile-drawer" :class="{ open: menuOpen }">
      <button class="m-close" @click="menuOpen = false" aria-label="Close">✕</button>
      <a href="/#about"    class="m-link" @click="menuOpen = false">About</a>
      <a href="/#skills"   class="m-link" @click="menuOpen = false">Skills</a>
      <a href="/#projects" class="m-link" @click="menuOpen = false">Projects</a>
      <RouterLink to="/blog" class="m-link" @click="menuOpen = false">Blog</RouterLink>
      <a href="/#contact"  class="m-cta"  @click="menuOpen = false">Let's talk</a>
      <!-- Theme switcher inside drawer -->
      <div class="m-theme">
        <ThemeSwitcher />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { useTheme } from '../composables/useTheme.js'

const { current } = useTheme()
const isScrolled = ref(false)
const menuOpen = ref(false)

const isMinimal = computed(() => current.value === 'minimal')

const onScroll = () => { isScrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* ── Base navbar (dark/cosmic themes) ───── */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: .9rem 2rem;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(5,5,8,.5);
  border-bottom: 1px solid rgba(255,255,255,.07);
  transition: background .35s, border-color .35s, box-shadow .35s, backdrop-filter .35s;
}
.navbar.scrolled {
  background: rgba(20,20,30,.85);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom-color: rgba(255,255,255,.12);
}

/* Logo — white by default (dark bg) */
.logo-img {
  height: 36px; width: auto; object-fit: contain;
  filter: brightness(0) invert(1);
  transition: filter .35s;
}

/* Nav links — muted white by default */
.nav-link {
  font-size: .85rem; font-weight: 500; color: rgba(255,255,255,.6);
  transition: color .2s; position: relative;
}
.nav-link::after {
  content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
  height: 1px; background: var(--grad);
  transform: scaleX(0); transform-origin: left; transition: transform .25s;
}
.nav-link:hover { color: #fff; }
.nav-link:hover::after { transform: scaleX(1); }

/* CTA */
.nav-cta {
  font-size: .82rem; font-weight: 600;
  background: var(--grad); color: #fff;
  padding: .4rem 1.1rem; border-radius: 999px;
  transition: opacity .2s, transform .15s;
}
.nav-cta:hover { opacity: .88; transform: translateY(-1px); }

/* ── MINIMAL THEME — before scroll ──────── */
.theme-minimal {
  background: #fff;
  border-bottom: 1.5px solid #e8e8e8;
  box-shadow: 0 1px 0 #e8e8e8;
}
/* black logo before scroll */
.theme-minimal .logo-img { filter: brightness(0); }
/* black nav links before scroll */
.theme-minimal .nav-link { color: #333; }
.theme-minimal .nav-link:hover { color: #000; }
/* dark CTA before scroll */
.theme-minimal .nav-cta { background: #0a0a0a; }
.theme-minimal .nav-cta:hover { background: var(--a1); }

/* ── MINIMAL THEME — after scroll ───────── */
.theme-minimal.scrolled {
  background: rgba(50,50,60,.88);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom-color: rgba(255,255,255,.08);
  box-shadow: none;
}
/* white logo after scroll */
.theme-minimal.scrolled .logo-img { filter: brightness(0) invert(1); }
/* white nav links after scroll */
.theme-minimal.scrolled .nav-link { color: rgba(255,255,255,.65); }
.theme-minimal.scrolled .nav-link:hover { color: #fff; }
/* gradient CTA after scroll */
.theme-minimal.scrolled .nav-cta { background: var(--grad); }

/* ── Hamburger ──────────────────────────── */
.nav-right { display: flex; align-items: center; gap: 1.5rem; }
.nav-links { display: flex; gap: 1.8rem; }

.hamburger {
  display: none; flex-direction: column; gap: 5px;
  background: transparent; border: none; cursor: pointer; padding: .4rem; z-index: 200;
}
.hamburger span {
  display: block; width: 22px; height: 2px;
  background: rgba(255,255,255,.85); /* always white — works on dark navbars */
  border-radius: 2px; transition: all .3s;
}
/* Minimal before scroll — nav is white, so use dark spans */
.theme-minimal:not(.scrolled) .hamburger span {
  background: rgba(0,0,0,.75);
}
.hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

/* ── Mobile drawer (teleported to body) ─── */
.mobile-drawer {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(5,5,8,.97); backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 2rem; opacity: 0; pointer-events: none; transition: opacity .3s;
}
.mobile-drawer.open { opacity: 1; pointer-events: all; }

.m-close {
  position: absolute; top: 1.2rem; right: 1.5rem;
  background: transparent; border: none; cursor: pointer;
  font-size: 1.4rem; color: rgba(255,255,255,.5);
  transition: color .2s; line-height: 1;
}
.m-close:hover { color: #fff; }

.m-link { font-size: 1.6rem; font-weight: 700; color: rgba(255,255,255,.6); transition: color .2s; text-decoration: none; }
.m-link:hover { color: #fff; }
.m-cta {
  font-size: 1rem; font-weight: 600;
  background: var(--grad); color: #fff;
  padding: .8rem 2rem; border-radius: 999px; text-decoration: none;
}
.m-theme { margin-top: .5rem; }

@media (max-width: 768px) {
  /* Hide everything in nav-right — links, switcher, cta */
  .nav-right { display: none; }
  .hamburger { display: flex; }
}
/* Theme switcher: desktop only always */
@media (max-width: 900px) {
  .theme-switcher-wrap { display: none; }
}
</style>
