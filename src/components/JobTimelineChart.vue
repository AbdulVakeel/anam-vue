<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted,onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

const props = defineProps({
  data: {
    type: Array,
    default: () => [
      { date: 'Jan 1', applications: 12, interviews: 3 },
      { date: 'Jan 8', applications: 18, interviews: 5 },
      { date: 'Jan 15', applications: 15, interviews: 4 },
      { date: 'Jan 22', applications: 24, interviews: 8 },
      { date: 'Jan 29', applications: 20, interviews: 6 },
      { date: 'Feb 5', applications: 28, interviews: 10 },
      { date: 'Feb 12', applications: 32, interviews: 12 }
    ]
  }
})

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Applications', 'Interviews'],
      textStyle: {
        color: '#6b7280' // gray-500
      },
      right: 10,
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.data.map(item => item.date),
      axisLine: {
        lineStyle: {
          color: '#e5e7eb' // gray-200
        }
      },
      axisLabel: {
        color: '#6b7280' // gray-500
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#6b7280' // gray-500
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6' // gray-100
        }
      }
    },
    series: [
      {
        name: 'Applications',
        type: 'bar',
        barWidth: '40%',
        data: props.data.map(item => item.applications),
        itemStyle: {
          color: '#3b82f6' // blue-500
        },
        emphasis: {
          itemStyle: {
            color: '#2563eb' // blue-600
          }
        }
      },
      {
        name: 'Interviews',
        type: 'bar',
        barWidth: '40%',
        data: props.data.map(item => item.interviews),
        itemStyle: {
          color: '#8b5cf6' // purple-500
        },
        emphasis: {
          itemStyle: {
            color: '#7c3aed' // purple-600
          }
        }
      }
    ]
  }

  chartInstance.setOption(option)
}

const updateChartOnThemeChange = () => {
  if (!chartInstance) return
  
  const isDark = document.documentElement.classList.contains('dark')
  
  const textColor = isDark ? '#d1d5db' : '#6b7280' // gray-300/gray-500
  const axisLineColor = isDark ? '#4b5563' : '#e5e7eb' // gray-600/gray-200
  const splitLineColor = isDark ? '#374151' : '#f3f4f6' // gray-700/gray-100
  
  chartInstance.setOption({
    legend: {
      textStyle: { color: textColor }
    },
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

onBeforeUnmount(() => {
  chartInstance?.dispose()
  window.removeEventListener('resize', () => chartInstance?.resize())
})
</script>