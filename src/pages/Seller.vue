<template>
  <div class="space-y-6">
    <!-- Sellers Card -->
    <AppCard>
      <template #header>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <h3 class="font-semibold text-lg">Sellers</h3>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <input
              v-model="q"
              placeholder="Search sellers..."
              class="w-full sm:w-auto flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            />
            <AppButton @click="openAdd = true" class="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Seller
            </AppButton>
          </div>
        </div>
      </template>

      <!-- Responsive Table Wrapper -->
      <div class="overflow-x-auto">
        <Table>
          <template #head>
            <th class="py-2 px-3 text-center">S.N</th>
            <th class="py-2 px-3 text-center hidden sm:table-cell">Logo</th>
            <th class="py-2 px-3 text-center">Shop Name</th>
            <th class="py-2 px-3 text-center hidden md:table-cell">Email</th>
            <th class="py-2 px-3 text-center">Rating</th>
            <th class="py-2 px-3 text-center hidden lg:table-cell">Balance</th>
            <th class="py-2 px-3 text-center hidden lg:table-cell">Revenue</th>
            <th class="py-2 px-3 text-center">Category</th>
            <th class="py-2 px-3 text-center">Status</th>
            <th class="py-2 px-3 text-center">Actions</th>
          </template>

          <tr v-for="(seller, idx) in paginated" :key="seller.email">
            <td class="py-3 px-3 text-center">{{ (page - 1) * perPage + idx + 1 }}</td>

            <td class="py-3 px-3 text-center hidden sm:table-cell">
              <div class="flex justify-center">
                <div class="w-10 h-10 rounded-full bg-primary-200 dark:bg-primary-900 flex items-center justify-center text-primary-800 dark:text-primary-200 font-semibold">
                  {{ initials(seller.shopName) }}
                </div>
              </div>
            </td>

            <td class="py-3 px-3 text-center">{{ seller.shopName }}</td>

            <td class="py-3 px-3 text-center hidden md:table-cell">{{ seller.email }}</td>

            <td class="py-3 px-3 text-center">
              <div class="flex items-center justify-center">
                <span class="text-yellow-500 mr-1">{{ seller.rating }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </td>

            <td class="py-3 px-3 text-center hidden lg:table-cell">
              <span class="font-medium text-green-600 dark:text-green-400">
                {{ formatCurrency(seller.walletBalance) }}
              </span>
            </td>

            <td class="py-3 px-3 text-center hidden lg:table-cell">
              <span class="font-medium text-blue-600 dark:text-blue-400">
                {{ formatCurrency(seller.revenue) }}
              </span>
            </td>

            <td class="py-3 px-3 text-center">
              <span class="px-2 py-1 rounded-full text-xs" :class="categoryClasses[seller.category]">{{ seller.category }}</span>
            </td>

            <td class="py-3 px-3 text-center">
              <span :class="seller.active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'" class="px-2 py-1 rounded-full text-xs">
                {{ seller.active ? 'Active' : 'Inactive' }}
              </span>
            </td>

            <td class="py-3 px-3 text-center">
              <div class="flex justify-center gap-2">
                <button @click="editSeller(idx)" title="Edit" class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="confirmDelete((page - 1) * perPage + idx)" title="Delete" class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </Table>
      </div>

      <template #footer>
        <Pagination v-model:page="page" :pages="totalPages" />
      </template>
    </AppCard>

    <!-- Add Seller Modal -->
   <Modal v-model="openAdd" title="Add Seller">
  <div class="grid gap-3">
    <!-- First row - Shop Name and Owner Name -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <FormInput v-model="form.shopName" label="Shop Name" required />
      <FormInput v-model="form.ownerName" label="Owner Name" required />
    </div>

    <!-- Email (full width) -->
    <FormInput v-model="form.email" label="Email" type="email" required />

    <!-- Category Dropdown -->
    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
      <select 
        v-model="form.category" 
        class="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
      >
        <option 
          v-for="category in categoryOptions" 
          :key="category.value" 
          :value="category.value" 
          class="bg-white dark:bg-gray-800"
        >
          {{ category.label }}
        </option>
      </select>
    </div>

    <!-- Active Toggle -->
    <FormToggle v-model="form.active" label="Active" />
  </div>

  <template #footer>
    <div class="flex justify-end gap-2">
      <AppButton variant="secondary" @click="openAdd=false">Cancel</AppButton>
      <AppButton @click="saveSeller">Save</AppButton>
    </div>
  </template>
</Modal>

    <!-- Edit Seller Modal -->
   <Modal v-model="openEdit" title="Edit Seller">
  <div class="grid gap-3">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <FormInput v-model="editForm.shopName" label="Shop Name" required />
      <FormInput v-model="editForm.ownerName" label="Owner Name" required />
    </div>
    
    <FormInput v-model="editForm.email" label="Email" type="email" required />
    

    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
      <select 
        v-model="editForm.category" 
        class="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
      >
        <option 
          v-for="category in categoryOptions" 
          :key="category.value" 
          :value="category.value" 
          class="bg-white dark:bg-gray-800"
        >
          {{ category.label }}
        </option>
      </select>
    </div>
    
    <FormToggle v-model="editForm.active" label="Active" />
  </div>
  
  <template #footer>
    <div class="flex justify-end gap-2">
      <AppButton variant="secondary" @click="openEdit=false">Cancel</AppButton>
      <AppButton @click="updateSeller">Update</AppButton>
    </div>
  </template>
</Modal>

    <!-- Delete Confirmation Modal -->
    <Modal v-model="openDelete" title="Confirm Delete" size="sm">
      <div class="text-center py-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 class="text-lg font-medium mt-3 text-gray-900 dark:text-gray-100">Are you sure?</h3>
        <p class="text-gray-500 dark:text-gray-400 mt-2">Do you really want to delete this seller? This action cannot be undone.</p>
      </div>
      <template #footer>
        <div class="flex justify-center gap-3">
          <AppButton variant="secondary" @click="openDelete=false">Cancel</AppButton>
          <AppButton variant="danger" @click="deleteSeller">Delete</AppButton>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import AppCard from '../components/AppCard.vue'
import AppButton from '../components/AppButton.vue'
import Table from '../components/Table.vue'
import Pagination from '../components/Pagination.vue'
import Modal from '../components/Modal.vue'
import FormInput from '../components/FormInput.vue'
import FormToggle from '../components/FormToggle.vue'

const CATEGORIES = { 
  FASHION: 'Fashion', 
  ELECTRONICS: 'Electronics', 
  HOME: 'Home & Kitchen', 
  BEAUTY: 'Beauty', 
  SPORTS: 'Sports' 
}

const categoryOptions = [
  { value: CATEGORIES.FASHION, label: 'Fashion & Apparel' },
  { value: CATEGORIES.ELECTRONICS, label: 'Electronics' },
  { value: CATEGORIES.HOME, label: 'Home & Kitchen' },
  { value: CATEGORIES.BEAUTY, label: 'Beauty & Personal Care' },
  { value: CATEGORIES.SPORTS, label: 'Sports & Outdoors' }
]

const categoryClasses = {
  [CATEGORIES.FASHION]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  [CATEGORIES.ELECTRONICS]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  [CATEGORIES.HOME]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  [CATEGORIES.BEAUTY]: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  [CATEGORIES.SPORTS]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value)
}

