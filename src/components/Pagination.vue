<template>
  <div class="flex items-center justify-between gap-3 text-sm">
    <div class="text-gray-600 dark:text-gray-300">
      Page {{ page }} of {{ pages }}
    </div>
    <div class="flex items-center gap-2">
      <AppButton variant="secondary" :disabled="page===1" @click="$emit('update:page', page-1)">Prev</AppButton>
      <AppButton variant="secondary" :disabled="page===pages" @click="$emit('update:page', page+1)">Next</AppButton>
    </div>
  </div>
</template>

<script setup>
import AppButton from './AppButton.vue'
defineProps({ page: { type: Number, default: 1 }, pages: { type: Number, default: 1 } })
</script>
