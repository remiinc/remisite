import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initializeAnalytics } from './lib/analytics.js'
import { getPageLoader } from './lib/page-loaders.js'

const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
const usesDarkFirstFold = ['/', '/about'].includes(normalizedPath)
document.querySelector('meta[name="theme-color"]')?.setAttribute(
  'content',
  usesDarkFirstFold ? '#181613' : '#fffef9',
)

const routeLoader = getPageLoader(normalizedPath)
if (routeLoader) await routeLoader()

initializeAnalytics()
const appRoot = document.querySelector('#app')
createApp(App).mount(appRoot)
appRoot.removeAttribute('data-prerendered')
