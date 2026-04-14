<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring',
      variantClasses,
      block ? 'w-full' : '',
      disabled ? 'opacity-60 cursor-not-allowed' : ''
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue' 

const props = defineProps({
  variant: { type: String, default: 'primary' }, 
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-primary-300'
    case 'ghost':
      return 'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-primary-300'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300'
    default:
      return 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-300'
  }
})
</script>
