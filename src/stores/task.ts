import * as taskAPI from "@/api/task";
import type { Task } from "@/types/task";
import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue3-toastify";

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>([])

    const tasksPages = ref(0);

    function setTasks(_tasks: Task[]) {
        tasks.value = _tasks;
    }

    function pushTasks(_tasks: Task[]) {
        tasks.value.push(..._tasks);
    }

    function setPages(pages: number) {
        tasksPages.value = pages;
    }

    async function addTask(task: Task) {
        const { success } = await taskAPI.addTask(task);

        if (success) {
            setTasks([...tasks.value, task]);
            toast.success('Task successfully added')
        }
    }

    async function removeTask(taskId: string) {
        const { success } = await taskAPI.removeTask(taskId);
        if (success) {
            setTasks(tasks.value.filter(task => task.id !== taskId));
        }
    }

    async function updateTask(task: Task) {
        const { success } = await taskAPI.updateTask(task);

        if (success) {
            setTasks(tasks.value.map(t => t.id === task.id ? task : t));
            toast.success('Task successfully updated')
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