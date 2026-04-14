<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 md:p-6 space-y-6 mx-auto max-w-screen-2xl overflow-x-hidden">
    <!-- Header - Stacked on mobile -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">NFT Marketplace Dashboard</h1>
        <p class="text-gray-500 dark:text-gray-400">Welcome back, Creator 👋</p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 sm:items-center w-full md:w-auto">
        <div class="flex flex-col xs:flex-row gap-3 w-full">
          <div class="relative w-full">
            <input
              v-model="search"
              type="text"
              placeholder="Search collections, NFTs, users…"
              class="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <div class="flex gap-3 w-full xs:w-auto">
            <select v-model="timeframe" class="w-full xs:w-auto px-3 py-2 rounded-xl border text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <option value="24h">24h</option>
              <option value="7d">7d</option>
              <option value="30d">30d</option>
              <option value="all">All</option>
            </select>

            <select v-model="chain" class="w-full xs:w-auto px-3 py-2 rounded-xl border text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <option value="all">All Chains</option>
              <option value="eth">Ethereum</option>
              <option value="poly">Polygon</option>
              <option value="sol">Solana</option>
            </select>
          </div>
        </div>

        <div class="flex gap-2 w-full sm:w-auto">
          <button class="w-full sm:w-auto px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm flex items-center justify-center">
            <Cog6ToothIcon class="w-5 h-5 mr-1" /> <span class="hidden sm:inline">Settings</span>
          </button>
          <button class="w-full sm:w-auto px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition text-sm flex items-center justify-center">
            <WalletIcon class="w-5 h-5 mr-1" /> <span class="hidden sm:inline">Connect</span>
          </button>
        </div>
      </div>
    </div>

    <!-- KPI Cards - 2 cols on mobile -->
    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40 p-4">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">Total Volume ({{ timeframeLabel }})</p>
            <p class="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white">{{ formatETH(kpis.totalVolumeEth) }}</p>
          </div>
          <ChartBarIcon class="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div class="mt-2 md:mt-3 flex items-center gap-1 text-xs md:text-sm" :class="kpis.volumeChange >= 0 ? 'text-green-600' : 'text-red-500'">
          <ArrowTrendingUpIcon v-if="kpis.volumeChange >= 0" class="w-4 h-4 md:w-5 md:h-5" />
          <ArrowTrendingDownIcon v-else class="w-4 h-4 md:w-5 md:h-5" />
          <span>{{ signed(kpis.volumeChange) }}%</span>
        </div>
        <Sparkline :points="sparklines.volume" class="mt-2 md:mt-3 h-8 md:h-10" />
      </div>

      <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/40 p-4">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">Avg. Floor</p>
            <p class="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white">{{ formatETH(kpis.avgFloor) }}</p>
          </div>
          <Squares2X2Icon class="w-6 h-6 md:w-8 md:h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div class="mt-2 md:mt-3 flex items-center gap-1 text-xs md:text-sm" :class="kpis.floorChange >= 0 ? 'text-green-600' : 'text-red-500'">
          <ArrowTrendingUpIcon v-if="kpis.floorChange >= 0" class="w-4 h-4 md:w-5 md:h-5" />
          <ArrowTrendingDownIcon v-else class="w-4 h-4 md:w-5 md:h-5" />
          <span>{{ signed(kpis.floorChange) }}%</span>
        </div>
        <Sparkline :points="sparklines.floor" class="mt-2 md:mt-3 h-8 md:h-10" />
      </div>

      <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/40 p-4">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">Active Traders</p>
            <p class="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white">{{ kpis.activeTraders.toLocaleString() }}</p>
          </div>
          <UsersIcon class="w-6 h-6 md:w-8 md:h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <div class="mt-2 md:mt-3 flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>New: {{ kpis.newTraders.toLocaleString() }}</span>
        </div>
        <Sparkline :points="sparklines.traders" class="mt-2 md:mt-3 h-8 md:h-10" />
      </div>

      <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/40 p-4">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">NFTs Listed</p>
            <p class="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white">{{ kpis.listed.toLocaleString() }}</p>
          </div>
          <PhotoIcon class="w-6 h-6 md:w-8 md:h-8 text-amber-600 dark:text-amber-400" />
        </div>
        <div class="mt-2 md:mt-3">
          <div class="w-full h-1.5 md:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div class="h-full bg-amber-500 dark:bg-amber-400" :style="{ width: kpis.listedProgress + '%' }"></div>
          </div>
          <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">{{ kpis.listedProgress }}% of goal</p>
        </div>
      </div>
    </div>

    <!-- Middle: Top Collections + Live Auctions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Top Collections -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Top Collections ({{ timeframeLabel }})</h2>
          <div class="flex gap-2">
            <button
              v-for="t in ['24h','7d','30d']"
              :key="t"
              @click="timeframe = t"
              class="px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm font-medium"
              :class="timeframe === t ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
            >
              {{ t }}
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[800px] md:min-w-0">
            <thead>
              <tr class="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                <th class="pb-3">Collection</th>
                <th class="pb-3 text-right">Floor</th>
                <th class="pb-3 text-right">Volume</th>
                <th class="pb-3 text-right">Sales</th>
                <th class="pb-3 text-right">Chg</th>
                <th class="pb-3 text-right">Items</th>
                <th class="pb-3 text-right">Owners</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="col in filteredCollections"
                :key="col.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td class="py-3">
                  <div class="flex items-center">
                    <img :src="col.logo" :alt="col.name" class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl mr-2 sm:mr-3 object-cover" />
                    <div>
                      <p class="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{{ col.name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ col.chainLabel }}</p>
                    </div>
                  </div>
                </td>
                <td class="text-right font-medium text-sm sm:text-base">{{ formatETH(col.floor) }}</td>
                <td class="text-right font-medium text-sm sm:text-base">{{ formatETH(col.volume[timeframe]) }}</td>
                <td class="text-right text-sm sm:text-base">{{ col.sales[timeframe].toLocaleString() }}</td>
                <td class="text-right text-sm sm:text-base" :class="col.change[timeframe] >= 0 ? 'text-green-500' : 'text-red-500'">
                  {{ signed(col.change[timeframe]) }}%
                </td>
                <td class="text-right text-sm sm:text-base">{{ col.items.toLocaleString() }}</td>
                <td class="text-right text-sm sm:text-base">{{ col.owners.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Live Auctions -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Live Auctions</h2>
          <button class="text-sm text-blue-600 dark:text-blue-400 hover:underline">View all</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <div
            v-for="a in liveAuctions"
            :key="a.id"
            class="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <div class="aspect-[16/10] bg-gray-100 dark:bg-gray-700">
              <img :src="a.image" class="w-full h-full object-cover" :alt="a.title" />
            </div>
            <div class="p-3 space-y-2">
              <div class="flex items-center justify-between">
                <p class="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{{ a.title }}</p>
                <span class="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  {{ a.chainLabel }}
                </span>
              </div>
              <div class="flex items-center justify-between text-xs sm:text-sm">
                <div class="text-gray-600 dark:text-gray-300">
                  Current Bid: <span class="font-semibold">{{ formatETH(a.currentBid) }}</span>
                </div>
                <div class="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                  <ClockIcon class="w-3 h-3 sm:w-4 sm:h-4" /> <span :class="a.timeLeft.labelClass">{{ a.timeLeft.label }}</span>
                </div>
              </div>
              <button class="w-full mt-1 py-1.5 sm:py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-xs sm:text-sm">
                Place Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom: Top Sellers + Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Top Sellers -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Top Sellers</h2>
          <div class="flex gap-2">
            <button
              v-for="t in ['24h','7d','30d','all']"
              :key="t"
              @click="sellerRange = t"
              class="px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm font-medium"
              :class="sellerRange === t ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
            >
              {{ t.toUpperCase() }}
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[800px] md:min-w-0">
            <thead>
              <tr class="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                <th class="pb-3">Creator</th>
                <th class="pb-3 text-right">Sales</th>
                <th class="pb-3 text-right">Volume</th>
                <th class="pb-3 text-right">Avg. Price</th>
                <th class="pb-3 text-right">Win Rate</th>
                <th class="pb-3 text-right">Trend</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="s in rankedSellers" :key="s.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="py-3">
                  <div class="flex items-center">
                    <img :src="s.avatar" :alt="s.name" class="w-8 h-8 sm:w-9 sm:h-9 rounded-full mr-2 sm:mr-3 object-cover" />
                    <div>
                      <p class="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{{ s.name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ s.username }}</p>
                    </div>
                  </div>
                </td>
                <td class="text-right text-sm sm:text-base">{{ s.sales[sellerRange].toLocaleString() }}</td>
                <td class="text-right font-medium text-sm sm:text-base">{{ formatETH(s.volume[sellerRange]) }}</td>
                <td class="text-right text-sm sm:text-base">{{ formatETH(s.avgPrice[sellerRange]) }}</td>
                <td class="text-right text-sm sm:text-base" :class="s.winRate[sellerRange] >= 50 ? 'text-green-500' : 'text-amber-500'">
                  {{ s.winRate[sellerRange] }}%
                </td>
                <td class="text-right">
                  <Sparkline :points="s.trend" height="24" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          <button class="text-sm text-blue-600 dark:text-blue-400 hover:underline">View all</button>
        </div>

        <div class="space-y-4">
          <div v-for="a in recentActivity" :key="a.id" class="flex items-start">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 mr-2 sm:mr-3 flex-shrink-0">
              <img :src="a.image" class="w-full h-full object-cover" :alt="a.title" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <p class="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">{{ a.title }}</p>
                <span class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">{{ a.time }}</span>
              </div>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                <strong>{{ a.user }}</strong> {{ a.action }}
                <span v-if="a.price"> for <strong>{{ formatETH(a.price) }}</strong></span>
              </p>
              <div class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ a.collection }} • {{ a.chainLabel }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  WalletIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  Squares2X2Icon,
  UsersIcon,
  PhotoIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'

export default {
  components: {
    MagnifyingGlassIcon,
    Cog6ToothIcon,
    WalletIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    Squares2X2Icon,
    UsersIcon,
    PhotoIcon,
    ClockIcon
  },
  setup() {
    // State
    const search = ref('')
    const timeframe = ref('24h') // 24h, 7d, 30d, all
    const chain = ref('all')
    const timeframeLabel = computed(() => timeframe.value.toUpperCase())
    const sellerRange = ref('24h')

    // KPIs + mini sparklines
    const kpis = ref({
      totalVolumeEth: 12450.72,
      volumeChange: 12.5,
      avgFloor: 0.82,
      floorChange: -3.1,
      activeTraders: 18452,
      newTraders: 1294,
      listed: 48210,
      listedProgress: 64
    })
    const sparklines = ref({
      volume: [2,4,3,6,8,6,9,12,11,14,13,16],
      floor: [1.2,1.1,0.98,0.92,0.86,0.88,0.84,0.83,0.82,0.85,0.83,0.82],
      traders: [5,6,7,9,10,12,13,12,14,15,14,16]
    })

    // Collections
       const collections = ref([
      {
        id: 1,
        name: 'Cosmic Tigers',
        logo: '/nft/nft-01.jpeg',
        chain: 'eth',
        chainLabel: 'Ethereum',
        floor: 0.42,
        items: 7777,
        owners: 5201,
        volume: { '24h': 382.1, '7d': 2140.3, '30d': 8120.5, all: 19640.8 },
        sales: { '24h': 612, '7d': 3420, '30d': 12140, all: 28420 },
        change: { '24h': 18.4, '7d': 12.1, '30d': 4.2, all: 0.0 }
      },
      {
        id: 2,
        name: 'Pixel Pirates',
        logo: '/nft/nft-02.jpeg',
        chain: 'poly',
        chainLabel: 'Polygon',
        floor: 12.4,
        items: 5000,
        owners: 3011,
        volume: { '24h': 128.7, '7d': 890.2, '30d': 3210.1, all: 8450.9 },
        sales: { '24h': 310, '7d': 1410, '30d': 5210, all: 13002 },
        change: { '24h': -6.8, '7d': 3.2, '30d': 7.9, all: 0.0 }
      },
      {
        id: 3,
        name: 'Neon Drifters',
        logo: '/nft/nft-03.jpeg',
        chain: 'sol',
        chainLabel: 'Solana',
        floor: 18.2,
        items: 10000,
        owners: 7812,
        volume: { '24h': 220.3, '7d': 1340.4, '30d': 4670.8, all: 11040.2 },
        sales: { '24h': 410, '7d': 2412, '30d': 8011, all: 18210 },
        change: { '24h': 9.1, '7d': -2.6, '30d': 5.1, all: 0.0 }
      },
      {
        id: 4,
        name: 'Meta Monkeys',
        logo: '/nft/nft-04.jpeg',
        chain: 'eth',
        chainLabel: 'Ethereum',
        floor: 1.25,
        items: 8888,
        owners: 6543,
        volume: { '24h': 245.6, '7d': 1780.9, '30d': 6540.2, all: 15420.7 },
        sales: { '24h': 432, '7d': 2876, '30d': 9876, all: 23456 },
        change: { '24h': 8.2, '7d': 5.7, '30d': 3.9, all: 0.0 }
      },
      {
        id: 5,
        name: 'Cyber Kitties',
        logo: '/nft/nft-05.jpeg',
        chain: 'eth',
        chainLabel: 'Ethereum',
        floor: 0.88,
        items: 9999,
        owners: 7123,
        volume: { '24h': 198.4, '7d': 1420.5, '30d': 5210.8, all: 13210.3 },
        sales: { '24h': 387, '7d': 2310, '30d': 8210, all: 19876 },
        change: { '24h': -2.4, '7d': 1.8, '30d': 4.7, all: 0.0 }
      },
      {
        id: 6,
        name: 'Astro Apes',
        logo: '/nft/nft-06.jpeg',
        chain: 'sol',
        chainLabel: 'Solana',
        floor: 15.7,
        items: 6666,
        owners: 5123,
        volume: { '24h': 187.3, '7d': 1320.4, '30d': 4870.1, all: 12450.9 },
        sales: { '24h': 356, '7d': 2210, '30d': 7654, all: 18765 },
        change: { '24h': 5.6, '7d': 3.2, '30d': 6.8, all: 0.0 }
      },
      {
        id: 7,
        name: 'Digital Dragons',
        logo: '/nft/nft-07.jpeg',
        chain: 'poly',
        chainLabel: 'Polygon',
        floor: 8.9,
        items: 5555,
        owners: 4321,
        volume: { '24h': 156.2, '7d': 1120.7, '30d': 4210.4, all: 11230.6 },
        sales: { '24h': 321, '7d': 1987, '30d': 6543, all: 16543 },
        change: { '24h': -1.2, '7d': 2.5, '30d': 5.3, all: 0.0 }
      },
      {
        id: 8,
        name: 'Pixel Punks',
        logo: '/nft/nft-08.jpeg',
        chain: 'eth',
        chainLabel: 'Ethereum',
        floor: 22.5,
        items: 10000,
        owners: 8234,
        volume: { '24h': 289.7, '7d': 1980.3, '30d': 7210.8, all: 18760.4 },
        sales: { '24h': 498, '7d': 3210, '30d': 10987, all: 28765 },
        change: { '24h': 12.3, '7d': 8.7, '30d': 6.5, all: 0.0 }
      },
      {
        id: 9,
        name: 'Space Sharks',
        logo: '/nft/nft-09.jpeg',
        chain: 'sol',
        chainLabel: 'Solana',
        floor: 9.8,
        items: 7777,
        owners: 6123,
        volume: { '24h': 167.8, '7d': 1210.5, '30d': 4560.7, all: 12340.9 },
        sales: { '24h': 345, '7d': 2109, '30d': 7654, all: 18765 },
        change: { '24h': 4.5, '7d': 3.1, '30d': 5.9, all: 0.0 }
      },
      {
        id: 10,
        name: 'Galactic Gorillas',
        logo: '/nft/nft-10.jpeg',
        chain: 'poly',
        chainLabel: 'Polygon',
        floor: 5.6,
        items: 8888,
        owners: 7123,
        volume: { '24h': 134.5, '7d': 987.6, '30d': 3870.2, all: 10980.5 },
        sales: { '24h': 298, '7d': 1876, '30d': 6543, all: 16543 },
        change: { '24h': -3.2, '7d': 1.5, '30d': 4.2, all: 0.0 }
      },
      {
        id: 11,
        name: 'Neon Ninjas',
        logo: '/nft/nft-11.jpeg',
        chain: 'eth',
        chainLabel: 'Ethereum',
        floor: 2.8,
        items: 6666,
        owners: 5432,
        volume: { '24h': 187.3, '7d': 1320.4, '30d': 4870.1, all: 12450.9 },
        sales: { '24h': 356, '7d': 2210, '30d': 7654, all: 18765 },
        change: { '24h': 5.6, '7d': 3.2, '30d': 6.8, all: 0.0 }
      },
      {
        id: 12,
        name: 'Cyber Samurai',
        logo: '/nft/nft-12.jpeg',
        chain: 'sol',
        chainLabel: 'Solana',
        floor: 7.2,
        items: 5555,
        owners: 4321,
        volume: { '24h': 156.2, '7d': 1120.7, '30d': 4210.4, all: 11230.6 },
        sales: { '24h': 321, '7d': 1987, '30d': 6543, all: 16543 },
        change: { '24h': -1.2, '7d': 2.5, '30d': 5.3, all: 0.0 }
      }
    ])


    const liveAuctions = ref([
      {
        id: 'a1',
        title: 'Tiger #1299',
        image: '/nft/nft-13.jpeg',
        endAt: Date.now() + 1000 * 60 * 42, // 42 min
        currentBid: 0.29,
        chain: 'eth',
        chainLabel: 'ETH',
        timeLeft: { label: '', labelClass: '' }
      },
      {
        id: 'a2',
        title: 'Drifter #072',
        image: '/nft/nft-14.jpeg',
        endAt: Date.now() + 1000 * 60 * 8 + 1000 * 30, // 8:30
        currentBid: 1.84,
        chain: 'sol',
        chainLabel: 'SOL',
        timeLeft: { label: '', labelClass: '' }
      },
      {
        id: 'a3',
        title: 'Pixel Pirate #499',
        image: '/nft/nft-15.jpeg',
        endAt: Date.now() + 1000 * 60 * 120, // 2h
        currentBid: 12.2,
        chain: 'poly',
        chainLabel: 'POLY',
        timeLeft: { label: '', labelClass: '' }
      }
    ])

    // Top Sellers
    const sellers = ref([
      {
        id: 's1',
        name: 'Ava Studio',
        username: '@avastudio',
        avatar: '/nft/nft-16.jpeg',
        volume: { '24h': 420.4, '7d': 2204.2, '30d': 6422.7, all: 15022.9 },
        sales:  { '24h': 210,  '7d': 1284,   '30d': 3922,   all: 10044 },
        avgPrice:{ '24h': 2.0, '7d': 1.71,   '30d': 1.64,   all: 1.49 },
        winRate: { '24h': 56,  '7d': 61,     '30d': 63,     all: 60 },
        trend: [4,5,6,7,9,8,10,11,12,13,12,14]
      },
      {
        id: 's2',
        name: 'Neon Labs',
        username: '@neon',
        avatar: '/nft/nft-17.jpeg',
        volume: { '24h': 318.3, '7d': 1484.7, '30d': 4120.1, all: 10012.4 },
        sales:  { '24h': 260,   '7d': 1010,   '30d': 3104,   all: 8104 },
        avgPrice:{ '24h': 1.22, '7d': 1.47,   '30d': 1.33,   all: 1.24 },
        winRate: { '24h': 48,   '7d': 52,     '30d': 55,     all: 53 },
        trend: [3,4,4,6,6,7,8,8,9,9,10,11]
      },
      {
        id: 's3',
        name: 'Pirate House',
        username: '@pirate',
        avatar: '/nft/nft-18.jpeg',
        volume: { '24h': 220.1, '7d': 1114.3, '30d': 3321.8, all: 7901.8 },
        sales:  { '24h': 150,   '7d': 812,    '30d': 2312,   all: 6002 },
        avgPrice:{ '24h': 1.46, '7d': 1.37,   '30d': 1.44,   all: 1.32 },
        winRate: { '24h': 62,   '7d': 59,     '30d': 57,     all: 58 },
        trend: [2,3,5,4,6,7,7,8,9,8,10,10]
      }
    ])

    // Recent activity
    const recentActivity = ref([
      {
        id: 'ra1', title: 'Tiger #3456', image: '/nft/nft-13.jpeg',
        user: 'Ava Studio', action: 'sold', price: 0.64, time: '2m ago',
        collection: 'Cosmic Tigers', chainLabel: 'ETH'
      },
      {
        id: 'ra2', title: 'Drifter #091', image: '/nft/nft-14.jpeg',
        user: 'Neon Labs', action: 'listed', price: 1.22, time: '12m ago',
        collection: 'Neon Drifters', chainLabel: 'SOL'
      },
      {
        id: 'ra3', title: 'Pirate #777', image: '/nft/nft-15.jpeg',
        user: 'Pirate House', action: 'minted', price: null, time: '1h ago',
        collection: 'Pixel Pirates', chainLabel: 'POLY'
      }
    ])

    // Computed: Filters + Rankings
    const filteredCollections = computed(() => {
      let list = collections.value
      if (chain.value !== 'all') list = list.filter(c => c.chain === chain.value)
      if (search.value.trim()) {
        const q = search.value.toLowerCase()
        list = list.filter(c => c.name.toLowerCase().includes(q))
      }
      // Rank by volume for current timeframe (descending)
      return [...list].sort((a, b) => b.volume[timeframe.value] - a.volume[timeframe.value])
    })

    const rankedSellers = computed(() => {
      // Composite score: volume weight 0.6 + winRate 0.25 + sales 0.15 (normalized quickly)
      const t = sellerRange.value
      const vols = sellers.value.map(s => s.volume[t])
      const salesArr = sellers.value.map(s => s.sales[t])
      const maxV = Math.max(...vols), maxS = Math.max(...salesArr)
      const score = s => ( (s.volume[t]/maxV)*0.6 + (s.winRate[t]/100)*0.25 + (s.sales[t]/maxS)*0.15 )
      return [...sellers.value].sort((a,b) => score(b) - score(a))
    })

    // Helpers
    const formatETH = (v) => `${Number(v).toLocaleString(undefined,{maximumFractionDigits:2})} ETH`
    const signed = (n) => (n >= 0 ? `+${n}` : `${n}`)

    // Auction countdown
    let timer
    const tickAuctions = () => {
      const now = Date.now()
      liveAuctions.value.forEach(a => {
        const diff = a.endAt - now
        if (diff <= 0) {
          a.timeLeft = { label: 'Ended', labelClass: 'text-red-500' }
        } else {
          const m = Math.floor(diff/60000)
          const s = Math.floor((diff%60000)/1000)
          const h = Math.floor(m/60)
          const mm = m % 60
          const label = h > 0 ? `${h}h ${mm}m` : `${mm}m ${s}s`
          const labelClass = m < 10 ? 'text-amber-500 font-medium' : 'text-gray-700 dark:text-gray-200'
          a.timeLeft = { label, labelClass }
        }
      })
    }

    onMounted(() => {
      tickAuctions()
      timer = setInterval(tickAuctions, 1000)
    })
    onUnmounted(() => {
      if (timer) clearInterval(timer)
    })

    return {
      search,
      timeframe,
      chain,
      timeframeLabel,
      sellerRange,
      kpis,
      sparklines,
      collections,
      liveAuctions,
      sellers,
      recentActivity,
      filteredCollections,
      rankedSellers,
      formatETH,
      signed
    }
  }
}
</script>

<style>
* { transition: background-color .2s ease, border-color .2s ease, color .2s ease; }
</style>