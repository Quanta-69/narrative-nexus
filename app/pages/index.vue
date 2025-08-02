<script setup lang="ts">
import { ref } from "vue";
// State to hold the currently selected category for the dynamic content area
const activeCategory = ref<string>("latest");
// Function to update the active category when a button is clicked in FeaturedSection
const handleCategorySelected = (category: string) => {
  activeCategory.value = category;
  console.log(`Active content area category changed to: ${category}`); // For debugging
};

useHead({
  title: "Narrative Nexus",
  meta: [
    { name: "description", content: "A platform for collaborative storytelling and narrative exploration." },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-inter antialiased">
    <PagesHomepageHeroSection />
    <PagesHomepageFeaturedSection @category-selected="handleCategorySelected" />
    <PagesHomepageDynamicCategorySection :active-category="activeCategory" />
    <PagesHomepageEditorsPickSection />
    <PagesHomepageTrendingSection />
  </div>
</template>
