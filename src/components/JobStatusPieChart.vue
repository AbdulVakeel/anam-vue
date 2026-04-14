<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted,onBeforeUnmount , watch } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

const props = defineProps({
  data: {
    type: Array,
    default: () => [
      { value: 42, name: 'Applied', color: '#3b82f6' },
      { value: 23, name: 'Interview', color: '#8b5cf6' },
      { value: 8, name: 'Offer', color: '#10b981' },
      { value: 27, name: 'Rejected', color: '#ef4444' }
    ]
  }
})

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: {
        color: '#6b7280' // gray-500
      }
    },
    series: [
      {
        name: 'Application Status',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold',
            color: '#6b7280' // gray-500
          }
        },
        labelLine: {
          show: false
        },
        data: props.data.map(item => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: item.color }
        }))
      }
    ]
  }

  chartInstance.setOption(option)
}

const updateChartOnThemeChange = () => {
  if (!chartInstance) return
  
  const textColor = document.documentElement.classList.contains('dark') 
    ? '#d1d5db' // gray-300
    : '#6b7280' // gray-500
  
  chartInstance.setOption({
    legend: {
      textStyle: { color: textColor }
    },
    series: [{
      emphasis: {
        label: {
          color: textColor
        }
      }
    }]
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