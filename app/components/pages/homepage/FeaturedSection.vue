<script setup>
import { defineEmits } from 'vue';

// Define the event that this component can emit
const emit = defineEmits(['category-selected']);

const categories = [
  { name: 'Latest Reads', slug: 'latest' },
  { name: 'Billionaire Romance', slug: 'billionaire' },
  { name: 'Mafia Romance', slug: 'mafia' },
  { name: 'Werewolf Romance', slug: 'werewolf' },
  { name: 'Young Adult Romance', slug: 'young-adult' },
  { name: 'Fantasy', slug: 'fantasy' },
  { name: 'Erotica (18+)', slug: 'erotica' },
  { name: 'LGBTQ+', slug: 'lgbtq' },
];

const selectCategory = (slug) => {
  emit('category-selected', slug);
};
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4 p-4">
    <button
      v-for="category in categories"
      :key="category.slug"
      @click="selectCategory(category.slug)"
      class="
        px-6 py-3
        bg-blue-800 hover:bg-blue-700
        text-white font-semibold
        rounded-full shadow-md
        transition duration-300 ease-in-out
        transform hover:scale-105
        text-sm md:text-base
        whitespace-nowrap
      "
    >
      {{ category.name }}
    </button>
  </div>
</template>
