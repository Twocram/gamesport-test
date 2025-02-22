<script setup lang="ts">
import VTaskForm from '@/components/forms/v-task-form.vue';
import VTaskList from '@/components/lists/task/v-task-list/v-task-list.vue';
import { useTaskStore } from '@/stores/task';
import type { Task } from '@/types/task';
import { computed, onMounted } from 'vue';

const taskStore = useTaskStore();

const tasks = computed<Task[]>(() => {
  return taskStore.tasks;
})

onMounted(() => {
  taskStore.fetchTasks();
})
</script>

<template>
  <div class=" bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6 text-center">GameSport Todo App</h1>

    <v-task-form />

    <v-task-list v-if="tasks.length" :tasks />
    <div v-else class="text-center">No tasks found</div>
  </div>
</template>
