<script>
import { computed } from 'vue';
import satellitesData from '@/assets/satellites.json';

const setup = () => {
  const uniqueCountries = computed(() => {
    const countries = new Set();

    for (const satellite of satellitesData) {
      if (satellite.countryCode) {
        countries.add(satellite.countryCode);
      }
    }

    return Array.from(countries).sort();
  });

  const uniqueOrbitCode = computed(() => {
    const orbit = new Set();

    for (const satellite of satellitesData) {
      if (satellite.orbitCode) {
        orbit.add(satellite.orbitCode);
      }
    }

    return Array.from(orbit).sort();
  });

  const uniqueObjectType = computed(() => {
    const objectType = new Set();

    for (const satellite of satellitesData) {
      if (satellite.objectType) {
        objectType.add(satellite.objectType);
      }
    }

    return Array.from(objectType).sort();
  });

  return {
    countryCodes: uniqueCountries.value,
    orbitCodes: uniqueOrbitCode.value,
    objectTypes: uniqueObjectType.value,
  };
};

export default {
  setup,
};
</script>
