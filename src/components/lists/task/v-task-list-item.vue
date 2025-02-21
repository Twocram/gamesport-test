<script setup lang="ts">
import type { Task } from '@/types/task';
import vButton from '@/components/ui/v-button.vue';
import { useTaskStore } from '@/stores/task';

type Props = {
    task: Task
}

defineProps<Props>()

const taskStore = useTaskStore();

async function removeTask(taskId: number) {
    await taskStore.removeTask(taskId);
}
</script>

<template>
    <li class="flex items-center justify-between p-3 border-b border-gray-200">
        <span :class="{ 'line-through text-gray-500': task.isCompleted }">
            {{ task.title }}
        </span>
        <div class="flex gap-1.5">
            <v-button @click="taskStore.updateTask({ ...task, isCompleted: !task.isCompleted })"
                :variant="task.isCompleted ? 'primary' : 'success'">
                {{ task.isCompleted ? 'Uncomplete' : 'Complete' }}
            </v-button>
            <v-button variant="danger" @click="removeTask(task.id)">
                Delete
            </v-button>
        </div>
    </li>
</template>

<style scoped></style>