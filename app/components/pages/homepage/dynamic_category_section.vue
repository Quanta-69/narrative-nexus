<script setup>
import { computed } from "vue";
// Import all your category-specific book components
import { BillionaireBooks, MafiaBooks, WerewolfBooks, YoungAdultBooks, FantasyBooks, EroticaBooks, LgbtqBooks } from "./categories/exporter";
import { latest_reads } from "./exporter"; // Also include this if 'latest' is handled here

// Define the props this component expects
const props = defineProps({
	activeCategory: {
		type: String,
		required: true,
		default: "latest", // Default to 'latest' if not provided
	},
});

// Computed property to dynamically select the component to render
const currentCategoryComponent = computed(() => {
	switch (props.activeCategory) {
		case "billionaire":
			return BillionaireBooks;
		case "mafia":
			return MafiaBooks;
		case "werewolf":
			return WerewolfBooks;
		case "young-adult":
			return YoungAdultBooks;
		case "fantasy":
			return FantasyBooks;
		case "erotica":
			return EroticaBooks;
		case "lgbtq":
			return LgbtqBooks;
		case "latest":
			return latest_reads; // Render the LatestReadsSection when 'latest' is active
		default:
			return null; // Fallback if no matching category
	}
});

// Computed property for the section title
const sectionTitle = computed(() => {
	if (props.activeCategory === "latest") {
		return "Our Latest Narratives";
	}
	// Convert slug to a more readable title (e.g., 'billionaire' -> 'Billionaire Romance')
	const categoryMap = {
		"billionaire": "Billionaire Romance",
		"mafia": "Mafia Romance",
		"werewolf": "Werewolf Romance",
		"young-adult": "Young Adult Romance",
		"fantasy": "Fantasy Romance",
		"erotica": "Erotica (18+)",
		"lgbtq": "LGBTQ+ Romance",
	};
	return categoryMap[props.activeCategory] || "Selected Category";
});
</script>

<template>
	<div class="container mx-auto">
		<h2 class="text-3xl font-bold text-center mb-8 text-blue-800 rounded-lg">
			{{ sectionTitle }}
		</h2>

		<!-- Conditionally render the component based on activeCategory -->
		<component
			:is="currentCategoryComponent"
			v-if="currentCategoryComponent"
		/>
		<div
			v-else
			class="text-center text-gray-600 text-lg p-8"
		>
			<p>No content available for this category yet. Please select another.</p>
		</div>
	</div>
</template>
