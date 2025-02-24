import type { ToastContainerOptions } from 'vue3-toastify'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Vue3Toastify from 'vue3-toastify'
import { createI18n } from 'vue-i18n'
import App from './app.vue'

import en from './locales/en.json'
import ru from './locales/ru.json'
import router from './router'

import './assets/main.css'
import 'vue3-toastify/dist/index.css'

const messages = {
  en,
  ru,
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 2000,
} as ToastContainerOptions)

app.mount('#app')
