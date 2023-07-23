<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import SatellitesData from '@/assets/satellites.json';

import Loader from '@/components/Loader.vue';
import Pagination from '@/components/Pagination.vue';

import usePagination from '@/hooks/Pagination';
import { fetchSatelliteImageData, shuffle } from '@/hooks/api.js';

const satelliteImageData = ref([]);
const isLoading = ref(true);
const route = useRoute();
const searchQuery = ref(route.query.search);

// Computed property to filter the data based on selected values
const filteredSatellites = computed(() => {
  return SatellitesData.filter((satellite) => {
    return (
      satellite.countryCode === searchQuery.value ||
      satellite.orbitCode === searchQuery.value ||
      satellite.objectType === searchQuery.value
    );
  });
});

watch(
  () => route.query.search,
  (newVal) => {
    searchQuery.value = newVal;
  }
);

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
} = usePagination(filteredSatellites);

watch(paginatedData, () => {
  shuffle(satelliteImageData.value);
});
</script>

<template>
  <div class="satellites-page">
    <div v-if="isLoading">
      <Loader />
    </div>
    <!-- Render the filtered satellite data -->
    <div v-else class="satellites">
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
          <p>{{ satellite.name }}</p>
          <p>{{ satellite.noradCatId }}</p>
          <p>{{ satellite.orbitCode }}</p>
          <p>{{ satellite.objectType }}</p>
          <p>{{ satellite.countryCode }}</p>
        </div>
      </div>

      <!-- Pagination -->
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :previousPage="previousPage"
        :nextPage="nextPage"
        :goToPage="goToPage"
        :data="filteredSatellites"
      />
    </div>
  </div>
</template>
