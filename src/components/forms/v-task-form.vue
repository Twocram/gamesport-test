<script setup lang="ts">
import VInput from '../ui/v-input.vue';
import VButton from '../ui/v-button.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useTaskStore } from '@/stores/task';
import VSelect from '../ui/v-select.vue';
import { debounce } from '@/utils/debounce';
import { useRoute, useRouter } from 'vue-router';
import * as taskAPI from "@/api/task";

type Props = {
    currentPageNumber: number
}

defineProps<Props>();

const emits = defineEmits(['resetPages'])

const taskTitle = ref('');

const filter = ref({
    title: '',
    filterOption: 'all'
})

const router = useRouter()

const route = useRoute();

const taskStore = useTaskStore();


const filterOptions = [
    {
        label: 'All',
        value: 'all'
    },
    {
        label: 'Completed',
        value: 'completed'
    },
    {
        label: 'Uncompleted',
        value: 'uncompleted'
    }
]

onMounted(() => {
    if (route.query.title) {
        filter.value.title = String(route.query.title);
    }

    if (route.query.isCompleted) {
        filter.value.filterOption = String(route.query.isCompleted);
    }
})


async function addButtonHandler() {
    if (taskTitle.value) {
        await taskStore.addTask({
            id: String(Date.now()),
            title: taskTitle.value,
            isCompleted: false
        });
        taskTitle.value = '';
    }
}

const isCompleted = computed<boolean | null>(() => {
    if (filter.value.filterOption === 'completed') {
        return true;
    }

    if (filter.value.filterOption === 'uncompleted') {
        return false;
    }

    return null;
})

async function fetchTasks() {
    const { data, pages } = await taskAPI.getTasks({ title: filter.value.title, isCompleted: isCompleted.value, page: 1 });
    taskStore.setTasks(data);
    taskStore.setPages(pages);
}

const debouncedFetch = debounce(async function () {
    await fetchTasks()
}, 500);

watch(() => filter.value.title, () => {
    router.push({ query: { ...route.query, title: filter.value.title } })
    debouncedFetch();
    emits('resetPages')
});

watch(() => filter.value.filterOption, async () => {
    router.push({ query: { ...route.query, isCompleted: filter.value.filterOption } })
    await fetchTasks()
    emits('resetPages')
})
</script>

<template>
    <form @submit.prevent="addButtonHandler" class="flex mb-6 flex-col">
        <div>
            <span class="block text-sm font-medium text-gray-700 mb-1.5">Filter by:</span>
            <div class="flex gap-1.5 mb-3">
                <v-input v-model="filter.title" />
                <v-select :options="filterOptions" v-model="filter.filterOption" />
            </div>
        </div>
        <span class="block text-sm font-medium text-gray-700 mb-1.5">Create task:</span>
        <v-input class="mb-3" v-model="taskTitle" type="text" placeholder="add" />
        <v-button type="submit">
            {{ $t('actions.add') }}
        </v-button>
    </form>
</template>

<style scoped></style>