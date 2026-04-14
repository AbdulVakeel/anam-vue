<script setup>
import Dropdown from '../components/Dropdown.vue'
</script>

<template>
  <div class="space-y-6 p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">
      Dropdown
    </h1>

    <!-- Grid container: 4 columns -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      <!-- Example 1: Simple Menu -->
      <Dropdown>
        <template #trigger>
          <button class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Menu
          </button>
        </template>
        <template #content>
          <ul class="bg-white dark:bg-gray-800 rounded-lg shadow py-2">
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Home</li>
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">About</li>
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Contact</li>
          </ul>
        </template>
      </Dropdown>

      <!-- Example 2: Profile Actions (image removed, replaced with icon) -->
      <Dropdown align="left">
        <template #trigger>
          <button class="w-full px-4 py-3 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition">
            👤 Profile
          </button>
        </template>
        <template #content>
          <ul class="bg-white dark:bg-gray-800 rounded-lg shadow py-2">
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Profile</li>
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Settings</li>
            <li class="px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Logout</li>
          </ul>
        </template>
      </Dropdown>

      <!-- Example 3: Language Selector -->
      <Dropdown width="36">
        <template #trigger>
          <button class="w-full px-4 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
            Language
          </button>
        </template>
        <template #content>
          <ul class="bg-white dark:bg-gray-800 rounded-lg shadow py-2">
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">🇺🇸 English</li>
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">🇮🇳 Hindi</li>
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">🇯🇵 Japanese</li>
          </ul>
        </template>
      </Dropdown>

      <!-- Example 4: Notifications -->
      <Dropdown width="64">
        <template #trigger>
          <button class="w-full px-4 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition">
            🔔 Notifications
          </button>
        </template>
        <template #content>
          <ul class="bg-white dark:bg-gray-800 rounded-lg shadow py-2">
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">New order placed</li>
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">New message from John</li>
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Server restarted</li>
          </ul>
        </template>
      </Dropdown>

      <!-- Example 5: Settings -->
      <Dropdown>
        <template #trigger>
          <button class="w-full px-4 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition">
            ⚙️ Settings
          </button>
        </template>
        <template #content>
          <ul class="bg-white dark:bg-gray-800 rounded-lg shadow py-2">
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Account</li>
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Privacy</li>
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Help</li>
          </ul>
        </template>
      </Dropdown>

      <!-- Example 6: Custom HTML -->
      <Dropdown width="64">
        <template #trigger>
          <button class="w-full px-4 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
            Custom
          </button>
        </template>
        <template #content>
          <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 class="font-bold mb-2">Special Offer 🎁</h3>
            <p>Get 50% off on your first order!</p>
            <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">Claim Now</button>
          </div>
        </template>
      </Dropdown>

      <!-- Example 7: Multi Column -->
      <Dropdown width="64">
        <template #trigger>
          <button class="w-full px-4 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">
            Categories
          </button>
        </template>
        <template #content>
          <div class="grid grid-cols-2 gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div>
              <h4 class="font-bold mb-1">Tech</h4>
              <ul>
                <li class="hover:underline cursor-pointer">Laptops</li>
                <li class="hover:underline cursor-pointer">Phones</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold mb-1">Fashion</h4>
              <ul>
                <li class="hover:underline cursor-pointer">Men</li>
                <li class="hover:underline cursor-pointer">Women</li>
              </ul>
            </div>
          </div>
        </template>
      </Dropdown>

      <!-- Example 8: Search -->
      <Dropdown width="64">
        <template #trigger>
          <button class="w-full px-4 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition">
            Search
          </button>
        </template>
        <template #content>
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
            <input type="text" placeholder="Search..." class="w-full border px-3 py-2 rounded" />
          </div>
        </template>
      </Dropdown>

      <!-- Example 9: File Upload -->
      <Dropdown width="48">
        <template #trigger>
          <button class="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
            Upload
          </button>
        </template>
        <template #content>
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
            <input type="file" class="border p-2 w-full rounded" />
          </div>
        </template>
      </Dropdown>

      <!-- Example 10: Theme Selector -->
      <Dropdown width="48">
        <template #trigger>
          <button class="w-full px-4 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition">
            Theme
          </button>
        </template>
        <template #content>
          <ul class="bg-white dark:bg-gray-800 rounded-lg shadow py-2">
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Light</li>
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Dark</li>
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">System</li>
          </ul>
        </template>
      </Dropdown>

      <!-- Example 11: Alerts -->
      <Dropdown width="48">
        <template #trigger>
          <button class="w-full px-4 py-3 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition">
            Alerts
          </button>
        </template>
        <template #content>
          <ul class="bg-white dark:bg-gray-800 rounded-lg shadow py-2">
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">⚡ High CPU usage</li>
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">💧 Low Disk Space</li>
          </ul>
        </template>
      </Dropdown>

      <!-- Example 12: Feedback -->
      <Dropdown width="48">
        <template #trigger>
          <button class="w-full px-4 py-3 bg-lime-600 text-white rounded-lg shadow hover:bg-lime-700 transition">
            Feedback
          </button>
        </template>
        <template #content>
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
            <textarea placeholder="Type your feedback..." class="w-full border p-2 rounded"></textarea>
            <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">Submit</button>
          </div>
        </template>
      </Dropdown>

    </div>
  </div>
</template>
