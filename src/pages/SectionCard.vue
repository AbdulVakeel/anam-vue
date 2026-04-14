<template>
 <div class="space-y-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
      Section Cards
    </h1>

    <!-- Grid 1: 2 Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <SectionCard class="w-full hover:shadow-2xl transition-shadow duration-300">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Default Card</h2>
        <p class="text-gray-700 dark:text-gray-300">
          This is a default section card. You can put any content here.
        </p>
      </SectionCard>

      <SectionCard variant="danger" class="w-full hover:shadow-2xl transition-shadow duration-300">
        <h2 class="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">Danger Card</h2>
        <p class="text-gray-700 dark:text-gray-300">
          This card highlights a dangerous or critical section. Useful for warnings.
        </p>
      </SectionCard>
    </div>

    <!-- Grid 2: 3 Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <SectionCard class="w-full hover:shadow-2xl transition-shadow duration-300">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Default Card</h2>
        <p class="text-gray-700 dark:text-gray-300">
          Another example of a default card.
        </p>
      </SectionCard>

      <SectionCard variant="danger" class="w-full hover:shadow-2xl transition-shadow duration-300">
        <h2 class="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">Danger Card</h2>
        <p class="text-gray-700 dark:text-gray-300">
          Critical information or alert.
        </p>
      </SectionCard>

      <SectionCard variant="success" class="w-full hover:shadow-2xl transition-shadow duration-300">
        <h2 class="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">Success Card</h2>
        <p class="text-gray-700 dark:text-gray-300">
          Positive message or confirmation.
        </p>
      </SectionCard>
    </div>

    <!-- Grid 3: 4 Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <SectionCard class="w-full hover:shadow-2xl transition-shadow duration-300">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Default Card</h2>
        <p class="text-gray-700 dark:text-gray-300">
          Default card content.
        </p>
      </SectionCard>

      <SectionCard variant="danger" class="w-full hover:shadow-2xl transition-shadow duration-300">
        <h2 class="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">Danger Card</h2>
        <p class="text-gray-700 dark:text-gray-300">
          Important warning content.
        </p>
      </SectionCard>

      <SectionCard variant="success" class="w-full hover:shadow-2xl transition-shadow duration-300">
        <h2 class="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">Success Card</h2>
        <p class="text-gray-700 dark:text-gray-300">
          Successful action content.
        </p>
      </SectionCard>

      <SectionCard variant="info" class="w-full hover:shadow-2xl transition-shadow duration-300">
        <h2 class="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">Info Card</h2>
        <p class="text-gray-700 dark:text-gray-300">
          Informational content or guidance.
        </p>
      </SectionCard>
    </div>
  </div>
</template>

<script setup>
import SectionCard from '../components/SectionCard.vue';
</script>
