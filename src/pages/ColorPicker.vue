<template>
  <div class="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-6xl mx-auto">
    <h2 class="text-lg font-semibold mb-6">Color Picker</h2>
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
      <div v-for="(color, index) in colors" :key="index">
        <p class="text-sm text-gray-400 mb-2">{{ color.label }}</p>
        <div class="flex items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <input
            type="text"
            v-model="color.value"
            class="bg-transparent px-3 py-2 w-full outline-none"
          />
          <input
            type="color"
            v-model="color.value"
            class="h-10 w-12 cursor-pointer border-none outline-none"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const colors = reactive([
  { label: "Simple mode", value: "#0bad5a" },
  { label: "Complex mode", value: "#7ab2fa" },
  { label: "Gradient mode", value: "#b5dfa9" },
  { label: "Theme Primary", value: "#ff5733" },
  { label: "Theme Secondary", value: "#ffd700" },
  { label: "Highlight", value: "#9b59b6" },
  { label: "Accent", value: "#1abc9c" },
  { label: "Neutral", value: "#34495e" },
]);
</script>

<style scoped>
input[type="color"] {
  -webkit-appearance: none;
  appearance: none;
  background: none;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 6px;
}
</style>
