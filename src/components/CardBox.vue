<template>
  <div
    class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-4"
  >
    <h2 class="text-lg font-semibold text-center">{{ title }}</h2>
    <p v-if="subtitle" class="text-sm opacity-80 mt-2">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>
