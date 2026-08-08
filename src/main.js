import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { capturePageview, initializeAnalytics } from './lib/analytics.js'
import { getPageLoader } from './lib/page-loaders.js'

const routeLoader = getPageLoader(window.location.pathname)
if (routeLoader) await routeLoader()

const appRoot = document.querySelector('#app')
createApp(App).mount(appRoot)
appRoot.removeAttribute('data-prerendered')

const loadAnalytics = async () => {
  const { posthog } = await import('posthog-js')
  if (initializeAnalytics({ client: posthog })) capturePageview()
}

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(loadAnalytics, { timeout: 1500 })
} else {
  window.setTimeout(loadAnalytics, 0)
}
