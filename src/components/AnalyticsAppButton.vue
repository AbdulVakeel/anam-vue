<template>
  <button 
    :class="[ 
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
      'disabled:opacity-50 disabled:pointer-events-none',
      size === 'xs' ? 'px-2.5 py-1.5 text-xs' : 'px-4 py-2 text-sm',
      'bg-primary-700 hover:bg-primary-800 text-white' 
    ]"
  >
    <slot />
  </button>
</template>


<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value)
  }
})
</script>