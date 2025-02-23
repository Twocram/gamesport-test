export type Task = {
    id: string;
    title: string;
    isCompleted: boolean;
}

export type TaskFetchOptions = {
    title: string;
    isCompleted: boolean | null;
    page: number;
}