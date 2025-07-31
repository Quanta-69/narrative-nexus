<script setup>
import { billionaireBooks } from '~/data/billionaire-books';
</script>

<template>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
		<div
			v-for="book in billionaireBooks"
			:key="book.id"
			class="
        bg-white p-4 rounded-lg shadow-md
        flex flex-col items-center text-center
        transform transition duration-300 hover:scale-105 hover:shadow-lg
      "
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
			<button
				class="
        mt-auto px-4 py-2 bg-pink-500 hover:bg-pink-600
        text-white text-sm font-medium rounded-full
        transition duration-300
      "
			>
				Read Now
			</button>
		</div>
	</div>
</template>
