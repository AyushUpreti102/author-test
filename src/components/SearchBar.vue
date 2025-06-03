<template>
    <div class="p-6 rounded-2xl w-full max-w-lg">
        <div class="flex gap-4">
            <input type="text" placeholder="Enter author name (e.g., 'twain')"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="searchValue" />
            <button class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                @click="emits('onSearch', searchValue)">
                Search
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits<{
    (e: 'onSearch', value: string): void;
}>()

const searchValue = ref('');
</script>