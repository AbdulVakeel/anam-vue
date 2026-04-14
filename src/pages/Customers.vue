<template>
  <div class="space-y-6">
    <!-- Customers Card -->
    <AppCard>
      <template #header>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <h3 class="font-semibold text-lg">Customers</h3>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <input
              v-model="q"
              placeholder="Search customers..."
              class="w-full sm:w-auto flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            />
            <AppButton @click="openAdd = true" class="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Customer
            </AppButton>
          </div>
        </div>
      </template>

      <!-- Responsive Table Wrapper -->
      <div class="overflow-x-auto">
        <Table>
          <template #head>
            <th class="py-2 px-3 text-center">S.N</th>
            <th class="py-2 px-3 text-center hidden sm:table-cell">Avatar</th>
            <th class="py-2 px-3 text-left sm:text-center">Customer Details</th>
            <th class="py-2 px-3 text-center hidden lg:table-cell">Location</th>
            <th class="py-2 px-3 text-center hidden xl:table-cell">Created</th>
            <th class="py-2 px-3 text-center">Orders</th>
            <th class="py-2 px-3 text-center">Status</th>
            <th class="py-2 px-3 text-center">Actions</th>
          </template>

          <tr v-for="(customer, idx) in paginated" :key="customer.id">
            <td class="py-3 px-3 text-center">{{ (page - 1) * perPage + idx + 1 }}</td>

            <td class="py-3 px-3 text-center hidden sm:table-cell">
              <div class="flex justify-center">
                <div class="w-10 h-10 rounded-full bg-primary-200 dark:bg-primary-900 flex items-center justify-center text-primary-800 dark:text-primary-200 font-semibold">
                  {{ initials(customer.name) }}
                </div>
              </div>
            </td>

            <td class="py-3 px-3">
              <div class="sm:hidden">
                <div class="font-medium">{{ customer.name }}</div>
                <div class="text-sm text-gray-500">{{ customer.email }}</div>
                <div class="text-sm text-gray-500">{{ customer.phone }}</div>
              </div>
              <div class="hidden sm:block text-center">
                {{ customer.name }}
              </div>
            </td>

            <td class="py-3 px-3 text-center hidden lg:table-cell">
              <span class="inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ customer.location }}
              </span>
            </td>

            <td class="py-3 px-3 text-center hidden xl:table-cell text-gray-600 dark:text-gray-300">
              {{ formatDate(customer.createdAt) }}
            </td>

            <td class="py-3 px-3 text-center font-medium">
              {{ customer.orders }}
            </td>

            <td class="py-3 px-3 text-center">
              <span :class="['px-2 py-1 rounded-full text-xs font-medium', statusClasses[customer.orderStatus]]">
                {{ customer.orderStatus }}
              </span>
            </td>

            <td class="py-3 px-3 text-center">
              <div class="flex justify-center gap-2">
                <button @click="editCustomer(idx)" title="Edit" class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400">
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

    <!-- Add Customer Modal -->
    <Modal v-model="openAdd" title="Add Customer">
      <div class="grid gap-3">
        <FormInput v-model="form.name" label="Full Name" required />
        <FormInput v-model="form.email" label="Email" type="email" required />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormInput v-model="form.phone" label="Phone Number" required />
          <FormInput v-model="form.location" label="Location" required />
        </div>
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Order Status</label>
          <select v-model="form.orderStatus" class="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500">
            <option v-for="status in orderStatusOptions" :key="status" :value="status">{{ status }}</option>
          </select>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <AppButton variant="secondary" @click="openAdd=false">Cancel</AppButton>
          <AppButton @click="saveCustomer">Save</AppButton>
        </div>
      </template>
    </Modal>

    <!-- Edit Customer Modal -->
    <Modal v-model="openEdit" title="Edit Customer">
      <div class="grid gap-3">
        <FormInput v-model="editForm.name" label="Full Name" required />
        <FormInput v-model="editForm.email" label="Email" type="email" required />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormInput v-model="editForm.phone" label="Phone Number" required />
          <FormInput v-model="editForm.location" label="Location" required />
        </div>
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Order Status</label>
          <select v-model="editForm.orderStatus" class="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500">
            <option v-for="status in orderStatusOptions" :key="status" :value="status">{{ status }}</option>
          </select>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <AppButton variant="secondary" @click="openEdit=false">Cancel</AppButton>
          <AppButton @click="updateCustomer">Update</AppButton>
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
        <p class="text-gray-500 dark:text-gray-400 mt-2">Do you really want to delete this customer? This action cannot be undone.</p>
      </div>
      <template #footer>
        <div class="flex justify-center gap-3">
          <AppButton variant="secondary" @click="openDelete=false">Cancel</AppButton>
          <AppButton variant="danger" @click="deleteCustomer">Delete</AppButton>
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

const ORDER_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected'
}

const orderStatusOptions = [ORDER_STATUS.PENDING, ORDER_STATUS.APPROVED, ORDER_STATUS.REJECTED]

