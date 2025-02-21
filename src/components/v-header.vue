<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

type MenuItem = {
    name: string,
    link: string,
}

const menuItems: MenuItem[] = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'About',
        link: '/about'
    },
    {
        name: 'Settings',
        link: '/settings'
    }
]

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