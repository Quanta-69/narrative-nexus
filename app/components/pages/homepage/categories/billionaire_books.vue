<script setup>
import { billionaireBooks } from '~/data/billionaire-books';
</script>

<template>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
		<CardsBookCard v-for="(book, index) in billionaireBooks" 
		:key="book.id" 
		:title="book.title" 
		:url="book.url" 
		:cover="book.cover"
		:author="book.author" />
	</div>
	<NuxtLink to="/category/billionaire">
		<UiNButton text="Billionaire"/>
	</NuxtLink>
</template>
