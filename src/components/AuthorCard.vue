<template>
    <div class="p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm flex flex-col gap-3">
        <h2 class="text-lg font-semibold text-gray-800">{{ author.name }}</h2>
        <p class="text-gray-600 text-sm mb-2">Works: <span class="font-medium">{{ author.work_count }}</span></p>
        <div class="flex flex-wrap gap-2">
            <span v-for="tag in author.top_subjects" :key="tag"
                class="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{{ tag }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Author } from '@/types';

defineProps<{
    author: Author
}>()
</script>