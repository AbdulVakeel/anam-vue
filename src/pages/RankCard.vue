<template>
  <div class="min-h-screen text-gray-900 dark:text-white p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">

    <!-- Rank Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
      <!-- Current Rank -->
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Pearl</h1>
          <p class="text-xs uppercase text-gray-500 dark:text-gray-400">My Current Rank</p>
        </div>
        <Icon icon="game-icons:rank-3" class="text-orange-500 dark:text-orange-400 w-12 h-12" />
      </div>

      <!-- Total Team Level -->
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">1 / 15</h1>
          <p class="text-xs uppercase text-gray-500 dark:text-gray-400">Total Team Level 2</p>
        </div>
        <Icon icon="icomoon-free:tree" class="text-green-600 dark:text-green-400 w-12 h-12" />
      </div>

      <!-- Next Rank Bonus -->
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">$75</h1>
          <p class="text-sm font-semibold text-gray-500 dark:text-gray-400">Next Rank Bonus</p>
        </div>
        <Icon icon="material-symbols:money-bag" class="text-yellow-600 dark:text-yellow-400 w-12 h-12" />
      </div>

      <!-- Team Business -->
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 flex justify-between items-center">
        <div>
          <h1 class="text-xl font-semibold text-gray-800 dark:text-white">$999 / $500</h1>
          <p class="text-xs uppercase text-gray-500 dark:text-gray-400">Total Team Business Level 2</p>
        </div>
        <Icon icon="mdi:chart-bar" class="text-blue-600 dark:text-blue-400 w-12 h-12" />
      </div>
    </div>

    <!-- Rank Bonuses -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 max-w-6xl mx-auto">
      <!-- Pearl -->
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 flex justify-between items-center">
        <div>
          <h1 class="font-semibold text-gray-600 dark:text-gray-300">Pearl</h1>
          <p class="text-xl font-medium text-gray-800 dark:text-white">Bonus - $25</p>
          <p class="text-green-600 dark:text-green-400">Achieved</p>
        </div>
        <Icon icon="game-icons:rank-3" class="text-orange-500 dark:text-orange-400 w-12 h-12" />
      </div>

      <!-- Opal -->
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 flex justify-between items-center">
        <div>
          <h1 class="font-semibold text-gray-600 dark:text-gray-300">Opal</h1>
          <p class="text-xl font-medium text-gray-800 dark:text-white">Bonus - $75</p>
          <p class="text-red-500 dark:text-red-400">Locked</p>
        </div>
        <Icon icon="ic:baseline-lock" class="text-gray-400 dark:text-gray-500 w-12 h-12" />
      </div>

      <!-- Emerald -->
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 flex justify-between items-center">
        <div>
          <h1 class="font-semibold text-gray-600 dark:text-gray-300">Emerald</h1>
          <p class="text-xl font-medium text-gray-800 dark:text-white">Bonus - $150</p>
          <p class="text-red-500 dark:text-red-400">Locked</p>
        </div>
        <Icon icon="ic:baseline-lock" class="text-gray-400 dark:text-gray-500 w-12 h-12" />
      </div>

      <!-- Sapphire -->
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 flex justify-between items-center">
        <div>
          <h1 class="font-semibold text-gray-600 dark:text-gray-300">Sapphire</h1>
          <p class="text-xl font-medium text-gray-800 dark:text-white">Bonus - $250</p>
          <p class="text-red-500 dark:text-red-400">Locked</p>
        </div>
        <Icon icon="ic:baseline-lock" class="text-gray-400 dark:text-gray-500 w-12 h-12" />
      </div>

      <!-- Ruby -->
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 flex justify-between items-center">
        <div>
          <h1 class="font-semibold text-gray-600 dark:text-gray-300">Ruby</h1>
          <p class="text-xl font-medium text-gray-800 dark:text-white">Bonus - $500</p>
          <p class="text-red-500 dark:text-red-400">Locked</p>
        </div>
        <Icon icon="ic:baseline-lock" class="text-gray-400 dark:text-gray-500 w-12 h-12" />
      </div>

      <!-- Diamond -->
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 flex justify-between items-center">
        <div>
          <h1 class="font-semibold text-gray-600 dark:text-gray-300">Diamond</h1>
          <p class="text-xl font-medium text-gray-800 dark:text-white">Bonus - $1000</p>
          <p class="text-red-500 dark:text-red-400">Locked</p>
        </div>
        <Icon icon="ic:baseline-lock" class="text-gray-400 dark:text-gray-500 w-12 h-12" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>