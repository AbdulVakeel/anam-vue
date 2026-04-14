<script setup>
import { computed } from 'vue';
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
  intent: {
    type: String,
    validator(value) {
      return ['info', 'success', 'danger', 'warning', 'default'].includes(value);
    },
    default: 'default',
  },
  title: { type: String, default: '' },
  show: { type: Boolean, default: true },
  onDismiss: { type: Function },
  dismissLabel: { type: String, default: 'Dismiss' },
});

// Styling map without CVA
const styles = {
  container: {
    info: 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200',
    success: 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200',
    danger: 'bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-200',
    default: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700',
  },
  iconWrapper: {
    info: 'bg-blue-200/50',
    success: 'bg-green-200/50',
    warning: 'bg-yellow-200/50',
    danger: 'bg-red-200/50',
    default: 'bg-gray-300/50 dark:bg-gray-700/50',
  },
  icon: {
    info: 'text-blue-700 dark:text-blue-300',
    success: 'text-green-700 dark:text-green-300',
    warning: 'text-yellow-700 dark:text-yellow-300',
    danger: 'text-red-700 dark:text-red-300',
    default: 'text-gray-700 dark:text-gray-300',
  },
  closeBtn: {
    info: 'text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100',
    success: 'text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100',
    warning: 'text-yellow-700 hover:text-yellow-900 dark:text-yellow-300 dark:hover:text-yellow-100',
    danger: 'text-red-700 hover:text-red-900 dark:text-red-300 dark:hover:text-red-100',
    default: 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white',
  }
};

const iconMap = {
  success: CheckCircleIcon,
  info: InformationCircleIcon,
  warning: ExclamationTriangleIcon,
  danger: XCircleIcon,
  default: InformationCircleIcon,
};

const iconComponent = computed(() => iconMap[props.intent] || iconMap.default);

function dismiss() {
  props.onDismiss?.();
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="props.show"
      class="px-4 py-3 rounded-md shadow flex flex-col space-y-2"
      :class="styles.container[props.intent]"
      role="alert"
      aria-live="assertive"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <!-- Icon -->
          <div
            class="p-1 rounded-lg inline-flex items-center justify-center"
            :class="styles.iconWrapper[props.intent]"
          >
            <component :is="iconComponent" class="w-6 h-6" :class="styles.icon[props.intent]" />
          </div>
          <!-- Title -->
          <h2 v-if="props.title || $slots.title" class="font-medium text-[15px]">
            <slot name="title">{{ props.title }}</slot>
          </h2>
        </div>

        <!-- Close Button -->
        <button
          v-if="props.onDismiss"
          :title="dismissLabel"
          :aria-label="dismissLabel"
          class="p-0.5 rounded-md transition-colors"
          :class="styles.closeBtn[props.intent]"
          @click="dismiss"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Content -->
      <div class="text-sm">
        <slot />
      </div>
    </div>
  </transition>
</template>
