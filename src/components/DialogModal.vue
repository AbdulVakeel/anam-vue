<!-- DialogModal.vue -->
<template>
  <transition name="modal-fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
      @click.self="close"
    >
      <transition name="modal-scale">
        <div
          :class="[
            'bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden w-full mx-4 transform transition-all',
            maxWidthClass
          ]"
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">
              <slot name="title" />
            </h2>
          </div>

          <!-- Body -->
          <div class="px-6 py-4">
            <slot name="content" />
          </div>

          <!-- Footer -->
          <div
            class="flex justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
          >
            <slot name="footer" />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";
const emit = defineEmits(["close"]);

const props = defineProps({
  show: Boolean,
  maxWidth: {
    type: String,
    default: "2xl",
  },
  closeable: {
    type: Boolean,
    default: true,
  },
});

const close = () => {
  if (props.closeable) emit("close");
};

const maxWidthClass = computed(() => {
  return {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  }[props.maxWidth] || "max-w-2xl";
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.modal-scale-enter-from {
  transform: scale(0.9);
  opacity: 0;
}
</style>
