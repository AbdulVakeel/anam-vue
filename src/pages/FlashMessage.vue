<template>
  <div class="space-y-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
    <h1 class="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
      Flash Message
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
      <!-- Success Top Left -->
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="font-semibold mb-2">Success (Top Left)</h2>
        <button 
          @click="showSuccess" 
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Show Success
        </button>
        <FlashMessage v-if="successFlash" :flash="successFlash" position="top-left" />
      </div>

      <!-- Error Top Right -->
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="font-semibold mb-2">Error (Top Right)</h2>
        <button 
          @click="showError" 
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Show Error
        </button>
        <FlashMessage v-if="errorFlash" :flash="errorFlash" position="top-right" />
      </div>

      <!-- Info Top Center -->
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="font-semibold mb-2">Info (Top Center)</h2>
        <button 
          @click="showInfo" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Show Info
        </button>
        <FlashMessage v-if="infoFlash" :flash="infoFlash" position="top-center" />
      </div>

      <!-- Warning Top Left -->
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="font-semibold mb-2">Warning (Top Left)</h2>
        <button 
          @click="showWarning" 
          class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Show Warning
        </button>
        <FlashMessage v-if="warningFlash" :flash="warningFlash" position="top-left" />
      </div>

      <!-- Custom Duration Top Right -->
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="font-semibold mb-2">Custom Duration (5s)</h2>
        <button 
          @click="showCustomDuration" 
          class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          Show 5s Message
        </button>
        <FlashMessage v-if="durationFlash" :flash="durationFlash" :duration="5000" position="top-right" />
      </div>

      <!-- With Details Top Center -->
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="font-semibold mb-2">With Details (Top Center)</h2>
        <button 
          @click="showWithDetails" 
          class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
          Show Detailed
        </button>
        <FlashMessage v-if="detailFlash" :flash="detailFlash" position="top-center">
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Additional details can go here.
          </p>
        </FlashMessage>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FlashMessage from '../components/FlashMessage.vue';

const successFlash = ref(null);
const errorFlash = ref(null);
const infoFlash = ref(null);
const warningFlash = ref(null);
const durationFlash = ref(null);
const detailFlash = ref(null);

const showSuccess = () => {
  successFlash.value = { success: 'Operation completed successfully!' };
  setTimeout(() => successFlash.value = null, 7000);
};

const showError = () => {
  errorFlash.value = { error: 'Failed to process your request!' };
  setTimeout(() => errorFlash.value = null, 7000);
};

const showInfo = () => {
  infoFlash.value = { info: 'New features available in v2.0!' };
  setTimeout(() => infoFlash.value = null, 7000);
};

const showWarning = () => {
  warningFlash.value = { warning: 'Your session will expire soon!' };
  setTimeout(() => warningFlash.value = null, 7000);
};

const showCustomDuration = () => {
  durationFlash.value = { message: 'This message will stay for 5 seconds' };
  setTimeout(() => durationFlash.value = null, 7000);
};

const showWithDetails = () => {
  detailFlash.value = { info: 'Maintenance scheduled' };
  setTimeout(() => detailFlash.value = null, 7000);
};
</script>
