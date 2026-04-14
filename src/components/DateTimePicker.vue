<template>
  <!-- Range Picker -->
  <VueDatePicker
    v-if="mode === 'range'"
    v-model="dateRange"
    range
    :disabled="disabled"
    :min-date="minDate"
    :max-date="maxDate"
    :placeholder="placeholder"
    :input-class-name="inputClass"
    @update:model-value="handleRangeUpdate"
  />

  <!-- Single Date Picker -->
  <VueDatePicker
    v-else
    v-model="singleDate"
    :disabled="disabled"
    :min-date="minDate"
    :max-date="maxDate"
    :placeholder="placeholder"
    :input-class-name="inputClass"
    @update:model-value="handleSingleUpdate"
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  modelValue: { type: [Date, Array, String], default: null },
  mode: { type: String, default: 'single', validator: v => ['single', 'range'].includes(v) },
  disabled: { type: Boolean, default: false },
  minDate: { type: Date, default: null },
  maxDate: { type: Date, default: null },
  placeholder: { type: String, default: 'Select date' }
})

const emit = defineEmits(['update:modelValue'])

const singleDate = ref(props.mode === 'single' ? props.modelValue : null)
const dateRange = ref(props.mode === 'range' ? props.modelValue : [null, null])

const inputClass = computed(() => 
  `dp-input ${props.disabled ? 'disabled' : ''}`
)

const handleSingleUpdate = (date) => {
  singleDate.value = date
  emit('update:modelValue', date)
}

const handleRangeUpdate = (range) => {
  dateRange.value = range
  emit('update:modelValue', range)
}

watch(() => props.modelValue, (val) => {
  if (props.mode === 'single') singleDate.value = val
  else dateRange.value = val || [null, null]
})
</script>

<style>
.dp-input {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  width: 100%;
  background-color: white;
  color: #111827;
  font-size: 0.875rem;
}

.dp-input.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Light theme */
.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: #111827;
  --dp-hover-color: #f9fafb;
  --dp-primary-color: #3b82f6;
  --dp-primary-text-color: #ffffff;
}

/* Dark theme */
.dp__theme_dark {
  --dp-background-color: #1f2937;
  --dp-text-color: #f3f4f6;
  --dp-hover-color: #374151;
  --dp-primary-color: #3b82f6;
  --dp-primary-text-color: #ffffff;
}
</style>
