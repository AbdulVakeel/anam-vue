<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 md:p-6 space-y-6 mx-auto max-w-screen-2xl overflow-x-hidden">
    <!-- Header - Stacked on mobile -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Investment Portfolio</h1>
        <p class="text-gray-500 dark:text-gray-400">Welcome back, Investor</p>
      </div>
      <div class="flex flex-col xs:flex-row items-start xs:items-center gap-3 w-full md:w-auto">
        <div class="w-full xs:w-auto">
          <DateTimePicker v-model="selectedDateRange" range class="w-full xs:w-auto" />
        </div>
        <button class="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:shadow-md transition">
          <Cog6ToothIcon class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>

    <!-- Portfolio Summary Cards - 2 columns on small mobile -->
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <InvestmentCard 
        title="Portfolio Value" 
        :value="formatCurrency(portfolioValue)" 
        :change="9.5" 
        icon="ChartBarIcon"
        class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/50"
      />
      
      <InvestmentCard 
        title="YTD Return" 
        :value="`+${ytdReturn}%`" 
        :change="3.2" 
        icon="ArrowTrendingUpIcon"
        class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/50"
      />
      
      <InvestmentCard 
        title="Dividends" 
        :value="formatCurrency(dividends)" 
        :change="-2.1" 
        icon="CurrencyDollarIcon"
        class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/50"
      />
      
      <InvestmentCard 
        title="Risk Level" 
        value="Moderate" 
        :change="0" 
        icon="ShieldExclamationIcon"
        class="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/50"
      />
    </div>

    <!-- Main Charts - Stack on mobile -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Portfolio Performance -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow p-4">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Portfolio Performance</h2>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="period in ['1M', '3M', '6M', '1Y', 'All']" 
              :key="period"
              @click="performancePeriod = period"
              :class="performancePeriod === period 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
              class="px-3 py-1 rounded-lg text-sm font-medium"
            >
              {{ period }}
            </button>
          </div>
        </div>
        <PortfolioChart :period="performancePeriod" />
      </div>

      <!-- Asset Allocation -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow p-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Asset Allocation</h2>
        <div class="h-64">
          <PieChart :data="assetAllocation" />
        </div>
        <div class="mt-4 space-y-2">
          <div v-for="asset in assetAllocation" :key="asset.name" class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: asset.color }"></span>
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ asset.name }}</span>
            </div>
            <span class="text-sm font-medium">{{ asset.value }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section - Stack on mobile -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Top Holdings -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow p-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Holdings</h2>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[600px] md:min-w-0">
            <thead>
              <tr class="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                <th class="pb-3">Asset</th>
                <th class="pb-3 text-right">Value</th>
                <th class="pb-3 text-right">%</th>
                <th class="pb-3 text-right">Return</th>
                <th class="pb-3"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="holding in topHoldings" :key="holding.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="py-3">
                  <div class="flex items-center">
                    <img :src="holding.logo" :alt="holding.name" class="w-8 h-8 rounded-full mr-3" />
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">{{ holding.name }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{{ holding.symbol }}</p>
                    </div>
                  </div>
                </td>
                <td class="text-right font-medium">{{ formatCurrency(holding.value) }}</td>
                <td class="text-right">{{ holding.percentage }}%</td>
                <td class="text-right" :class="holding.return >= 0 ? 'text-green-500' : 'text-red-500'">
                  {{ holding.return >= 0 ? '+' : '' }}{{ holding.return }}%
                </td>
                <td class="text-right">
                  <button class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                    <EllipsisHorizontalIcon class="h-5 w-5 text-gray-400" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow p-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h2>
        <div class="space-y-4">
          <div v-for="txn in recentTransactions" :key="txn.id" class="flex items-start">
            <div class="p-2 rounded-lg mr-3" :class="txn.type === 'buy' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'">
              <ArrowDownIcon v-if="txn.type === 'buy'" class="h-5 w-5 text-green-600 dark:text-green-400" />
              <ArrowUpIcon v-else class="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div class="flex-1">
              <div class="flex justify-between">
                <p class="font-medium text-gray-900 dark:text-white">{{ txn.asset }}</p>
                <p class="font-medium">{{ formatCurrency(txn.amount) }}</p>
              </div>
              <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <p>{{ txn.type === 'buy' ? 'Purchase' : 'Sale' }} • {{ txn.shares }} shares</p>
                <p>{{ txn.date }}</p>
              </div>
            </div>
          </div>
          <button class="w-full mt-4 text-center text-blue-600 dark:text-blue-400 hover:underline">
            View all transactions
          </button>
        </div>
      </div>
    </div>

    <!-- Charts at bottom - Stack on mobile -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <InvestmentChart />
      <InvestmentPlanChart />
    </section>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  CurrencyDollarIcon, 
  ShieldExclamationIcon, 
  EllipsisHorizontalIcon, 
  ArrowDownIcon, 
  ArrowUpIcon, 
  Cog6ToothIcon 
} from '@heroicons/vue/24/outline'
import InvestmentCard from '../components/InvestmentCard.vue'
import PortfolioChart from '../components/PortfolioChart.vue'
import PieChart from '../components/PieChart.vue'
import DateTimePicker from '../components/DateTimePicker.vue'
import InvestmentChart from '../components/InvestmentChart.vue'
import InvestmentPlanChart from '../components/InvestmentPlanChart.vue'


