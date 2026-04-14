<template>
  <div class="space-y-6">
    <AppCard>
      <template #header>
        <div class="flex items-center justify-between gap-3">
          <h3 class="font-semibold">Notifications</h3>
          <input
            v-model="searchQuery"
            placeholder="Search notifications..."
            class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </template>

      <ul class="divide-y divide-gray-100 dark:divide-gray-800">
        <li v-for="n in paginatedItems" :key="n.id" class="py-3 flex items-start gap-3">
          <span class="mt-1 w-2 h-2 rounded-full" :class="n.read ? 'bg-gray-300' : 'bg-primary-600'"></span>
          <div class="flex-1">
            <p class="font-medium">{{ n.title }}</p>
            <p class="text-sm text-gray-500">{{ n.time }}</p>
          </div>
          <button 
            class="text-sm text-primary-600 hover:text-primary-700 dark:hover:text-primary-500" 
            @click="markAsRead(n)"
          >
            Mark read
          </button>
        </li>
      </ul>

      <template #footer>
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredItems.length) }} of {{ filteredItems.length }} notifications
          </div>
          <div class="flex gap-1">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </template>
    </AppCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppCard from '../components/AppCard.vue'

const items = ref([
  { id: 1, title: 'New user registered', time: '2h ago', read: false },
  { id: 2, title: 'Server restarted', time: '5h ago', read: false },
  { id: 3, title: 'Payment received', time: 'Yesterday', read: true },
  { id: 4, title: 'Order #452 shipped', time: '1d ago', read: false },
  { id: 5, title: 'Password changed', time: '2d ago', read: true },
  { id: 6, title: 'Profile updated', time: '2d ago', read: false },
  { id: 7, title: 'New comment on post', time: '3d ago', read: false },
  { id: 8, title: 'Security alert: Login from new device', time: '3d ago', read: false },
  { id: 9, title: 'Friend request received', time: '4d ago', read: true },
  { id: 10, title: 'Database backup completed', time: '4d ago', read: false },
  { id: 11, title: 'Invoice #879 paid', time: '5d ago', read: true },
  { id: 12, title: 'Subscription renewed', time: '5d ago', read: false },
  { id: 13, title: 'Message from support', time: '6d ago', read: false },
  { id: 14, title: 'Server maintenance scheduled', time: '6d ago', read: false },
  { id: 15, title: 'New feature released', time: '1w ago', read: false },
  { id: 16, title: 'Discount coupon available', time: '1w ago', read: false },
  { id: 17, title: 'Email verified', time: '1w ago', read: true }
])

const searchQuery = ref('')
const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value
  const query = searchQuery.value.toLowerCase()
  return items.value.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.time.toLowerCase().includes(query)
  )
})

const currentPage = ref(1)
const itemsPerPage = 10

const totalPages = computed(() => 
  Math.ceil(filteredItems.value.length / itemsPerPage)
)

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredItems.value.slice(start, start + itemsPerPage)
})

// Mark as read function
const markAsRead = (notification) => {
  notification.read = true
}
</script>