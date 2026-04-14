<template>
  <div class="relative" ref="notificationDropdownRef">
    <!-- Notification Button -->
    <button
      @click.stop="showNotifications = !showNotifications"
      class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      <BellIcon class="w-6 h-6 text-gray-700 dark:text-gray-300" />
      <span
        v-if="unreadCount"
        class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full px-1.5"
      >
        {{ unreadCount }}
      </span>
    </button>

    <!-- Desktop Dropdown -->
    <transition name="fade" v-if="!isMobile">
      <div
        v-if="showNotifications"
        class="absolute right-0 mt-3 w-96 bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden z-50"
      >
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h2 class="font-bold text-gray-800 dark:text-gray-100">Notifications</h2>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ notifications.length }} items</span>
          </div>

          <!-- Notification Items -->
          <div class="overflow-y-auto max-h-96">
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition border-b border-gray-100 dark:border-gray-700"
              :class="{ 'bg-blue-50/50 dark:bg-blue-900/20': !notification.read }"
            >
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
                :class="notification.color"
              >
                {{ notification.initials }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-800 dark:text-gray-100">{{ notification.title }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {{ notification.message }}
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  {{ notification.time }}
                </p>
              </div>
              <button
                v-if="!notification.read"
                @click.stop="markAsRead(notification.id)"
                class="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1"
              ></button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!notifications.length" class="p-6 text-center">
            <div class="mx-auto w-16 h-16 text-gray-400 dark:text-gray-500 mb-3">
              <BellIcon class="w-full h-full" />
            </div>
            <p class="text-gray-500 dark:text-gray-400">No notifications yet</p>
          </div>

          <!-- Footer -->
          <div v-if="notifications.length" class="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <button
              @click="markAllAsRead"
              class="w-full text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-2 rounded-lg transition text-sm font-medium"
            >
              Mark all as read
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Mobile Bottom Sheet -->
    <transition name="slide-up" v-if="isMobile">
      <div
        v-if="showNotifications"
        class="fixed inset-0 z-50 flex flex-col"
      >
        <!-- Overlay -->
        <div 
          class="absolute inset-0 bg-black/50"
          @click="showNotifications = false"
        ></div>
        
        <!-- Notification Content -->
        <div class="relative mt-auto bg-white dark:bg-gray-900 rounded-t-xl shadow-xl max-h-[85vh] flex flex-col">
          <!-- Header -->
          <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h2 class="font-bold text-gray-800 dark:text-gray-100">Notifications</h2>
            <button
              @click="showNotifications = false"
              class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Notification Items -->
          <div class="overflow-y-auto flex-1">
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition border-b border-gray-100 dark:border-gray-700"
              :class="{ 'bg-blue-50/50 dark:bg-blue-900/20': !notification.read }"
            >
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
                :class="notification.color"
              >
                {{ notification.initials }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-800 dark:text-gray-100">{{ notification.title }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {{ notification.message }}
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  {{ notification.time }}
                </p>
              </div>
              <button
                v-if="!notification.read"
                @click.stop="markAsRead(notification.id)"
                class="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1"
              ></button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!notifications.length" class="p-6 text-center flex-1 flex flex-col items-center justify-center">
            <div class="w-16 h-16 text-gray-400 dark:text-gray-500 mb-3">
              <BellIcon class="w-full h-full" />
            </div>
            <p class="text-gray-500 dark:text-gray-400">No notifications yet</p>
          </div>

          <!-- Footer -->
          <div v-if="notifications.length" class="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <button
              @click="markAllAsRead"
              class="w-full text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-2 rounded-lg transition text-sm font-medium"
            >
              Mark all as read
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const notifications = ref([
  {
    id: 1,
    title: 'New message',
    message: 'You have a new message from Sarah Johnson',
    time: '5 minutes ago',
    read: false,
    initials: 'SJ',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Order shipped',
    message: 'Your order #12345 has been shipped',
    time: '2 hours ago',
    read: false,
    initials: 'OS',
    color: 'bg-green-500'
  },
  {
    id: 3,
    title: 'Payment received',
    message: 'Your payment of $125.00 has been processed',
    time: '1 day ago',
    read: true,
    initials: 'PR',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'New follower',
    message: 'Michael Brown started following you',
    time: '2 days ago',
    read: true,
    initials: 'MB',
    color: 'bg-yellow-500'
  }
])

const showNotifications = ref(false)
const isMobile = ref(false)
const notificationDropdownRef = ref(null)

// Check screen size
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
}

// Handle click outside
const handleClickOutside = (event) => {
  if (notificationDropdownRef.value && !notificationDropdownRef.value.contains(event.target)) {
    showNotifications.value = false
  }
}

// Setup event listeners
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  document.addEventListener('click', handleClickOutside)
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
  document.removeEventListener('click', handleClickOutside)
})

// Computed
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

// Methods
const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => {
    n.read = true
  })
}
</script>

<style scoped>
/* Fade animation for desktop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Slide up animation for mobile */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from {
  transform: translateY(100%);
}
.slide-up-leave-to {
  transform: translateY(100%);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600;
  border-radius: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>