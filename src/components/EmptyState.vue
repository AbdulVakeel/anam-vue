<template>
  <div class="border border-dashed rounded-2xl p-8 text-center text-gray-600 dark:text-gray-300">
    <div class="mx-auto mb-3 w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a4 4 0 10-8 0v2M23 17v-2a4 4 0 10-8 0v2M16 11a4 4 0 10-8 0 4 4 0 008 0z"/>
        </svg>
      </slot>
    </div>
    <h3 class="font-semibold mb-1"><slot name="title">Nothing here yet</slot></h3>
    <p class="text-sm mb-4"><slot name="description">Start by creating a new item.</slot></p>
    <slot name="action" />
  </div>
</template>

<script setup>
</script>
