<script setup>
import { reactive, watch } from 'vue';

import usePagination from '@/hooks/Pagination';

const props = defineProps(['data']);
const test = reactive(usePagination(props.data));

watch(
  () => props.data,
  () => {
    Object.assign(test, usePagination(props.data));
  }
);
</script>

<template>
  <div class="pagination" v-if="test.totalPages >= 1">
    <button @click="test.previousPage" :disabled="test.currentPage === 1">
      <span>&#10229;</span>
      Previous
    </button>
    <span class="page-number"
      >PAGE {{ test.currentPage }} OF {{ test.totalPages }}</span
    >
    <button
      @click="test.nextPage"
      :disabled="test.currentPage === test.totalPages"
    >
      Next
      <span>&#10230;</span>
    </button>
  </div>
  <div v-else class="satellite-list">No results found.</div>
</template>

<style>
/* Pagination */
.pagination {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.pagination-button {
  outline: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0.2rem;
  padding: 0.2rem;
  width: 6rem;
}

.page-number {
  width: 10rem;
}
</style>
