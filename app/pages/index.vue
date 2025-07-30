<template>
    <hero/>
</template>

<script setup lang="ts">
import { hero } from '~/components/pages/homepage/exporter';
useHead({
    title: 'Narrative Nexus',
    meta: [
        { name: 'description', content: 'A platform for collaborative storytelling and narrative exploration.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
});
</script>

<style scoped>
@reference "tailwindcss";

h1{
    @apply text-4xl font-bold text-center
}
h2{
    @apply text-3xl font-semibold text-center text-gray-600 mt-10
}
</style>