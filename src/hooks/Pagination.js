import { ref, computed, watchEffect } from 'vue';
const currentPage = ref(1);

const usePagination = (data) => {
  // console.log('🚀 usePagination ~ data:', data);

  const itemsPerPage = 10;
  let totalPages = 0;

  if (!data || data.value?.length === 0) return data;

  if (data && data.value) {
    totalPages = computed(() => Math.ceil(data?.value?.length / itemsPerPage));
  } else {
    totalPages = computed(() => Math.ceil(data?.length / itemsPerPage));
  }

  watchEffect(() => {
    // Reset current page to 1 whenever data changes
    currentPage.value = 1;
  });

  const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (data.value?.length && data.value?.length < 10) {
      return data.value;
    } else if (data?.value?.length && data?.value?.length > 10) {
      return data.value.slice(startIndex, endIndex);
    }

    if (data.value?.length === 0) {
      return data;
    }

    return data.slice(startIndex, endIndex);
  });

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const goToPage = (pageNumber) => {
    currentPage.value = pageNumber;
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    previousPage,
    nextPage,
    goToPage,
  };
};

export default usePagination;