const sellers = ref([
  { id: 1, shopName: 'Fashion Hub', ownerName: 'Alice Johnson', email: 'fashionhub@example.com', phone: '+1234567890', rating: 4.5, walletBalance: 1250.75, revenue: 12500.50, category: CATEGORIES.FASHION, active: true },
  { id: 2, shopName: 'Tech Gadgets', ownerName: 'Bob Smith', email: 'techgadgets@example.com', phone: '+1234567891', rating: 4.2, walletBalance: 3200.00, revenue: 28450.75, category: CATEGORIES.ELECTRONICS, active: true },
  { id: 3, shopName: 'Home Essentials', ownerName: 'Charlie Brown', email: 'homeessentials@example.com', phone: '+1234567892', rating: 3.8, walletBalance: 875.25, revenue: 9800.00, category: CATEGORIES.HOME, active: false },
  { id: 4, shopName: 'Beauty Palace', ownerName: 'David Wilson', email: 'beautypalace@example.com', phone: '+1234567893', rating: 4.7, walletBalance: 2100.50, revenue: 18750.25, category: CATEGORIES.BEAUTY, active: true },
  { id: 5, shopName: 'Sports World', ownerName: 'Eva Davis', email: 'sportsworld@example.com', phone: '+1234567894', rating: 4.1, walletBalance: 1500.00, revenue: 13200.75, category: CATEGORIES.SPORTS, active: true },
  { id: 6, shopName: 'Trendy Apparel', ownerName: 'Frank Miller', email: 'trendyapparel@example.com', phone: '+1234567895', rating: 3.5, walletBalance: 625.50, revenue: 7450.00, category: CATEGORIES.FASHION, active: false },
  { id: 7, shopName: 'Smart Devices', ownerName: 'Grace Lee', email: 'smartdevices@example.com', phone: '+1234567896', rating: 4.4, walletBalance: 2800.75, revenue: 25600.50, category: CATEGORIES.ELECTRONICS, active: true },
  { id: 8, shopName: 'Kitchen Magic', ownerName: 'Henry Garcia', email: 'kitchenmagic@example.com', phone: '+1234567897', rating: 4.0, walletBalance: 1100.25, revenue: 10500.75, category: CATEGORIES.HOME, active: true },
  { id: 9, shopName: 'Glamour Cosmetics', ownerName: 'Ivy Martinez', email: 'glamourcosmetics@example.com', phone: '+1234567898', rating: 4.6, walletBalance: 1950.00, revenue: 17800.25, category: CATEGORIES.BEAUTY, active: false },
  { id: 10, shopName: 'Outdoor Gear', ownerName: 'Jack Thompson', email: 'outdoorgear@example.com', phone: '+1234567899', rating: 4.3, walletBalance: 1650.50, revenue: 14250.00, category: CATEGORIES.SPORTS, active: true },
  { id: 11, shopName: 'Urban Fashion', ownerName: 'Karen White', email: 'urbanfashion@example.com', phone: '+1234567800', rating: 3.9, walletBalance: 950.75, revenue: 8900.50, category: CATEGORIES.FASHION, active: true },
  { id: 12, shopName: 'Gadget Zone', ownerName: 'Leo Scott', email: 'gadgetzone@example.com', phone: '+1234567801', rating: 4.2, walletBalance: 2300.25, revenue: 21500.75, category: CATEGORIES.ELECTRONICS, active: false },
  { id: 13, shopName: 'Living Spaces', ownerName: 'Mia Clark', email: 'livingspaces@example.com', phone: '+1234567802', rating: 4.1, walletBalance: 1350.00, revenue: 12500.25, category: CATEGORIES.HOME, active: true },
  { id: 14, shopName: 'Skin Care Plus', ownerName: 'Noah Lewis', email: 'skincareplus@example.com', phone: '+1234567803', rating: 4.8, walletBalance: 2450.50, revenue: 22600.75, category: CATEGORIES.BEAUTY, active: true },
  { id: 15, shopName: 'Fitness Gear', ownerName: 'Olivia Young', email: 'fitnessgear@example.com', phone: '+1234567804', rating: 4.0, walletBalance: 1200.25, revenue: 11500.50, category: CATEGORIES.SPORTS, active: true }
])

