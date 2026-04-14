<script setup>
import { ref } from 'vue'
import TextEditor from '../components/TextEditor.vue'

const content = ref('<p>Default <b>rich text</b> content...</p>')

const submitForm = () => {
  alert('Submitted content:\n' + content.value)
}
</script>

<template>
  <div class="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
    <h1 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">Text Editor </h1>

    <!-- Editor -->
    <TextEditor
      v-model="content"
      id="my-editor"
      label="Write your content"
      placeholder="Type something here..."
    />

    <!-- Live Preview -->
    <div class="mt-6">
      <h2 class="font-semibold text-gray-700 dark:text-gray-300">Live Output:</h2>
      <div class="mt-2 p-4 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white" v-html="content"></div>
    </div>

    <!-- Submit Button -->
    <button
      @click="submitForm"
      class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Submit
    </button>
  </div>
</template>
