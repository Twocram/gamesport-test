<script setup lang="ts">

type ButtonVariant = 'primary' | 'secondary' | 'danger' | "success"
type Props = {
    type?: 'submit' | 'reset' | 'button'
    variant?: ButtonVariant,
    isDisabled?: boolean
}

withDefaults(defineProps<Props>(), {
    type: 'button',
    label: 'Button',
    variant: 'primary',
    isDisabled: false
})
</script>

<template>
    <button :type class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer" :class="{
        'bg-red-500 hover:bg-red-600': variant === 'danger',
        'bg-gray-500 hover:bg-gray-600': variant === 'secondary',
        'bg-green-500 hover:bg-green-600': variant === 'success'
    }" :disabled="isDisabled" :aria-disabled="isDisabled">
        <slot />
    </button>
</template>

<style scoped></style>