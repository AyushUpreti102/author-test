import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/api';
import type { Author } from '@/types';

export const useAuthorStore = defineStore('author', () => {
  const searchValue = ref('')
  const docs = ref<Author[]>([])
  const limit = 10;
  const offset = ref(0);
  const hasMore = ref(true);
  const loading = ref(false);
  const sortOption = ref('work_count_desc');
  const workCountThreshold = ref(0);

  const sortedDocs = computed(() => {
    return [...docs.value].filter(doc => (doc.work_count || 0) > workCountThreshold.value)
      .sort((a, b) => {
      switch (sortOption.value) {
        case 'work_count_asc':
          return (a.work_count || 0) - (b.work_count || 0);
        case 'work_count_desc':
          return (b.work_count || 0) - (a.work_count || 0);
        default:
          return 0;
      }
    });
  });

  const fetchData = async () => {
    try {
      loading.value = true;
      const { data } = await axios.get('/search/authors.json', {
        params: {
          q: searchValue.value,
          limit: limit,
          offset: offset.value,
        }
      })
  
      const newDocs = data?.docs || [];

      if (newDocs.length < limit) {
        hasMore.value = false;
      }

      docs.value.push(...newDocs);
      offset.value += limit;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  return {
    searchValue,
    docs,
    workCountThreshold,
    sortOption,
    sortedDocs,
    offset,
    loading,
    hasMore,
    fetchData,
  }
})
