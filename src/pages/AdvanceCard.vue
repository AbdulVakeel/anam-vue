<template>
  <div class="space-y-4 p-2 sm:p-0">
    <!-- First Row - Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      <!-- Total Profit and Sell Cards - Mobile Improved -->
      <div class="rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-violet-200/20 overflow-hidden">
        <div class="grid grid-cols-2 divide-x h-40 sm:h-48">
          <!-- Total Profit Card -->
          <div class="p-2 sm:p-3 flex items-center justify-center flex-col h-full">
            <span class="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-green-100 dark:bg-green-900/30 inline-flex items-center justify-center">
              <Icon icon="mdi:currency-usd" class="text-green-600 dark:text-green-400 text-2xl sm:text-3xl" />
            </span>
            <h1 class="text-xl sm:text-2xl px-2 pt-3 sm:pt-5 font-semibold text-gray-800 dark:text-white">$546.00</h1>
            <p class="text-xs sm:text-sm px-2 text-gray-500 dark:text-gray-400 uppercase">Total Profit</p>
          </div>
          
          <!-- Total Sell Card -->
          <div class="p-2 sm:p-3 flex items-center justify-center flex-col h-full">
            <span class="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 inline-flex items-center justify-center">
              <Icon icon="mdi:hand-coin-outline" class="text-blue-600 dark:text-blue-400 text-2xl sm:text-3xl" />
            </span>
            <h1 class="text-xl sm:text-2xl px-2 pt-3 sm:pt-5 font-semibold text-gray-800 dark:text-white">$345.00</h1>
            <p class="text-xs sm:text-sm px-2 text-gray-500 dark:text-gray-400 uppercase">Total Sell</p>
          </div>
        </div>
      </div>

      <!-- System Logs Section - Mobile Improved -->
      <div class="rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-violet-200/20 overflow-hidden">
        <a href="#" class="block">
          <div class="flex justify-between items-center px-3 sm:px-5 py-3 sm:py-4">
            <div class="flex-1">
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">0</h1>
              <div class="mt-1 sm:mt-2">
                <p class="text-sm sm:text-lg text-gray-600 dark:text-gray-300">
                  All looks good!
                </p>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  System logs will appear here
                </p>
                <div class="mt-2 sm:mt-4">
                  <SuccessButton class="py-1 px-3 sm:py-2 sm:px-4 text-sm sm:text-base rounded transition-colors">
                    All Good
                  </SuccessButton>
                </div>
              </div>
            </div>
            <SuccessButton 
              class="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 dark:bg-green-900/20 text-green-500 dark:text-green-400"
            >
              <Icon icon="mdi:check-circle" class="text-3xl sm:text-4xl" />
            </SuccessButton>
          </div>
        </a>
      </div>
    </div>

    <!-- Second Row - Wallet Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      <!-- Wallet Cards - Mobile Improved -->
      <div 
        v-for="(card, index) in cardDetails" 
        :key="index"
        class="rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-violet-200/20 overflow-hidden p-3 sm:p-5"
      >
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              {{ card.key === 'total_users' ? data[card.key] : formatCurrencySymbol(getNestedValue(data, card.key)) }}
            </h1>
            <h2 class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{{ card.title }}</h2>
          </div>
          <div>
            <Icon 
              :icon="card.icon"
              class="text-2xl sm:text-3xl"
              :class="[
                card.key.includes('earning') && 'text-green-500 dark:text-green-400',
                card.key.includes('deposit') && 'text-blue-500 dark:text-blue-400',
                card.key.includes('reward') && 'text-purple-500 dark:text-purple-400'
              ].filter(Boolean)"
            />
          </div>
        </div>
      </div>
      
      <!-- Recent Transactions Card - Mobile Improved -->
      <div class="rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-violet-200/20 overflow-hidden">
        <div class="p-3 sm:p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Recent Transactions</h3>
        </div>
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div v-for="(txn, index) in recentTransactions" :key="index" class="p-3 sm:p-4 flex items-center">
            <div class="flex-shrink-0">
              <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center" 
                :class="txn.type === 'deposit' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'">
                <Icon :icon="txn.type === 'deposit' ? 'mdi:arrow-bottom-left' : 'mdi:arrow-top-right'" 
                  :class="txn.type === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'" 
                  class="text-lg sm:text-xl" />
              </span>
            </div>
            <div class="ml-3 sm:ml-4 flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 dark:text-white truncate">{{ txn.description }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ txn.date }}</p>
            </div>
            <div class="text-right ml-2">
              <p class="text-sm font-medium" 
                :class="txn.type === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                {{ txn.type === 'deposit' ? '+' : '-' }}${{ txn.amount }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ txn?.status }}</p>
            </div>
          </div>
        </div>
        <div class="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700">
          <SuccessButton as="button" size="sm" class="w-full py-1.5 text-sm sm:text-base">
            View All Transactions
          </SuccessButton>
        </div>
      </div>
      
      <!-- System Performance Card - Mobile Improved -->
      <div class="rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-violet-200/20 overflow-hidden p-3 sm:p-5">
        <div class="flex justify-between items-center mb-3 sm:mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">System Performance</h3>
          <span class="px-2 py-1 text-xs rounded-full" 
            :class="performance.status === 'optimal' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'">
            {{ performance.status }}
          </span>
        </div>
        
        <div class="space-y-3 sm:space-y-4">
          <div v-for="metric in performanceMetrics" :key="metric.name">
            <div class="flex justify-between text-xs sm:text-sm mb-1">
              <span class="text-gray-500 dark:text-gray-400">{{ metric.label }}</span>
              <span class="font-medium text-gray-800 dark:text-white">{{ performance[metric.name] }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
              <div class="h-full rounded-full" 
                   :class="metric.color" 
                   :style="{ width: performance[metric.name] + '%' }"></div>
            </div>
          </div>
        </div>
        
        <div class="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Last updated: {{ performance.lastUpdated }}
          </p>
        </div>
      </div>

      <!-- Network Status Card - Mobile Improved -->
      <div class="rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-violet-200/20 overflow-hidden p-3 sm:p-5">
        <div class="flex items-start justify-between mb-3 sm:mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Network Health</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">Real-time metrics</p>
          </div>
          <div class="flex items-center">
            <span class="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" 
                    :class="network.status === 'online' ? 'bg-green-400' : 'bg-red-400'"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3" 
                    :class="network.status === 'online' ? 'bg-green-500' : 'bg-red-500'"></span>
            </span>
            <span class="text-xs sm:text-sm" 
                  :class="network.status === 'online' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
              {{ network.status === 'online' ? 'LIVE' : 'OFFLINE' }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2 sm:gap-3 text-center mb-3 sm:mb-4">
          <div v-for="(netMetric, index) in networkMetrics" :key="index" 
               class="p-1 sm:p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ netMetric.label }}</p>
            <p class="text-base sm:text-lg font-bold" :class="netMetric.colorClass(network[netMetric.name])">
              {{ network[netMetric.name] }}<span class="text-2xs sm:text-xs">{{ netMetric.unit }}</span>
            </p>
          </div>
        </div>

        <div class="relative">
          <div class="flex justify-between text-2xs sm:text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-2.5">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full" 
                 :style="{ width: network.stability + '%' }"></div>
          </div>
          <div class="flex justify-between mt-1 sm:mt-2">
            <span class="text-2xs sm:text-xs text-gray-500 dark:text-gray-400">Stability</span>
            <span class="text-2xs sm:text-xs font-medium" 
                  :class="getStabilityColor(network.stability)">
              {{ network.stability }}%
            </span>
          </div>
        </div>

        <div class="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <p class="text-2xs sm:text-xs text-gray-500 dark:text-gray-400">
            Last checked: {{ network.lastChecked }}
          </p>
          <button class="text-2xs sm:text-xs text-violet-600 dark:text-violet-400 hover:underline">
            Run Test
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import SuccessButton from '../components/SuccessButton.vue';

// Network data
const network = ref({
  status: 'online',
  latency: 42,
  download: 85.4,
  upload: 12.3,
  stability: 88,
  lastChecked: new Date().toLocaleTimeString()
})

// Performance metrics configuration
const performanceMetrics = [
  { name: 'cpu', label: 'CPU Usage', color: 'bg-blue-600' },
  { name: 'memory', label: 'Memory Usage', color: 'bg-purple-600' },
  { name: 'disk', label: 'Disk Space', color: 'bg-green-600' }
]

// Network metrics configuration
const networkMetrics = [
  { 
    name: 'latency', 
    label: 'Latency', 
    unit: 'ms',
    colorClass: (value) => {
      if (value < 100) return 'text-green-600 dark:text-green-400'
      if (value < 300) return 'text-yellow-600 dark:text-yellow-400'
      return 'text-red-600 dark:text-red-400'
    }
  },
  { 
    name: 'download', 
    label: 'Download', 
    unit: 'Mbps',
    colorClass: () => 'text-blue-600 dark:text-blue-400'
  },
  { 
    name: 'upload', 
    label: 'Upload', 
    unit: 'Mbps',
    colorClass: () => 'text-purple-600 dark:text-purple-400'
  }
]

// Stability color function
const getStabilityColor = (value) => {
  if (value > 75) return 'text-green-600 dark:text-green-400'
  if (value > 50) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

// Card details configuration
const cardDetails = [
  { key: 'wallets.earning_wallet', title: 'Earning Wallet', icon: 'mdi:wallet-outline' },
  { key: 'wallets.deposit_wallet', title: 'Deposit Wallet', icon: 'mdi:bank' },
  { key: 'wallets.reward_wallet', title: 'Reward Wallet', icon: 'fluent:reward-32-regular' },
]

// System performance data
const performance = ref({
  status: 'optimal',
  cpu: 45,
  memory: 60,
  disk: 30,
  lastUpdated: new Date().toLocaleString()
})

// Recent transactions data
const recentTransactions = ref([
  {
    type: 'deposit',
    description: 'Wallet top-up',
    amount: '500.00',
    date: '10 min ago',
    status: 'Completed'
  },
  {
    type: 'withdrawal',
    description: 'Investment payout',
    amount: '250.50',
    date: '2 hours ago',
    status: 'Processing'
  },
  {
    type: 'deposit',
    description: 'Referral bonus',
    amount: '50.00',
    date: '5 hours ago',
    status: 'Completed'
  }
])

// Wallet and user data
const data = ref({
  wallets: {
    earning_wallet: 1250.50,
    deposit_wallet: 3500.00,
    reward_wallet: 750.25
  },
  total_users: 42
})

// Helper functions
const getNestedValue = (obj, path) => path.split('.').reduce((o, p) => o?.[p], obj)
const formatCurrencySymbol = (value) => `$${value?.toFixed(2) || '0.00'}`
</script>