<template>
  <div class="relative inline-block">
    <!-- Button -->
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
    >
      <img
        :src="selectedCountry.flag"
        class="w-5 h-5 rounded-full object-cover"
        :alt="selectedCountry.name + ' flag'"
      />
      <span>{{ selectedCountry.name }}</span>
      <svg
        class="w-3 h-3 transition-transform"
        :class="{ 'rotate-180': showDropdown }"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown -->
    <transition name="fade">
      <div
        v-if="showDropdown"
        class="absolute left-0 mt-1 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden z-50"
      >
        <div
          v-for="(c, idx) in countries"
          :key="idx"
          class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-2 transition-colors"
          @click="selectCountry(c)"
        >
          <img
            :src="c.flag"
            class="w-5 h-5 rounded-full object-cover"
            :alt="c.name + ' flag'"
          />
          <span>{{ c.name }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>


<script setup>
import { ref } from 'vue'

const showDropdown = ref(false)
const countries = ref([
  { code: 'en', name: 'English', flag: '/flags/en.png' },
  { code: 'fr', name: 'Français', flag: '/flags/fr.png' },
  { code: 'hi', name: 'हिंदी', flag: '/flags/hi.png' },
])

const selectedCountry = ref(countries.value[0])

const toggleDropdown = () => showDropdown.value = !showDropdown.value

const selectCountry = (c) => {
  selectedCountry.value = c
  showDropdown.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
