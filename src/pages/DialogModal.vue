<template>
  <div class="space-y-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Dialog Modal Examples</h1>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      <!-- Info Modal Button -->
      <button
        @click="showInfo = true"
        class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 transition "
      >
        <InformationCircleIcon class="w-5 h-5" />
        Open Info Modal
      </button>

      <!-- Confirm Modal Button -->
      <button
        @click="showConfirm = true"
        class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 transition "
      >
        <TrashIcon class="w-5 h-5" />
        Delete Item
      </button>

      <!-- Form Modal Button -->
      <button
        @click="showForm = true"
        class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 transition "
      >
        <EnvelopeIcon class="w-5 h-5" />
        Open Form
      </button>

      <!-- Image Preview -->
      <div 
        class="relative group cursor-pointer" 
        @click="showImage = true"
      >
        <img
          src="/products/product-35.jpg"
          class="rounded-xl border border-gray-700 w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          alt="Product preview"
        />
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <EyeIcon class="w-8 h-8  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>

    <!-- Info Modal -->
    <DialogModal :show="showInfo" @close="showInfo = false">
      <template #title>
        <div class="flex items-center gap-2">
          <InformationCircleIcon class="w-6 h-6 text-blue-500" />
          Information
        </div>
      </template>
      <template #content>
        <p class="text-gray-700 dark:text-gray-300">This is a simple informational modal.</p>
      </template>
      <template #footer>
        <button 
          @click="showInfo = false" 
          class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
        >
          Close
        </button>
      </template>
    </DialogModal>

    <!-- Confirm Modal -->
    <DialogModal :show="showConfirm" @close="showConfirm = false" maxWidth="sm">
      <template #title>
        <div class="flex items-center gap-2">
          <ExclamationTriangleIcon class="w-6 h-6 text-yellow-500" />
          Confirm Deletion
        </div>
      </template>
      <template #content>
        <p class="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
      </template>
      <template #footer>
        <button
          @click="showConfirm = false"
          class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg mr-2 transition"
        >
          Cancel
        </button>
        <button 
          @click="confirmDelete" 
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
        >
          Delete
        </button>
      </template>
    </DialogModal>

    <!-- Form Modal -->
    <DialogModal :show="showForm" @close="showForm = false" maxWidth="lg">
      <template #title>
        <div class="flex items-center gap-2">
          <EnvelopeIcon class="w-6 h-6 text-green-500" />
          Contact Us
        </div>
      </template>
      <template #content>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Name</label>
            <input
              v-model="name"
              type="text"
              class="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              v-model="message"
              class="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              required
            ></textarea>
          </div>
        </form>
      </template>
      <template #footer>
        <button
          @click="showForm = false"
          class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg mr-2 transition"
        >
          Cancel
        </button>
        <button 
          @click="submitForm" 
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
        >
          Send
        </button>
      </template>
    </DialogModal>

    <!-- Image Modal -->
    <DialogModal :show="showImage" @close="showImage = false" maxWidth="xl">
      <template #title>
        <div class="flex items-center gap-2">
          <PhotoIcon class="w-6 h-6 text-blue-500" />
          Image Preview
        </div>
      </template>
      <template #content>
        <img
          src="/products/product-35.jpg"
          class="rounded-xl shadow-lg w-full h-auto max-h-[70vh] object-contain"
          alt="Product full view"
        />
      </template>
      <template #footer>
        <button 
          @click="showImage = false" 
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          Close
        </button>
      </template>
    </DialogModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DialogModal from "../components/DialogModal.vue";
import {
  InformationCircleIcon,
  TrashIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  PhotoIcon,
  EyeIcon
} from '@heroicons/vue/24/outline';

const showInfo = ref(false);
const showConfirm = ref(false);
const showForm = ref(false);
const showImage = ref(false);

const name = ref("");
const message = ref("");

const confirmDelete = () => {
  alert("Item deleted!");
  showConfirm.value = false;
};

const submitForm = () => {
  alert(`Message sent!\nName: ${name.value}\nMessage: ${message.value}`);
  showForm.value = false;
  name.value = "";
  message.value = "";
};
</script>

<style>
/* Smooth transitions for all interactive elements */
button, input, textarea, img {
  transition: all 0.2s ease;
}
</style>