const statusClasses = {
  [ORDER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500',
  [ORDER_STATUS.APPROVED]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500',
  [ORDER_STATUS.REJECTED]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'
}

const customers = ref([
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 (555) 123-4567', 
    location: 'New York, USA', orders: 15, orderStatus: ORDER_STATUS.APPROVED, 
    createdAt: '2023-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '+1 (555) 234-5678', 
    location: 'Los Angeles, USA', orders: 8, orderStatus: ORDER_STATUS.PENDING, 
    createdAt: '2023-02-20' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '+1 (555) 345-6789', 
    location: 'Chicago, USA', orders: 22, orderStatus: ORDER_STATUS.REJECTED, 
    createdAt: '2023-03-10' },
  { id: 4, name: 'David Wilson', email: 'david@example.com', phone: '+1 (555) 456-7890', 
    location: 'Houston, USA', orders: 5, orderStatus: ORDER_STATUS.APPROVED, 
    createdAt: '2023-04-05' },
  { id: 5, name: 'Eva Davis', email: 'eva@example.com', phone: '+1 (555) 567-8901', 
    location: 'Phoenix, USA', orders: 12, orderStatus: ORDER_STATUS.PENDING, 
    createdAt: '2023-05-18' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', phone: '+1 (555) 678-9012', 
    location: 'Philadelphia, USA', orders: 3, orderStatus: ORDER_STATUS.APPROVED, 
    createdAt: '2023-06-22' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', phone: '+1 (555) 789-0123', 
    location: 'San Antonio, USA', orders: 18, orderStatus: ORDER_STATUS.REJECTED, 
    createdAt: '2023-07-30' },
  { id: 8, name: 'Henry Garcia', email: 'henry@example.com', phone: '+1 (555) 890-1234', 
    location: 'San Diego, USA', orders: 7, orderStatus: ORDER_STATUS.PENDING, 
    createdAt: '2023-08-12' },
  { id: 9, name: 'Ivy Martinez', email: 'ivy@example.com', phone: '+1 (555) 901-2345', 
    location: 'Dallas, USA', orders: 9, orderStatus: ORDER_STATUS.APPROVED, 
    createdAt: '2023-09-25' },
  { id: 10, name: 'Jack Thompson', email: 'jack@example.com', phone: '+1 (555) 012-3456', 
    location: 'San Jose, USA', orders: 14, orderStatus: ORDER_STATUS.PENDING, 
    createdAt: '2023-10-08' }
])

const q = ref('')
const page = ref(1)
const perPage = 10

const filtered = computed(() => customers.value.filter(customer =>
  customer.name.toLowerCase().includes(q.value.toLowerCase()) || 
  customer.email.toLowerCase().includes(q.value.toLowerCase()) ||
  customer.phone.includes(q.value) ||
  customer.location.toLowerCase().includes(q.value.toLowerCase()) ||
  customer.orderStatus.toLowerCase().includes(q.value.toLowerCase())
))

const totalPages = computed(() => Math.ceil(filtered.value.length/perPage))
const paginated = computed(() => filtered.value.slice((page.value-1)*perPage, page.value*perPage))

const initials = (name) => name.split(' ').map(n=>n[0]?.toUpperCase()).join('')

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Add Customer
const openAdd = ref(false)
const form = reactive({ 
  name: '', 
  email: '', 
  phone: '', 
  location: '', 
  orders: 0, 
  orderStatus: ORDER_STATUS.PENDING,
  createdAt: new Date().toISOString().split('T')[0]
})

const saveCustomer = () => {
  customers.value.push({
    ...form,
    id: Date.now()
  })
  // Reset form
  Object.assign(form, { 
    name: '', 
    email: '', 
    phone: '', 
  location: '', 
  orders: 0, 
  orderStatus: ORDER_STATUS.PENDING,
  createdAt: new Date().toISOString().split('T')[0]
  })
  openAdd.value = false
}

// Edit Customer
const openEdit = ref(false)
const editIndex = ref(null)
const editForm = reactive({ 
  name: '', 
  email: '', 
  phone: '', 
  location: '', 
  orders: 0, 
  orderStatus: ORDER_STATUS.PENDING,
  createdAt: ''
})

const editCustomer = (idx) => { 
  editIndex.value = (page.value-1)*perPage + idx
  Object.assign(editForm, customers.value[editIndex.value])
  openEdit.value = true
}

const updateCustomer = () => { 
  if (editIndex.value !== null) {
    customers.value[editIndex.value] = {...editForm}
  }
  openEdit.value = false
}

// Delete Customer
const openDelete = ref(false)
const deleteIndex = ref(null)

const confirmDelete = (idx) => { 
  deleteIndex.value = idx
  openDelete.value = true
}

const deleteCustomer = () => { 
  if (deleteIndex.value !== null) { 
    customers.value.splice(deleteIndex.value, 1)
    // Go back one page if current page is empty
    if (paginated.value.length === 0 && page.value > 1) {
      page.value--
    }
  }
  openDelete.value = false
}
</script>

<style scoped>
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
.dark select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
}
button {
  transition: background-color 0.2s ease;
}

/* Responsive table cell styles */
@media (max-width: 640px) {
  .table td {
    display: block;
    text-align: left;
    padding: 0.5rem;
  }
  
  .table td:before {
    content: attr(data-label);
    font-weight: bold;
    display: inline-block;
    width: 120px;
  }
}
</style>