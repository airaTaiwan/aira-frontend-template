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
import 'floating-vue/dist/style.css'
import '@vuepic/vue-datepicker/dist/main.css'
import '@vueform/multiselect/themes/default.css'

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
  .use(router)
  .use(createPinia())
  .use(PiniaColada, {
    queryOptions: {
      placeholderData: previousData => previousData,
      staleTime: Number.POSITIVE_INFINITY,
    },
  })
app.mount('#app')
