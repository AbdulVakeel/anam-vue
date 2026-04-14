<script setup>
import { ref, computed, watch } from 'vue';
import DataTable from '../components/DataTable/DataTable.vue';
import DataTablePagination from '../components/DataTable/DataTablePagination.vue';

// Generate 20 mock products
const generateMockProducts = (count = 20) => {
  const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Beauty'];
  const statuses = ['In Stock', 'Out of Stock', 'Low Stock', 'Pre-order'];
  const mockData = [];
  
  for (let i = 1; i <= count; i++) {
    const price = (Math.random() * 500 + 10).toFixed(2);
    const stock = Math.floor(Math.random() * 100);
    
    mockData.push({
      id: `PROD-${1000 + i}`,
      name: `Product ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: `$${price}`,
      originalPrice: `$${(parseFloat(price) * 1.2).toFixed(2)}`,
      stock: stock,
      status: stock > 20 ? 'In Stock' : 
              stock === 0 ? 'Out of Stock' : 
              stock < 10 ? 'Low Stock' : 'Pre-order',
      rating: (Math.random() * 2 + 3).toFixed(1),
      lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]
    });
  }
  
  return mockData;
};

// Table configuration for products
const columns = ref([
  { key: 'id', label: 'Product ID', sortable: true, width: '120px' },
  { key: 'name', label: 'Product Name', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'price', label: 'Price', sortable: true, numeric: true },
  { key: 'originalPrice', label: 'Original Price', sortable: true, numeric: true },
  { key: 'stock', label: 'Stock', sortable: true, numeric: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'rating', label: 'Rating', sortable: true, numeric: true },
  { key: 'lastUpdated', label: 'Last Updated', sortable: true }
]);

// Data and state management
const allItems = ref(generateMockProducts());
const perPage = ref(10); // Show 10 products per page
const currentPage = ref(1);
const sortField = ref('id');
const sortDirection = ref('asc');

// Computed properties
const sortedItems = computed(() => {
  return [...allItems.value].sort((a, b) => {
    // Remove $ sign for numeric comparison
    const cleanValue = (val) => {
      if (typeof val === 'string' && val.startsWith('$')) {
        return parseFloat(val.replace('$', ''));
      }
      return val;
    };

    let fieldA = cleanValue(a[sortField.value]);
    let fieldB = cleanValue(b[sortField.value]);
    
    if (sortField.value === 'lastUpdated') {
      fieldA = new Date(fieldA).getTime();
      fieldB = new Date(fieldB).getTime();
    }
    
    if (fieldA < fieldB) return sortDirection.value === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortDirection.value === 'asc' ? 1 : -1;
    return 0;
  });
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return sortedItems.value.slice(start, end);
});

const paginationInfo = computed(() => {
  const total = allItems.value.length;
  const from = (currentPage.value - 1) * perPage.value + 1;
  const to = Math.min(currentPage.value * perPage.value, total);
  const totalPages = Math.ceil(total / perPage.value);
  
  // Generate proper pagination links
  const links = [];
  
  // Previous link
  links.push({
    url: currentPage.value > 1 ? `?page=${currentPage.value - 1}` : null,
    label: '&laquo; Previous',
    active: false
  });
  
  // Page number links
  for (let i = 1; i <= totalPages; i++) {
    links.push({
      url: `?page=${i}`,
      label: i.toString(),
      active: i === currentPage.value
    });
  }
  
  // Next link
  links.push({
    url: currentPage.value < totalPages ? `?page=${currentPage.value + 1}` : null,
    label: 'Next &raquo;',
    active: false
  });
  
  return {
    current_page: currentPage.value,
    from,
    to,
    total,
    links
  };
});

// Event handlers
const handleSort = ({ field, direction }) => {
  sortField.value = field;
  sortDirection.value = direction;
  currentPage.value = 1;
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handlePerPageChange = (value) => {
  perPage.value = Number(value);
  currentPage.value = 1;
};

// Debug log
watch([paginationInfo, perPage], () => {
  console.log('Pagination Info:', {
    info: paginationInfo.value,
    perPage: perPage.value
  });
}, { immediate: true });
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <DataTable
        :columns="columns"
        :items="paginatedItems"
        :pagination="paginationInfo"
        :per-page="perPage"
        @sort="handleSort"
        @update:per-page="handlePerPageChange"
        @page-change="handlePageChange"
      >
        <!-- Custom status cell -->
        <template #cell-status="{ value }">
          <span 
            class="px-2 py-1 text-xs rounded-full"
            :class="{
              'bg-green-100 text-green-800': value === 'In Stock',
              'bg-red-100 text-red-800': value === 'Out of Stock',
              'bg-yellow-100 text-yellow-800': value === 'Low Stock',
              'bg-blue-100 text-blue-800': value === 'Pre-order'
            }"
          >
            {{ value }}
          </span>
        </template>

        <!-- Custom price cell with discount badge -->
        <template #cell-price="{ item }">
          <div class="flex items-center">
            <span class="font-medium">{{ item.price }}</span>
            <span 
              v-if="parseFloat(item.price.replace('$', '')) < parseFloat(item.originalPrice.replace('$', ''))"
              class="ml-2 px-1.5 py-0.5 text-xs rounded bg-red-100 text-red-800"
            >
              Sale
            </span>
          </div>
        </template>

        <!-- Custom rating cell with stars -->
        <template #cell-rating="{ value }">
          <div class="flex items-center">
            <span class="text-yellow-400">
              {{ '★'.repeat(Math.floor(value)) }}{{ '☆'.repeat(5 - Math.floor(value)) }}
            </span>
            <span class="ml-1 text-sm text-gray-600 dark:text-gray-300">
              ({{ value }})
            </span>
          </div>
        </template>

        <template #footer>
          <DataTablePagination 
            :items="paginationInfo" 
            v-model="perPage"
            @page-change="handlePageChange"
          />
        </template>
      </DataTable>
    </div>
  </div>
</template>