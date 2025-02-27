import type { Task } from '@/types/task'
import * as taskAPI from '@/api/task'
import { useToast } from '@/composables/use-toast'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])

  const { t } = useI18n()

  const tasksPages = ref(0)

  function setTasks(_tasks: Task[]) {
    tasks.value = _tasks
  }

  function pushTasks(_tasks: Task[]) {
    tasks.value.push(..._tasks)
  }

  function setPages(pages: number) {
    tasksPages.value = pages
  }

  async function addTask(task: Task) {
    const { success } = await taskAPI.addTask(task)

    success ? useToast('success', t('task.toast.add.success')) : useToast('error', t('task.toast.add.error'))
  }

  async function removeTask(taskId: string) {
    const { success } = await taskAPI.removeTask(taskId)
    if (success) {
      setTasks(tasks.value.filter(task => task.id !== taskId))
      useToast('success', t('task.toast.remove.success'))
    }

    if (!success) {
      useToast('error', t('task.toast.remove.error'))
    }
  }

  async function updateTask(task: Task) {
    const { success } = await taskAPI.updateTask(task)

    if (success) {
      setTasks(tasks.value.map(t => t.id === task.id ? task : t))
      useToast('success', t('task.toast.update.success'))
    }

    if (!success) {
      useToast('error', t('task.toast.update.success'))
    }
  }

  return {
    tasks,
    tasksPages,
    setTasks,
    setPages,
    addTask,
    removeTask,
    updateTask,
    pushTasks,
  }
})
