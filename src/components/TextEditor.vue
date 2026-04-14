<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, required: true },
  id: { type: String, required: true },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const editor = ref(null)

const onInput = (event) => {
  emit('update:modelValue', event.target.innerHTML)
}

onMounted(() => {
  if (editor.value) {
    editor.value.innerHTML = props.modelValue || ''
  }
})

watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value && editor.value.innerHTML !== newValue) {
      editor.value.innerHTML = newValue || ''
    }
  }
)
</script>

<template>
  <div class="mb-4">
    <!-- Label -->
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
    >
      {{ label }}
    </label>

    <!-- Editable area -->
    <div
      :id="id"
      ref="editor"
      contenteditable="true"
      :placeholder="placeholder"
      @input="onInput"
      class="p-4 rounded-md bg-white dark:bg-gray-800 
             text-black dark:text-gray-100
             focus:outline-none border border-gray-300 dark:border-gray-700 
             min-h-[120px]"
    ></div>

    <!-- Error message -->
    <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>
  </div>
</template>

<style scoped>
div[contenteditable]:empty:before {
  content: attr(placeholder);
  color: #9ca3af;
  pointer-events: none;
  display: block;
}
</style>
