<template>
  <label class="block space-y-1.5">
    <span v-if="label" class="text-sm text-gray-600 dark:text-gray-300">{{ label }}</span>
    <div class="relative">
      <input
        v-bind="$attrs"
        :type="type"
        v-model="model"
        :placeholder="placeholder"
        :class="[
          'w-full rounded-xl border bg-white dark:bg-gray-900 px-3 py-2 outline-none transition',
          error ? 'border-red-500 focus:ring-2 focus:ring-red-300' : 'border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-primary-300'
        ]"
      />
      <slot name="icon" />
    </div>
    <p v-if="hint && !error" class="text-xs text-gray-500">{{ hint }}</p>
    <p v-if="error" class="text-xs text-red-600">{{ error }}</p>
  </label>
</template>

<script setup>
import { computed } from 'vue' 
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  hint: String,
  error: String,
  type: { type: String, default: 'text' },
  placeholder: String
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
</script>
