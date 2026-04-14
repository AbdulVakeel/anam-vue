<template>
  <tr>
    <td class="py-3 text-gray-700 dark:text-gray-300">{{ path }}</td>
    <td class="text-center text-gray-500 dark:text-gray-400">{{ views }}</td>
    <td class="text-center text-gray-500 dark:text-gray-400">{{ time }}</td>
    <td class="text-center text-gray-500 dark:text-gray-400">{{ exit }}%</td>
  </tr>
</template>

<script setup>
defineProps({
  path: String,
  views: [String, Number],
  time: String,
  exit: [String, Number]
})
</script>