// Data
const selectedDateRange = ref([new Date(), new Date()])
const performancePeriod = ref('1Y')

const portfolioValue = 12530.87
const ytdReturn = 8.7
const dividends = 3420.15

const assetAllocation = [
  { name: 'Stocks', value: 62, color: '#3b82f6' },
  { name: 'Real Estate', value: 12, color: '#8b5cf6' },
  { name: 'Crypto', value: 5, color: '#f59e0b' }
]

const topHoldings = [
  {
    id: 1,
    name: 'Apple Inc.',
    symbol: 'AAPL',
    logo: '/company/image-01.jpg',
    value: 32450.32,
    percentage: 25.8,
    return: 12.5
  },
  {
    id: 2,
    name: 'Microsoft Corp.',
    symbol: 'MSFT',
    logo: '/company/image-02.jpg',
    value: 28760.15,
    percentage: 22.9,
    return: 8.3
  },
  {
    id: 3,
    name: 'Vanguard S&P 500 ETF',
    symbol: 'VOO',
    logo: '/company/image-03.jpg',
    value: 18540.87,
    percentage: 14.8,
    return: 6.2
  },
  {
    id: 4,
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    logo: '/company/image-04.jpg',
    value: 12430.65,
    percentage: 9.9,
    return: -3.4
  },
  {
    id: 5,
    name: 'Amazon.com Inc.',
    symbol: 'AMZN',
    logo: '/company/image-01.jpg',
    value: 9870.42,
    percentage: 7.9,
    return: 5.1
  }
]

const recentTransactions = [
  {
    id: 1,
    asset: 'Apple Inc. (AAPL)',
    type: 'buy',
    shares: 5,
    amount: 875.45,
    date: 'Today, 10:45 AM'
  },
  {
    id: 2,
    asset: 'Microsoft Corp. (MSFT)',
    type: 'buy',
    shares: 3,
    amount: 1024.32,
    date: 'Yesterday, 2:30 PM'
  },
  {
    id: 3,
    asset: 'Vanguard S&P 500 ETF (VOO)',
    type: 'sell',
    shares: 10,
    amount: 4230.15,
    date: 'Mar 15, 9:15 AM'
  },
  {
    id: 4,
    asset: 'Bitcoin (BTC)',
    type: 'buy',
    shares: 0.25,
    amount: 1250.00,
    date: 'Mar 14, 4:20 PM'
  }
]

// Methods
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}
</script>

<style>
* {
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
</style>