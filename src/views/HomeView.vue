<template>
  <main class="min-h-screen bg-gray-100 px-4">
    <div class="flex justify-center">
      <SearchBar @on-search="getSearchResults" />
    </div>
    <AuthorList v-if="docs.length" />
    <div v-else-if="loading" class="absolute top-1/2 left-1/2 -translate-x-1/2">
      <Spinner v-if="loading" class="w-14 h-14 animate-spin text-gray-600" />
    </div>
    <div v-else class="absolute top-1/2 left-1/2 -translate-x-1/2">
      <h1 class="text-5xl">Search For Authors</h1>
    </div>
  </main>
</template>

<script setup lang="ts">
import AuthorList from '@/components/AuthorList.vue';
import Spinner from '@/components/icons/spinner.vue';
import SearchBar from '@/components/SearchBar.vue';
import { useAuthorStore } from '@/stores/author';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const authorStore = useAuthorStore();
const { searchValue, offset, docs, loading } = storeToRefs(authorStore)

const route = useRoute();
const router = useRouter();

async function getSearchResults(value: string) {
  offset.value = 0;
  docs.value = [];
  searchValue.value = value;

  router.push({
    query: {
      author: searchValue.value
    }
  })

  await authorStore.fetchData();
}

if (route.query.author) {
  getSearchResults(route.query.author as string)
}
</script>
