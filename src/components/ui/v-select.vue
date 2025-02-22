<script setup lang="ts">

type Option = {
    value: string,
    label: string
}

type Props = {
    label?: string,
    options: Option[]
}

defineProps<Props>();

const modelValue = defineModel<string>();

</script>

<template>
    <div>
        <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
        <select v-model="modelValue"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>

<style scoped></style>