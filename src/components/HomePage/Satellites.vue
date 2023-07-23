<script setup>
import { ref, onMounted, watch } from 'vue';
import SatellitesData from '@/assets/satellites.json';

import Loader from '@/components/Loader.vue';
import Pagination from '@/components/Pagination.vue';

import usePagination from '@/hooks/Pagination';
import { fetchSatelliteImageData, shuffle } from '@/hooks/api.js';

const isLoading = ref(true);
const satelliteImageData = ref([]);

const {
  currentPage,
  totalPages,
  paginatedData,
  previousPage,
  nextPage,
  goToPage,
} = usePagination(SatellitesData);

watch(paginatedData, () => {
  shuffle(satelliteImageData.value);
});

onMounted(async () => {
  satelliteImageData.value = await fetchSatelliteImageData();
  isLoading.value = false;
});
</script>

<template>
  <!-- Render the paginated satellites -->
  <div class="satellites">
    <div v-if="isLoading">
      <Loader />
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
          <p>{{ satellite.name }}</p>
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
    v-if="!isLoading"
    :currentPage="currentPage"
    :totalPages="totalPages"
    :previousPage="previousPage"
    :nextPage="nextPage"
    :goToPage="goToPage"
    :data="SatellitesData"
  />
</template>

<style>
/* Satellite list */
.satellites {
  margin: 2rem 5rem;
  border-radius: 1rem;
  background: #000000e8;
}

.list {
  display: flex;
  text-align: left;
  align-items: center;
  border-radius: 0.4vw;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  border: 2px solid #add8e6;
  font-family: 'Mulish', sans-serif;
  font-weight: 600;
}

.satellite-img {
  margin: 1rem;
  padding: 1rem;
  margin-right: 2rem;
}

@media only screen and (max-width: 500px) {
  .satellites {
    margin: 1rem;
  }

  .list {
    width: 100%;
    padding: 0.5rem;
  }

  .satellite-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .satellite-img {
    margin: 0.2rem;
    padding: 0.5rem;
    margin-right: 2rem;
  }
}
</style>
