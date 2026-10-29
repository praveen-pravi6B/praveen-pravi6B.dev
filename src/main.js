import { createApp, nextTick } from 'vue'
import App from './App.vue'
import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useTheme } from './composables/useTheme.js'

// Init theme before mount (applies data-theme to <html> immediately)
const { current } = useTheme()

const app = createApp(App)
app.mount('#app')

// After first render: mount cosmic FX if that's the saved theme
nextTick(() => {
  if (current.value === 'cosmic') {
    // Re-trigger by switching away then back — ensures stars mount after DOM is ready
    useTheme().set('cosmic')
  }
})
