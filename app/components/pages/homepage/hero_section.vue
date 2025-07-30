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
    background: white !important;
    @apply min-h-[30vh] flex items-center justify-center
}
h1{
    @apply text-4xl font-bold text-center text-[var(--accent)]
}
</style>