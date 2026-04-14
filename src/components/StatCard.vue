<template>
  <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ label }}</p>
        <h3 class="text-2xl font-semibold mt-1">{{ value }}</h3>
      </div>
      <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
        <slot name="icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ label: String, value: [String, Number] })
</script>
