<template>
  <div class="p-5 bg-white dark:bg-gray-800 rounded-lg shadow">
    <div class="flex items-center justify-between mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Total Investments</h3>

      <select 
        v-model="selectedTimeRange" 
        class="text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-gray-700 dark:text-gray-300"
        @change="updateChartData"
      >
        <option value="week">Current Week</option>
        <option value="month">Current Month</option>
        <option value="year">Current Year</option>
        <option value="all">All Time</option>
      </select>
    </div>

    <div class="flex items-center justify-between mb-4">
      <p class="text-sm text-gray-500 dark:text-gray-400 font-semibold">
        {{ timeRangeText }}
      </p>
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
        {{ formatCurrency(totalInvest) }}
      </h2>
      <div>
        <p class="text-xs text-gray-500 dark:text-gray-400 font-semibold">
          {{ growthText }}
        </p>
      </div>
    </div>

    <div class="rounded-lg">
      <apexchart
        v-if="chartData.length > 0"
        height="300"
        width="100%"
        :options="chartOptions"
        :series="series"
      ></apexchart>
      <div v-else class="text-gray-500 dark:text-gray-400 h-[300px] flex items-center justify-center">
        Loading data...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// Chart data
const chartData = ref([]);
const selectedTimeRange = ref('month');

// Generate mock data
const generateMockData = (timeRange) => {
  const data = [];
  const now = new Date();
  let count = 7; // Default for week
  
  if (timeRange === 'month') count = 30;
  if (timeRange === 'year') count = 12;
  if (timeRange === 'all') count = 24; // 2 years
  
  for (let i = 0; i < count; i++) {
    const date = new Date();
    if (timeRange === 'week') date.setDate(now.getDate() - i);
    if (timeRange === 'month') date.setDate(now.getDate() - i);
    if (timeRange === 'year') date.setMonth(now.getMonth() - i);
    if (timeRange === 'all') date.setMonth(now.getMonth() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 10000) + 5000
    });
  }
  
  return data;
};

// Update chart data
const updateChartData = () => {
  chartData.value = generateMockData(selectedTimeRange.value);
};

// Computed properties
const totalInvest = computed(() => {
  return chartData.value.reduce((sum, item) => sum + item.value, 0);
});

const growthText = computed(() => {
  const growth = Math.floor(Math.random() * 40) - 10;
  return growth >= 0 
    ? `↑ ${growth}% from previous period` 
    : `↓ ${Math.abs(growth)}% from previous period`;
});

const timeRangeText = computed(() => {
  return {
    all: 'All time investments',
    week: 'This week investments',
    month: 'This month investments',
    year: 'This year investments'
  }[selectedTimeRange.value];
});

const series = computed(() => [{
  name: 'Value',
  data: chartData.value.map(item => item.value)
}]);

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: { show: false },
    foreColor: '#6b7280'
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '80%',
      endingShape: 'rounded',
    },
  },
  xaxis: {
    categories: chartData.value.map(item => 
      new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    labels: {
      style: {
        colors: ['#6b7280']
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: ['#6b7280']
      },
      formatter: (value) => formatCurrency(value)
    },
  },
  colors: ['#fda92d'],
  fill: {
    type: 'gradient',
    gradient: {
      colorStops: [
        [
          { offset: 5, color: '#fda92d', opacity: 1 },
          { offset: 95, color: '#f78109', opacity: 1 }
        ],
      ],
    },
  },
  dataLabels: { enabled: false },
  grid: {
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: false } }
  },
  stroke: { curve: 'smooth', show: false },
  legend: { show: false },
  tooltip: {
    y: {
      formatter: (value) => formatCurrency(value)
    }
  }
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