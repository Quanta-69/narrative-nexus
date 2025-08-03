<script setup lang="ts">
// This is the central hub component that fetches all latest books and handles filtering.
import { useLatestBooks } from "~/composables/useLatestBooks";

// Define the shape of a book to ensure type-safety.
interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
}

const props = defineProps({
  // The activeCategory prop is still needed to know which set of books to display.
  activeCategory: {
    type: String,
    required: true,
  },
});

// Fetch all the latest books using the composable.
const { latestBooks, pending, error } = useLatestBooks();

// Create a reactive computed property to filter books based on the activeCategory.
const filteredBooks = computed<Book[]>(() => {
  if (!latestBooks.value || error.value) {
    return [];
  }

  if (props.activeCategory === "latest") {
    return latestBooks.value as Book[];
  }

  return (latestBooks.value as Book[]).filter(book => book.categorySlug === props.activeCategory);
});

// A computed property to get the name of the active category for the heading.
const categoryName = computed(() => {
  if (props.activeCategory === "latest") {
    return "Latest Reads";
  }

  const book = filteredBooks.value[0];
  return book?.categoryName || "Category";
});
</script>

<template>
  <div
    v-if="pending"
    class="text-center py-12"
  >
    <p class="text-xl text-gray-500 animate-pulse">
      Loading latest books...
    </p>
  </div>

  <div
    v-else-if="error"
    class="text-center py-12"
  >
    <p class="text-xl text-red-500">
      Error: {{ error.message }}
    </p>
  </div>

  <div v-else>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">
        {{ categoryName }}
      </h2>
    </div>

    <!-- The single component to display all books -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <CategoryBookList :books="filteredBooks" />
    </div>

    <!-- View All link for the current category -->
    <div class="mt-8 text-center">
      <NuxtLink
        :to="`/category/${props.activeCategory}`"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
      >
        View All in {{ categoryName }}
      </NuxtLink>
    </div>
  </div>
</template>
