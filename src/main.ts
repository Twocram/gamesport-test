import './assets/main.css'
import en from "./locales/en.json"
import ru from "./locales/ru.json"
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue'
import { createI18n } from "vue-i18n"
import { createPinia } from 'pinia'

import App from './app.vue'
import router from './router'

const messages = {
    en,
    ru
}

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages
})

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(Vue3Toastify, {
    autoClose: 2000,
} as ToastContainerOptions)

app.mount('#app')
