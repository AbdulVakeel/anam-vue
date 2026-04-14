<template>
  <div class="max-w-7xl mx-auto  grid md:grid-cols-2 lg:grid-cols-2 gap-6">
    <!-- E-commerce Platform -->
    <div class="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 text-left shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-emerald-500/30">
      <div class="flex flex-col md:flex-row items-start gap-6 mb-4">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-emerald-500 w-10 h-10 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white">E-commerce Platform</h3>
          </div>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-start gap-2">
              <span class="text-emerald-400 text-lg">•</span> 
              <span>Multi-vendor marketplace</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-emerald-400 text-lg">•</span> 
              <span>Product inventory management</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-emerald-400 text-lg">•</span> 
              <span>Secure payment gateways</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-emerald-400 text-lg">•</span> 
              <span>Order fulfillment tracking</span>
            </li>
          </ul>
        </div>
        
        <!-- Visualization -->
        <div class="flex justify-center mt-4 md:mt-0">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="h-10 w-1 bg-gradient-to-b from-emerald-500 to-teal-500"></div>
            <div class="flex gap-6">
              <div class="flex flex-col items-center">
                <div class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-xs mt-2 text-gray-400">Payments</p>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p class="text-xs mt-2 text-gray-400">Shipping</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-wrap gap-3 mt-6">
        <a href="#" target="_blank" rel="noopener" class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-5 py-2.5 rounded-lg text-sm font-medium shadow-md transition-all">
          Admin Demo
        </a>
        <a href="#" target="_blank" rel="noopener" class="text-white bg-gray-800 hover:bg-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-700 transition-all">
          Merchant Demo
        </a>
        <a href="#" class="text-white bg-gray-800 hover:bg-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-700 transition-all">
          More
        </a>
      </div>
    </div>

    <!-- POS System -->
    <div class="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 text-left shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-blue-500/30">
      <div class="flex flex-col md:flex-row items-start gap-6 mb-4">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white">POS System</h3>
          </div>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-start gap-2">
              <span class="text-blue-400 text-lg">•</span> 
              <span>Barcode scanning</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-400 text-lg">•</span> 
              <span>Inventory sync</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-400 text-lg">•</span> 
              <span>Receipt printing</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-400 text-lg">•</span> 
              <span>Multi-store support</span>
            </li>
          </ul>
        </div>
        
        <!-- Visualization -->
        <div class="flex justify-center mt-4 md:mt-0">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="h-10 w-1 bg-gradient-to-b from-blue-500 to-indigo-500"></div>
            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <p class="text-xs mt-2 text-gray-400">Checkout</p>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p class="text-xs mt-2 text-gray-400">Reports</p>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <p class="text-xs mt-2 text-gray-400">Staff</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-wrap gap-3 mt-6">
        <a href="#" target="_blank" rel="noopener" class="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-5 py-2.5 rounded-lg text-sm font-medium shadow-md transition-all">
          Admin Demo
        </a>
        <a href="#" target="_blank" rel="noopener" class="text-white bg-gray-800 hover:bg-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-700 transition-all">
          Cashier Demo
        </a>
        <a href="#" class="text-white bg-gray-800 hover:bg-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-700 transition-all">
          More
        </a>
      </div>
    </div>

    <!-- Analytics Dashboard -->
    <div class="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 text-left shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-purple-500/30">
      <div class="flex flex-col md:flex-row items-start gap-6 mb-4">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-purple-500 w-10 h-10 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white">Analytics Dashboard</h3>
          </div>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-start gap-2">
              <span class="text-purple-400 text-lg">•</span> 
              <span>Real-time sales tracking</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-purple-400 text-lg">•</span> 
              <span>Customer behavior insights</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-purple-400 text-lg">•</span> 
              <span>Inventory forecasting</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-purple-400 text-lg">•</span> 
              <span>Custom report generation</span>
            </li>
          </ul>
        </div>
        
        <!-- Visualization -->
        <div class="flex justify-center mt-4 md:mt-0">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="h-10 w-1 bg-gradient-to-b from-purple-500 to-fuchsia-500"></div>
            <div class="flex gap-6">
              <div class="flex flex-col items-center">
                <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p class="text-xs mt-2 text-gray-400">Trends</p>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p class="text-xs mt-2 text-gray-400">Stats</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-wrap gap-3 mt-6">
        <a href="#" target="_blank" rel="noopener" class="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 px-5 py-2.5 rounded-lg text-sm font-medium shadow-md transition-all">
          Admin Demo
        </a>
        <a href="#" target="_blank" rel="noopener" class="text-white bg-gray-800 hover:bg-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-700 transition-all">
          Manager Demo
        </a>
        <a href="#" class="text-white bg-gray-800 hover:bg-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-700 transition-all">
          More
        </a>
      </div>
    </div>

    <!-- CRM System -->
    <div class="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 text-left shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-amber-500/30">
      <div class="flex flex-col md:flex-row items-start gap-6 mb-4">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-amber-500 w-10 h-10 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white">CRM System</h3>
          </div>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-start gap-2">
              <span class="text-amber-400 text-lg">•</span> 
              <span>Customer segmentation</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-amber-400 text-lg">•</span> 
              <span>Loyalty programs</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-amber-400 text-lg">•</span> 
              <span>Automated marketing</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-amber-400 text-lg">•</span> 
              <span>Support ticket system</span>
            </li>
          </ul>
        </div>
        
        <!-- Visualization -->
        <div class="flex justify-center mt-4 md:mt-0">
          <div class="flex flex-col items-center">
            <div class="relative">
              <div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div class="h-10 w-1 bg-gradient-to-b from-amber-500 to-orange-500"></div>
            <div class="flex gap-6">
              <div class="flex flex-col items-center">
                <div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p class="text-xs mt-2 text-gray-400">Engagement</p>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <p class="text-xs mt-2 text-gray-400">Loyalty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-wrap gap-3 mt-6">
        <a href="#" target="_blank" rel="noopener" class="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-5 py-2.5 rounded-lg text-sm font-medium shadow-md transition-all">
          Admin Demo
        </a>
        <a href="#" target="_blank" rel="noopener" class="text-white bg-gray-800 hover:bg-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-700 transition-all">
          Support Demo
        </a>
        <a href="#" class="text-white bg-gray-800 hover:bg-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-700 transition-all">
          More
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>