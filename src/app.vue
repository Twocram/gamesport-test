<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import VHeader from './components/v-header.vue'
import MainLayout from './layouts/main-layout.vue'

function checkLocale() {
  const storageLocale = localStorage.getItem('locale')

  const { locale } = useI18n()

  if (!storageLocale) {
    localStorage.setItem('locale', 'en')
    locale.value = 'en'
  }

  if (storageLocale) {
    locale.value = storageLocale
  }
}

onMounted(() => {
  checkLocale()
})
</script>

<template>
  <VHeader />
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<style scoped></style>
