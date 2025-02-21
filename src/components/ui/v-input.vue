<script setup lang="ts">
type InputType = 'text' | 'password';
type Props = {
    type?: InputType;
    placeholder?: string;
}

withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: 'Please enter text'
});

const modelValue = defineModel<string>();

</script>

<template>
    <input :type :placeholder v-model="modelValue"
        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
</template>

<style scoped></style>