<template>
  <div class="flex items-center justify-between">
    <div class="w-24 text-gray-700 dark:text-gray-300">{{ name }}</div>
    <div class="flex-1 mx-2">
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          :class="['h-2.5 rounded-full', color]" 
          :style="{ width: `${percent}%` }"
        ></div>
      </div>
    </div>
    <div class="w-16 text-right text-sm text-gray-500 dark:text-gray-400">{{ value }}</div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  value: String,
  percent: Number,
  color: {
    type: String,
    default: 'bg-blue-500'
  }
})
</script>