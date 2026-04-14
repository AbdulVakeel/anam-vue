<script setup>
defineProps({
  selected: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object, 
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <button
    :class="[
      'inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold sm:truncate border-b-2 border-transparent focus:outline-none disabled:opacity-50 transition-all duration-300',
      selected
        ? 'text-blue-600 border-blue-600 dark:text-blue-400'
        : 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400'
    ]"
  >
    <component :is="icon" class="w-5 h-5" />
    <span>{{ text }}</span>
  </button>
</template>
