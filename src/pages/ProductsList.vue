<template>
  <div class="space-y-6">
    <AppCard>
      <!-- Header -->
      <template #header>
        <div class="flex items-center justify-between gap-3">
          <h3 class="font-semibold text-lg">Products</h3>
          <div class="flex items-center gap-2">
            <input
              v-model="q"
              placeholder="Search..."
              class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
            />
            <AppButton @click="openAdd = true" class="flex items-center gap-1">
              <PlusIcon class="h-4 w-4" />
              Add product
            </AppButton>
          </div>
        </div>
      </template>

      <!-- Table -->
      <Table>
        <template #head>
          <th class="py-2 px-3 text-center">S.N</th>
          <th class="py-2 px-3 text-center">Image</th>
          <th class="py-2 px-3 text-center">Name</th>
          <th class="py-2 px-3 text-center">Category</th>
          <th class="py-2 px-3 text-center">Price</th>
          <th class="py-2 px-3 text-center">Status</th>
          <th class="py-2 px-3 text-center">Actions</th>
        </template>

        <tr v-for="(p, idx) in paginated" :key="p.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="py-3 px-3 text-center">{{ (page - 1) * perPage + idx + 1 }}</td>
          <td class="py-3 px-3 text-center">
            <img :src="p.image" alt="" class="mx-auto w-10 h-10 object-cover rounded" />
          </td>
          <td class="py-3 px-3 text-center">{{ p.name }}</td>
          <td class="py-3 px-3 text-center">{{ p.category }}</td>
          <td class="py-3 px-3 text-center font-semibold">${{ p.price }}</td>
          <td class="py-3 px-3 text-center">
            <span
              class="px-2 py-1 rounded-full text-xs font-medium"
              :class="p.inStock
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'"
            >
              {{ p.inStock ? 'In Stock' : 'Out of Stock' }}
            </span>
          </td>
          <td class="py-3 px-3 text-center">
            <div class="flex justify-center gap-1">
              <button
                @click="editProduct(idx)"
                title="Edit"
                class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400"
              >
                <PencilSquareIcon class="h-4 w-4" />
              </button>
              <button
                @click="confirmDelete((page - 1) * perPage + idx)"
                title="Delete"
                class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400"
              >
                <TrashIcon class="h-4 w-4" />
              </button>
            </div>
          </td>
        </tr>
      </Table>

      <template #footer>
        <Pagination v-model:page="page" :pages="totalPages" />
      </template>
    </AppCard>

    <!-- Add Product Modal -->
    <Modal v-model="openAdd" title="Add product">
      <div class="grid gap-3">
        <FormInput v-model="form.name" label="Name" />
        <FormInput v-model="form.category" label="Category" />
        <FormInput v-model="form.price" label="Price" type="number" />
        <FormInput v-model="form.image" label="Image URL" />
       <FormToggle v-model="form.active" label="Active" />
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <AppButton variant="secondary" @click="openAdd = false">Cancel</AppButton>
          <AppButton @click="save">Save</AppButton>
        </div>
      </template>
    </Modal>

    <!-- Edit Product Modal -->
    <Modal v-model="openEdit" title="Edit product">
      <div class="grid gap-3">
        <FormInput v-model="editForm.name" label="Name" />
        <FormInput v-model="editForm.category" label="Category" />
        <FormInput v-model="editForm.price" label="Price" type="number" />
        <FormInput v-model="editForm.image" label="Image URL" />
         <FormToggle v-model="form.active" label="Active" />
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <AppButton variant="secondary" @click="openEdit = false">Cancel</AppButton>
          <AppButton @click="updateProduct">Update</AppButton>
        </div>
      </template>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal v-model="openDelete" title="Confirm Delete" size="sm">
      <div class="text-center py-4">
        <ExclamationTriangleIcon class="h-12 w-12 mx-auto text-red-500" />
        <h3 class="text-lg font-medium mt-3">Are you sure?</h3>
        <p class="text-gray-500 mt-2">Do you really want to delete this product? This process cannot be undone.</p>
      </div>
      <template #footer>
        <div class="flex justify-center gap-3">
          <AppButton variant="secondary" @click="openDelete = false">Cancel</AppButton>
          <AppButton variant="danger" @click="deleteProduct">Delete</AppButton>
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
// Heroicons
import { PlusIcon, PencilSquareIcon, TrashIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

// Product state
const products = ref([
  { id: 1, name: 'Laptop', category: 'Electronics', price: 55000, inStock: true, image: '/products/product-17.jpg' },
  { id: 2, name: 'Mobile', category: 'Electronics', price: 20000, inStock: true, image: '/products/product-18.jpg' },
  { id: 3, name: 'Headphones', category: 'Accessories', price: 2500, inStock: false, image: '/products/product-19.jpg' },
  { id: 4, name: 'Smart Watch', category: 'Electronics', price: 5000, inStock: true, image: '/products/product-20.jpg' },
  { id: 5, name: 'Tablet', category: 'Electronics', price: 15000, inStock: false, image: '/products/product-21.jpg' },
  { id: 6, name: 'Camera', category: 'Electronics', price: 30000, inStock: true, image: '/products/product-22.jpg' },
  { id: 7, name: 'Keyboard', category: 'Accessories', price: 1200, inStock: true, image: '/products/product-23.jpg' },
  { id: 8, name: 'Mouse', category: 'Accessories', price: 800, inStock: true, image: '/products/product-24.jpg' },
  { id: 9, name: 'Speaker', category: 'Audio', price: 3000, inStock: false, image: '/products/product-25.jpg' },
  { id: 10, name: 'Monitor', category: 'Electronics', price: 12000, inStock: true, image: '/products/product-26.jpg' },
  { id: 11, name: 'Printer', category: 'Electronics', price: 8000, inStock: true, image: '/products/product-27.jpg' },
  { id: 12, name: 'External HDD', category: 'Storage', price: 5000, inStock: true, image: '/products/product-28.jpg' },
  { id: 13, name: 'SSD', category: 'Storage', price: 7000, inStock: false, image: '/products/product-29.jpg' },
  { id: 14, name: 'TV', category: 'Electronics', price: 40000, inStock: true, image: '/products/product-30.jpg' },
  { id: 15, name: 'Gaming Console', category: 'Gaming', price: 35000, inStock: false, image: '/products/product-31.jpg' },
  { id: 16, name: 'VR Headset', category: 'Gaming', price: 25000, inStock: true, image: '/products/product-32.jpg' },
  { id: 17, name: 'Microphone', category: 'Audio', price: 4500, inStock: true, image: '/products/product-33.jpg' },
  { id: 18, name: 'Router', category: 'Networking', price: 3000, inStock: true, image: '/products/product-34.jpg' }
])

const q = ref('')
const page = ref(1)
const perPage = 10

const filtered = computed(() => products.value.filter(p => p.name.toLowerCase().includes(q.value.toLowerCase())))
const totalPages = computed(() => Math.ceil(filtered.value.length / perPage))
const paginated = computed(() => {
  const start = (page.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})

// Add Product
const openAdd = ref(false)
const form = reactive({ name: '', category: '', price: 0, image: '', inStock: true })
const save = () => {
  products.value.push({
    id: Date.now(),
    name: form.name,
    category: form.category,
    price: Number(form.price),
    image: form.image,
    inStock: form.inStock
  })
  Object.assign(form, { name: '', category: '', price: 0, image: '', inStock: true })
  openAdd.value = false
}

// Edit Product
const openEdit = ref(false)
const editIndex = ref(null)
const editForm = reactive({ name: '', category: '', price: 0, image: '', inStock: true })
const editProduct = (index) => {
  editIndex.value = (page.value - 1) * perPage + index
  Object.assign(editForm, products.value[editIndex.value])
  openEdit.value = true
}
const updateProduct = () => {
  if (editIndex.value !== null) {
    products.value[editIndex.value] = { ...products.value[editIndex.value], ...editForm, price: Number(editForm.price) }
  }
  openEdit.value = false
}

// Delete Product
const openDelete = ref(false)
const deleteIndex = ref(null)
const confirmDelete = (index) => { deleteIndex.value = index; openDelete.value = true }
const deleteProduct = () => {
  if (deleteIndex.value !== null) products.value.splice(deleteIndex.value, 1)
  openDelete.value = false
}
</script>

<style scoped>
button { transition: background-color 0.2s ease; }
input[type="checkbox"] { margin-top: 0; }
</style>
