<template>
  <div class="giscus-wrap" ref="wrapRef">
    <!-- giscus injects here via script -->
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme.js'

/**
 * Setup steps (one-time):
 *  1. Enable Discussions on github.com/praveen-pravi6B/praveen-pravi6B.dev → Settings → Features
 *  2. Install giscus app: https://github.com/apps/giscus → only this repo
 *  3. Go to https://giscus.app, enter "praveen-pravi6B/praveen-pravi6B.dev"
 *     and copy REPO_ID + CATEGORY_ID into the constants below.
 */
const REPO        = 'praveen-pravi6B/praveen-pravi6B.dev'
const REPO_ID     = 'REPLACE_REPO_ID'       // from giscus.app
const CATEGORY    = 'Blog Comments'          // create this category in Discussions
const CATEGORY_ID = 'REPLACE_CATEGORY_ID'   // from giscus.app

const themeMap = {
  dark:      'dark',
  minimal:   'light',
  cosmic:    'dark_dimmed',
  brutalist: 'dark_high_contrast',
}

const wrapRef = ref(null)
const { current } = useTheme()

function giscusTheme() {
  return themeMap[current.value] ?? 'dark'
}

function loadScript() {
  if (!wrapRef.value) return
  // remove previous instance
  wrapRef.value.innerHTML = ''

  const s = document.createElement('script')
  s.src                      = 'https://giscus.app/client.js'
  s.setAttribute('data-repo',              REPO)
  s.setAttribute('data-repo-id',           REPO_ID)
  s.setAttribute('data-category',          CATEGORY)
  s.setAttribute('data-category-id',       CATEGORY_ID)
  s.setAttribute('data-mapping',           'pathname')
  s.setAttribute('data-strict',            '0')
  s.setAttribute('data-reactions-enabled', '1')
  s.setAttribute('data-emit-metadata',     '0')
  s.setAttribute('data-input-position',    'top')
  s.setAttribute('data-theme',             giscusTheme())
  s.setAttribute('data-lang',              'en')
  s.setAttribute('crossorigin',            'anonymous')
  s.async = true
  wrapRef.value.appendChild(s)
}

function sendThemeUpdate(theme) {
  const iframe = document.querySelector('iframe.giscus-frame')
  if (!iframe) return
  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme } } },
    'https://giscus.app'
  )
}

// On theme toggle: update live without full reload
watch(current, (val) => {
  sendThemeUpdate(themeMap[val] ?? 'dark')
})

onMounted(loadScript)
</script>

<style scoped>
.giscus-wrap {
  margin-top: 4rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--border);
}
</style>
