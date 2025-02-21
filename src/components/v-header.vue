<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from "vue-i18n"

type MenuItem = {
    name: string,
    link: string,
}

const { t } = useI18n();

const menuItems = computed<MenuItem[]>(() => [
    {
        name: t('menu.home'),
        link: '/'
    },
    {
        name: t('menu.about'),
        link: '/about'
    },
    {
        name: t('menu.settings'),
        link: '/settings'
    }
])

const route = useRoute();

const currentRoute = computed(() => {
    return route.path
})

</script>

<template>
    <header class="bg-gray-800 py-4">
        <nav class="container mx-auto flex justify-between">
            <ul class="flex items-center">
                <li v-for="item in menuItems" :key="item.name" class="mr-6">
                    <router-link :to="item.link" class="text-gray-400 hover:text-white"
                        :class="{ 'text-white': currentRoute === item.link }">
                        {{ item.name }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped></style>