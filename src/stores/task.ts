import type { Task } from '@/types/task'
import * as taskAPI from '@/api/task'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])

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

    success ? toast.success('Task successfully added. Please refresh the page.') : toast.error('An error occurred while adding the task.')
  }

  async function removeTask(taskId: string) {
    const { success } = await taskAPI.removeTask(taskId)
    if (success) {
      setTasks(tasks.value.filter(task => task.id !== taskId))
      toast.success('Task successfully removed')
    }

    if (!success) {
      toast.error('An error occurred while removing the task.')
    }
  }

  async function updateTask(task: Task) {
    const { success } = await taskAPI.updateTask(task)

    if (success) {
      setTasks(tasks.value.map(t => t.id === task.id ? task : t))
      toast.success('Task successfully updated')
    }

    if (!success) {
      toast.error('An error occurred while updating the task.')
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
