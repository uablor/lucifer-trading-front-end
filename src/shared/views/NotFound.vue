<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800">404</h1>
      <p class="text-2xl mt-4 text-gray-600">Page Not Found</p>
      <p class="mt-2 text-gray-500">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <RouterLink to="/" class="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Go Home
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
