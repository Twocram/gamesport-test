import { defineStore } from "pinia"
import { ref } from "vue";
import { useI18n } from "vue-i18n"

export const useLocaleStore = defineStore('locale', () => {
    const { locale } = useI18n();
    const storageLocale = localStorage.getItem('locale') as string;

    const localLocale = ref(storageLocale);

    function checkLocale() {
        if (!storageLocale) {
            localStorage.setItem('locale', 'en');
            locale.value = 'en';
        }

        locale.value = storageLocale
    }

    function setLocale(_locale: string) {
        localStorage.setItem('locale', _locale);
        localLocale.value = _locale
        locale.value = _locale
    }

    return {
        localLocale,
        setLocale,
        checkLocale
    }
})