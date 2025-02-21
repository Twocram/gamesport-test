import type { Task } from "@/types/task";

export async function getTasks(): Promise<Task[]> {
    try {
        const response = await fetch('/api/tasks');

        return await response.json() as Task[];
    } catch (error: unknown) {
        return [];
    }
}

export async function addTask(task: Task): Promise<{success: boolean}> {
    try {
        await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        return {success: true}
    } catch (error: unknown) {
        return {success: false}
    }
}

export async function removeTask(taskId: string): Promise<{success: boolean}> {
    try {
        await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        })
        return {success: true}

    } catch (error: unknown) {
        return {success: false}
    }
}

export async function updateTask(task: Task): Promise<{success: boolean}> {
    try {
        await fetch(`/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        return {success: true}
    } catch (error: unknown) {
        return {success: false}
    }
}