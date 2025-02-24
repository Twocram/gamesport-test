<script setup lang="ts">
import type { Task } from '@/types/task'
import vButton from '@/components/ui/v-button.vue'
import VCheckbox from '@/components/ui/v-checkbox.vue'
import VInput from '@/components/ui/v-input.vue'
import { useTaskStore } from '@/stores/task'
import { ref, watch } from 'vue'

interface Props {
  task: Task
}

const props = defineProps<Props>()

const propsTitle = ref(props.task.title)

const taskStore = useTaskStore()
const isEditMode = ref(false)

async function removeTask(taskId: string) {
  await taskStore.removeTask(taskId)
}

const taskIsCompleted = ref<boolean>(props.task.isCompleted)

watch(taskIsCompleted, async (value) => {
  await taskStore.updateTask({ ...props.task, isCompleted: value })
})

async function toggleMode() {
  if (isEditMode.value) {
    await taskStore.updateTask({ ...props.task, title: propsTitle.value })
  }
  isEditMode.value = !isEditMode.value
}
</script>

<template>
  <li class="flex items-center justify-between pb-3 border-b border-gray-200 mb-2.5 last:mb-0">
    <VCheckbox v-model="taskIsCompleted" />

    <span v-if="!isEditMode" :class="{ 'line-through text-gray-500': task.isCompleted }">
      {{ task.title }}
    </span>

    <VInput
      v-else v-model="propsTitle" class="mr-1" type="text" placeholder="update"
      @keydown.prevent.enter="toggleMode"
    />

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
