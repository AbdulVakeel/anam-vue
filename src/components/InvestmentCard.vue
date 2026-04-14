<template>
  <div :class="['p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700', customClass]">
    <div class="flex justify-between items-start">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <component :is="iconComponent" class="h-5 w-5 text-current" />
          <p class="text-sm font-medium text-gray-600 dark:text-gray-300">{{ title }}</p>
        </div>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ value }}</p>
      </div>
      
      <!-- Change indicator -->
      <div v-if="change !== undefined" class="flex items-center">
        <span 
          :class="{
            'text-green-500': change > 0,
            'text-red-500': change < 0,
            'text-gray-500': change === 0
          }"
          class="text-sm font-medium"
        >
          {{ change > 0 ? '+' : '' }}{{ change }}%
        </span>
        <ArrowTrendingUpIcon 
          v-if="change > 0" 
          class="h-4 w-4 ml-1 text-green-500" 
        />
        <ArrowTrendingDownIcon 
          v-else-if="change < 0" 
          class="h-4 w-4 ml-1 text-red-500" 
        />
        <MinusIcon 
          v-else 
          class="h-4 w-4 ml-1 text-gray-500" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShieldExclamationIcon
} from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  change: {
    type: Number,
    default: undefined
  },
  icon: {
    type: String,
    default: 'ChartBarIcon'
  },
  customClass: {
    type: String,
    default: ''
  }
})

const iconComponent = computed(() => {
  const icons = {
    ChartBarIcon,
    ArrowTrendingUpIcon,
    CurrencyDollarIcon,
    ShieldExclamationIcon
  }
  return icons[props.icon] || ChartBarIcon
})
</script>