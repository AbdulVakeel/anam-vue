<template>

  <div class="space-y-6 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-xl overflow-hidden">
    
    <!-- Top Stats Row -->
    <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        label="Page Views" 
        :value="13647"
        :trend="12.5"
        glow-color="blue"
      >
        <template #icon>
          <div class="p-2 rounded-lg bg-blue-500/10 backdrop-blur-sm">
            <EyeIcon class="w-6 h-6 text-blue-500" />
          </div>
        </template>
      </StatCard>
      
      <StatCard 
        label="Clicks" 
        :value="9526"
        :trend="8.3"
        glow-color="green"
      >
        <template #icon>
          <div class="p-2 rounded-lg bg-green-500/10 backdrop-blur-sm">
            <CursorArrowRaysIcon class="w-6 h-6 text-green-500" />
          </div>
        </template>
      </StatCard>
      
      <StatCard 
        label="Conversions" 
        :value="'65.2%'"
        :trend="4.7"
        glow-color="purple"
      >
        <template #icon>
          <div class="p-2 rounded-lg bg-purple-500/10 backdrop-blur-sm">
            <ChartPieIcon class="w-6 h-6 text-purple-500" />
          </div>
        </template>
      </StatCard>
      
      <StatCard 
        label="New Users" 
        :value="'9.5k'"
        :trend="18.2"
        glow-color="amber"
      >
        <template #icon>
          <div class="p-2 rounded-lg bg-amber-500/10 backdrop-blur-sm">
            <UserPlusIcon class="w-6 h-6 text-amber-500" />
          </div>
        </template>
      </StatCard>
    </section>

    <!-- Middle Row with Fixed Height -->
    <section class="grid gap-4 lg:grid-cols-3 min-h-[400px]">
      <!-- Conversions Card -->
      <AnalyticsAppCard class="hover:scale-[1.01] transition-transform duration-300 h-full overflow-auto tour-conversions">
        <template #header>
          <h3 class="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <SparklesIcon class="w-5 h-5 text-blue-500" />
            <span>Conversions</span>
          </h3>
        </template>
        <div class="flex flex-col items-center p-4 h-full">
          <div class="relative w-32 h-32">
            <svg viewBox="0 0 36 36" class="w-full h-full transform rotate-[-90deg]">
              <path
                class="text-gray-200/50 dark:text-gray-700/50"
                stroke="currentColor"
                stroke-width="3.8"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                class="text-blue-500 drop-shadow-lg"
                stroke="currentColor"
                stroke-width="3.8"
                stroke-dasharray="65.2, 100"
                stroke-linecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              >
                <animate attributeName="stroke-dasharray" values="0,100;65.2,100" dur="1.5s" fill="freeze" />
              </path>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center transform rotate-90">
              <span class="text-2xl font-bold text-gray-800 dark:text-white">65.2%</span>
            </div>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Returning Customer Rate</p>

          <div class="grid grid-cols-2 gap-4 w-full mt-4 text-sm">
            <div class="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
              <p class="text-gray-500 dark:text-gray-400">This Week</p>
              <p class="font-semibold text-lg">23.5k</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
              <p class="text-gray-500 dark:text-gray-400">Last Week</p>
              <p class="font-semibold text-lg">41.05k</p>
            </div>
          </div>
          <AnalyticsAppButton class="mt-4 w-full hover:shadow-lg">
            View Details <ArrowRightIcon class="w-4 h-4 ml-2" />
          </AnalyticsAppButton>
        </div>
      </AnalyticsAppCard>

      <!-- Performance Card -->
      <AnalyticsAppCard class="lg:col-span-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/30 dark:border-gray-700/30 h-full overflow-auto tour-performance">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <ChartBarIcon class="w-5 h-5 text-blue-500" />
              <span>Performance</span>
            </h3>
            <div class="flex gap-2 text-xs">
              <AnalyticsAppButton 
                size="xs" 
                v-for="period in timePeriods" 
                :key="period.value"
                :active="activePeriod === period.value"
                @click="activePeriod = period.value"
              >
                {{ period.label }}
              </AnalyticsAppButton>
            </div>
          </div>
        </template>
        <div class="p-2 h-[calc(100%-50px)]">
          <div class="bg-blue-50/70 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs p-2 rounded-lg mb-2">
            Performance metrics for {{ activePeriodLabel }}
          </div>
          <AnimatedChart 
            :data="chartData" 
            :options="chartOptions"
            class="h-[300px] md:h-[350px]"
          />
        </div>
      </AnalyticsAppCard>
    </section>

    <!-- Bottom Row -->
    <section class="grid gap-4 lg:grid-cols-2">
      <AnalyticsAppCard class="tour-browsers">
        <template #header>
          <h3 class="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <GlobeAltIcon class="w-5 h-5 text-green-500" />
            <span>Sessions by Browser</span>
          </h3>
        </template>
        <ul class="divide-y divide-gray-200/50 dark:divide-gray-700/50">
          <BrowserItem 
            v-for="browser in browsers" 
            :key="browser.name"
            :name="browser.name"
            :percent="browser.percent"
            :count="browser.count"
            :color="browser.color"
            :icon="browser.icon"
          />
        </ul>
      </AnalyticsAppCard>

      <AnalyticsAppCard class="tour-pages">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <DocumentTextIcon class="w-5 h-5 text-purple-500" />
              <span>Top Pages</span>
            </h3>
            <AnalyticsAppButton size="xs">
              View All <ChevronRightIcon class="w-3 h-3 ml-1" />
            </AnalyticsAppButton>
          </div>
        </template>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="text-gray-500 dark:text-gray-400 border-b border-gray-200/50 dark:border-gray-700/50">
              <tr>
                <th class="py-3 text-left font-medium">Page Path</th>
                <th class="py-3 text-right font-medium">Views</th>
                <th class="py-3 text-right font-medium">Avg Time</th>
                <th class="py-3 text-right font-medium">Exit Rate</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200/50 dark:divide-gray-700/50">
              <TopPageRow 
                v-for="page in topPages"
                :key="page.path"
                :path="page.path"
                :views="page.views"
                :time="page.time"
                :exit="page.exit"
              />
            </tbody>
          </table>
        </div>
      </AnalyticsAppCard>
    </section>

    <!-- World Map Section -->
    <AnalyticsAppCard class="bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-900/50 tour-map">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <MapIcon class="w-5 h-5 text-red-500" />
            <span>Sessions by Country</span>
          </h3>
          <AnalyticsAppButton 
            size="xs" 
            @click="startTour"
            class="hover:shadow-md transition-shadow"
          >
            Take Tour <QuestionMarkCircleIcon class="w-3 h-3 ml-1" />
          </AnalyticsAppButton>
        </div>
      </template>
      <div class="grid md:grid-cols-2 gap-4 p-4">
        <div class="bg-white/50 dark:bg-gray-800/50 rounded-xl p-2 border border-gray-200/30 dark:border-gray-700/30">
          <InteractiveWorldMap 
            :data="countryData"
            :show-labels="true"
            @country-selected="handleCountrySelect"
          />
        </div>
        <div class="space-y-3">
          <CountryBar 
            v-for="country in topCountries"
            :key="country.name"
            :name="country.name"
            :value="country.value"
            :percent="country.percent"
            :color="country.color"
            :flag="country.flag"
          />
        </div>
      </div>
    </AnalyticsAppCard>
  </div>

  <!-- Onboarding Tour -->
  <OnboardingTour 
    ref="tourComponent"
    :steps="tourSteps"
  />

