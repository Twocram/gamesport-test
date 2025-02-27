import type { Task } from '@/types/task'

interface TaskFetchOptions {
  title: string
  isCompleted: boolean | null
  page: number
}

export async function getTasks(options: TaskFetchOptions): Promise<{ data: Task[], pages: number }> {
  try {
    let url = `/api/tasks?title=${options.title}&_page=${options.page}`

    if (options.isCompleted !== null) {
      url += `&isCompleted=${options.isCompleted}`
    }

    const response = await fetch(url, {
      method: 'GET',
    })

    const { data, pages } = await response.json()

    return { data, pages }
  }
  catch (error: unknown) {
    console.error('Error while fetching tasks', error)
    return { data: [], pages: 0 }
  }
}

export async function addTask(task: Task): Promise<{ success: boolean, task: Task | null }> {
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await response.json()

    return { success: true, task: data }
  }
  catch (error: unknown) {
    console.error('Error while adding task', error)
    return { success: false, task: null }
  }
}

export async function removeTask(taskId: string): Promise<{ success: boolean }> {
  try {
    await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
    return { success: true }
  }
  catch (error: unknown) {
    console.error('Error while removing task', error)
    return { success: false }
  }
}

export async function updateTask(task: Task): Promise<{ success: boolean }> {
  try {
    await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    return { success: true }
  }
  catch (error: unknown) {
    console.error('Error while updating task', error)
    return { success: false }
  }
}
