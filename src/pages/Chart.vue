<template>
  <div class="space-y-6">
    <!-- Filter section -->
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-md flex flex-wrap items-center gap-3">
      <select 
        class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
      >
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Last 12 months</option>
      </select>
      <AppButton class="transition hover:scale-105">Apply</AppButton>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
        <p class="text-sm text-gray-500 dark:text-gray-400">Total Sales</p>
        <h3 class="text-2xl font-bold mt-1 text-gray-900 dark:text-white">$24,780</h3>
        <p class="text-sm mt-2"><span class="text-green-500">↑ 12%</span> vs last period</p>
        <ChartWidget class="mt-6" type="line" :height="100"/>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
        <p class="text-sm text-gray-500 dark:text-gray-400">Total Visitors</p>
        <h3 class="text-2xl font-bold mt-1 text-gray-900 dark:text-white">14,892</h3>
        <p class="text-sm mt-2"><span class="text-green-500">↑ 8.5%</span> vs last period</p>
        <ChartWidget class="mt-6" type="bar" :height="100"/>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
        <p class="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
        <h3 class="text-2xl font-bold mt-1 text-gray-900 dark:text-white">1,248</h3>
        <p class="text-sm mt-2"><span class="text-red-500">↓ 2.3%</span> vs last period</p>
        <ChartWidget class="mt-6" type="area" :height="100"/>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
        <p class="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</p>
        <h3 class="text-2xl font-bold mt-1 text-gray-900 dark:text-white">3.42%</h3>
        <p class="text-sm mt-2"><span class="text-green-500">↑ 1.1%</span> vs last period</p>
        <ChartWidget class="mt-6" type="donut" :height="150"/>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6">
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
        <ChartWidget title="Sales Analytics" subtitle="Overview" type="line" class="mt-6" :height="300"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppButton from '../components/AppButton.vue'
import ChartWidget from '../components/ChartWidget.vue'
</script>
