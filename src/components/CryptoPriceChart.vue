<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, watch,onBeforeUnmount  } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  coinId: {
    type: String,
    default: 'bitcoin'
  },
  period: {
    type: String,
    default: '24H'
  }
})

const chartRef = ref(null)
let chartInstance = null

// Sample data - replace with real API calls
const generateChartData = () => {
  const now = new Date()
  const data = []
  let value = 40000
  
  // Generate sample data based on period
  const points = props.period === '1H' ? 60 : 
                 props.period === '24H' ? 24 : 
                 props.period === '7D' ? 7 : 30
  
  for (let i = points; i >= 0; i--) {
    const time = new Date(now)
    
    if (props.period === '1H') {
      time.setMinutes(now.getMinutes() - i)
    } else if (props.period === '24H') {
      time.setHours(now.getHours() - i)
    } else {
      time.setDate(now.getDate() - i)
    }
    
    // Random walk for sample data
    value += (Math.random() - 0.5) * 1000
    if (value < 35000) value = 35000 + Math.random() * 1000
    if (value > 45000) value = 45000 - Math.random() * 1000
    
    data.push({
      time: time,
      value: value
    })
  }
  
  return data
}

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  const chartData = generateChartData()
  
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const date = new Date(params[0].value[0])
        return `
          <div class="text-sm font-medium">
            ${date.toLocaleString()}<br/>
            Price: <span class="font-bold">${formatCurrency(params[0].value[1])}</span>
          </div>
        `
      },
      axisPointer: {
        animation: false
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#e5e7eb' // gray-200
        }
      },
      axisLabel: {
        color: '#6b7280' // gray-500
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '5%'],
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#6b7280', // gray-500
        formatter: (value) => formatCurrency(value)
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6' // gray-100
        }
      }
    },
    series: [{
      name: 'Price',
      type: 'line',
      showSymbol: false,
      emphasis: {
        scale: false
      },
      lineStyle: {
        width: 2,
        color: '#3b82f6' // blue-500
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(59, 130, 246, 0.5)' // blue-500/50
          },
          {
            offset: 1,
            color: 'rgba(59, 130, 246, 0.1)' // blue-500/10
          }
        ])
      },
      data: chartData.map(item => [item.time, item.value])
    }]
  }

  chartInstance.setOption(option)
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const updateChartOnThemeChange = () => {
  if (!chartInstance) return
  
  const isDark = document.documentElement.classList.contains('dark')
  
  const textColor = isDark ? '#d1d5db' : '#6b7280' // gray-300/gray-500
  const axisLineColor = isDark ? '#4b5563' : '#e5e7eb' // gray-600/gray-200
  const splitLineColor = isDark ? '#374151' : '#f3f4f6' // gray-700/gray-100
  
  chartInstance.setOption({
    xAxis: {
      axisLine: { lineStyle: { color: axisLineColor } },
      axisLabel: { color: textColor }
    },
    yAxis: {
      axisLabel: { color: textColor },
      splitLine: { lineStyle: { color: splitLineColor } }
    }
  })
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => chartInstance?.resize())
  
  // Watch for theme changes
  const observer = new MutationObserver(updateChartOnThemeChange)
  observer.observe(document.documentElement, { 
    attributes: true, 
    attributeFilter: ['class'] 
  })
})

watch(() => props.period, () => {
  if (chartInstance) {
    const chartData = generateChartData()
    chartInstance.setOption({
      series: [{
        data: chartData.map(item => [item.time, item.value])
      }]
    })
  }
})

onBeforeUnmount(() => {
  chartInstance?.dispose()
  window.removeEventListener('resize', () => chartInstance?.resize())
})
</script>