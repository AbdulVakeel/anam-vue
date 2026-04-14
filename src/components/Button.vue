<script setup>
import { computed } from 'vue'
import { cva } from 'class-variance-authority'

const props = defineProps({
  as: { type: String, default: 'button' }, 
  href: { type: String, default: '#' },
  intent: { type: String, default: 'primary' },
  shadow: { type: String },
  size: { type: String, default: 'default' },
  processing: { type: Boolean, default: false },
})

const processingClasses = computed(() =>
  props.processing ? 'opacity-50 pointer-events-none' : ''
)

const buttonClass = computed(() => {
  return cva(
    'inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
    {
      variants: {
        intent: {
          primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
          outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
          success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
          warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400',
          danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
          info: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
          dark: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-600',
          light: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
          text: 'bg-transparent text-gray-600 hover:text-blue-600 focus:ring-blue-500',
          link: 'bg-transparent text-blue-600 underline hover:text-blue-800 focus:ring-blue-500',
          gradient: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 focus:ring-purple-400',
          disabled: 'bg-gray-400 text-white cursor-not-allowed',
        },
        shadow: {
          sm: 'shadow-sm',
          md: 'shadow-md',
          lg: 'shadow-lg',
        },
      },
    }
  )({
    intent: props.intent,
    shadow: props.shadow,
  })
})

const sizeClass = computed(() => {
  return cva('', {
    variants: {
      size: {
        default: 'px-4 py-2 text-sm',
        sm: 'px-3 py-1.5 text-sm',
        lg: 'px-5 py-3 text-lg',
      },
    },
  })({
    size: props.size,
  })
})
</script>

<template>
  <button
    v-if="as === 'button'"
    :class="[buttonClass, sizeClass, processingClasses]"
  >
    <slot />
  </button>

  <a
    v-else-if="as === 'a'"
    :href="href"
    :class="[buttonClass, sizeClass, processingClasses]"
  >
    <slot />
  </a>
</template>
