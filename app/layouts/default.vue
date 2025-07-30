<template>
    <Navbar/>
    <slot/>
    <Footer/>
</template>

<script setup lang="ts">
import { Navbar, Footer } from '~/components/ui/exporter';
</script>

<style scoped>

</style>