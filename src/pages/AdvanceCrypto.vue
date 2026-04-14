<template>
  <div class="space-y-6 p-2 sm:p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-xl overflow-hidden max-w-screen-2xl mx-auto">
    <!-- Header with Market Stats - Stacked on mobile -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <!-- Market Cap Card -->
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6 border-l-4 border-blue-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Market Cap</p>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ formatCurrency(globalData.total_market_cap.usd) }}</h3>
          </div>
          <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
            <ChartBarIcon class="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <p class="text-xs sm:text-sm mt-2 sm:mt-3">
          <span :class="globalData.market_cap_change_percentage_24h_usd >= 0 ? 'text-green-500' : 'text-red-500'" class="font-medium">
            {{ globalData.market_cap_change_percentage_24h_usd >= 0 ? '+' : '' }}{{ globalData.market_cap_change_percentage_24h_usd.toFixed(2) }}%
          </span> 24h
        </p>
      </div>

      <!-- Trading Volume Card -->
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6 border-l-4 border-purple-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">24h Volume</p>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ formatCurrency(globalData.total_volume.usd) }}</h3>
          </div>
          <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
            <ArrowsRightLeftIcon class="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <p class="text-xs sm:text-sm mt-2 sm:mt-3">
          <span :class="volumeChange >= 0 ? 'text-green-500' : 'text-red-500'" class="font-medium">
            {{ volumeChange >= 0 ? '+' : '' }}{{ volumeChange.toFixed(2) }}%
          </span> vs yesterday
        </p>
      </div>

      <!-- BTC Dominance Card -->
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6 border-l-4 border-amber-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">BTC Dominance</p>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ globalData.market_cap_percentage.btc.toFixed(1) }}%</h3>
          </div>
          <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
            <IconCoinBitcoinFilled class="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <p class="text-xs sm:text-sm mt-2 sm:mt-3">
          <span :class="btcDominanceChange >= 0 ? 'text-green-500' : 'text-red-500'" class="font-medium">
            {{ btcDominanceChange >= 0 ? '+' : '' }}{{ btcDominanceChange.toFixed(1) }}%
          </span> 24h
        </p>
      </div>

      <!-- Active Cryptos Card -->
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6 border-l-4 border-green-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Active Cryptos</p>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ globalData.active_cryptocurrencies }}</h3>
          </div>
          <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
            <BoltIcon class="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <p class="text-xs sm:text-sm mt-2 sm:mt-3">
          <span class="text-green-500 font-medium">+{{ newCoinsLast30Days }}</span> new coins
        </p>
      </div>
    </div>

    <!-- Main Content Area - Stacked on mobile -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <!-- Price Chart - Full width on mobile -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <div class="flex items-center space-x-2 sm:space-x-4">
            <img :src="selectedCoin.image" :alt="selectedCoin.name" class="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
            <div>
              <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{{ selectedCoin.name }}</h2>
              <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{{ selectedCoin.symbol.toUpperCase() }}</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-1 sm:gap-2">
            <button 
              v-for="period in ['1H', '24H', '7D', '1M', '1Y']" 
              :key="period"
              @click="chartPeriod = period"
              :class="chartPeriod === period 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
              class="px-2 py-1 text-xs sm:text-sm font-medium rounded-lg"
            >
              {{ period }}
            </button>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <div>
            <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(selectedCoin.current_price) }}</h3>
            <p :class="selectedCoin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'" class="text-xs sm:text-sm font-medium">
              {{ selectedCoin.price_change_percentage_24h >= 0 ? '+' : '' }}{{ selectedCoin.price_change_percentage_24h.toFixed(2) }}% (24h)
            </p>
          </div>
          <div class="flex gap-2 sm:gap-4 w-full sm:w-auto">
            <button @click="openBuyModal" class="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm sm:text-base">
              Buy
            </button>
            <button @click="openSellModal" class="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm sm:text-base">
              Sell
            </button>
          </div>
        </div>
        
        <div class="h-60 sm:h-80">
          <CryptoPriceChart :coin-id="selectedCoin.id" :period="chartPeriod" />
        </div>
      </div>

      <!-- Top Cryptos - Full width on mobile -->
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6">
        <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Top Cryptocurrencies</h2>
        <div class="space-y-3 sm:space-y-4">
          <div 
            v-for="crypto in topCryptos" 
            :key="crypto.id"
            @click="selectCoin(crypto)"
            class="p-2 sm:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
            :class="{ 'bg-blue-50 dark:bg-blue-900/30': crypto.id === selectedCoin.id }"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center min-w-0">
                <img :src="crypto.image" :alt="crypto.name" class="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 sm:mr-3" />
                <div class="truncate">
                  <p class="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">{{ crypto.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ crypto.symbol.toUpperCase() }}</p>
                </div>
              </div>
              <div class="text-right ml-2">
                <p class="font-medium text-sm sm:text-base truncate">{{ formatCurrency(crypto.current_price) }}</p>
                <p :class="crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'" class="text-xs">
                  {{ crypto.price_change_percentage_24h >= 0 ? '+' : '' }}{{ crypto.price_change_percentage_24h.toFixed(2) }}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section - Stacked on mobile -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <!-- Portfolio Summary - Full width on mobile -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6">
        <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Your Portfolio</h2>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[600px]">
            <thead>
              <tr class="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                <th class="pb-3 text-xs sm:text-sm">Asset</th>
                <th class="pb-3 text-right text-xs sm:text-sm">Holdings</th>
                <th class="pb-3 text-right text-xs sm:text-sm">Avg. Buy</th>
                <th class="pb-3 text-right text-xs sm:text-sm">Current</th>
                <th class="pb-3 text-right text-xs sm:text-sm">Profit/Loss</th>
                <th class="pb-3 text-xs sm:text-sm"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="item in portfolio" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="py-3">
                  <div class="flex items-center">
                    <img :src="item.image" :alt="item.name" class="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 sm:mr-3" />
                    <div>
                      <p class="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{{ item.name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ item.symbol.toUpperCase() }}</p>
                    </div>
                  </div>
                </td>
                <td class="text-right font-medium text-sm sm:text-base">{{ item.amount }} <span class="text-gray-500 dark:text-gray-400">{{ item.symbol.toUpperCase() }}</span></td>
                <td class="text-right text-sm sm:text-base">{{ formatCurrency(item.avg_buy_price) }}</td>
                <td class="text-right text-sm sm:text-base">{{ formatCurrency(item.current_price) }}</td>
                <td class="text-right text-sm sm:text-base" :class="item.profit >= 0 ? 'text-green-500' : 'text-red-500'">
                  {{ item.profit >= 0 ? '+' : '' }}{{ formatCurrency(item.profit) }} ({{ item.profit_percentage >= 0 ? '+' : '' }}{{ item.profit_percentage.toFixed(2) }}%)
                </td>
                <td class="text-right">
                  <button class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                    <EllipsisHorizontalIcon class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Converter - Full width on mobile -->
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6">
        <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Crypto Converter</h2>
        <div class="space-y-3 sm:space-y-4">
          <div>
            <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
            <div class="relative">
              <input 
                v-model="convertAmount" 
                type="number" 
                class="w-full pl-3 pr-16 sm:pr-20 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="0.00"
              >
              <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                <select 
                  v-model="convertFrom" 
                  class="bg-gray-100 dark:bg-gray-600 border-none text-xs sm:text-sm rounded-lg px-2 py-1"
                >
                  <option v-for="crypto in convertCryptos" :key="crypto.id" :value="crypto.id">
                    {{ crypto.symbol.toUpperCase() }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="flex justify-center">
            <button @click="swapConversion" class="p-1.5 sm:p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
              <ArrowDownIcon class="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          
          <div>
            <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
            <div class="relative">
              <input 
                :value="convertedAmount" 
                type="text" 
                readonly
                class="w-full pl-3 pr-16 sm:pr-20 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
              >
              <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                <select 
                  v-model="convertTo" 
                  class="bg-gray-100 dark:bg-gray-600 border-none text-xs sm:text-sm rounded-lg px-2 py-1"
                >
                  <option v-for="crypto in convertCryptos" :key="crypto.id" :value="crypto.id">
                    {{ crypto.symbol.toUpperCase() }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          
          <button 
            @click="executeConversion"
            class="w-full mt-3 sm:mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm sm:text-base"
          >
            Convert
          </button>
        </div>
      </div>
    </div>

    <!-- Buy/Sell Modals -->
    <BuySellModal 
      :show="showTradeModal" 
      :type="tradeType" 
      :coin="selectedCoin" 
      @close="showTradeModal = false" 
      @confirm="handleTrade"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { IconCoinBitcoinFilled} from '@tabler/icons-vue'

import { 
  ChartBarIcon,
  ArrowsRightLeftIcon,
  BoltIcon,
  EllipsisHorizontalIcon,
  ArrowDownIcon
} from '@heroicons/vue/24/outline'
import CryptoPriceChart from '../components/CryptoPriceChart.vue'
import BuySellModal from '../components/BuySellModal.vue'

// Sample data - replace with real API calls
const globalData = ref({
  total_market_cap: { usd: 190456 },
  market_cap_change_percentage_24h_usd: 2.34,
  total_volume: { usd: 420945 },
  active_cryptocurrencies: 7309,
  market_cap_percentage: { btc: 42.3 },
  updated_at: Date.now()
})

const volumeChange = ref(5.67)
const btcDominanceChange = ref(0.5)
const newCoinsLast30Days = ref(142)

const topCryptos = ref([
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    image: '/crypto/btc.png',
    current_price: 42563.42,
    price_change_percentage_24h: 1.23,
    market_cap: 825632145987
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    image: '/crypto/eth.png',
    current_price: 2543.21,
    price_change_percentage_24h: -0.45,
    market_cap: 305214785632
  },
  {
    id: 'binancecoin',
    name: 'Binance Coin',
    symbol: 'bnb',
    image: '/crypto/bnb.png',
    current_price: 324.56,
    price_change_percentage_24h: 3.21,
    market_cap: 50123654789
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'sol',
    image: '/crypto/sol.png',
    current_price: 102.45,
    price_change_percentage_24h: 5.67,
    market_cap: 45213654789
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'xrp',
    image: '/crypto/xrp.png',
    current_price: 0.5632,
    price_change_percentage_24h: -1.23,
    market_cap: 30125478963
  }
])

const selectedCoin = ref(topCryptos.value[0])
const chartPeriod = ref('24H')

const portfolio = ref([
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    image: '/crypto/btc.png',
    amount: 0.42,
    avg_buy_price: 38214.56,
    current_price: 42563.42,
    profit: (0.42 * 42563.42) - (0.42 * 38214.56),
    profit_percentage: ((42563.42 - 38214.56) / 38214.56) * 100
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    image: '/crypto/eth.png',
    amount: 3.2,
    avg_buy_price: 2145.32,
    current_price: 2543.21,
    profit: (3.2 * 2543.21) - (3.2 * 2145.32),
    profit_percentage: ((2543.21 - 2145.32) / 2145.32) * 100
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'sol',
    image: '/crypto/sol.png',
    amount: 15,
    avg_buy_price: 85.32,
    current_price: 102.45,
    profit: (15 * 102.45) - (15 * 85.32),
    profit_percentage: ((102.45 - 85.32) / 85.32) * 100
  }
])

