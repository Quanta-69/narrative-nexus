<template>
    <hero/>
    <featured @category-selected="handleCategorySelected"  />
    <dynamic_category :activeCategory="activeCategory" />
    <editors_pick/>
    <trending/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { hero, editors_pick, trending, featured, dynamic_category, latest_reads } from '~/components/pages/homepage/exporter';
const activeCategory = ref('latest');

const handleCategorySelected = (category: string) => {
  activeCategory.value = category;
  console.log(`Active content area category changed to: ${category}`); // For debugging
};
useHead({
    title: 'Narrative Nexus',
    meta: [
        { name: 'description', content: 'A platform for collaborative storytelling and narrative exploration.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
});

</script>

<style scoped>
@reference "tailwindcss";
section:nth-of-type(odd){
    @apply bg-[var(--alpha-bg)]
}
h1{
    @apply text-4xl font-bold text-center
}
h2{
    @apply text-3xl font-semibold text-center text-gray-600 mt-10
}
</style>