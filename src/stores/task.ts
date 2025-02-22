import * as taskAPI from "@/api/task";
import type { Task } from "@/types/task";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>([])

    function setTasks(_tasks: Task[]) {
        tasks.value = _tasks;
    }

    async function fetchTasks(title: string = '', isCompleted: boolean | null = null) {
        const _tasks = await taskAPI.getTasks(title, isCompleted);

        setTasks(_tasks);
    }

    async function addTask(task: Task) {
        const { success } = await taskAPI.addTask(task);

        if (success) {
            setTasks([...tasks.value, task]);
        }
    }

    async function removeTask(taskId: string) {
        const { success } =await taskAPI.removeTask(taskId);

        if (success) {
            setTasks(tasks.value.filter(task => task.id !== taskId));
        }
    }

    async function updateTask(task: Task) {
        const { success } = await taskAPI.updateTask(task);

        if (success) {
            setTasks(tasks.value.map(t => t.id === task.id ? task : t));
        }
    }

    return {
        tasks,
        setTasks,
        addTask,
        removeTask,
        fetchTasks,
        updateTask,
    }
})