<script setup>
import { defineProps } from 'vue';
import LatestReadsSection from '~/components/pages/homepage/LatestReadsSection.vue';
import CategoryBookList from '~/components/pages/homepage/category/CategoryBookList.vue';

const props = defineProps({
  activeCategory: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="py-8">
    <!-- Conditionally render components based on the activeCategory prop -->
    <div v-if="props.activeCategory === 'latest'">
      <!-- Only render the latest reads component if the slug is 'latest' -->
      <LatestReadsSection />
    </div>
    <div v-else>
      <!-- Use the new, single dynamic component for all other categories -->
      <CategoryBookList :categorySlug="props.activeCategory" />
    </div>
  </div>
</template>
