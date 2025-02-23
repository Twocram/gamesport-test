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

const router = useRouter()

const route = useRoute();

const taskStore = useTaskStore();

const currentFilterOption = ref('all');

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
        filterTitle.value = String(route.query.title);
    }

    if (route.query.isCompleted) {
        currentFilterOption.value = String(route.query.isCompleted);
    }
})

const filterTitle = ref('');

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

const filterOption = computed<boolean | null>(() => {
    if (currentFilterOption.value === 'completed') {
        return true;
    }

    if (currentFilterOption.value === 'uncompleted') {
        return false;
    }

    return null;
})

async function fetchTasks() {
    const { data, pages } = await taskAPI.getTasks(filterTitle.value, filterOption.value, 1);
    taskStore.setTasks(data);
    taskStore.setPages(pages);
}

const debouncedFetch = debounce(async function () {
    await fetchTasks()
}, 500);

watch(filterTitle, () => {
    router.push({ query: { ...route.query, title: filterTitle.value } })
    debouncedFetch();
    emits('resetPages')
});

watch(currentFilterOption, async () => {
    router.push({ query: { ...route.query, isCompleted: currentFilterOption.value } })
    await fetchTasks()
    emits('resetPages')
})
</script>

<template>
    <form @submit.prevent="addButtonHandler" class="flex mb-6 flex-col">
        <div>
            <span class="block text-sm font-medium text-gray-700 mb-1.5">Filter by:</span>
            <div class="flex gap-1.5 mb-3">
                <v-input v-model="filterTitle" />
                <v-select :options="filterOptions" v-model="currentFilterOption" />
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