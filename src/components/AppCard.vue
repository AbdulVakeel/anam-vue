<template>
  <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
    <div v-if="$slots.header" class="px-5 pt-5">
      <slot name="header" />
    </div>
    <div class="p-5">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-5 pb-5">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
</script>
