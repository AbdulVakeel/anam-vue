<template>
   <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg text-center max-w-md w-full">
      
      <!-- Error Code -->
      <div class="text-8xl font-bold text-purple-500 drop-shadow-lg">403</div>
      
      <!-- Title -->
      <p class="mt-4 text-2xl font-bold">Forbidden</p>
      
      <!-- Description -->
      <p class="mt-2 text-gray-400">
        You don’t have permission to access this page.
      </p>
      
      <!-- Buttons -->
      <div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <RouterLink
          :to="{ name: 'dashboard' }"
          class="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 transition-all font-semibold shadow-md"
        >
          Go Home
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
