<script setup lang="ts">
// This component is now a "dumb" component that only displays books.

// Define the shape of a book to ensure type-safety.
interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  slug: string;
  categorySlug: string;
}

// Accept the list of books as a prop.
defineProps({
  books: {
    type: Array as () => Book[],
    required: true,
  },
});
</script>

<template>
  <div
    v-for="book in books"
    :key="book.id"
    class="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-lg"
  >
    <img
      :src="book.cover"
      :alt="book.title + ' Cover'"
      class="w-24 h-36 object-cover mb-3 rounded shadow-sm"
    >
    <h3 class="font-semibold text-lg text-gray-800 line-clamp-2">
      {{ book.title }}
    </h3>
    <p class="text-sm text-gray-600 mb-2">
      {{ book.author }}
    </p>
    <!-- Correct NuxtLink to the book details page -->
    <NuxtLink
      :to="`/category/${book.categorySlug}/${book.slug}`"
      class="mt-auto px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium rounded-full transition duration-300"
    >
      Read Now
    </NuxtLink>
  </div>
</template>
