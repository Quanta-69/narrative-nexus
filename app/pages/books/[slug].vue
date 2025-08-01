<script setup>
import { useRoute } from '#app';
// We are using the JavaScript composable to avoid TypeScript errors for now.
import { useBooks } from '~/composables/useBooks.js';

// useRoute is a Nuxt composable that gives you access to the current route object.
// We get the 'slug' from the URL parameters.
const route = useRoute();
const categorySlug = route.params.slug;

// useBooks is your custom composable to fetch the book data from Supabase.
const { books, pending, error } = useBooks(categorySlug);
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Title for the category page with your preferred styling and capitalization -->
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      Exploring {{ categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }}
    </h1>

    <!-- Display a loading state while data is being fetched -->
    <div v-if="pending" class="text-center text-gray-500 text-lg py-12">
      <p>Loading books in the {{ categorySlug.replace(/-/g, ' ') }} category...</p>
    </div>

    <!-- Display an error state if the fetch fails -->
    <div v-else-if="error" class="text-center text-red-500 text-lg py-12">
      <p>An error occurred while fetching books. Please try again later.</p>
    </div>

    <!-- Display the books once the data is loaded -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <!-- We use <NuxtLink> to make the entire card clickable, navigating to the book's details page -->
      <NuxtLink
        v-for="book in books"
        :key="book.id"
        :to="`/books/${book.slug}`"
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
  </div>
</template>
