import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initializeAnalytics } from './lib/analytics.js'
import { getPageLoader } from './lib/page-loaders.js'

const routeLoader = getPageLoader(window.location.pathname)
if (routeLoader) await routeLoader()

initializeAnalytics()
createApp(App).mount('#app')
