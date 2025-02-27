<script setup lang="ts">
import * as taskAPI from '@/api/task'
import { useTaskStore } from '@/stores/task'
import { debounce } from '@/utils/debounce'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import VButton from '../ui/v-button.vue'
import VInput from '../ui/v-input.vue'
import VSelect from '../ui/v-select.vue'

interface Props {
  currentPageNumber: number
}

defineProps<Props>()

const emits = defineEmits(['resetPages'])

const { t } = useI18n()

const taskTitle = ref('')

const filter = ref({
  title: '',
  filterOption: 'all',
})

const router = useRouter()

const route = useRoute()

const taskStore = useTaskStore()

const filterOptions = computed(() => [
  {
    label: t('task.filterOption.all'),
    value: 'all',
  },
  {
    label: t('task.filterOption.completed'),
    value: 'completed',
  },
  {
    label: t('task.filterOption.uncompleted'),
    value: 'uncompleted',
  },
])

onMounted(() => {
  if (route.query.title) {
    filter.value.title = String(route.query.title)
  }

  if (route.query.isCompleted) {
    filter.value.filterOption = String(route.query.isCompleted)
  }
})

async function addButtonHandler() {
  if (taskTitle.value) {
    await taskStore.addTask({
      id: String(Date.now()),
      title: taskTitle.value,
      isCompleted: false,
    })
    taskTitle.value = ''
  }
}

const isCompleted = computed<boolean | null>(() => {
  if (filter.value.filterOption === 'completed') {
    return true
  }

  if (filter.value.filterOption === 'uncompleted') {
    return false
  }

  return null
})

async function fetchTasks() {
  const { data, pages } = await taskAPI.getTasks({ title: filter.value.title, isCompleted: isCompleted.value, page: 1 })
  taskStore.setTasks(data)
  taskStore.setPages(pages)
}

const debouncedFetch = debounce(async () => {
  await fetchTasks()
}, 500)

watch(() => filter.value.title, () => {
  router.push({ query: { ...route.query, title: filter.value.title } })
  debouncedFetch()
  emits('resetPages')
})

watch(() => filter.value.filterOption, async () => {
  router.push({ query: { ...route.query, isCompleted: filter.value.filterOption } })
  await fetchTasks()
  emits('resetPages')
})
</script>

<template>
  <form class="flex mb-6 flex-col" @submit.prevent="addButtonHandler">
    <div>
      <span class="block text-sm font-medium text-gray-700 mb-1.5">{{ $t('task.filter') }}:</span>
      <div class="flex gap-1.5 mb-3">
        <VInput v-model="filter.title" />
        <VSelect v-model="filter.filterOption" :options="filterOptions" />
      </div>
    </div>
    <span class="block text-sm font-medium text-gray-700 mb-1.5">{{ $t('task.create') }}:</span>
    <VInput v-model="taskTitle" class="mb-3" type="text" placeholder="add" />
    <VButton type="submit">
      {{ $t('actions.add') }}
    </VButton>
  </form>
</template>

<style scoped></style>
