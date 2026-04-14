<script setup>
import * as Icons from '@heroicons/vue/24/outline'
import { ref, computed, watchEffect } from 'vue'
import Pagination from '../components/Pagination.vue'

const searchQuery = ref('')
const copiedIcon = ref('')
const page = ref(1)
const itemsPerPage = 48 // 4 columns × 12 rows

// Get all icons
const allIcons = computed(() => {
  return Object.entries(Icons)
    .filter(([name]) => name.endsWith('Icon'))
})

// Filter icons based on search
const filteredIcons = computed(() => {
  if (!searchQuery.value) return allIcons.value
  return allIcons.value.filter(([name]) =>
    name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Paginated icons
const paginatedIcons = computed(() => {
  const start = (page.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredIcons.value.slice(start, end)
})

// Total pages calculation
const totalPages = computed(() => {
  return Math.ceil(filteredIcons.value.length / itemsPerPage)
})

// Reset to page 1 when search changes
watchEffect(() => {
  if (searchQuery.value) {
    page.value = 1
  }
})

const copyIcon = (name) => {
  const text = `import { ${name} } from '@heroicons/vue/24/outline'`
  navigator.clipboard.writeText(text).then(() => {
    copiedIcon.value = name
    setTimeout(() => copiedIcon.value = '', 1500)
  })
}
</script>

<template>
  <div class="space-y-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
    <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
      Heroicons (Outline) ({{ filteredIcons.length }})
    </h1>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search icons..."
      class="mb-6 p-2 rounded-2xl w-full dark:bg-gray-800 dark:text-gray-100"
    />


    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-4 gap-6">
      <div
        v-for="[name, IconComponent] in paginatedIcons"
        :key="name"
        class="flex flex-col items-center p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
        @click="copyIcon(name)"
      >
        <component :is="IconComponent" class="w-8 h-8 text-gray-800 dark:text-gray-100" />
        <span class="mt-2 text-xs text-center text-gray-700 dark:text-gray-300 break-words">
          {{ name }}
        </span>
        <span
          v-if="copiedIcon === name"
          class="text-sky-400 text-xs mt-1 animate-pulse"
        >
          Copied!
        </span>
      </div>
    </div>

    <Pagination 
      v-model:page="page" 
      :pages="totalPages" 
      class="mt-6"
    />
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3);
}
</style>