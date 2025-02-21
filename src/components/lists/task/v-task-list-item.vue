<script setup lang="ts">
import type { Task } from '@/types/task';
import vButton from '@/components/ui/v-button.vue';
import { useTaskStore } from '@/stores/task';
import VCheckbox from '@/components/ui/v-checkbox.vue';
import { ref, watch } from 'vue';
import VInput from '@/components/ui/v-input.vue';

type Props = {
    task: Task
}

const props = defineProps<Props>()

const taskStore = useTaskStore();
const isEditMode = ref(false)

async function removeTask(taskId: string) {
    await taskStore.removeTask(taskId);
}

const taskIsCompleted = ref<boolean>(props.task.isCompleted);

watch(taskIsCompleted, async (value) => {
    await taskStore.updateTask({ ...props.task, isCompleted: value });
})

async function toggleMode() {
    if (isEditMode.value) {
        await taskStore.updateTask({ ...props.task, title: props.task.title });
    }
    isEditMode.value = !isEditMode.value
}
</script>

<template>
    <li class="flex items-center justify-between pb-3 border-b border-gray-200">
        <v-checkbox v-model="taskIsCompleted" />

        <span v-if="!isEditMode" :class="{ 'line-through text-gray-500': task.isCompleted }">
            {{ task.title }}
        </span>

        <v-input v-else v-model="task.title" type="text" placeholder="update" />

        <div class="flex gap-1.5">
            <v-button :variant="isEditMode ? 'success' : 'primary'" @click="toggleMode">
                {{ isEditMode ? $t('actions.save') : $t('actions.edit') }}
            </v-button>
            <v-button variant="danger" @click="removeTask(task.id)">
                {{ $t('actions.delete') }}
            </v-button>
        </div>
    </li>
</template>

<style scoped></style>