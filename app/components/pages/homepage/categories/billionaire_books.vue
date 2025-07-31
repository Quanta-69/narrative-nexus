<script setup>
// In a real application, you would fetch actual Billionaire Romance book data here.
// For now, using placeholder data.
const billionaireBooks = [
	{ id: 101, title: "The CEO's Contract", author: "Ava Sterling", cover: "https://placehold.co/100x150/FFD700/333333?text=Billionaire+1" },
	{ id: 102, title: "His Golden Touch", author: "Marcus Thorne", cover: "https://placehold.co/100x150/F8BBD0/1A3B4A?text=Billionaire+2" },
	{ id: 103, title: "Empire of Love", author: "Sophia Reed", cover: "https://placehold.co/100x150/1A3B4A/FFD700?text=Billionaire+3" },
	{ id: 104, title: "Diamonds & Desire", author: "Liam Blackwood", cover: "https://placehold.co/100x150/EA738D/FFFFFF?text=Billionaire+4" },
	{ id: 105, title: `The Billionaire's Secret Baby`, author: "Isabella Grace", cover: `https://placehold.co/100x150/2F3C7E/F8BBD0?text=Billionaire+5` },
];

// Example of how you might fetch data in a real scenario:
// import { ref, onMounted } from 'vue';
// const billionaireBooks = ref([]);
// onMounted(async () => {
//   // Fetch your Billionaire Romance books from an API or local data source
//   // billionaireBooks.value = await fetch('/api/books?category=billionaire').then(res => res.json());
// });
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
