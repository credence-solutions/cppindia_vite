// =============================================================================
// APPLICATION ENTRY POINT
// =============================================================================
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Global styles
import '@/styles/global.scss'

// Create app
const app = createApp(App)

// Plugins
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Boot theme from localStorage before first render
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore(pinia)
document.documentElement.setAttribute('data-theme', themeStore.active)

// Mount
app.mount('#app')
