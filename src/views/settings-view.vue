<script setup lang="ts">
import vButton from '@/components/ui/v-button.vue'
import vSelect from '@/components/ui/v-select.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const currentLocale = ref(localStorage.getItem('locale') as string)

const { locale } = useI18n()

const localeOptions = [
  { label: 'Русский', value: 'ru' },
  { label: 'English', value: 'en' },
]

function saveSettings() {
  localStorage.setItem('locale', currentLocale.value)
  locale.value = currentLocale.value
}
</script>

<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6 text-center">
      {{ $t('settings.title') }}
    </h1>
    <v-select v-model="currentLocale" class="mb-6" :options="localeOptions" :label="$t('settings.chooseLanguage')" />

    <v-button class="w-full" @click="saveSettings">
      {{ $t('actions.save') }}
    </v-button>
  </div>
</template>

<style scoped></style>
