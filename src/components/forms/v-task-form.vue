<script setup lang="ts">
import vInput from '../ui/v-input.vue';
import vButton from '../ui/v-button.vue';
import { ref } from 'vue';
import { useTaskStore } from '@/stores/task';

const taskTitle = ref('');

const taskStore = useTaskStore();

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
</script>

<template>
    <div class="flex mb-6 gap-1.5">
        <v-input v-model="taskTitle" type="text" placeholder="add" />
        <v-button @click="addButtonHandler">
            {{ $t('actions.add') }}
        </v-button>
    </div>
</template>

<style scoped></style>