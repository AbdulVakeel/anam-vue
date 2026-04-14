<script setup>
import { defineProps } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  type: { type: String, default: 'line' },
  height: { type: Number, default: 250 },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' }
})

const chartOptions = {
  chart: {
    toolbar: { show: false },
    foreColor: '#ccc',
    background: 'transparent'
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    borderColor: '#333'
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  tooltip: { theme: 'dark' },
  legend: { labels: { colors: '#ccc' } }
}

const chartSeries = {
  line: [
    { name: 'Sales', data: [31, 40, 28, 51, 42, 109, 100] }
  ],
  bar: [
    { name: 'Visitors', data: [44, 55, 41, 67, 22, 43, 21] }
  ],
  area: [
    { name: 'Orders', data: [21, 29, 37, 36, 44, 45, 50] }
  ],
  pie: [44, 55, 13, 33],
  donut: [35, 25, 20, 20]
}
</script>

<template>
  <div>
    <div v-if="title" class="mb-2">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p v-if="subtitle" class="text-sm text-gray-400">{{ subtitle }}</p>
    </div>

    <VueApexCharts
      :type="type"
      :options="chartOptions"
      :series="chartSeries[type]"
      :height="height"
    />
  </div>
</template>
