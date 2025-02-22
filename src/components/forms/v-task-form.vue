<script setup lang="ts">
import vInput from '../ui/v-input.vue';
import vButton from '../ui/v-button.vue';
import { computed, ref, watch } from 'vue';
import { useTaskStore } from '@/stores/task';
import VSelect from '../ui/v-select.vue';
import { debounce } from '@/utils/debounce';

const taskTitle = ref('');

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

const debouncedFetch = debounce(async () => await taskStore.fetchTasks(filterTitle.value, filterOption.value), 500);

watch(filterTitle, debouncedFetch);

watch(currentFilterOption, async () => {
    await taskStore.fetchTasks(filterTitle.value, filterOption.value);
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