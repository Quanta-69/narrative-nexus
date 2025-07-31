<template>
    <header>
        <div class="logo">Logo</div>
        <nav>Navbar</nav>
        <div class="extra">Extra</div>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
@reference "tailwindcss";

header{
    @apply flex items-center justify-between p-4 bg-gray-600 text-white w-full border border-black
}
</style>