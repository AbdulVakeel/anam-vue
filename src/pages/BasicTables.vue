<script setup>
import { ref, computed, watch } from 'vue';
import DataTable from '../components/DataTable/DataTable.vue';
import DataTablePagination from '../components/DataTable/DataTablePagination.vue';

const generateMockData = (count) => {
  const statuses = ['Active', 'Inactive', 'Pending', 'Banned'];
  const mockData = [];
  
  for (let i = 1; i <= count; i++) {
    mockData.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      joined_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]
    });
  }
  
  return mockData;
};

const columns = ref([
  { key: 'id', label: 'ID', sortable: true, width: '80px' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'joined_at', label: 'Join Date', sortable: true }
]);

// Data and state management
const allItems = ref(generateMockData(125));
const form = ref({
  perPage: 10,
  currentPage: 1,
  sortField: 'id',
  sortDirection: 'asc'
});

// Computed properties
const sortedItems = computed(() => {
  return [...allItems.value].sort((a, b) => {
    let fieldA = a[form.value.sortField];
    let fieldB = b[form.value.sortField];
    
    if (form.value.sortField === 'joined_at') {
      fieldA = new Date(fieldA).getTime();
      fieldB = new Date(fieldB).getTime();
    }
    
    if (fieldA < fieldB) return form.value.sortDirection === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return form.value.sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
});

const paginatedItems = computed(() => {
  const start = (form.value.currentPage - 1) * form.value.perPage;
  const end = start + form.value.perPage;
  return sortedItems.value.slice(start, end);
});

const paginationInfo = computed(() => {
  const total = allItems.value.length;
  const from = (form.value.currentPage - 1) * form.value.perPage + 1;
  const to = Math.min(form.value.currentPage * form.value.perPage, total);
  const totalPages = Math.ceil(total / form.value.perPage);
  
  const links = [
    {
      url: form.value.currentPage > 1 ? `?page=${form.value.currentPage - 1}` : null,
      label: '&laquo; Previous',
      active: false
    }
  ];
  
  // Show limited page numbers (better UX for many pages)
  const maxVisiblePages = 5;
  let startPage = Math.max(1, form.value.currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    links.push({
      url: `?page=${i}`,
      label: i.toString(),
      active: i === form.value.currentPage
    });
  }
  
  links.push({
    url: form.value.currentPage < totalPages ? `?page=${form.value.currentPage + 1}` : null,
    label: 'Next &raquo;',
    active: false
  });
  
  return {
    current_page: form.value.currentPage,
    from,
    to,
    total,
    links
  };
});

// Event handlers
const handleSort = ({ field, direction }) => {
  form.value.sortField = field;
  form.value.sortDirection = direction;
  form.value.currentPage = 1; // Reset to first page when sorting
};

const handlePageChange = (page) => {
  form.value.currentPage = page;
};

// Loading state simulation
const isLoading = ref(false);
const simulateApiCall = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
};

// Watch for changes
watch(
  () => [form.value.currentPage, form.value.perPage, form.value.sortField, form.value.sortDirection],
  () => {
    simulateApiCall();
  },
  { immediate: true }
);
</script>

<template>
  <div class="max-w-7xl mx-auto">    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <DataTable
        :columns="columns"
        :items="paginatedItems"
        :loading="isLoading"
        @sort="handleSort"
      >
        <template #cell-status="{ value }">
          <span 
            class="px-2 py-1 text-xs rounded-full"
            :class="{
              'bg-green-100 text-green-800': value === 'Active',
              'bg-red-100 text-red-800': value === 'Banned',
              'bg-yellow-100 text-yellow-800': value === 'Pending',
              'bg-gray-100 text-gray-800': value === 'Inactive'
            }"
          >
            {{ value }}
          </span>
        </template>
        
        <template #loading>
          <div class="p-8 text-center text-gray-500">
            <div class="animate-spin inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
            <p class="mt-2">Loading data...</p>
          </div>
        </template>
        
        <template #empty>
          <div class="p-8 text-center text-gray-500">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="mt-2">No users found</p>
          </div>
        </template>

        <template #footer>
          <DataTablePagination 
            :items="paginationInfo" 
            v-model="form.perPage"
            @page-change="handlePageChange"
          />
        </template>
      </DataTable>
    </div>
  </div>
</template>