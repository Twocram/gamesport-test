import './assets/main.css'
import en from "./locales/en.json"
import ru from "./locales/ru.json"

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

app.mount('#app')
