<script setup lang="ts">
import type { Task } from '@/types/task'
import * as taskAPI from '@/api/task'
import VTaskForm from '@/components/forms/v-task-form.vue'
import VTaskListItemSkeleton from '@/components/lists/task/v-task-list-item-skeleton.vue'
import VTaskList from '@/components/lists/task/v-task-list/v-task-list.vue'
import { useIntersectionObserver } from '@/composables/use-intersection-observer'
import { useTaskStore } from '@/stores/task'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const taskStore = useTaskStore()

const route = useRoute()

const tasks = computed<Task[]>(() => {
  return taskStore.tasks
})

const isLoading = ref(false)

const queryTitle = computed<string>(() => String(route.query?.title || ''))
const queryIsCompleted = computed<boolean | null>(() => {
  if (route.query?.isCompleted === 'completed') {
    return true
  }

  if (route.query?.isCompleted === 'uncompleted') {
    return false
  }

  return null
})

const currentPage = ref(1)

const tasksPages = computed<number>(() => {
  return taskStore.tasksPages
})

const targetElement = ref<HTMLElement | null>(null)

const { isIntersecting } = useIntersectionObserver(targetElement, {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
})

async function fetchTasks() {
  isLoading.value = true
  const { data, pages } = await taskAPI.getTasks({ title: queryTitle.value, isCompleted: queryIsCompleted.value, page: currentPage.value })
  taskStore.setTasks(data)
  taskStore.setPages(pages)
  isLoading.value = false
}

async function loadMoreTasks() {
  const { data, pages } = await taskAPI.getTasks({ title: queryTitle.value, isCompleted: queryIsCompleted.value, page: currentPage.value })
  taskStore.pushTasks(data)
  taskStore.setPages(pages)
}

watch(isIntersecting, async (newValue) => {
  if (!newValue)
    return
  if (isLoading.value)
    return
  if (tasksPages.value === currentPage.value)
    return

  currentPage.value++

  await loadMoreTasks()
})

onMounted(async () => {
  await fetchTasks()
})
</script>

<template>
  <div class=" bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6 text-center">
      GameSport Todo App
    </h1>

    <VTaskForm :current-page-number="currentPage" @reset-pages="currentPage = 1" />

    <template v-if="!isLoading">
      <VTaskList v-if="tasks.length" :tasks />
      <div v-else class="text-center">
        {{ $t('task.isEmpty') }}
      </div>
    </template>

    <template v-else>
      <VTaskListItemSkeleton v-for="i in 5" :key="i" />
    </template>

    <div ref="targetElement" class="h-3" />
  </div>
</template>

<style scoped></style>
