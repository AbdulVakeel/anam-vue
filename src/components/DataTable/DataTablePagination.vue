<script setup>
import { defineProps, defineEmits } from 'vue';
import RecordsPerPageListBox from './RecordsPerPageListBox.vue';
import Pagination from './Pagination.vue';

const props = defineProps({
  items: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        'from' in value &&
        'to' in value &&
        'total' in value &&
        'links' in value &&
        'current_page' in value
      );
    }
  },
  modelValue: {
    type: Number,
    default: 10
  }
});

const emit = defineEmits(['update:modelValue', 'page-change']);
</script>

<template>
  <div class="flex flex-col md:flex-row items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 gap-4">
    <div class="flex items-center gap-4">
      <RecordsPerPageListBox
        :model-value="modelValue"
        @update:model-value="(value) => emit('update:modelValue', value)"
      />
      <span class="text-sm text-gray-600 dark:text-gray-400">
        Showing {{ items.from }} to {{ items.to }} of {{ items.total }} entries
      </span>
    </div>
    
    <Pagination
      :links="items.links"
      :current-page="items.current_page"
      @page-change="(page) => emit('page-change', page)"
    />
  </div>
</template>