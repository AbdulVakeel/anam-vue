<template>
	
    <div class="space-y-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
      Date Time Picker
    </h1>

	<section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
    <!-- Example 1 -->
    <AppCard>
      <h2>1. Basic Single Date</h2>
      <DateTimePicker v-model="date1" />
      <p>Selected: {{ formatDate(date1) }}</p>
    </AppCard>

    <!-- Example 2 -->
    <AppCard>
      <h2>2. Date Range</h2>
      <DateTimePicker v-model="dateRange1" mode="range" />
      <p>Selected: {{ formatRange(dateRange1) }}</p>
    </AppCard>

    <!-- Example 3 -->
    <AppCard>
      <h2>3. Future Dates Only</h2>
      <DateTimePicker v-model="date2" :min-date="new Date()" />
      <p>Selected: {{ formatDate(date2) }}</p>
    </AppCard>

    <!-- Example 4 -->
    <AppCard>
      <h2>4. 2023 Dates Only</h2>
      <DateTimePicker 
        v-model="dateRange2" 
        mode="range"
        :min-date="new Date(2023, 0, 1)"
        :max-date="new Date(2023, 11, 31)"
      />
      <p>Selected: {{ formatRange(dateRange2) }}</p>
    </AppCard>

    <!-- Example 5 -->
    <AppCard>
      <h2>5. Disabled Picker</h2>
      <DateTimePicker v-model="date3" disabled />
    </AppCard>

    <!-- Example 6 -->
    <AppCard>
      <h2>8. With Time Picker</h2>
      <DateTimePicker v-model="dateTime1" :enable-time-picker="true" />
      <p>Selected: {{ dateTime1?.toLocaleString() }}</p>
    </AppCard>
	</section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DateTimePicker from '../components/DateTimePicker.vue'
import AppCard from '../components/AppCard.vue'


const date1 = ref(new Date())
const date2 = ref(null)
const date3 = ref(new Date())
const date4 = ref(null)
const date5 = ref(null)
const dateTime1 = ref(null)
const dateRange1 = ref([new Date(), new Date()])
const dateRange2 = ref([null, null])

const formatDate = (date) => date?.toLocaleDateString() || 'None'
const formatRange = (range) => 
  range ? range.map(d => d?.toLocaleDateString() || '').join(' to ') : 'None'
</script>