// Converter
const convertCryptos = ref([
  { id: 'bitcoin', symbol: 'btc', price: 42563.42 },
  { id: 'ethereum', symbol: 'eth', price: 2543.21 },
  { id: 'binancecoin', symbol: 'bnb', price: 324.56 },
  { id: 'solana', symbol: 'sol', price: 102.45 },
  { id: 'ripple', symbol: 'xrp', price: 0.5632 },
  { id: 'usd', symbol: 'usd', price: 1 }
])

const convertAmount = ref('')
const convertFrom = ref('bitcoin')
const convertTo = ref('usd')

const convertedAmount = computed(() => {
  if (!convertAmount.value) return '0.00'
  
  const fromCrypto = convertCryptos.value.find(c => c.id === convertFrom.value)
  const toCrypto = convertCryptos.value.find(c => c.id === convertTo.value)
  
  if (!fromCrypto || !toCrypto) return '0.00'
  
  const amountInUSD = parseFloat(convertAmount.value) * fromCrypto.price
  const converted = amountInUSD / toCrypto.price
  
  return converted.toFixed(8).replace(/\.?0+$/, '')
})

// Buy/Sell Modal
const showTradeModal = ref(false)
const tradeType = ref('buy')

const openBuyModal = () => {
  tradeType.value = 'buy'
  showTradeModal.value = true
}

const openSellModal = () => {
  tradeType.value = 'sell'
  showTradeModal.value = true
}

const handleTrade = (data) => {
  console.log(`${data.type} ${data.amount} ${data.coin.symbol} at ${data.price}`)
  showTradeModal.value = false
}

// Helper methods
const selectCoin = (coin) => {
  selectedCoin.value = coin
}

const swapConversion = () => {
  const temp = convertFrom.value
  convertFrom.value = convertTo.value
  convertTo.value = temp
}

const executeConversion = () => {
  alert(`Converted ${convertAmount.value} ${convertFrom.value} to ${convertedAmount.value} ${convertTo.value}`)
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

// Fetch real data on mount
onMounted(async () => {
})
</script>

<style>
* {
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
</style>