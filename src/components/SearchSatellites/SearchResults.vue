<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import SatellitesData from '@/assets/satellites.json';

import Loader from '@/components/Loader.vue';
import Pagination from '@/components/Pagination.vue';

import usePagination from '@/hooks/Pagination';
import { fetchSatelliteImageData, shuffle } from '@/hooks/api.js';

const isLoading = ref(true);
const satelliteImageData = ref([]);
const route = useRoute();

// Filter the data based on the search query
const filteredData = computed(() => {
  const search = route.query.search?.trim().toLowerCase();

  return SatellitesData.filter((satellite) => {
    const name = satellite.name?.toLowerCase();
    const noradCatId = satellite.noradCatId?.toString().toLowerCase();

    // Perform null checks before using includes()
    const nameMatches = name && name.includes(search);
    const noradCatIdMatches = noradCatId && noradCatId.includes(search);

    // Check if either name or NORAD CAT ID contains the search query
    return nameMatches || noradCatIdMatches;
  });
});

onMounted(async () => {
  satelliteImageData.value = await fetchSatelliteImageData();
  isLoading.value = false;
});

const {
  currentPage,
  totalPages,
  paginatedData,
  previousPage,
  nextPage,
  goToPage,
} = usePagination(filteredData);

watch(paginatedData, () => {
  shuffle(satelliteImageData.value);
});
</script>

<template>
  <div class="satellites-page">
    <div v-if="isLoading">
      <Loader />
    </div>
    <!-- Render the paginated search results -->
    <div v-else class="satellites">
      <div
        v-if="paginatedData?.length === 0 || paginatedData?.value?.length === 0"
      >
        No results found.
      </div>

      <div v-else class="satellite-list">
        <div
          v-for="(satellite, index) in paginatedData"
          :key="satellite.id"
          class="list"
        >
          <!-- Display satellite details here -->
          <div class="satellite-img">
            <img
              :src="satelliteImageData[index]"
              alt="Satellite Image"
              height="80"
              width="90"
            />
          </div>
          <div class="satellite-info">
            <p>{{ satellite.name}}</p>
            <p>{{ satellite.noradCatId }}</p>
            <p>{{ satellite.orbitCode }}</p>
            <p>{{ satellite.objectType }}</p>
            <p>{{ satellite.countryCode }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :previousPage="previousPage"
      :nextPage="nextPage"
      :goToPage="goToPage"
      :data="filteredData"
    />
  </div>
</template>
