<template>
  <div
    class="relative flex items-center"
    @mouseenter="show = true"
    @mouseleave="show = false"
  >
    <slot></slot>

    <!-- Tooltip -->
    <transition name="fade">
      <div
        v-if="show"
        :class="[
          'absolute z-20 px-3 py-1 text-xs rounded-lg shadow-lg border',
          'backdrop-blur-sm',
          'bg-gray-800 text-white border-gray-700 dark:bg-gray-900 dark:text-gray-100',
          positionClass
        ]"
        style="white-space: nowrap;"
      >
        {{ text }}
        <!-- Tooltip arrow -->
        <span
          class="absolute w-2 h-2 bg-gray-800 dark:bg-gray-900 rotate-45"
          :class="arrowClass"
        ></span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  text: String,
  position: {
    type: String,
    default: "top",
  },
});

const show = ref(false);

const positionClass = computed(() => {
  switch (props.position) {
    case "bottom":
      return "top-full mt-3 left-1/2 -translate-x-1/2";
    case "left":
      return "right-full mr-3 top-1/2 -translate-y-1/2";
    case "right":
      return "left-full ml-3 top-1/2 -translate-y-1/2";
    default:
      return "bottom-full mb-3 left-1/2 -translate-x-1/2";
  }
});

const arrowClass = computed(() => {
  switch (props.position) {
    case "bottom":
      return "-top-1 left-1/2 -translate-x-1/2";
    case "left":
      return "top-1/2 -right-1 -translate-y-1/2";
    case "right":
      return "top-1/2 -left-1 -translate-y-1/2";
    default:
      return "-bottom-1 left-1/2 -translate-x-1/2";
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
