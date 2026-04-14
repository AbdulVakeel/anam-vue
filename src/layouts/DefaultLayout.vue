<template>
  <div 
    class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300"
    :dir="direction"
  >
    <!-- Sidebar - Vertical Layout -->
    <Sidebar
      v-if="layoutType === 'vertical'"
      :collapsed="sidebarCollapsed"
      :open="open"
      :direction="direction"
      :sidebar-color="sidebarColor"
      @close="open = false"
      @toggle-collapse="toggleSidebarCollapse"
      class="fixed top-0 h-screen z-40 transition-all duration-300"
      :class="direction === 'rtl' ? 'right-0' : 'left-0'"
    />

    <!-- Main Content -->
    <div
      class="flex flex-col transition-all duration-300"
      :class="[
        layoutType === 'vertical' ? (direction === 'rtl' ? 'lg:pr-[18rem]' : 'lg:pl-[18rem]') : '',
        sidebarCollapsed && layoutType === 'vertical' ? (direction === 'rtl' ? 'lg:pr-[5rem]' : 'lg:pl-[5rem]') : '',
        open ? 'overflow-hidden' : ''
      ]"
    >
      <!-- Topbar -->
      <Topbar 
        @open="open = true" 
        :layout-type="layoutType"
        :show-horizontal-nav="layoutType === 'horizontal'"
        :direction="direction"
      />

      <!-- Page Content -->
      <main class="p-4 md:p-6 space-y-6">
        <Breadcrumb v-if="showBreadcrumb" class="mb-4" />
        <RouterView />
      </main>

      <!-- Footer -->
      <footer class="mt-auto p-4 text-center bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
        © 2025 AnamUI. All rights reserved.
      </footer>
    </div>

    <button
      @click="settingsOpen = true"
      class="fixed bottom-6 p-4 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white z-50"
      :class="direction === 'rtl' ? 'left-6' : 'right-6'"
      aria-label="Open settings"
    >
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </button>


    <!-- Settings Sidebar -->
    <transition :name="direction === 'rtl' ? 'slide-reverse' : 'slide'">
      <div
        v-if="settingsOpen"
        class="fixed top-0 h-full bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col w-72"
        :class="direction === 'rtl' ? 'left-0' : 'right-0'"
      >
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold">Layout Settings</h2>
          <button @click="settingsOpen = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="p-4 space-y-4">
          <!-- Theme Toggle -->
          <div>
            <h3 class="text-sm font-medium mb-2">Theme</h3>
            <button 
              @click="toggleTheme"
              class="w-full py-2 rounded-lg flex items-center justify-center gap-2"
              :class="isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'"
            >
              <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              {{ isDark ? 'Dark Mode' : 'Light Mode' }}
            </button>
          </div>

          <!-- Sidebar Color Options -->
       <div>
        <h3 class="text-sm font-medium mb-2">Sidebar Color</h3>
        <div class="grid grid-cols-4 gap-2">
          <!-- 1. Deep Navy Gradient (Professional) -->
          <button 
            @click="setSidebarColor('bg-gradient-to-b from-[#0F172A] to-[#1E293B]')"
            class="h-8 rounded-md bg-gradient-to-b from-[#0F172A] to-[#1E293B]"
            :class="sidebarColor === 'bg-gradient-to-b from-[#0F172A] to-[#1E293B]' ? 'ring-2 ring-offset-2 ring-blue-500' : ''"
          ></button>

          <!-- 2. Dark Teal (Sophisticated) -->
          <button 
            @click="setSidebarColor('bg-[#0F3D3E]')"
            class="h-8 rounded-md bg-[#0F3D3E]"
            :class="sidebarColor === 'bg-[#0F3D3E]' ? 'ring-2 ring-offset-2 ring-blue-500' : ''"
          ></button>

          <!-- 3. Deep Purple (Premium Look) -->
          <button 
            @click="setSidebarColor('bg-gradient-to-b from-[#1E0F3E] to-[#3B1E6B]')"
            class="h-8 rounded-md bg-gradient-to-b from-[#1E0F3E] to-[#3B1E6B]"
            :class="sidebarColor === 'bg-gradient-to-b from-[#1E0F3E] to-[#3B1E6B]' ? 'ring-2 ring-offset-2 ring-blue-500' : ''"
          ></button>

          <!-- 4. Charcoal Gray (Minimalist) -->
         <button 
            @click="setSidebarColor('bg-gradient-to-b from-[#0a1f1a] via-[#0d3229] to-[#0b2b24]')"
            class="h-8 rounded-md bg-gradient-to-b from-[#0a1f1a] via-[#0d3229] to-[#0b2b24] shadow-lg transition-all hover:scale-105"
            :class="sidebarColor === 'bg-gradient-to-b from-[#0a1f1a] via-[#0d3229] to-[#0b2b24]' ? 'ring-2 ring-offset-2 ring-emerald-400 shadow-xl' : ''"
            >
          </button>

         </div>
      </div>

          <!-- Direction Toggle -->
          <div>
            <h3 class="text-sm font-medium mb-2">Text Direction</h3>
            <div class="flex gap-2">
              <button 
                @click="setDirection('ltr')"
                :class="direction === 'ltr'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="flex-1 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="21" y1="12" x2="3" y2="12"></line>
                  <line x1="15" y1="16" x2="21" y2="12"></line>
                  <line x1="15" y1="8" x2="21" y2="12"></line>
                </svg>
                LTR
              </button>
              <button 
                @click="setDirection('rtl')"
                :class="direction === 'rtl'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="flex-1 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="9" y1="16" x2="3" y2="12"></line>
                  <line x1="9" y1="8" x2="3" y2="12"></line>
                </svg>
                RTL
              </button>
            </div>
          </div>

          <!-- Sidebar Layout -->
          <div>
            <h3 class="text-sm font-medium mb-2">Sidebar Layout</h3>
            <div class="flex gap-2">
              <button 
                @click="setLayout('vertical')"
                :class="layoutType === 'vertical'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="flex-1 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
                Vertical
              </button>
              <button 
                @click="setLayout('horizontal')"
                :class="layoutType === 'horizontal'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="flex-1 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                </svg>
                Horizontal
              </button>
            </div>
          </div>

          <!-- Sidebar Type -->
          <div>
            <h3 class="text-sm font-medium mb-2">Sidebar Type</h3>
            <div class="flex gap-2">
              <button 
                @click="setSidebarCollapsed(false)"
                :class="!sidebarCollapsed
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="flex-1 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                </svg>
                Full
              </button>
              <button 
                @click="setSidebarCollapsed(true)"
                :class="sidebarCollapsed
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="flex-1 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="6" height="18" rx="1"></rect>
                </svg>
                Collapsed
              </button>
            </div>
          </div>

          <!-- Reset -->
          <div>
            <button 
              @click="resetLayout"
              class="w-full py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M8 16H3v5"></path>
              </svg>
              Reset Layout
            </button>
          </div>
        </div>
      </div>
    </transition>
      <div class="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      <!-- Toggle Button -->
      <button
        @click="showIcons = !showIcons"
        class="mb-4 p-2 rounded-full bg-sky-600 hover:bg-sky-600 text-white shadow-lg"
        aria-label="Toggle icons"
      >
        <Icon icon="mdi:google-circles-extended" class="w-6 h-6" />
      </button>

      <!-- Social Media Icons -->
      <transition name="fade">
        <div v-if="showIcons" class="flex flex-col gap-3">
          <!-- Twitter -->
          <a href="#" target="_blank" class="social-btn">
            <Icon icon="mdi:twitter" class="w-5 h-5 text-sky-400" />
          </a>

          <!-- Telegram -->
          <a href="#" target="_blank" class="social-btn">
            <Icon icon="mdi:telegram" class="w-5 h-5 text-sky-400" />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener"
            class="social-btn hover:border-green-500"
          >
            <Icon icon="simple-icons:facebook" class="w-6 h-6 text-sky-400" />
          </a>

          <a href="#" target="_blank" rel="noopener"
          class="bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
          <Icon icon="mdi:whatsapp" class="w-5 h-5 text-sky-400" />
        </a>

          <a href="#" target="_blank" rel="noopener"
            class="bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
            <Icon icon="mdi:github" class="w-5 h-5 text-sky-400" />
          </a> 
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,computed } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router'
const route = useRoute()
const showIcons = ref(false)
const showBreadcrumb = computed(() => {
  const hiddenRoutes = ['login', 'register','loginBox','registerBox', 'forgotPassword','forgotPasswordBox','twoStepVerification',
  'twoStepBox', 'notFound','serverError','serviceUnavailable','accessDenied']
  return !hiddenRoutes.includes(route.name) && route.matched.some(r => r.meta?.breadcrumb)
})
// Initialize all states from localStorage
const isDark = ref(localStorage.getItem('theme') === 'dark')
const direction = ref(localStorage.getItem('direction') || 'ltr')
const layoutType = ref(localStorage.getItem('layoutType') || 'vertical')
const sidebarCollapsed = ref(localStorage.getItem('sidebarCollapsed') === 'true')
const sidebarColor = ref(localStorage.getItem('sidebarColor') || 'bg-gradient-to-b from-gray-900 via-gray-850 to-gray-950')
const open = ref(false)
const settingsOpen = ref(false)

