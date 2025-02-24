export interface Task {
  id: string
  title: string
  isCompleted: boolean
}

export interface TaskFetchOptions {
  title: string
  isCompleted: boolean | null
  page: number
}
