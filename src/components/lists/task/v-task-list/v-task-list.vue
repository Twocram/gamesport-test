<script setup lang="ts">
import type { Task } from '@/types/task'
import VTaskListItem from '../v-task-list-item/v-task-list-item.vue'

interface Props {
  tasks: Task[]
}

defineProps<Props>()
</script>

<template>
  <ul>
    <VTaskListItem v-for="task in tasks" :key="task.id" :task />
  </ul>
</template>

<style scoped></style>
