<script setup>
import { useRoute } from 'vue-router';
import { useBooks } from '~/composables/useBooks';
import { useHead } from '#app';

const route = useRoute();
const { books, categoryName, pending, error } = useBooks(route.params.category_slug);

useHead({
  title: () => categoryName.value ? `${categoryName.value} - Narrative Nexus` : 'Loading...',
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center mb-8 text-blue-800 rounded-lg">
      {{ categoryName || 'Category' }}
    </h1>

    <div v-if="pending" class="text-center text-gray-500 text-lg py-12">
      <p>Loading books...</p>
    </div>

    <div v-else-if="error" class="text-center text-red-500 text-lg py-12">
      <p>An error occurred while fetching books. Please try again later.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div
        v-for="book in books"
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
        <NuxtLink :to="`/category/${route.params.category_slug}/${book.slug}`" class="
          mt-auto px-4 py-2 bg-pink-500 hover:bg-pink-600
          text-white text-sm font-medium rounded-full
          transition duration-300
        ">
          Read Now
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
