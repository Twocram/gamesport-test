<script setup lang="ts">
import vInput from '../ui/v-input.vue';
import vButton from '../ui/v-button.vue';
import { ref } from 'vue';
import { useTaskStore } from '@/stores/task';

const taskTitle = ref('');

const taskStore = useTaskStore();

async function addButtonHandler() {
    const lastTask = taskStore.tasks[taskStore.tasks.length - 1];

    if (taskTitle.value) {
        await taskStore.addTask({
            id: lastTask ? lastTask.id + 1 : 1,
            title: taskTitle.value,
            isCompleted: false
        });
        taskTitle.value = '';
    }
}
</script>

<template>
    <div class="flex mb-6">
        <v-input v-model="taskTitle" type="text" placeholder="Add a task" />
        <v-button @click="addButtonHandler">
            Add
        </v-button>
    </div>
</template>

<style scoped></style>