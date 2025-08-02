<script setup>
import { useLatestBooks } from '~/composables/useLatestBooks.ts';

const { latestBooks, pending, error } = useLatestBooks();
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold text-center mb-8 text-blue-800 rounded-lg">
      Our Latest Narratives
    </h2>
    <div v-if="pending" class="text-center text-gray-500 text-lg py-12">
      <p>Loading latest books...</p>
    </div>

    <div v-else-if="error" class="text-center text-red-500 text-lg py-12">
      <p>An error occurred while fetching the latest books. Please try again later.</p>
    </div>

    <div v-else-if="latestBooks && latestBooks.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <NuxtLink
        v-for="book in latestBooks"
        :key="book.id"
        :to="`/category/${book.categorySlug}/${book.slug}`"
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
      </NuxtLink>
    </div>

    <div v-else class="text-center text-gray-600 text-lg py-12">
        <p>No latest narratives found. Check back soon!</p>
    </div>
  </div>
</template>
