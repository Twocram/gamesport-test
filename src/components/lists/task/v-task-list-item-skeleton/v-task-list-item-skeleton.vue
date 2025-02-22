<template>
    <li class="flex items-center justify-between pb-3 border-b border-gray-200 mb-2.5 last:mb-0">
        <div class="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>

        <div class="flex-1 mx-4">
            <div class="w-full h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>

        <div class="flex gap-1.5">
            <div class="w-16 h-8 bg-gray-300 rounded animate-pulse"></div>
            <div class="w-16 h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>
    </li>
</template>

<script setup lang="ts">
</script>

<style scoped>
@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 1.5s infinite;
}
</style>