<template>
  <li class="py-3 flex items-center justify-between">
    <div class="flex items-center">
      <div :class="['w-3 h-3 rounded-full mr-3', color]"></div>
      <span class="text-gray-700 dark:text-gray-300">{{ name }}</span>
    </div>
    <div class="flex items-center">
      <span class="text-gray-500 dark:text-gray-400 mr-2">{{ percent }}%</span>
      <span class="text-gray-500 dark:text-gray-400 text-xs">({{ count }})</span>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: String,
  percent: Number,
  count: String
})

const color = computed(() => {
  const colors = {
    Chrome: 'bg-red-500',
    Firefox: 'bg-orange-500',
    Safari: 'bg-blue-500',
    Brave: 'bg-yellow-500',
    Opera: 'bg-red-400',
    Falkon: 'bg-purple-500',
    Other: 'bg-gray-500'
  }
  return colors[props.name] || 'bg-gray-500'
})
</script>