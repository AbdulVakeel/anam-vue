<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  links: Array,
  currentPage: Number,
  perPage: Number
});

const emit = defineEmits(['page-change']);

const linkClasses = computed(() => {
  return 'inline-flex items-center justify-center h-8 w-8 rounded-md transition-colors';
});

const handlePageChange = (url, label) => {
  if (!url) return;
  const page = extractPageNumber(url, label);
  if (page) emit('page-change', page);
};

const extractPageNumber = (url, label) => {
  if (label.includes('Previous')) return props.currentPage - 1;
  if (label.includes('Next')) return props.currentPage + 1;
  const match = url.match(/page=(\d+)/);
  return match ? parseInt(match[1]) : parseInt(label);
};
</script>

<template>
  <div class="flex items-center gap-1">
    <button
      v-for="(link, index) in links"
      :key="index"
      :class="[
        linkClasses,
        link.active ? 'bg-primary-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
        !link.url ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      ]"
      :disabled="!link.url"
      @click="handlePageChange(link.url, link.label)"
      v-html="link.label"
    />
  </div>
</template>