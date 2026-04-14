<template>
  <div class="relative h-64 w-full" @mousemove="updateTooltipPosition">
    <svg width="100%" height="100%" viewBox="0 0 800 400">
      <g v-for="(country, index) in countries" :key="index">
        <path
          :d="country.path"
          :fill="getCountryColor(country.code)"
          stroke="#FFF"
          stroke-width="0.5"
          class="cursor-pointer hover:opacity-80 transition-opacity duration-200"
          @mouseover="handleMouseOver(country)"
          @mouseleave="handleMouseLeave"
        />
      </g>
    </svg>

    <!-- Enhanced Tooltip -->
    <div
      v-if="hoveredCountry"
      class="absolute bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl text-sm border border-gray-200 dark:border-gray-700 z-10 pointer-events-none"
      :style="{
        left: `${tooltipPosition.x + 15}px`,
        top: `${tooltipPosition.y + 15}px`,
        minWidth: '160px'
      }"
    >
      <div class="font-bold text-gray-800 dark:text-white mb-1">
        {{ hoveredCountry.name }}
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-300">Sessions:</span>
        <span class="font-medium">{{ hoveredCountry.value || 'No data' }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-300">Percentage:</span>
        <span class="font-medium">
          {{ hoveredCountry.percent ? `${hoveredCountry.percent}%` : 'N/A' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import worldMapData from '@svg-maps/world'

const props = defineProps({
  countryData: {
    type: Object,
    default: () => ({})
  }
})

const hoveredCountry = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })

const countries = computed(() => {
  return worldMapData.locations.map(loc => ({
    code: loc.id,
    name: loc.name,
    path: loc.path
  }))
})

const getCountryColor = (code) => {
  const country = props.countryData[code]
  if (!country) return '#EEE' // Default color for no data
  if (country.percent >= 70) return '#EF4444' // red-500
  if (country.percent >= 50) return '#10B981' // green-500
  if (country.percent >= 30) return '#F59E0B' // yellow-500
  return '#3B82F6' // blue-500
}

const handleMouseOver = (country) => {
  hoveredCountry.value = {
    name: country.name,
    ...(props.countryData[country.code] || {})
  }
}

const handleMouseLeave = () => {
  hoveredCountry.value = null
}

const updateTooltipPosition = (event) => {
  tooltipPosition.value = {
    x: event.clientX - event.currentTarget.getBoundingClientRect().left,
    y: event.clientY - event.currentTarget.getBoundingClientRect().top
  }
}
</script>

<style scoped>
path {
  transition: fill 0.2s ease, opacity 0.2s ease;
}
</style>