<script setup lang="ts">
import { onMounted } from 'vue'
import VHeader from './components/v-header.vue'
import MainLayout from './layouts/main-layout.vue'
import { useLocaleStore } from './stores/locale'

const localeStore = useLocaleStore()

onMounted(() => {
  localeStore.checkLocale()
})
</script>

<template>
  <VHeader />
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<style scoped></style>
