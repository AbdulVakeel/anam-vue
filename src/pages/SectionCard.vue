<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-6 md:p-8">
    <!-- Header Section -->
    <div class="max-w-7xl mx-auto mb-12 text-center">
      <div class="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 backdrop-blur-sm mb-4">
        <span class="text-sm font-medium text-blue-600 dark:text-blue-400">✦ Premium Components</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        Section Cards Gallery
      </h1>
      <p class="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
        Beautiful, responsive cards with smooth animations and modern design
      </p>
    </div>

    <div class="max-w-7xl mx-auto space-y-10">
      <!-- Grid 1: 2 Cards - Hero Style -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Feature Highlight</h2>
          <span class="text-xs text-gray-400 dark:text-gray-500">2 Cards Grid</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard 
            class="group w-full transform transition-all duration-500 hover:scale-[1.02]"
            :class="{ 'lg:col-span-1': true }"
          >
            <template #icon>
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
            </template>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Lightning Fast Performance
            </h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Experience blazing fast load times and smooth interactions. Our optimized architecture ensures your content delivers instantly.
            </p>
            <template #footer>
              <div class="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                Learn more 
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </template>
          </SectionCard>

          <SectionCard 
            variant="danger" 
            class="group w-full transform transition-all duration-500 hover:scale-[1.02]"
          >
            <template #icon>
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/25">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
            </template>
            <h2 class="text-2xl font-bold text-red-700 dark:text-red-300 mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Security Alert
            </h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Critical security update available. Please review your security settings and apply the latest patches immediately.
            </p>
            <template #footer>
              <div class="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-medium">
                Review now
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </template>
          </SectionCard>
        </div>
      </div>

      <!-- Grid 2: 3 Cards - Service Showcase -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Core Services</h2>
          <span class="text-xs text-gray-400 dark:text-gray-500">3 Cards Grid</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SectionCard class="group w-full h-full transform transition-all duration-500 hover:-translate-y-2">
            <div class="flex flex-col h-full">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Enterprise Security</h2>
              <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow">
                Bank-grade encryption and advanced threat protection for your business.
              </p>
              <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <span class="text-xs font-medium text-emerald-600 dark:text-emerald-400">✓ 99.99% Uptime</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard variant="danger" class="group w-full h-full transform transition-all duration-500 hover:-translate-y-2">
            <div class="flex flex-col h-full">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 class="text-xl font-bold text-amber-700 dark:text-amber-300 mb-2">System Alert</h2>
              <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow">
                Database backup failed. Immediate action required to prevent data loss.
              </p>
              <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <span class="text-xs font-medium text-amber-600 dark:text-amber-400">⚠️ Requires attention</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard variant="success" class="group w-full h-full transform transition-all duration-500 hover:-translate-y-2">
            <div class="flex flex-col h-full">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/20">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 class="text-xl font-bold text-green-700 dark:text-green-300 mb-2">Deployment Complete</h2>
              <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow">
                Version 3.2.0 successfully deployed to production environment.
              </p>
              <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <span class="text-xs font-medium text-green-600 dark:text-green-400">✅ All systems operational</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      <!-- Grid 3: 4 Cards - Features Grid -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Premium Features</h2>
          <span class="text-xs text-gray-400 dark:text-gray-500">4 Cards Grid</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <SectionCard class="group w-full transform transition-all duration-300 hover:shadow-xl">
            <template #badge>
              <span class="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                NEW
              </span>
            </template>
            <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-1">Dashboard</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">Analytics at glance</p>
          </SectionCard>

          <SectionCard variant="danger" class="group w-full transform transition-all duration-300 hover:shadow-xl">
            <div class="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-1">Security</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">2FA required</p>
          </SectionCard>

          <SectionCard variant="success" class="group w-full transform transition-all duration-300 hover:shadow-xl">
            <div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-1">Analytics</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">+127% growth</p>
          </SectionCard>

          <SectionCard variant="info" class="group w-full transform transition-all duration-300 hover:shadow-xl">
            <div class="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-1">Support</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">24/7 available</p>
          </SectionCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SectionCard from '../components/SectionCard.vue';
</script>

<style scoped>
/* Smooth scrolling and better rendering */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>