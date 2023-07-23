<script setup>
import SearchSatellite from '@/components/SearchSatellites/SearchSatellites.vue';
import FilterSatellites from '@/components/FilterSatellites/FilterSatellites.vue';
</script>

<template>
  <div class="main">
    <div class="header">
      <div class="header-sub">
        <div class="header-search">
          <!-- Search bar -->
          <SearchSatellite />
        </div>
      </div>
      <!-- Filters -->
      <FilterSatellites />
    </div>

    <router-view></router-view>
  </div>
</template>

<style>
.main {
  min-width: 70%;
}

.header {
  border: 2px solid #add8e6;
  border-radius: 1rem;
  min-width: 70%;
  background: #000000e8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header-sub {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.header-search {
  width: 50%;
}

@media only screen and (max-width: 500px) {
  .main {
    min-width: 100%;
  }

  .header {
    min-width: 100%;
  }

  .header-search {
    width: 80%;
  }
}
</style>
