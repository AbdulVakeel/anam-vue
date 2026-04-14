<template>
  <div class="relative" v-click-outside>
    <!-- Avatar Button -->
    <button
      @click="open = !open"
      class="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
    >
     <img
      class="w-8 h-8 rounded-full object-contain"
      src="/user/avatars/user-1.jpg"
      alt="user"
    />
    </button>
    <div
      v-if="open"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden z-50"
    >
      <!-- Profile -->
      <RouterLink
        :to="{ name: 'profile' }"
        @click="open = false"
        class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <UserPlusIcon class="w-4 h-4 text-gray-500" />
        Profile
      </RouterLink>

      <!-- Change Password -->
      <RouterLink
        :to="{ name: 'password' }"
        @click="open = false"
        class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <LockClosedIcon class="w-4 h-4 text-gray-500" />
        Change Password
      </RouterLink>

       <RouterLink
        :to="{ name: 'security' }"
        @click="open = false"
        class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <NoSymbolIcon class="w-4 h-4 text-gray-500" />
        Security
      </RouterLink>

      <hr class="border-gray-200 dark:border-gray-800" />

      <!-- Logout -->
      <button
        @click="logout"
        class="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-gray-800 w-full text-left"
      >
        <ChevronRightIcon class="w-4 h-4" />
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  UserPlusIcon,
  LockClosedIcon,
  ChevronRightIcon,NoSymbolIcon
} from '@heroicons/vue/24/outline'

const open = ref(false)
const route = useRoute()

// Close dropdown on route change
watch(() => route.fullPath, () => {
  open.value = false
})

const vClickOutside = {
  mounted(el) {
    el.__clickOutside__ = (e) => {
      if (!el.contains(e.target)) open.value = false
    }
    document.addEventListener('click', el.__clickOutside__)
  },
  unmounted(el) {
    document.removeEventListener('click', el.__clickOutside__)
    delete el.__clickOutside__
  },
}

const logout = () => {
  console.log('Logging out...')
}
</script>
