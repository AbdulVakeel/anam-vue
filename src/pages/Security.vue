<template>
  <div class="min-h-screen p-6 bg-gray-50 dark:bg-gray-950 flex flex-col md:flex-row gap-6">
    
    <!-- Left: Two-Factor Authentication -->
    <div class="flex-1  bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Two-Factor Authentication</h2>
      <p class="text-gray-500 dark:text-gray-400 mt-2">Enhance the security of your account by requiring an additional verification step.</p>

      <button class="mt-4 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition">
        Enable 2FA
      </button>

      <div class="mt-6 space-y-4">
        <div class="flex justify-between items-center border-t border-gray-300 dark:border-gray-800 pt-4">
          <div class="flex items-center gap-2">
            <FingerPrintIcon class="w-6 h-6 text-blue-500"/>
            <div>
              <p class="font-medium text-gray-900 dark:text-gray-100">Authentication App</p>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Use Google Authenticator or similar app</p>
            </div>
          </div>
          <button class="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm transition">
            Setup
          </button>
        </div>

        <div class="flex justify-between items-center border-t border-gray-300 dark:border-gray-800 pt-4">
          <div class="flex items-center gap-2">
            <EnvelopeIcon class="w-6 h-6 text-green-500"/>
            <div>
              <p class="font-medium text-gray-900 dark:text-gray-100">Backup Email</p>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Receive verification links via email</p>
            </div>
          </div>
          <button class="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm transition">
            Setup
          </button>
        </div>

        <div class="flex justify-between items-center border-t border-gray-300 dark:border-gray-800 pt-4">
          <div class="flex items-center gap-2">
            <DevicePhoneMobileIcon class="w-6 h-6 text-purple-500"/>
            <div>
              <p class="font-medium text-gray-900 dark:text-gray-100">SMS Recovery</p>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Use your phone number for recovery</p>
            </div>
          </div>
          <button class="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm transition">
            Setup
          </button>
        </div>
      </div>
    </div>

    <!-- Right: Devices -->
    <div class="w-full md:w-80 bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow flex flex-col">
      
      <!-- Header -->
      <div class="flex items-center gap-3 mb-4">
        <DeviceTabletIcon class="w-8 h-8 text-blue-500"/>
        <div>
          <p class="font-semibold text-gray-900 dark:text-gray-100">Devices</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Manage devices where you’re logged in</p>
        </div>
      </div>

      <button class="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition mb-6">
        Sign Out From All Devices
      </button>

      <!-- Device List -->
      <div class="space-y-4 flex-1 overflow-y-auto">
        <div v-for="(device, index) in devices" :key="index" class="flex justify-between items-center border-t border-gray-300 dark:border-gray-800 pt-4">
          <div class="flex items-center gap-3">
            <component :is="device.icon" class="w-6 h-6 text-gray-500"/>
            <div>
              <p class="font-medium text-gray-900 dark:text-gray-100">{{ device.name }}</p>
              <p class="text-gray-500 dark:text-gray-400 text-sm">{{ device.location }}, {{ device.date }}</p>
            </div>
          </div>
          <button class="text-gray-400 hover:text-gray-200 dark:hover:text-gray-300">⋮</button>
        </div>
      </div>

      <button class="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition mb-6">
        Need Help?
      </button>
    </div>

  </div>
</template>

<script setup>
import { 
   FingerPrintIcon, 
  EnvelopeIcon, 
  DevicePhoneMobileIcon, 
  DeviceTabletIcon, 
  ComputerDesktopIcon  } from '@heroicons/vue/24/outline'

const devices = [
  { icon: ComputerDesktopIcon, name: 'Macbook Air', location: 'Gujarat India', date: 'Oct 24 at 3:15 AM' },
  { icon: DevicePhoneMobileIcon, name: 'iPhone 14', location: 'London UK', date: 'Oct 23 at 1:15 AM' },
]

</script>

<style scoped>
button {
  transition: all 0.2s ease;
}
</style>
