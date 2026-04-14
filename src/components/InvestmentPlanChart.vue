<template>
  <div class="p-5 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
    <div class="mb-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between pb-2">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Investment Report</h3>
      
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600 dark:text-gray-300">Plan Name</span>
        <select 
          v-model="selectedTimeRange" 
          class="text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-gray-700 dark:text-gray-300"
          @change="updateChartData"
        >
          <option value="all">All Time</option>
          <option value="week">Current Week</option>
          <option value="month">Current Month</option>
          <option value="year">Current Year</option>
        </select>
      </div>
    </div>

    <div v-if="series.length > 0" class="rounded-lg">
      <apexchart
        height="300"
        width="100%"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <div v-else class="text-gray-500 dark:text-gray-400 h-[300px] flex items-center justify-center">
      No data found
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// Mock data
const investmentPlans = [
  { name: 'Gold Plan', value: 45000 },
  { name: 'Silver Plan', value: 32000 },
  { name: 'Bronze Plan', value: 18000 },
  { name: 'Platinum Plan', value: 25000 },
  { name: 'Diamond Plan', value: 15000 }
];

// Component state
const selectedTimeRange = ref('year');
const chartData = ref([]);

// Generate mock data based on time range
const generateMockData = (timeRange) => {
  // In a real app, this would filter data based on time range
  return investmentPlans.map(plan => ({
    ...plan,
    value: Math.floor(plan.value * (0.8 + Math.random() * 0.4)) // Random variation
  }));
};

// Update chart data
const updateChartData = () => {
  chartData.value = generateMockData(selectedTimeRange.value);
};

// Chart series data
const series = computed(() => chartData.value.map(item => item.value));
const labels = computed(() => chartData.value.map(item => item.name));

// Chart options
const chartOptions = computed(() => ({
  chart: {
    type: 'pie',
    toolbar: { show: false },
    foreColor: '#6b7280'
  },
  labels: labels.value,
  colors: ['#fda92d', '#1890FF', '#54D62C', '#FF4842', '#B72136'],
  fill: {
    type: 'gradient',
    gradient: {
      colorStops: [
        [
          { offset: 5, color: '#fda92d', opacity: 1 },
          { offset: 95, color: '#f78109', opacity: 1 }
        ],
        [
          { offset: 5, color: '#1890FF', opacity: 1 },
          { offset: 95, color: '#0C53B7', opacity: 1 }
        ],
        [
          { offset: 5, color: '#54D62C', opacity: 1 },
          { offset: 95, color: '#229A16', opacity: 1 }
        ],
        [
          { offset: 5, color: '#FF4842', opacity: 1 },
          { offset: 95, color: '#B72136', opacity: 1 }
        ],
        [
          { offset: 5, color: '#B78103', opacity: 1 },
          { offset: 95, color: '#b63d07', opacity: 1 }
        ]
      ]
    }
  },
  dataLabels: { enabled: false },
  stroke: { show: false },
  legend: {
    position: 'bottom',
    itemMargin: {
      horizontal: 5,
      vertical: 0
    },
    formatter: function(seriesName, opts) {
      return [
        `<span class="text-gray-900 dark:text-white">${seriesName}</span>`,
        ' - ',
        `<span class="text-gray-900 dark:text-white">${formatCurrency(opts.w.globals.series[opts.seriesIndex])}</span>`
      ].join('');
    }
  },
  tooltip: {
    y: {
      formatter: (value) => formatCurrency(value)
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: { width: '100%' },
      legend: { position: 'top' }
    }
  }]
}));

// Format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Initialize on mount
onMounted(() => {
  updateChartData();
});
</script>