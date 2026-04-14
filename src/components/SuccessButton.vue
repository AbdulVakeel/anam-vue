<script setup>
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { RouterLink } from 'vue-router';

const props = defineProps({
  as: { 
    type: String,
    default: 'button',
    validator: (value) => ['button', 'a', 'link'].includes(value)
  },
  size: { 
    type: String, 
    default: 'default',
    validator: (value) => ['default', 'sm', 'xs'].includes(value)
  },
  processing: { 
    type: Boolean, 
    default: false 
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-75 group';
  
  const variantClasses = cva(baseClasses, {
    variants: {
      intent: {
        success: 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-300 active:bg-green-300',
      },
      size: {
        default: 'py-2 px-4 text-sm md:text-base',
        sm: 'py-1.5 px-3 text-sm',
        xs: 'px-2 py-1 text-xs'
      },
      state: {
        processing: 'opacity-75 cursor-not-allowed',
        disabled: 'opacity-50 cursor-not-allowed',
        normal: ''
      }
    }
  });

  return variantClasses({
    intent: 'success',
    size: props.size,
    state: props.processing ? 'processing' : props.disabled ? 'disabled' : 'normal'
  });
});
</script>

<template>
  <button 
    v-if="as === 'button'"
    :class="buttonClasses"
    :disabled="processing || disabled"
  >
    <slot />
  </button>

  <a 
    v-else-if="as === 'a'"
    :class="buttonClasses"
    :aria-disabled="processing || disabled"
  >
    <slot />
  </a>

  <RouterLink 
    v-else
    :class="buttonClasses"
    :disabled="processing || disabled"
  >
    <slot />
  </RouterLink>
</template>