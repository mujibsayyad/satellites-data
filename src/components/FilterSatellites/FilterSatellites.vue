<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UniqueSatellitesData from '@/components/UniqueSatellitesData.vue';

const { countryCodes, orbitCodes, objectTypes } = UniqueSatellitesData.setup();

const searchQuery = ref(null);
const selectedValue = ref(null);
const activeDropdown = ref(null);

const router = useRouter();

const searchSatellites = () => {
  const search = selectedValue.value;
  searchQuery.value = search;

  router.push({
    path: '/filter',
    query: { search: search },
  });
};

function selectDropdownValue(val) {
  selectedValue.value = val;
  searchSatellites();
}

function toggleDropdown(dropdownId) {
  activeDropdown.value =
    activeDropdown.value === dropdownId ? null : dropdownId;
}
</script>

<template>
  <!-- Filters -->
  <div class="filters">
    <!-- Country Dropdown -->
    <div class="dropdown">
      <button @click="toggleDropdown('countryDropdown')" class="dropbtn">
        <span>Country</span>
        <span class="arrow"></span>
      </button>
      <div
        :class="[
          'dropdown-content',
          { show: activeDropdown === 'countryDropdown' },
        ]"
        id="countryDropdown"
      >
        <a
          v-for="country in countryCodes"
          :key="country"
          @click="selectDropdownValue(country)"
          >{{ country }}</a
        >
      </div>
    </div>

    <!-- Orbit Dropdown -->
    <div class="dropdown">
      <button @click="toggleDropdown('orbitDropdown')" class="dropbtn">
        <span>Orbit</span>
        <span class="arrow"></span>
      </button>
      <div
        :class="[
          'dropdown-content',
          { show: activeDropdown === 'orbitDropdown' },
        ]"
        id="orbitDropdown"
      >
        <a
          v-for="orbit in orbitCodes"
          :key="orbit"
          @click="selectDropdownValue(orbit)"
          >{{ orbit }}</a
        >
      </div>
    </div>

    <!-- Object Type Dropdown -->
    <div class="dropdown">
      <button @click="toggleDropdown('objectTypeDropdown')" class="dropbtn">
        <span>Object Type</span>
        <span class="arrow"></span>
      </button>
      <div
        :class="[
          'dropdown-content',
          { show: activeDropdown === 'objectTypeDropdown' },
        ]"
        id="objectTypeDropdown"
      >
        <a
          v-for="object in objectTypes"
          :key="object"
          @click="selectDropdownValue(object)"
          >{{ object }}</a
        >
      </div>
    </div>
  </div>
</template>

<style>
.filters {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 0;
  width: 60%;
}

/* Dropdown styles */
.dropbtn {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: white;
  background: #1d1f24;
  padding: 0.7em 0.5em;
  width: auto;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
}

.dropbtn span {
  margin: 0 0.2rem;
}

.arrow {
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #fff;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  width: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  z-index: 1;
  cursor: pointer;
  height: 10rem;
  width: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  font-size: 0.9rem;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 10px 10px;
  text-decoration: none;
  display: block;
  border-bottom: 1px solid black;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu (use JS to add this class to the 
.dropdown-content container when the user clicks on the dropdown button) */
.show {
  display: block;
}

@media only screen and (max-width: 500px) {
  .filters {
    width: 90%;
  }
}

@media only screen and (max-width: 680px) and (min-width: 501px) {
  .filters {
    width: 70%;
  }
}
</style>
