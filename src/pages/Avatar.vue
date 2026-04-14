<template>
  <div class="space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <!-- Avatar Section -->
    <div class="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
      <h3 class="mb-4 font-semibold text-lg text-gray-800 dark:text-gray-100">Avatar</h3>

      <!-- Image Avatars -->
      <div class="mb-4">
        <h4 class="mb-2 font-medium text-gray-600 dark:text-gray-300">Image Avatars</h4>
        <div class="flex space-x-2">
          <img
            v-for="i in 4"
            :key="i"
            src="/user/avatars/80x80.png"
            class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
            alt="Avatar"
          />
        </div>
      </div>

      <!-- Letter Avatars -->
      <div class="mb-4">
        <h4 class="mb-2 font-medium text-gray-600 dark:text-gray-300">Letter Avatars</h4>
        <div class="flex space-x-2">
          <div
            v-for="(letter, idx) in ['A','B','C','D','E']"
            :key="letter"
            class="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold"
            :class="letterColors[idx]"
          >
            {{ letter }}
          </div>
        </div>
      </div>

      <!-- Icon Avatars -->
      <div class="mb-4">
        <h4 class="mb-2 font-medium text-gray-600 dark:text-gray-300">Icon Avatars</h4>
        <div class="flex space-x-2">
          <div
            v-for="(color, idx) in iconColors"
            :key="idx"
            :class="color"
            class="w-10 h-10 flex items-center justify-center rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 14c4.418 0 8-1.79 8-4V8a8 8 0 10-16 0v2c0 2.21 3.582 4 8 4z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M16 10h.01" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Variant -->
      <div class="mb-4">
        <h4 class="mb-2 font-medium text-gray-600 dark:text-gray-300">Variant</h4>
        <div class="flex space-x-2">
          <div v-for="i in 3" :key="i" class="bg-blue-500 w-10 h-10 flex items-center justify-center rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 14c4.418 0 8-1.79 8-4V8a8 8 0 10-16 0v2c0 2.21 3.582 4 8 4z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M16 10h.01" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Sizes -->
      <div>
        <h4 class="mb-2 font-medium text-gray-600 dark:text-gray-300">Sizes</h4>
        <div class="flex space-x-3 items-center">
          <img
            v-for="(size, idx) in sizes"
            :key="idx"
            src="/user/avatars/80x80.png"
            :class="size.class"
            class="rounded-full border border-gray-300 dark:border-gray-600"
            alt="Avatar Size"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const letterColors = [
  'bg-blue-500',
  'bg-gray-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-green-500'
]

const iconColors = [
  'bg-blue-500 text-white',
  'bg-gray-500 text-white',
  'bg-pink-500 text-white',
  'bg-orange-500 text-white',
  'bg-yellow-500 text-black dark:text-gray-900'
]

const sizes = [
  { class: 'w-6 h-6' },
  { class: 'w-8 h-8' },
  { class: 'w-10 h-10' },
  { class: 'w-12 h-12' },
  { class: 'w-14 h-14' }
]
</script>
