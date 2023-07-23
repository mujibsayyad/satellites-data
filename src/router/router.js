import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/components/HomePage/Home.vue';
import SearchResults from '@/components/SearchSatellites/SearchResults.vue';
import FilteredData from '@/components/FilterSatellites/FilteredData.vue';
import NotFound from '@/components/NotFound.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/search', component: SearchResults },
  { path: '/filter', component: FilteredData },
  { path: '/:notfound(.*)', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