</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { 
  EyeIcon,
  CursorArrowRaysIcon,
  ChartPieIcon,
  UserPlusIcon,
  ChartBarIcon,
  SparklesIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ChevronRightIcon,
  MapIcon,
  QuestionMarkCircleIcon
} from '@heroicons/vue/24/outline'

// Components
import StatCard from '../components/StatCard.vue'
import AnalyticsAppCard from '../components/AnalyticsAppCard.vue'
import AnalyticsAppButton from '../components/AnalyticsAppButton.vue'
import AnimatedChart from '../components/AnimatedChart.vue'
import BrowserItem from '../components/BrowserItem.vue'
import TopPageRow from '../components/TopPageRow.vue'
import InteractiveWorldMap from '../components/InteractiveWorldMap.vue'
import OnboardingTour from '../components/OnboardingTour.vue'
import CountryBar from '../components/CountryBar.vue'

// Data
const showParticles = ref(true)
const activePeriod = ref('all')
const tourComponent = ref(null)

const timePeriods = [
  { value: 'all', label: 'ALL' },
  { value: '1m', label: '1M' },
  { value: '6m', label: '6M' },
  { value: '1y', label: '1Y' }
]

const activePeriodLabel = computed(() => {
  const period = timePeriods.find(p => p.value === activePeriod.value)
  return period ? period.label : 'ALL'
})

