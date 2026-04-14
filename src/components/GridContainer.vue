<template>
  <div :class="gridClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cols: {
    type: Number,
    default: 4, 
    validator: val => [1, 2, 3, 4, 6, 8].includes(val)
  },
  gap: {
    type: String,
    default: 'gap-6'
  },
  marginBottom: {
    type: String,
    default: 'mb-8'
  },
  responsive: {
    type: Boolean,
    default: true
  }
})

const colMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
  8: 'grid-cols-8'
}

const responsiveMap = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 md:grid-cols-4',
  6: 'sm:grid-cols-3 md:grid-cols-6',
  8: 'sm:grid-cols-4 lg:grid-cols-8'
}

const gridClasses = computed(() => [
  'grid',
  colMap[props.cols],
  props.responsive ? responsiveMap[props.cols] : '',
  props.gap,
  props.marginBottom
])
</script>
