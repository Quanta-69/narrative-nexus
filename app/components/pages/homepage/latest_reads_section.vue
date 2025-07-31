<script setup>
import { defineProps } from 'vue'; // Import defineProps

// Define the props this component expects
// Even if not directly used in the current basic template,
// defining it here resolves the warning if it's passed from a parent.
const props = defineProps({
  activeCategory: {
    type: String,
    // You can set required to false if it's truly optional for this component,
    // but setting it to true will ensure consistency if a parent expects it.
    required: false, // Set to false as it's primarily for display, not internal logic change based on this prop
    default: 'latest'
  }
});

// In a real application, you would fetch actual latest book data here.
// For now, using placeholder data.
const latestBooks = [
  { id: 1, title: 'Whispers of the Moon', author: 'Luna Nightshade', cover: 'https://placehold.co/100x150/1A3B4A/FFFFFF?text=Book+1' },
  { id: 2, title: 'The Tycoon\'s Secret', author: 'Evelyn Chase', cover: 'https://placehold.co/100x150/F8BBD0/FFFFFF?text=Book+2' },
  { id: 3, title: 'Crimson Vows', author: 'Dante Moretti', cover: 'https://placehold.co/100x150/8B0000/FFFFFF?text=Book+3' },
  { id: 4, title: 'Star-Crossed Fates', author: 'Anya Sharma', cover: 'https://placehold.co/100x150/00CED1/FFFFFF?text=Book+4' },
  { id: 5, title: 'Bound by Moonlight', author: 'Seraphina Wolf', cover: 'https://placehold.co/100x150/4A2C4A/FFFFFF?text=Book+5' },
  { id: 6, title: 'Her Forbidden CEO', author: 'Victoria Knight', cover: 'https://placehold.co/100x150/FFD700/333333?text=Book+6' },
];

// Example of how you might fetch data in a real scenario:
// import { ref, onMounted } from 'vue';
// const latestBooks = ref([]);
// onMounted(async () => {
//   // Fetch your latest books from an API or local data source
//   // latestBooks.value = await fetch('/api/latest-books').then(res => res.json());
// });
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    <div
      v-for="book in latestBooks"
      :key="book.id"
      class="
        bg-white p-4 rounded-lg shadow-md
        flex flex-col items-center text-center
        transform transition duration-300 hover:scale-105 hover:shadow-lg
      "
    >
      <img :src="book.cover" :alt="book.title + ' Cover'" class="w-24 h-36 object-cover mb-3 rounded shadow-sm">
      <h3 class="font-semibold text-lg text-gray-800 line-clamp-2">{{ book.title }}</h3>
      <p class="text-sm text-gray-600 mb-2">{{ book.author }}</p>
      <button class="
        mt-auto px-4 py-2 bg-pink-500 hover:bg-pink-600
        text-white text-sm font-medium rounded-full
        transition duration-300
      ">
        Read Now
      </button>
    </div>
  </div>
</template>
