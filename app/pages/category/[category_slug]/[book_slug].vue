<script setup lang="ts">
// Import the composable we just created and fixed the types for.
const route = useRoute();

const categorySlug = route.params.categorySlug as string;
const bookSlug = route.params.bookSlug as string;

// Use the updated composable to fetch the book data.
// It now correctly takes both slugs as arguments.
const { book, pending, error } = useBook(categorySlug, bookSlug);

// Head configuration for SEO
useHead({
  title: () => book.value?.title || 'Book Details',
  meta: [
    { name: 'description', content: () => book.value?.synopsis || 'Details for a book.' }
  ],
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Display loading state -->
    <div v-if="pending" class="flex justify-center items-center h-64">
      <div class="text-xl text-gray-500 animate-pulse">Loading book details...</div>
    </div>

    <!-- Display error state -->
    <div v-else-if="error" class="flex justify-center items-center h-64">
      <div class="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">
        <p class="font-bold">Error loading book:</p>
        <p>{{ error.message }}</p>
      </div>
    </div>

    <!-- Display book details -->
    <div v-else-if="book" class="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div class="md:flex md:space-x-8">
        <!-- Book Cover Image -->
        <div class="flex-shrink-0 md:w-1/3">
          <img
            :src="book.cover"
            :alt="`Cover of ${book.title}`"
            class="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <!-- Book Details -->
        <div class="mt-6 md:mt-0 md:flex-grow">
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">{{ book.title }}</h1>
          <p class="text-lg text-gray-600 mb-4 font-semibold">by {{ book.author }}</p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-2">Synopsis</h2>
            <p class="text-gray-700 leading-relaxed">{{ book.synopsis }}</p>
          </div>
          
          <!-- Back button -->
          <NuxtLink :to="`/category/${book.categorySlug}`" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
            <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Category
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles can be added here if needed, but Tailwind CSS is preferred. */
</style>