const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Current',
      data: [65, 59, 80, 81, 56, 72],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.3,
      fill: true
    },
    {
      label: 'Previous',
      data: [45, 49, 60, 71, 46, 62],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.3,
      fill: true
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#6B7280'
      }
    },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      }
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      }
    }
  }
})

const browsers = ref([
  { name: 'Chrome', percent: 62.5, count: '5.06k', color: 'bg-blue-500', icon: 'chrome' },
  { name: 'Firefox', percent: 12.3, count: '1.5k', color: 'bg-orange-500', icon: 'firefox' },
  { name: 'Safari', percent: 9.86, count: '1.03k', color: 'bg-blue-400', icon: 'safari' },
  { name: 'Edge', percent: 6.38, count: '0.8k', color: 'bg-blue-600', icon: 'edge' },
  { name: 'Other', percent: 9.0, count: '1.2k', color: 'bg-gray-500', icon: 'globe' }
])

const topPages = ref([
  { path: '/dashboard', views: '4,265', time: '01m:45s', exit: '29.2%' },
  { path: '/apps/chat', views: '2,584', time: '06m:25s', exit: '32.2%' },
  { path: '/auth/sign-in', views: '3,369', time: '04m:25s', exit: '5.2%' },
  { path: '/apps/email', views: '985', time: '02m:33s', exit: '84.2%' },
  { path: '/apps/social', views: '653', time: '15m:56s', exit: '2.4%' }
])

const countryData = ref({
  'US': { value: '659k', percent: 80, flag: '🇺🇸' },
  'RU': { value: '485k', percent: 60, flag: '🇷🇺' },
  'CN': { value: '365k', percent: 45, flag: '🇨🇳' },
  'CA': { value: '204k', percent: 30, flag: '🇨🇦' },
  'BR': { value: '109k', percent: 15, flag: '🇧🇷' }
})

const tourSteps = ref([
  {
    title: 'Welcome to your Dashboard',
    content: 'This is your main analytics dashboard where you can track all key metrics.',
    target: null,
    position: 'center'
  },
  {
    title: 'Performance Metrics',
    content: 'Track your key performance indicators over different time periods.',
    target: '.tour-performance',
    arrowPosition: 'bottom'
  },
  {
    title: 'Conversions Overview',
    content: 'Monitor your conversion rates and returning customer statistics.',
    target: '.tour-conversions',
    arrowPosition: 'bottom'
  }
])

const topCountries = computed(() => {
  return Object.entries(countryData.value)
    .map(([code, data]) => ({
      code,
      name: getCountryName(code),
      value: data.value,
      percent: data.percent,
      color: getCountryColor(data.percent),
      flag: data.flag
    }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5)
})

function getCountryName(code) {
  const names = {
    'US': 'United States',
    'RU': 'Russia',
    'CN': 'China',
    'CA': 'Canada',
    'BR': 'Brazil'
  }
  return names[code] || code
}

function getCountryColor(percent) {
  if (percent >= 70) return 'bg-red-500'
  if (percent >= 50) return 'bg-green-500'
  if (percent >= 30) return 'bg-yellow-500'
  return 'bg-blue-500'
}

function handleCountrySelect(country) {
  console.log('Selected country:', country)
}

function startTour() {
  if (tourComponent.value) {
    tourComponent.value.startTour()
  }
}

onUnmounted(() => {
  // Cleanup if needed
})
</script>

<style scoped>
.glow-effect {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
}
.glow-effect.green {
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
}
.glow-effect.purple {
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
}
.glow-effect.amber {
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.3);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.stat-card {
  animation: fadeIn 0.5s ease-out forwards;
}
.stat-card:nth-child(1) { animation-delay: 0.1s; }
.stat-card:nth-child(2) { animation-delay: 0.2s; }
.stat-card:nth-child(3) { animation-delay: 0.3s; }
.stat-card:nth-child(4) { animation-delay: 0.4s; }
</style>