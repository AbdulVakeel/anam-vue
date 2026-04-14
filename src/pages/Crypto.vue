<template>
  <div class="space-y-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
      Crypto Dashboard
    </h1>
    <CurrencyTracker/>
    <TradePair />
  </div>
</template>

<script setup>
import CurrencyTracker from '../components/CurrencyTracker.vue'
import TradePair from '../components/TradePair.vue'
</script>
