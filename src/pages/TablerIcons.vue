<script setup>
import * as Tabler from '@tabler/icons-vue'
import { ref, computed, watchEffect } from 'vue'
import Pagination from '../components/Pagination.vue'

const searchQuery = ref('')
const copiedIcon = ref('')
const page = ref(1)
const itemsPerPage = 48

const allIcons = computed(() => {
  return Object.entries(Tabler)
    .filter(([name]) => name.startsWith('Icon'))
    .map(([originalName, component]) => ({
      displayName: originalName.replace('Icon', ''),
      originalName,
      component
    }))
})

const filteredIcons = computed(() => {
  if (!searchQuery.value) return allIcons.value
  return allIcons.value.filter(icon => 
    icon.displayName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const paginatedIcons = computed(() => {
  const start = (page.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredIcons.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredIcons.value.length / itemsPerPage)
})

watchEffect(() => {
  if (searchQuery.value) {
    page.value = 1
  }
})

const copyIcon = (originalName) => {
  const text = `import { ${originalName} } from '@tabler/icons-vue'`
  navigator.clipboard.writeText(text)
  copiedIcon.value = originalName.replace('Icon', '')
  setTimeout(() => (copiedIcon.value = ''), 1500)
}
</script>

<template>
  <div class="space-y-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
    <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
      Tabler Icons ({{ filteredIcons.length }})
    </h1>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search icons..."
      class="mb-6 p-2 rounded-2xl w-full dark:bg-gray-800 dark:text-gray-100"
    />


    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-4">
      <div
        v-for="icon in paginatedIcons"
        :key="icon.originalName"
        @click="copyIcon(icon.originalName)"
        class="flex flex-col items-center p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
      >
        <component
          :is="icon.component"
          class="w-6 h-6 text-gray-800 dark:text-gray-200"
        />
        <span class="mt-2 text-xs text-gray-600 dark:text-gray-400 text-center">
          {{ icon.displayName }}
        </span>
        <span
          v-if="copiedIcon === icon.displayName"
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
