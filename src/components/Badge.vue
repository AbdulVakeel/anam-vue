<template>
  <span :class="[containerClass]">
    <slot name="icon"></slot>
    <span :class="contentClass">
      <slot></slot>
    </span>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: value =>
      ['info', 'success', 'danger', 'warning', 'default'].includes(value)
  }
})

const containerClass = computed(() => {
  const base =
    'inline-flex items-center gap-2 px-4 py-1.5 rounded-full shadow-md text-sm font-semibold transition-all duration-300'
  const variants = {
    info: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    warning: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
    default:
      'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-900 dark:from-gray-700 dark:to-gray-800 dark:text-white'
  }
  return `${base} ${variants[props.type]}`
})

const contentClass = computed(() => {
  return 'leading-none'
})
</script>
