<template>
  <div class="space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Basic Typography</h2>

    <!-- Heading Section -->
    <div class="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <h3 class="text-base font-medium text-gray-700 dark:text-gray-300 mb-4">Heading</h3>

      <div class="space-y-4">
        <div v-for="heading in headings" :key="heading.tag" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <component
            :is="heading.tag"
            class="text-gray-900 dark:text-white"
            :style="{ fontSize: heading.size + 'px', lineHeight: heading.lineHeight + 'px', fontWeight: heading.weight }"
          >
            {{ heading.tag }}.Heading
          </component>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            font size: {{ heading.size }} | line-height: {{ heading.lineHeight }} | font weight: {{ heading.weight }}
          </p>
        </div>
      </div>
    </div>

    <!-- Subtitle Section -->
    <div class="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <p class="text-lg text-gray-900 dark:text-white">Subtitle 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quos blanditiis tenetur</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">font size: 16 | line-height: 28 | font weight: 400</p>
    </div>

    <div class="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <p class="text-base text-gray-900 dark:text-white">Subtitle 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quos blanditiis tenetur</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">font size: 14 | line-height: 21 | font weight: 400</p>
    </div>

    <!-- Body text -->
    <div class="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <p class="text-sm text-gray-900 dark:text-white">Body 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quos blanditiis tenetur</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">font size: 14 | line-height: 21 | font weight: 400</p>
    </div>

    <div class="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <p class="text-xs text-gray-900 dark:text-white">Body 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quos blanditiis tenetur</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">font size: 12 | line-height: 18 | font weight: 400</p>
    </div>
  </div>
</template>

<script setup>
const headings = [
  { tag: "h1", size: 30, lineHeight: 45, weight: 600 },
  { tag: "h2", size: 24, lineHeight: 36, weight: 500 },
  { tag: "h3", size: 21, lineHeight: 31.5, weight: 500 },
  { tag: "h4", size: 18, lineHeight: 27, weight: 500 },
  { tag: "h5", size: 16, lineHeight: 24, weight: 500 },
  { tag: "h6", size: 14, lineHeight: 21, weight: 500 },
];
</script>
