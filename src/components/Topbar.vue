<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import UserDropdown from './UserDropdown.vue'
import { BellIcon, SunIcon, MoonIcon, Bars3Icon, MagnifyingGlassIcon,ArrowsPointingOutIcon  } from '@heroicons/vue/24/outline'
import CountrySelector from './CountrySelector.vue'
import NotificationDropdown from '../components/NotificationDropdown.vue'
import Cart from './Cart.vue'

const props = defineProps({
  layoutType: {
    type: String,
    default: 'vertical'
  },
  showHorizontalNav: {
    type: Boolean,
    default: false
  }
})

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}


const router = useRouter()

// Theme toggle
const isDark = ref(document.documentElement.classList.contains('dark'))
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// Helper to get initials
const initials = (firstName, lastName) => {
  const f = firstName ? firstName[0].toUpperCase() : ''
  const l = lastName ? lastName[0].toUpperCase() : ''
  return f + l
}

// Random background colors for avatars
const randomColor = () => {
  const colors = [
    'bg-red-500',
    'bg-sky-400',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-purple-500',
    'bg-indigo-500'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Notifications
const showNotifications = ref(false)
const notifications = ref([
  { id: 1, firstName: 'Roman', lastName: 'Griffin', message: 'joined the team! Congratulate him', time: '5 min ago' },
  { id: 2, firstName: 'Salma', lastName: 'Hayek', message: 'sent you a new message', time: '1 hour ago' },
  { id: 3, firstName: 'Michael', lastName: 'Jordan', message: 'completed the project review', time: '3 hours ago' },
  { id: 4, firstName: 'Jolly', lastName: 'Johnson', message: 'completed all assigned tasks', time: '1 day ago' },
  { id: 5, firstName: 'David', lastName: 'Miller', message: 'requested time off next week', time: '2 days ago' }
])

// Search
const searchQuery = ref('')
const isSearchFocused = ref(false)
const allRoutes = computed(() =>
  router.getRoutes()
    .filter(r => r.meta?.title)
    .map(r => ({ title: r.meta.title, path: r.path }))
)
const filteredRoutes = computed(() =>
  searchQuery.value
    ? allRoutes.value.filter(r =>
        r.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    : []
)
const goToRoute = (path) => {
  searchQuery.value = ''
  router.push(path)
}

// Horizontal nav items
const horizontalNavItems = computed(() => [
  { name: 'dashboard', label: 'Dashboard' },
  { name: 'users', label: 'Users' },
  { name: 'products', label: 'Products' },
  { name: 'settings', label: 'Settings' }
])
</script>

<template>
  <header
    class="h-16 sticky top-0 z-20 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur flex items-center justify-between px-4"
    :class="layoutType === 'horizontal' ? 'lg:ml-0' : 'lg:ml-0'"
  >
    <div class="flex items-center gap-4">
    <button
      class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden transition-colors"
      @click="$emit('open')"
    >
      <span class="sr-only">Open menu</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

      <!-- Horizontal Navigation -->
      <nav v-if="showHorizontalNav" class="hidden lg:flex items-center gap-1">
        <RouterLink
          v-for="item in horizontalNavItems"
          :key="item.name"
          :to="{ name: item.name }"
          class="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
          :class="[
            router.currentRoute.value.name === item.name
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          ]"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>

    <!-- Right: Search and Actions -->
    <div class="flex items-center gap-3">
      <!-- Search -->
      <div class="relative hidden md:flex items-center">
        <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 absolute left-3 pointer-events-none" />
        <input
          v-model="searchQuery"
          @focus="isSearchFocused = true"
          @blur="isSearchFocused = false"
          class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 pl-10 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="isSearchFocused ? 'w-64' : 'w-32'"
          placeholder="Search..."
        />
        <transition name="fade">
          <div
            v-if="filteredRoutes.length"
            class="absolute top-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg w-full z-30 overflow-hidden"
          >
            <div
              v-for="(route, idx) in filteredRoutes"
              :key="idx"
              class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              @click="goToRoute(route.path)"
            >
              {{ route.title }}
            </div>
          </div>
        </transition>
      </div>

      <CountrySelector />
      <Cart />

      <!-- Theme Toggle -->
      <button
        class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        @click="toggleTheme"
        :title="isDark ? 'Light Mode' : 'Dark Mode'"
      >
        <SunIcon v-if="!isDark" class="w-5 h-5 transition-transform duration-200" />
        <MoonIcon v-else class="w-5 h-5 transition-transform duration-200" />
      </button>

      <!-- Full Screen Toggle -->
      <button
        class="p-2 rounded-xl hover:bg-gray-100 hidden md:block dark:hover:bg-gray-800 transition-colors"
        @click="toggleFullScreen"
        title="Toggle Fullscreen"
      >
        <ArrowsPointingOutIcon class="w-5 h-5" />
      </button>

        <NotificationDropdown />

      <!-- User Menu -->
      <UserDropdown />
    </div>
  </header>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
