<script setup>
import { useRoute } from 'vue-router';
import { useBook } from '~/composables/useBook';

const route = useRoute();
const { book, pending, error } = useBook(route.params.book);
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    
    <!-- Loading State -->
    <div v-if="pending" class="text-center text-gray-500 text-lg py-12">
      <p>Loading book details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-500 text-lg py-12">
      <p>An error occurred while fetching book details: {{ error.message }}</p>
    </div>

    <!-- Main content area -->
    <div v-else-if="book" class="flex flex-col lg:flex-row gap-8 lg:gap-12">
      <!-- Left column for cover image -->
      <div class="flex-shrink-0 flex justify-center lg:justify-start">
        <div class="w-64 h-96 lg:w-80 lg:h-[30rem] rounded-lg shadow-lg overflow-hidden">
          <img :src="book.cover" :alt="book.title + ' Cover'" class="w-full h-full object-cover">
        </div>
      </div>

      <!-- Right column for book details -->
      <div class="flex-grow">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">{{ book.title }}</h1>
        <p class="text-xl text-pink-600 font-semibold mb-4">{{ book.author }}</p>

        <!-- Synopsis -->
        <div class="bg-gray-50 p-6 rounded-lg shadow-inner mb-8">
          <h2 class="text-2xl font-bold text-gray-700 mb-3">Synopsis</h2>
          <p class="text-gray-600 leading-relaxed">
            {{ book.synopsis }}
          </p>
        </div>

        <!-- Action buttons -->
        <div class="flex items-center gap-4 mb-8">
          <button class="
            px-8 py-3
            bg-pink-600 hover:bg-pink-700
            text-white font-semibold rounded-full
            transition-colors duration-300
            shadow-lg hover:shadow-xl
          ">
            Read Now
          </button>
          <button class="
            px-8 py-3
            bg-blue-800 hover:bg-blue-700
            text-white font-semibold rounded-full
            transition-colors duration-300
            shadow-lg hover:shadow-xl
          ">
            Add to Library
          </button>
        </div>
        
        <!-- Author Bio section -->
        <div class="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 class="text-2xl font-bold text-gray-700 mb-3">About the Author</h2>
          <p class="text-gray-600 leading-relaxed">{{ book.author }}</p>
        </div>
      </div>
    </div>
    
    <!-- No Book Found State -->
    <div v-else class="text-center text-gray-500 text-lg py-12">
      <p>Book not found.</p>
    </div>

  </div>
</template>
