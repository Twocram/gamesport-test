<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale';
import vButton from '@/components/ui/v-button.vue';
import vSelect from '@/components/ui/v-select.vue';
import { ref } from 'vue';

const localeStore = useLocaleStore();

const currentLocale = ref(localeStore.localLocale);

const localeOptions = [
    { label: 'Русский', value: 'ru' },
    { label: 'English', value: 'en' },
];

function saveSettings() {
    localeStore.setLocale(currentLocale.value);
}
</script>

<template>
    <div class="min-h-screen bg-gray-100 py-8">
        <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 class="text-2xl font-bold mb-6 text-center">{{ $t('settings.title') }}</h1>
            <v-select class="mb-6" :options="localeOptions" v-model="currentLocale"
                :label="$t('settings.chooseLanguage')"></v-select>

            <v-button class="w-full" @click="saveSettings">
                {{ $t('actions.save') }}
            </v-button>
        </div>
    </div>
</template>

<style scoped></style>