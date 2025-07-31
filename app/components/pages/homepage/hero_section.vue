<template>
    <section>
        <div>
            <h1>Narrative Nexus</h1>
        </div>
    </section>
</template>

<script setup lang="ts">

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
</style>