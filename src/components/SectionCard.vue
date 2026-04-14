<script setup>
import { computed } from 'vue';
import { cva } from 'class-variance-authority';

// Props for styling variants
const props = defineProps({
  variant: { type: String, default: 'default' },
  class: { type: [String, Array], default: '' },
});

// Compute classes using CVA
const containerClass = computed(() => {
  return cva('rounded-2xl p-6 transition-shadow duration-300', {
    variants: {
      variant: {
        default: 'bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700',
        danger: 'bg-red-100 dark:bg-red-900 shadow-md text-red-700',
        success: 'bg-green-100 dark:bg-green-900 shadow-md text-green-700',
        info: 'bg-blue-100 dark:bg-blue-900 shadow-md text-blue-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  })({ variant: props.variant });
});
</script>

<template>
  <article :class="[containerClass, props.class]">
    <slot></slot>
  </article>
</template>
