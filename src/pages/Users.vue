<template>
  <div class="space-y-6">
    <!-- Users Card -->
    <AppCard>
      <template #header>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <h3 class="font-semibold text-lg">Users</h3>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <input
              v-model="q"
              placeholder="Search users..."
              class="w-full sm:w-auto flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            />
            <AppButton @click="openAdd = true" class="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add User
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
            <th class="py-2 px-3 text-center">Name</th>
            <th class="py-2 px-3 text-center hidden md:table-cell">Email</th>
            <th class="py-2 px-3 text-center">Role</th>
            <th class="py-2 px-3 text-center">Status</th>
            <th class="py-2 px-3 text-center">Actions</th>
          </template>

          <tr v-for="(u, idx) in paginated" :key="u.email">
            <td class="py-3 px-3 text-center">{{ (page - 1) * perPage + idx + 1 }}</td>

            <td class="py-3 px-3 text-center hidden sm:table-cell">
              <div class="flex justify-center">
                <div class="w-10 h-10 rounded-full bg-primary-200 dark:bg-primary-900 flex items-center justify-center text-primary-800 dark:text-primary-200 font-semibold">
                  {{ initials(u.name) }}
                </div>
              </div>
            </td>

            <td class="py-3 px-3 text-center">{{ u.name }}</td>

            <td class="py-3 px-3 text-center hidden md:table-cell">{{ u.email }}</td>

            <td class="py-3 px-3 text-center">
              <span class="px-2 py-1 rounded-full text-xs" :class="roleClasses[u.role]">{{ u.role }}</span>
            </td>

            <td class="py-3 px-3 text-center">
              <span :class="u.active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'" class="px-2 py-1 rounded-full text-xs">
                {{ u.active ? 'Active' : 'Inactive' }}
              </span>
            </td>

            <td class="py-3 px-3 text-center">
              <div class="flex justify-center gap-2">
                <button @click="editUser(idx)" title="Edit" class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400">
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

    <!-- Add User Modal -->
    <Modal v-model="openAdd" title="Add User">
      <div class="grid gap-3">
        <FormInput v-model="form.name" label="Full Name" required />
        <FormInput v-model="form.email" label="Email" type="email" required />
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
          <select v-model="form.role" class="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500">
            <option v-for="role in roleOptions" :key="role.value" :value="role.value" class="bg-white dark:bg-gray-800">{{ role.label }}</option>
          </select>
        </div>
        <FormToggle v-model="form.active" label="Active" />
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <AppButton variant="secondary" @click="openAdd=false">Cancel</AppButton>
          <AppButton @click="saveUser">Save</AppButton>
        </div>
      </template>
    </Modal>

    <!-- Edit User Modal -->
    <Modal v-model="openEdit" title="Edit User">
      <div class="grid gap-3">
        <FormInput v-model="editForm.name" label="Full Name" required />
        <FormInput v-model="editForm.email" label="Email" type="email" required />
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
          <select v-model="editForm.role" class="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500">
            <option v-for="role in roleOptions" :key="role.value" :value="role.value" class="bg-white dark:bg-gray-800">{{ role.label }}</option>
          </select>
        </div>
        <FormToggle v-model="editForm.active" label="Active" />
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <AppButton variant="secondary" @click="openEdit=false">Cancel</AppButton>
          <AppButton @click="updateUser">Update</AppButton>
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
        <p class="text-gray-500 dark:text-gray-400 mt-2">Do you really want to delete this user? This action cannot be undone.</p>
      </div>
      <template #footer>
        <div class="flex justify-center gap-3">
          <AppButton variant="secondary" @click="openDelete=false">Cancel</AppButton>
          <AppButton variant="danger" @click="deleteUser">Delete</AppButton>
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

const ROLES = { ADMIN:'Admin', MANAGER:'Manager', EDITOR:'Editor', VIEWER:'Viewer' }

