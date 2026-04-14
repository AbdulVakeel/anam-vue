<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: [Boolean, String, Number],
  label: String,
  name: [String, Number],
  value: [String, Number],
  size: { type: String, default: 'default' },
});

const emit = defineEmits(['update:modelValue']);

const bgSizeClasses = computed(() => {
  const sizes = {
    default: 'h-6 w-12',
    sm: 'h-4 w-9',
    xs: 'h-2 w-6',
  };
  return sizes[props.size] || sizes.default;
});

const btnSizeClasses = computed(() => {
  const sizes = {
    default: 'h-5 w-5',
    sm: 'h-3 w-3',
    xs: 'h-3 w-3',
  };
  return sizes[props.size] || sizes.default;
});

const toggleValue = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>

<template>
  <div class="flex items-center">
    <button
      type="button"
      :name="name"
      :value="value"
      @click="toggleValue"
      :class="[
        modelValue
          ? 'bg-gradient-to-r from-sky-400 to-sky-600'
          : 'bg-gradient-to-r from-gray-300 to-gray-400',
        'relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        bgSizeClasses,
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          modelValue ? 'translate-x-6' : 'translate-x-0',
          'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-300',
          btnSizeClasses,
        ]"
      />
    </button>

    <span
      class="ml-3 dark:text-white cursor-pointer select-none"
      @click="toggleValue"
    >
      {{ label }}
      <slot></slot>
    </span>
  </div>
</template>