// Apply initial settings
onMounted(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
  document.documentElement.setAttribute('dir', direction.value)
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const setSidebarColor = (color) => {
  sidebarColor.value = color
  localStorage.setItem('sidebarColor', color)
}

const setDirection = (dir) => {
  direction.value = dir
  document.documentElement.setAttribute('dir', dir)
  localStorage.setItem('direction', dir)
}

const toggleSidebarCollapse = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
  localStorage.setItem('sidebarCollapsed', sidebarCollapsed.value)
}

const setSidebarCollapsed = (collapsed) => {
  sidebarCollapsed.value = collapsed
  localStorage.setItem('sidebarCollapsed', collapsed)
}

const setLayout = (type) => {
  layoutType.value = type
  localStorage.setItem('layoutType', type)
  
  if (type === 'horizontal') {
    sidebarCollapsed.value = true
    localStorage.setItem('sidebarCollapsed', 'true')
  }
}

const resetLayout = () => {
  layoutType.value = 'vertical'
  sidebarCollapsed.value = false
  open.value = false
  setDirection('ltr')
  setSidebarColor('bg-gradient-to-b from-gray-900 via-gray-850 to-gray-950')
  
  // Save all reset values
  localStorage.setItem('layoutType', 'vertical')
  localStorage.setItem('sidebarCollapsed', 'false')
  localStorage.setItem('direction', 'ltr')
  localStorage.setItem('sidebarColor', 'bg-gradient-to-b from-gray-900 via-gray-850 to-gray-950')
  localStorage.setItem('theme', 'light')
  document.documentElement.classList.remove('dark')
}
</script>

<style>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}

.slide-reverse-enter-active, .slide-reverse-leave-active {
  transition: transform 0.3s ease;
}
.slide-reverse-enter-from, .slide-reverse-leave-to {
  transform: translateX(-100%);
}

/* RTL specific adjustments */
[dir="rtl"] .text-left {
  text-align: right;
}

[dir="rtl"] .text-right {
  text-align: left;
}
.social-btn {
  @apply bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors;
}

</style>