const roleOptions = [
  { value: ROLES.ADMIN, label: 'Administrator' },
  { value: ROLES.MANAGER, label: 'Manager' },
  { value: ROLES.EDITOR, label: 'Editor' },
  { value: ROLES.VIEWER, label: 'Viewer' }
]

const roleClasses = {
  [ROLES.ADMIN]:'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  [ROLES.MANAGER]:'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  [ROLES.EDITOR]:'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  [ROLES.VIEWER]:'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
}

const users = ref([
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: ROLES.ADMIN, active: true },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: ROLES.MANAGER, active: true },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: ROLES.EDITOR, active: false },
  { id: 4, name: 'David Wilson', email: 'david@example.com', role: ROLES.VIEWER, active: true },
  { id: 5, name: 'Eva Davis', email: 'eva@example.com', role: ROLES.ADMIN, active: true },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: ROLES.MANAGER, active: false },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: ROLES.EDITOR, active: true },
  { id: 8, name: 'Henry Garcia', email: 'henry@example.com', role: ROLES.VIEWER, active: true },
  { id: 9,  name: 'Ivy Martinez', email: 'ivy@example.com', role: ROLES.EDITOR, active: false },
  { id: 10, name: 'Jack Thompson', email: 'jack@example.com', role: ROLES.ADMIN, active: true },
  { id: 11, name: 'Karen White', email: 'karen@example.com', role: ROLES.MANAGER, active: true },
  { id: 12, name: 'Leo Scott', email: 'leo@example.com', role: ROLES.VIEWER, active: false },
  { id: 13, name: 'Mia Clark', email: 'mia@example.com', role: ROLES.EDITOR, active: true },
  { id: 14, name: 'Noah Lewis', email: 'noah@example.com', role: ROLES.MANAGER, active: true },
  { id: 15, name: 'Olivia Young', email: 'olivia@example.com', role: ROLES.VIEWER, active: true },
  { id: 16, name: 'Paul Hall', email: 'paul@example.com', role: ROLES.ADMIN, active: false },
  { id: 17, name: 'Quinn Adams', email: 'quinn@example.com', role: ROLES.EDITOR, active: true },
  { id: 18, name: 'Ruby Turner', email: 'ruby@example.com', role: ROLES.MANAGER, active: false }
])

const q = ref('')
const page = ref(1)
const perPage = 10

const filtered = computed(() => users.value.filter(u =>
  u.name.toLowerCase().includes(q.value.toLowerCase()) || u.email.toLowerCase().includes(q.value.toLowerCase())
))
const totalPages = computed(() => Math.ceil(filtered.value.length/perPage))
const paginated = computed(() => filtered.value.slice((page.value-1)*perPage, page.value*perPage))

const initials = (name) => name.split(' ').map(n=>n[0]?.toUpperCase()).join('')

// Add User
const openAdd = ref(false)
const form = reactive({ name:'', email:'', role:ROLES.VIEWER, active:true })
const saveUser = () => {
  users.value.push({...form, id: Date.now()})
  Object.assign(form, { name:'', email:'', role:ROLES.VIEWER, active:true })
  openAdd.value=false
}

// Edit User
const openEdit = ref(false)
const editIndex = ref(null)
const editForm = reactive({ name:'', email:'', role:'', active:true })
const editUser = (idx) => { editIndex.value = (page.value-1)*perPage+idx; Object.assign(editForm, users.value[editIndex.value]); openEdit.value=true }
const updateUser = () => { if(editIndex.value!==null) users.value[editIndex.value]={...editForm}; openEdit.value=false }

// Delete User
const openDelete = ref(false)
const deleteIndex = ref(null)
const confirmDelete = (idx) => { deleteIndex.value=idx; openDelete.value=true }
const deleteUser = () => { if(deleteIndex.value!==null) { users.value.splice(deleteIndex.value,1); if(paginated.value.length===0 && page.value>1) page.value--; } openDelete.value=false }
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
