import type { Task } from "@/types/task";

export async function getTasks(title: string, isCompleted: boolean | null, page: number): Promise<{data: Task[], pages: number}> {
    try {
        let url = `/api/tasks?title=${title}&_page=${page}`;

        if (isCompleted !== null) {
            url += `&isCompleted=${isCompleted}`;
        }

        const response = await fetch(url, {
            method: 'GET',
        });

        const { data, pages } = await response.json();

        return { data, pages }
    } catch (error: unknown) {
        return {data: [], pages: 0};
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