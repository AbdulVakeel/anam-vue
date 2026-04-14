<template> 

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div 
        v-for="stat in stats" 
        :key="stat.id"
        class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
            <h3 class="text-2xl font-bold mt-1">{{ stat.value }}</h3>
          </div>
          <div class="p-3 rounded-lg" :class="stat.color">
            <component :is="stat.icon" class="h-6 w-6" />
          </div>
        </div>
        <div class="flex items-center mt-4" :class="stat.changeColor">
          <component :is="stat.changeIcon" class="h-4 w-4 mr-1" />
          <span class="text-sm">{{ stat.change }}</span>
        </div>
      </div>
    </div>

 <section class="py-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
  <div class="max-w-7xl mx-auto px-6">
    <div class="grid md:grid-cols-4 gap-6">
      <div
        v-for="(gateway, index) in paymentGateways"
        :key="index"
        class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center hover:shadow-xl transition"
      >
        <div class="flex justify-center mb-4">
          <Icon :icon="gateway.icon" class="text-yellow-400" width="48" height="48" />
        </div>
        <h3 class="text-xl font-semibold mb-2">{{ gateway.title }}</h3>
        <p class="text-gray-400 text-sm">{{ gateway.description }}</p>
      </div>
    </div>
  </div>
</section>


</template>

<script setup>
import { Icon } from '@iconify/vue'
import StatCard from '../components/StatCard.vue'

import { ref } from 'vue'
import { 
  UserIcon, 
  CurrencyDollarIcon, 
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowPathIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  ChartBarIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

const stats = [
  { 
    id: 1, 
    icon: ShoppingCartIcon, 
    label: "Total Sales", 
    value: "2,358", 
    change: "+23%", 
    changeIcon: ArrowUpIcon,
    color: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
    changeColor: "text-green-500"
  },
  { 
    id: 2, 
    icon: ArrowPathIcon, 
    label: "Refunds", 
    value: "356", 
    change: "+8%", 
    changeIcon: ArrowUpIcon,
    color: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400",
    changeColor: "text-green-500"
  },
  { 
    id: 3, 
    icon: BanknotesIcon, 
    label: "Earnings", 
    value: "$23.8K", 
    change: "-3%", 
    changeIcon: ArrowDownIcon,
    color: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400",
    changeColor: "text-red-500"
  },
  { 
    id: 4, 
    icon: ChartBarIcon, 
    label: "Growth", 
    value: "12.5%", 
    change: "+5.2%", 
    changeIcon: ArrowUpIcon,
    color: "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400",
    changeColor: "text-green-500"
  }
]

const paymentGateways = [
  {
    icon: 'logos:paypal',
    title: 'PayPal',
    description: 'Trusted by millions for global online payments with fraud protection.',
  },
 
  {
    icon: 'simple-icons:coinbase',
    title: 'Coinbase Commerce',
    description: 'Accept crypto payments from customers worldwide in a secure way.',
  },
  {
    icon: 'cryptocurrency:btc',
    title: 'Blockchain',
    description: 'Receive direct Bitcoin payments securely using Blockchain wallet.',
  },
  {
    icon: 'mdi:currency-inr',
    title: 'Paytm',
    description: 'India’s leading payment solution for UPI, wallet, and credit/debit cards.',
  },

  {
    icon: 'cryptocurrency:eth',
    title: 'CoinPayments',
    description: 'Multi-crypto payment gateway supporting hundreds of altcoins.',
  },
  {
    icon: 'mdi:bank',
    title: 'Cashmaal',
    description: 'Online payment service offering payout & exchange for crypto and fiat.',
  },
  {
    icon: 'mdi:bank-transfer',
    title: 'Flutterwave',
    description: 'All-in-one African payment gateway for online businesses.',
  },

  {
    icon: 'cryptocurrency:xrp',
    title: 'Coingate',
    description: 'Accept Bitcoin, Ethereum, and other altcoins in e-commerce easily.',
  },


  {
  icon: 'mdi:currency-sign',
  title: 'PerfectMoney',
  description: 'Secure online payments in USD and EUR with instant transfers.',
},
{
  icon: 'simple-icons:razorpay',
  title: 'Razorpay',
  description: 'Powerful Indian payment gateway supporting UPI, cards, and subscriptions.',
},
{
  icon: 'arcticons:skrill',
  title: 'Skrill',
  description: 'Digital wallet for global payments, transfers, and crypto support.',
},
{
  icon: 'logos:stripe',
  title: 'Stripe',
  description: 'Global gateway offering APIs for cards, wallets, and direct bank payments.',
},


]


</script>
