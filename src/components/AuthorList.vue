<template>
    <div class="space-y-4 flex flex-col gap-2">
        <div class="flex justify-between mb-6 items-end">
            <div class="flex flex-wrap gap-4">
                <!-- Work Count Filter -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Min Work Count</label>

                    <div class="relative">
                        <input v-model.number="workCountThreshold" type="number" placeholder="Type or select..."
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            @focus="showDropdown = true" @blur="handleBlur" />

                        <ul v-if="showDropdown"
                            class="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                            <li v-for="option in options" :key="option"
                                class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                @mousedown.prevent="selectOption(option)">
                                {{ option }}
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Sort by Work Count -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select v-model="sortOption"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="work_count_asc">Work Count (Ascending)</option>
                        <option value="work_count_desc" selected>Work Count (Descending)</option>
                    </select>
                </div>
            </div>
            <div class="">Results ({{ sortedDocs.length }})</div>
        </div>
        <div v-for="doc in sortedDocs" :key="doc.key">
            <AuthorCard :author="doc" />
        </div>
        <div class="flex justify-center py-10">
            <button @click="authStore.fetchData" v-if="hasMore" :disabled="loading"
                class="flex items-center gap-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                {{ loading ? "Loading" : "Load More" }}
                <Spinner v-if="loading" class="w-4 h-4 animate-spin text-gray-600" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthorStore } from '@/stores/author';
import { storeToRefs } from 'pinia';
import AuthorCard from './AuthorCard.vue';
import Spinner from './icons/spinner.vue';
import { ref } from 'vue';

const authStore = useAuthorStore();
const { sortedDocs, loading, sortOption, workCountThreshold, hasMore } = storeToRefs(authStore);

const showDropdown = ref(false)
const options = ['10', '50', '100']

const selectOption = (value: string) => {
    workCountThreshold.value = Number(value);
    showDropdown.value = false
}

const handleBlur = () => {
    // Delay to allow click selection before hiding
    setTimeout(() => {
        showDropdown.value = false
    }, 100)
}
</script>