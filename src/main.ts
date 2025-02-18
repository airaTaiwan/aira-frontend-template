import type { UserModule } from './types'
import { PiniaColada } from '@pinia/colada'
import { createPinia } from 'pinia'
import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from 'vue-router/auto-routes'

import App from './App.vue'
import './styles/scss/style.scss'
import './styles/main.css'
import '@unocss/reset/tailwind-compat.css'
import 'uno.css'
import 'vue-step-progress/dist/main.css'

const app = createApp(App)
const router = createRouter({
  routes: setupLayouts(routes),
  history: createWebHistory(import.meta.env.BASE_URL),
})

Object.values(import.meta.glob<{ install: UserModule }>('./plugin/*.ts', { eager: true }))
  .forEach((i) => {
    i.install?.(app)
  })

app
  .use(createPinia())
  .use(PiniaColada)
  .use(router)
app.mount('#app')
