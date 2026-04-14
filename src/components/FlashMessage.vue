<script setup>
import { ref, watch, computed, onUnmounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  flash: { type: Object, default: () => ({}) },
  errors: { type: Object, default: () => ({}) },
  duration: { type: Number, default: 5000 },
  position: { 
    type: String, 
    default: 'top-right', // top-left, top-center, top-right
    validator: (v) => ['top-left','top-center','top-right'].includes(v)
  }
})

const show = ref(false)
let timeoutId = null

const currentMessage = computed(() => {
  if (props.flash?.error || (props.errors && Object.keys(props.errors).length > 0)) {
    return { title: props.flash?.error || 'There are some form errors.', intent: 'danger' }
  }
  if (props.flash?.warning) return { title: props.flash.warning, intent: 'warning' }
  if (props.flash?.info) return { title: props.flash.info, intent: 'info' }
  if (props.flash?.success) return { title: props.flash.success, intent: 'success' }
  if (props.flash?.message) return { title: props.flash.message, intent: 'default' }
  return null
})

const showMessage = () => {
  show.value = true
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => show.value = false, props.duration)
}

watch(
  () => [props.flash, props.errors],
  () => {
    if (currentMessage.value) {
      showMessage()
    } else {
      show.value = false
      clearTimeout(timeoutId)
    }
  },
  { deep: true, immediate: true }
)

const dismiss = () => {
  show.value = false
  clearTimeout(timeoutId)
}

onUnmounted(() => clearTimeout(timeoutId))
</script>

<template>
  <div 
    v-if="show" 
    class="fixed z-[100] p-4"
    :class="{
      'top-4 right-4 items-end': position === 'top-right',
      'top-4 left-4 items-start': position === 'top-left',
      'top-4 left-1/2 -translate-x-1/2 items-center': position === 'top-center'
    }"
  >
    <Transition name="slide-fade">
      <div 
        v-if="currentMessage" 
        class="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80 border"
        :class="{
          'border-green-500': currentMessage.intent === 'success',
          'border-red-500': currentMessage.intent === 'danger',
          'border-yellow-500': currentMessage.intent === 'warning',
          'border-blue-500': currentMessage.intent === 'info',
          'border-gray-400': currentMessage.intent === 'default'
        }"
      >
        <!-- Close Icon -->
        <button 
          @click="dismiss" 
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>

        <!-- Title -->
        <h3 class="font-semibold text-gray-900 dark:text-gray-100">
          {{ currentMessage.title }}
        </h3>

        <!-- Slot content -->
        <div class="mt-1 text-sm text-gray-600 dark:text-gray-300">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
