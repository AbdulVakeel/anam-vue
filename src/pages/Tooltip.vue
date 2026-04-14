<template>
  <div class="space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">

    <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h3 class="mb-4 font-semibold text-lg text-gray-800 dark:text-gray-100">Tooltip</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Simple Tooltip Buttons -->
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 class="mb-2 font-medium text-gray-700 dark:text-gray-300">Simple</h4>
          <div class="flex flex-wrap gap-4">
            <Tooltip text="Tooltip on start" position="left">
              <button class="bg-blue-500 text-white px-4 py-2 rounded-full">Start</button>
            </Tooltip>
            <Tooltip text="Tooltip on end" position="right">
              <button class="bg-blue-500 text-white px-4 py-2 rounded-full">End</button>
            </Tooltip>
            <Tooltip text="Tooltip on top" position="top">
              <button class="bg-blue-500 text-white px-4 py-2 rounded-full">Top</button>
            </Tooltip>
            <Tooltip text="Tooltip on bottom" position="bottom">
              <button class="bg-blue-500 text-white px-4 py-2 rounded-full">Bottom</button>
            </Tooltip>
          </div>
        </div>

        <!-- Icon Tooltip -->
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 class="mb-2 font-medium text-gray-700 dark:text-gray-300">Icon</h4>
          <div class="flex flex-wrap gap-4">
            <Tooltip text="User Icon" position="top">
              <div class="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14c4.418 0 8-1.79 8-4V8a8 8 0 10-16 0v2c0 2.21 3.582 4 8 4z" />
                </svg>
              </div>
            </Tooltip>
            <Tooltip text="Heart" position="top">
              <div class="bg-gray-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
                ❤️
              </div>
            </Tooltip>
            <Tooltip text="Smile" position="top">
              <div class="bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
                😊
              </div>
            </Tooltip>
            <Tooltip text="Love" position="top">
              <div class="bg-pink-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
                💖
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tooltip from '../components/Tooltip.vue'
</script>
