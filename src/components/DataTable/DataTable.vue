<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';
import DataTablePagination from './DataTablePagination.vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true,
    validator: (cols) => cols.every(col => 'key' in col && 'label' in col)
  },
  items: {
    type: Array,
    default: () => []
  },
  pagination: {
    type: Object,
    default: null
  },
  perPage: {
    type: Number,
    default: 10
  }
});

const emit = defineEmits(['sort', 'update:perPage', 'page-change']);

const sortState = ref({
  field: '',
  direction: 'asc'
});

const handleSort = (column) => {
  if (!column.sortable) return;
  
  if (sortState.value.field === column.key) {
    sortState.value.direction = sortState.value.direction === 'asc' ? 'desc' : 'asc';
  } else {
    sortState.value.field = column.key;
    sortState.value.direction = 'asc';
  }
  
  emit('sort', sortState.value);
};

const renderCell = (item, column) => {
  if (column.key.includes('.')) {
    return column.key.split('.').reduce((obj, key) => (obj && obj[key]) ? obj[key] : '', item);
  }
  return item[column.key];
};
</script>

<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              :class="{ 'cursor-pointer': column.sortable }"
              @click="handleSort(column)"
            >
              <div class="flex items-center">
                {{ column.label }}
                <span v-if="column.sortable" class="ml-1">
                  <svg
                    v-if="sortState.field === column.key"
                    class="w-4 h-4"
                    :class="sortState.direction === 'asc' ? 'text-primary-500' : 'text-primary-500 transform rotate-180'"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                  <svg
                    v-else
                    class="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(item, index) in items"
            :key="index"
            class="hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap text-sm"
              :class="column.numeric ? 'text-right' : 'text-left'"
            >
              <slot :name="`cell-${column.key}`" :item="item" :value="renderCell(item, column)">
                {{ renderCell(item, column) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <DataTablePagination
      v-if="pagination"
      :items="pagination"
      :model-value="perPage"
      @update:model-value="(value) => emit('update:perPage', value)"
      @page-change="(page) => emit('page-change', page)"
    />
  </div>
</template>