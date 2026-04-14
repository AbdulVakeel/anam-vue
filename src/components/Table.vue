<template>
  <div class="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
    <table class="min-w-full text-sm">
      <thead class="bg-gray-50 dark:bg-gray-900/40 text-gray-600 dark:text-gray-300">
        <tr>
          <slot name="head" />
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script setup>
</script>
