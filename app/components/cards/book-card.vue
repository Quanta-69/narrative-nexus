<template>
		<div class="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
			<img :src="cover" :alt="title + ' Cover'" class="w-24 h-36 object-cover mb-3 rounded shadow-sm">
			<h3 class="font-semibold text-lg text-gray-800 line-clamp-2">
				{{ title }}
			</h3>
			<p class="text-sm text-gray-600 mb-2">
				{{ author }}
			</p>
			<NuxtLink :to="url"><button class="mt-auto px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium rounded-full transition duration-300">Read Now</button></NuxtLink>
		</div>
</template>

<script setup lang="ts">

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: '/'
    }
})

</script>

<style scoped>

</style>