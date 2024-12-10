import { createPinia } from 'pinia'
import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import App from './App.vue'
import installPlugins from './plugin'

import './styles/scss/style.scss'
import './styles/main.css'
import '@unocss/reset/tailwind-compat.css'
import 'vue-step-progress/dist/main.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  routes: setupLayouts(routes),
  history: createWebHistory(import.meta.env.BASE_URL),
})

installPlugins(app)

app.use(createPinia()).use(router)
app.mount('#app')
