<script setup>
import { Chart } from 'vue-tradingview-widgets';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SwiperClass from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
SwiperClass.use([Navigation, Pagination, Autoplay]);

import { ref, computed, watch } from 'vue';

const currentTheme = ref(localStorage.getItem('theme') || 'dark');

const chartOptions = computed(() => ({
  theme: currentTheme.value,
  width: '100%',
  height: 600,
  timezone: 'Etc/UTC',
  style: '10',
  locale: 'in',
  interval: 'D',
  allow_symbol_change: true,
  enable_publishing: true,
  withdateranges: true,
  symbol: "FXOPEN:XAUUSD",
  hide_side_toolbar: true,
  showSymbolLogo: true,
  details: true,
  hotlist: true,
  calendar: true,
  environment: 'production' 
}));

// Top cryptocurrencies data
const coinList = [
  { id: 1, name: "Bitcoin", image: "BTC.PNG", symbol: "BTC" },
  { id: 2, name: "Ethereum", image: "ETH.PNG", symbol: "ETH" },
  { id: 3, name: "Binance Coin", image: "BNB.PNG", symbol: "BNB" },
  { id: 4, name: "Litecoin", image: "LTC.PNG", symbol: "LTC" },
  { id: 5, name: "XRP", image: "XRP.PNG", symbol: "XRP" },
  { id: 6, name: "TrueUSD", image: "TUSD.PNG", symbol: "TUSD" },
  { id: 7, name: "TRON", image: "TRX.PNG", symbol: "TRX" },
  { id: 8, name: "USD Coin", image: "USDC.PNG", symbol: "USDC" }
];

// Helper functions
const getRandomPrice = () => (Math.random() * 10000).toFixed(2);
const getRandomChange = () => (Math.random() * 10 - 5).toFixed(2);
const getImageUrl = (imageName) => `/crypto/${imageName.toLowerCase()}`;
const formatPrice = (price) =>
  parseFloat(price).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 6 });
const formatChangePercent = (percent) => (percent > 0 ? `+${percent}%` : `${percent}%`);

const cryptoList = ref(
  coinList.map(coin => ({
    ...coin,
    price: getRandomPrice(),
    change24h: getRandomChange()
  }))
);

watch(currentTheme, (newTheme) => {
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
  localStorage.setItem('theme', newTheme);
}, { immediate: true });
</script>

<template>
  <div class="mt-4 space-y-8">
    <div class="relative">
      <Swiper
        v-if="cryptoList.length > 0"
        :slides-per-view="4"
        :space-between="15"
        navigation
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :breakpoints="{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 }
        }"
      >
        <SwiperSlide
          v-for="coin in cryptoList"
          :key="coin.id"
          class="text-gray-900 dark:text-white p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl transition-colors flex flex-col items-center justify-center h-44"
        >
          <img 
            :src="getImageUrl(coin.image)" 
            :alt="coin.name" 
            class="w-12 h-12 mb-2 object-contain"
            @error="(e) => e.target.src = '/crypto/generic.png'"
          >
          <div class="text-center">
            <h3 class="font-bold text-lg">{{ coin.symbol }}/USD</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[100px] mx-auto">{{ coin.name }}</p>
            <p class="mt-1 font-medium">{{ formatPrice(coin.price) }}</p>
            <p 
              class="text-sm mt-1 px-2 py-1 rounded" 
              :class="coin.change24h > 0 ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30' : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'"
            >
              {{ formatChangePercent(coin.change24h) }}
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- TradingView Chart -->
    <Chart :options="chartOptions" />
  </div>
</template>

<style scoped>
.swiper-button-next,
.swiper-button-prev {
  color: var(--text-color);
}
.swiper-pagination-bullet {
  background: var(--text-color);
}

:root {
  --text-color: #1f2937; 
}
.dark {
  --text-color: #f9fafb;
}
</style>