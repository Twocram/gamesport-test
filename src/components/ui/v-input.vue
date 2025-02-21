<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

type InputType = 'text' | 'password';
type Props = {
    type?: InputType;
    placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: 'default'
});

const { t } = useI18n();
const modelValue = defineModel<string>();

const placeholderText = computed(() => t(`placeholder.task.input.${props.placeholder}`));

</script>

<template>
    <input :type :placeholder="placeholderText" v-model="modelValue"
        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
</template>

<style scoped></style>