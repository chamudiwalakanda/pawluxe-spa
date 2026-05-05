<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>


<template>
  <div class="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
    <Navbar />
    <router-view />
  </div>
</template>