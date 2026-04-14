<template>
  <div class="h-80">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  period: {
    type: String,
    default: '1Y'
  }
})

const chartCanvas = ref(null)
let chartInstance = null

const generateData = (period) => {
  const now = new Date()
  let labels = []
  let data = []

  // Generate different datasets based on selected period
  if (period === '1M') {
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
      data.push(100000 + Math.random() * 30000 + (i * 500))
    }
  } else if (period === '3M') {
    for (let i = 90; i >= 0; i -= 3) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
      data.push(100000 + Math.random() * 30000 + (i * 200))
    }
  } else if (period === '6M') {
    for (let i = 180; i >= 0; i -= 7) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      labels.push(date.toLocaleDateString('en-US', { month: 'short' }))
      data.push(100000 + Math.random() * 30000 + (i * 100))
    }
  } else if (period === '1Y') {
    for (let i = 12; i >= 0; i--) {
      const date = new Date(now)
      date.setMonth(date.getMonth() - i)
      labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }))
      data.push(100000 + Math.random() * 30000 + (i * 1000))
    }
  } else { // All
    for (let i = 24; i >= 0; i -= 2) {
      const date = new Date(now)
      date.setMonth(date.getMonth() - i)
      labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }))
      data.push(100000 + Math.random() * 30000 + (i * 1000))
    }
  }

  return { labels, data }
}

const initChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }

  const { labels, data } = generateData(props.period)

  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Portfolio Value',
        data: data,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (context) => {
              return `$${context.raw.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          ticks: {
            callback: (value) => `$${(value / 1000).toFixed(0)}K`
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  })
}

onMounted(() => {
  initChart()
})

watch(() => props.period, () => {
  initChart()
})
</script>