<script setup>
import { ref } from 'vue'

const formatCurrency = (value) => value.toLocaleString(undefined, { minimumFractionDigits: 2 })
const formatNumber = (value) => value.toLocaleString()

const app = {
  settings: { symbol: '$' }
}

const investments = [
  {
    id: 1,
    name: 'Starter Plan',
    investments_type: 1,
    fixed_amount: 0,
    minimum: 100,
    maximum: 500,
    interest: 5,
    reward: 2,
    sponsor_income: 1,
    schedule_name: 'Day',
    repeat_duration: 30,
    life_time: 0,
    popular: false
  },
  {
    id: 2,
    name: 'Pro Plan',
    investments_type: 2,
    fixed_amount: 1000,
    minimum: 0,
    maximum: 0,
    interest: 8,
    reward: 3,
    sponsor_income: 2,
    schedule_name: 'Week',
    repeat_duration: 12,
    life_time: 0,
    popular: true
  },
  {
    id: 3,
    name: 'Elite Plan',
    investments_type: 2,
    fixed_amount: 5000,
    minimum: 0,
    maximum: 0,
    interest: 12,
    reward: 5,
    sponsor_income: 3,
    schedule_name: 'Month',
    repeat_duration: 6,
    life_time: 1,
    popular: false
  }
]
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Investment Plans
        </h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Choose the perfect plan that fits your financial goals
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(investment, idx) in investments"
          :key="idx"
          class="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          :class="{ 'ring-2 ring-blue-500': investment.popular }"
        >
          <!-- Popular badge -->
          <div 
            v-if="investment.popular"
            class="absolute top-4 right-0 bg-blue-500 rounded-2xl text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12"
          >
            POPULAR
          </div>

          <div class="p-6">
            <div class="text-center mb-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ investment.name }}
              </h3>
              
              <div class="flex justify-center items-baseline my-4">
                <span 
                  v-if="investment.fixed_amount === 0"
                  class="text-gray-900 dark:text-white"
                >
                  <span class="text-3xl font-bold">
                    {{ formatNumber(investment.minimum) }}
                  </span>
                  <span class="text-xl">- {{ formatNumber(investment.maximum) }}</span>
                  <span class="text-lg ml-1">{{ app.settings.symbol }}</span>
                </span>
                <span 
                  v-else
                  class="text-gray-900 dark:text-white"
                >
                  <span class="text-3xl font-bold">
                    {{ formatCurrency(investment.fixed_amount) }}
                  </span>
                  <span class="text-lg ml-1">{{ app.settings.symbol }}</span>
                </span>
              </div>
            </div>

            <div class="space-y-4 mb-8">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">
                  <span class="font-semibold">{{ formatNumber(investment.interest) }}%</span> Daily Interest
                </span>
              </div>
              
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">
                  <span class="font-semibold">{{ formatNumber(investment.reward) }}%</span> Reward
                </span>
              </div>
              
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">
                  <span class="font-semibold">{{ investment.sponsor_income }}%</span> Referral Bonus
                </span>
              </div>
              
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">
                  Duration: 
                  <span class="font-semibold">
                    {{ investment.life_time === 0
                      ? `${investment.repeat_duration} ${investment.schedule_name}s`
                      : 'Lifetime' }}
                  </span>
                </span>
              </div>
            </div>

            <button
              class="w-full bg-blue-500 hover:bg-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Invest Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>