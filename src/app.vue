<script setup lang="ts">
import VHeader from './components/v-header.vue';
import MainLayout from './layouts/main-layout.vue';
</script>

<template>
  <v-header />
  <main-layout>
    <RouterView />
  </main-layout>
</template>

<style scoped></style>
