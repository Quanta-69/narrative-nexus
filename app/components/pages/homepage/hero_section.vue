<template>
    <section>
        <div class="text-content">
            <h1>Unleash Your Next Obsession: The Ultimate Romance Library</h1>
            <p>From steamy encounters to epic sagas, find your perfect narrative. Easy to discover, impossible to put down.</p>
        </div>
        <div class="btn-wrap">
            <Button text="Discover books" icon="book"/>
            <Button text="Write books" variant="secondary" icon="write" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/exporter';
</script>

<style scoped>
@reference "tailwindcss";

section{
    background:url('/assets/svgs/hero-mobile.svg') no-repeat;
    background-position: center;
    background-size: cover;
    @apply min-h-[90vh]
}
h1{
    @apply text-4xl font-bold text-center text-[var(--30)]
}
@media (min-width: 1200px) {
    section{
        background-image: url('/assets/svgs/hero.svg');
    }
}
</style>