const q = ref('')
const page = ref(1)
const perPage = 10

const filtered = computed(() => sellers.value.filter(seller =>
  seller.shopName.toLowerCase().includes(q.value.toLowerCase()) || 
  seller.email.toLowerCase().includes(q.value.toLowerCase()) ||
  seller.ownerName.toLowerCase().includes(q.value.toLowerCase())
))

const totalPages = computed(() => Math.ceil(filtered.value.length/perPage))
const paginated = computed(() => filtered.value.slice((page.value-1)*perPage, page.value*perPage))

const initials = (name) => name.split(' ').map(n=>n[0]?.toUpperCase()).join('')

// Add Seller
const openAdd = ref(false)
const form = reactive({ 
  shopName: '', 
  ownerName: '', 
  email: '', 
  phone: '', 
  rating: 3.0,
  walletBalance: 0,
  revenue: 0,
  category: CATEGORIES.FASHION, 
  active: true 
})

const saveSeller = () => {
  sellers.value.push({
    ...form, 
    id: Date.now()
  })
  Object.assign(form, { 
    shopName: '', 
    ownerName: '', 
    email: '', 
    phone: '', 
    rating: 3.0,
    walletBalance: 0,
    revenue: 0,
    category: CATEGORIES.FASHION, 
    active: true 
  })
  openAdd.value = false
}

// Edit Seller
const openEdit = ref(false)
const editIndex = ref(null)
const editForm = reactive({ 
  shopName: '', 
  ownerName: '', 
  email: '', 
  phone: '', 
  rating: 0,
  walletBalance: 0,
  revenue: 0,
  category: '', 
  active: true 
})

const editSeller = (idx) => { 
  editIndex.value = (page.value-1)*perPage+idx; 
  Object.assign(editForm, sellers.value[editIndex.value]); 
  openEdit.value=true 
}

const updateSeller = () => { 
  if(editIndex.value!==null) sellers.value[editIndex.value] = {...editForm}; 
  openEdit.value=false 
}

// Delete Seller
const openDelete = ref(false)
const deleteIndex = ref(null)
const confirmDelete = (idx) => { deleteIndex.value=idx; openDelete.value=true }
const deleteSeller = () => { 
  if(deleteIndex.value!==null) { 
    sellers.value.splice(deleteIndex.value,1); 
    if(paginated.value.length===0 && page.value>1) page.value--; 
  } 
  openDelete.value=false 
}
</script>

<style scoped>
select {
  appearance:none;
  background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position:right 0.5rem center; background-repeat:no-repeat; background-size:1.5em 1.5em; padding-right:2.5rem;
}
.dark select { background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e"); }
button { transition: background-color 0.2s ease; }
</style>