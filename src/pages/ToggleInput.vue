<script setup>
import { ref } from 'vue'
import ToggleInput from '../components/ToggleInput.vue'

const defaultToggle = ref(false)
const smallToggle = ref(true)
const xsToggle = ref(false)
const notificationToggle = ref(true)
const soundToggle = ref(false)
const wifiToggle = ref(true)
const privacyToggle = ref(false)
const subscriptionToggle = ref(true)
</script>

<template>
  <div class="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen text-white space-y-6">
     <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Toggle Switch </h1>

    <!-- 1. Default Size -->
    <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 p-4 rounded-lg shadow">
      <ToggleInput v-model="defaultToggle" label="Default Size" size="default" />
      <p class="mt-2 text-sm">Status: {{ defaultToggle ? 'ON' : 'OFF' }}</p>
    </div>

    <!-- 2. Small Size -->
    <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 p-4 rounded-lg shadow">
      <ToggleInput v-model="smallToggle" label="Small Size" size="sm" />
      <p class="mt-2 text-sm">Status: {{ smallToggle ? 'Enabled' : 'Disabled' }}</p>
    </div>

    <!-- 3. Extra Small Size -->
    <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 p-4 rounded-lg shadow">
      <ToggleInput v-model="xsToggle" label="XS Size" size="xs" />
      <p class="mt-2 text-sm">Status: {{ xsToggle ? 'Active' : 'Inactive' }}</p>
    </div>

    <!-- 4. Notifications -->
    <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
      <span class="flex items-center gap-2">
        🔔 <span>Notifications</span>
      </span>
      <ToggleInput v-model="notificationToggle" size="sm" />
    </div>

    <!-- 5. Sound -->
    <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
      <span class="flex items-center gap-2">
        🎵 <span>Sound</span>
      </span>
      <ToggleInput v-model="soundToggle" />
    </div>

    <!-- 6. Wi-Fi -->
    <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
      <span class="flex items-center gap-2">
        📶 <span>Wi-Fi</span>
      </span>
      <ToggleInput v-model="wifiToggle" size="default" />
    </div>

    <!-- 7. Privacy Mode -->
    <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
      <span class="flex items-center gap-2">
        🛡️ <span>Privacy Mode</span>
      </span>
      <ToggleInput v-model="privacyToggle" size="sm" />
    </div>

    <!-- 8. Subscription Auto-Renew -->
    <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
      <span class="flex items-center gap-2">
        💳 <span>Auto-Renew Subscription</span>
      </span>
      <ToggleInput v-model="subscriptionToggle" size="default" />
    </div>
  </div>
</template>
