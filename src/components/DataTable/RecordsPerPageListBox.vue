<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: 10
  }
});

const emit = defineEmits(['update:modelValue']);

const handleChange = (event) => {
  emit('update:modelValue', Number(event.target.value));
};
</script>

<template>
  <select
    :value="props.modelValue"
    @change="handleChange"
    class="border border-gray-300 dark:border-gray-600 px-3 py-1 pr-8 rounded-md dark:bg-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  >
    <option value="10">10 per page</option>
    <option value="25">25 per page</option>
    <option value="50">50 per page</option>
    <option value="100">100 per page</option>
  </select>
</template>