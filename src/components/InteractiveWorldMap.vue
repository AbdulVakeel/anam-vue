<template>
  <div class="world-map-container">
    <div ref="mapContainer" class="w-full h-full"></div>
    <div v-if="selectedCountry" class="country-tooltip">
      {{ selectedCountry }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  showLabels: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['country-selected'])

const mapContainer = ref(null)
const selectedCountry = ref(null)
const width = ref(800)
const height = ref(500)

onMounted(() => {
  renderWorldMap()
})

const renderWorldMap = () => {
  if (!mapContainer.value) return

  // Clear previous map
  d3.select(mapContainer.value).selectAll('*').remove()

  // Create SVG
  const svg = d3.select(mapContainer.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${width.value} ${height.value}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')

  // Projection
  const projection = d3.geoMercator()
    .scale(130)
    .translate([width.value / 2, height.value / 1.5])

  // Path generator
  const path = d3.geoPath().projection(projection)

  // Load world map data
  d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(world => {
      const countries = topojson.feature(world, world.objects.countries).features

      // Draw countries
      svg.selectAll('.country')
        .data(countries)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', path)
        .attr('fill', d => {
          const countryCode = d.id
          const countryData = props.data[countryCode]
          return countryData ? getColorForValue(countryData.percent) : '#e0e0e0'
        })
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5)
        .on('mouseover', function(event, d) {
          d3.select(this).attr('stroke-width', 1.5).attr('stroke', '#333')
          selectedCountry.value = d.properties.name
          emit('country-selected', d.properties.name)
        })
        .on('mouseout', function() {
          d3.select(this).attr('stroke-width', 0.5).attr('stroke', '#fff')
          selectedCountry.value = null
        })
        .on('click', (event, d) => {
          emit('country-selected', d.properties.name)
        })

      // Add country labels if enabled - with responsive font size
      if (props.showLabels) {
        svg.selectAll('.country-label')
          .data(countries)
          .enter()
          .append('text')
          .attr('class', 'country-label')
          .attr('transform', d => `translate(${path.centroid(d)})`)
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em')
          .text(d => d.properties.name)
          .style('font-size', '12px') 
          .style('fill', '#333')
      }
    })
}

const getColorForValue = (value) => {
  if (!value) return '#e0e0e0'
  if (value >= 70) return '#4CAF50'
  if (value >= 50) return '#8BC34A'
  if (value >= 30) return '#FFC107'
  if (value >= 10) return '#FF9800'
  return '#FF5722'
}

watch(() => props.data, () => {
  renderWorldMap()
}, { deep: true })
</script>

<style scoped>
.world-map-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.country-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  pointer-events: none;
  font-size: 14px; /* Increased from 12px */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .country-label {
    font-size: 10px !important; /* Minimum readable size for mobile */
  }
  
  .country-tooltip {
    font-size: 12px;
    padding: 3px 6px;
  }
}
</style>