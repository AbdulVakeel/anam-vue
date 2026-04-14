<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  align: { type: String, default: 'right' }, 
  width: { type: String, default: '48' },
  contentClasses: { type: [Array, String], default: '' }
})

const open = ref(false)

const closeOnEscape = (e) => {
  if (open.value && e.key === 'Escape') {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', closeOnEscape)
})
onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape)
})

// Width classes
const widthClass = computed(() => {
  return {
    28: 'w-28',
    32: 'w-32',
    36: 'w-36',
    40: 'w-40',
    44: 'w-44',
    48: 'w-48'
  }[props.width.toString()] || 'w-48'
})

// Alignment classes
const alignmentClasses = computed(() => {
  if (props.align === 'left') return 'origin-top-left left-0'
  if (props.align === 'right') return 'origin-top-right right-0'
  return 'origin-top'
})

// Click outside close
const dropdownRef = ref(null)
const handleClickOutside = (e) => {
  if (open.value && dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    open.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <!-- Trigger -->
    <div @click="open = !open" class="cursor-pointer">
      <slot name="trigger" />
    </div>

    <!-- Background overlay for mobile -->
    <div
      v-show="open"
      class="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
      @click="open = false"
    ></div>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="open"
        class="absolute z-50 mt-2 rounded-md shadow-lg"
        :class="[widthClass, alignmentClasses]"
      >
        <div
          class="rounded-md ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 dark:text-white"
          :class="contentClasses"
        >
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>
