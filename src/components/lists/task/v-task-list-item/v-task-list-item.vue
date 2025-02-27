<script setup lang="ts">
import type { Task } from '@/types/task'
import vButton from '@/components/ui/v-button.vue'
import VCheckbox from '@/components/ui/v-checkbox.vue'
import VInput from '@/components/ui/v-input.vue'
import { useHandleKeydown } from '@/composables/use-handle-keydown'
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

useHandleKeydown('Escape', () => isEditMode.value = false)
</script>

<template>
  <li class="task-item flex items-center justify-between pb-3 border-b border-gray-200 mb-2.5 last:mb-0">
    <div v-if="!isEditMode" class="flex items-center gap-1.5">
      <VCheckbox v-model="taskIsCompleted" />
      <span :class="{ 'line-through text-gray-500': task.isCompleted }" class="task-title">
        {{ task.title }}
      </span>
    </div>

    <VInput
      v-else v-model="propsTitle" class="mr-1 task-input" type="text" placeholder="update"
      @keydown.prevent.enter="toggleMode"
    />

    <div class="task-actions flex gap-1.5">
      <v-button :variant="isEditMode ? 'success' : 'primary'" @click="toggleMode">
        {{ isEditMode ? $t('actions.save') : $t('actions.edit') }}
      </v-button>
      <v-button variant="danger" @click="removeTask(task.id)">
        {{ $t('actions.delete') }}
      </v-button>
    </div>
  </li>
</template>

<style scoped>
.task-item {
  padding: 10px;
}

.task-title {
  flex-grow: 1;
  margin: 0 10px;
  font-size: 16px;
}

.task-input {
  flex-grow: 1;
  margin: 0 10px;
}

.task-actions {
  flex-shrink: 0;
}

@media (max-width: 480px) {
  .task-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .task-title {
    margin: 10px 0;
    font-size: 14px;
    width: 100%;
  }

  .task-input {
    margin: 10px 0;
    width: 100%;
  }

  .task-actions {
    width: 100%;
    justify-content: space-between;
  }

  .task-actions v-button {
    width: 48%;
  }
}
</style>
