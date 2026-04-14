<template>
  <div class="space-y-6 p-4 max-w-screen-2xl mx-auto">
    <!-- Stats Cards - Made consistent with bottom cards -->
    <section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
            <p class="text-xl font-semibold text-gray-900 dark:text-white">12,483</p>
          </div>
          <UserIcon class="w-8 h-8 text-primary-600" />
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
            <p class="text-xl font-semibold text-gray-900 dark:text-white">$48,230</p>
          </div>
          <CurrencyDollarIcon class="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Active Orders</p>
            <p class="text-xl font-semibold text-gray-900 dark:text-white">312</p>
          </div>
          <ShoppingBagIcon class="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Bounce Rate</p>
            <p class="text-xl font-semibold text-gray-900 dark:text-white">24%</p>
          </div>
          <ArrowTrendingDownIcon class="w-8 h-8 text-red-500" />
        </div>
      </div>
    </section>

    <!-- Chart + Quick Actions -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-full">
  <!-- Chart Widget - Full width on mobile, 2 cols on desktop -->
  <div class="md:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow w-full overflow-hidden">
    <ChartWidget title="Revenue" subtitle="Weekly" />
  </div>

  <!-- Right Sidebar - Stacked on mobile -->
  <div class="space-y-4 w-full">
    <!-- Quick Actions Card -->
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow w-full">
      <h3 class="font-semibold text-gray-700 dark:text-gray-200 mb-3">Quick Actions</h3>
      <div class="grid grid-cols-2 gap-3">
        <RouterLink to="/users">
          <button class="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm whitespace-nowrap">
            Add User
          </button>
        </RouterLink>
        <RouterLink to="/chat">
          <button class="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm whitespace-nowrap">
            Messages
          </button>
        </RouterLink>
        <RouterLink to="/chart">
          <button class="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm whitespace-nowrap">
            Chart
          </button>
        </RouterLink>
        <RouterLink to="/calendar">
          <button class="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm whitespace-nowrap">
            Calendar
          </button>
        </RouterLink>
      </div>
    </div>

    <!-- Stats Card -->
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow w-full">
      <h3 class="font-semibold text-gray-700 dark:text-gray-200 mb-3">Stats</h3>
      <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li class="flex justify-between"><span class="truncate">New signups</span> <span class="font-medium ml-2">+324</span></li>
        <li class="flex justify-between"><span class="truncate">Support tickets</span> <span class="font-medium ml-2">57</span></li>
        <li class="flex justify-between"><span class="truncate">Server uptime</span> <span class="font-medium ml-2">99.98%</span></li>
      </ul>
    </div>
  </div>
</section>
    <!-- Latest Reviews - Consistent with top cards -->
    <section class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Latest Reviews</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">Reviews received across all channels</p>
        </div>
        <div class="flex flex-col xs:flex-row items-start xs:items-center gap-3 w-full sm:w-auto">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search reviews..." 
            class="w-full xs:w-auto px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
          <select 
            v-model="statusFilter"
            class="w-full xs:w-auto px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary-500 transition"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[800px] md:min-w-0 text-sm">
          <thead class="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th class="px-3 py-3 text-left">Product</th>
              <th class="px-3 py-3 text-left">Customer</th>
              <th class="px-3 py-3 text-left">Rating</th>
              <th class="px-3 py-3 text-left">Review</th>
              <th class="px-3 py-3 text-left">Status</th>
              <th class="px-3 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="review in paginatedReviews" :key="review.id" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td class="px-3 py-3 flex items-center gap-3 min-w-[180px]">
                <img :src="review.productImage" :alt="review.product" class="w-10 h-10 rounded-md object-cover shadow-sm" />
                <span class="text-gray-700 dark:text-gray-200 font-medium">{{ review.product }}</span>
              </td>
              <td class="px-3 py-3 min-w-[200px]">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary-200 dark:bg-primary-900 flex items-center justify-center text-primary-800 dark:text-primary-200 font-semibold">
                    {{ initials(review.customer) }}
                  </div>
                  <div>
                    <p class="font-medium text-gray-700 dark:text-gray-200">{{ review.customer }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ review.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-3 py-3 min-w-[120px]">
                <div class="flex items-center gap-1">
                  <span v-for="n in 5" :key="n" :class="n <= review.rating ? 'text-yellow-400' : 'text-gray-300'">
                    ★
                  </span>
                  <span class="text-xs text-gray-500 ml-1">({{ review.rating }}/5)</span>
                </div>
              </td>
              <td class="px-3 py-3 max-w-[250px] text-gray-600 dark:text-gray-400">
                <p class="line-clamp-2">{{ review.text }}</p>
              </td>
              <td class="px-3 py-3 min-w-[100px]">
                <span :class="review.statusClass + ' px-2 py-1 rounded-full text-xs font-medium'">
                  {{ review.status }}
                </span>
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-gray-500 dark:text-gray-400">{{ review.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex flex-col sm:flex-row items-center justify-between mt-4 px-3 gap-4">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Showing {{ (currentPage - 1) * perPage + 1 }} to {{ Math.min(currentPage * perPage, filteredReviews.length) }} of {{ filteredReviews.length }} reviews
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Previous page"
          >
            Previous
          </button>
          <div class="flex flex-wrap gap-1">
            <button
              v-for="pageNum in visiblePages"
              :key="pageNum"
              @click="currentPage = pageNum"
              :class="{'bg-blue-600 text-white': currentPage === pageNum}"
              class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition text-sm border border-gray-200 dark:border-gray-700"
              :aria-label="'Page ' + pageNum"
            >
              {{ pageNum }}
            </button>
          </div>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import StatCard from '../components/StatCard.vue'
import ChartWidget from '../components/ChartWidget.vue'
import AppCard from '../components/AppCard.vue'
import AppButton from '../components/AppButton.vue'
import { UserIcon, CurrencyDollarIcon, ShoppingBagIcon, ArrowTrendingDownIcon } from '@heroicons/vue/24/outline'

const initials = (name) => {
  if (!name) return ''
  return name.split(' ').map(n => n[0]?.toUpperCase()).join('')
}


const reviews = ref([
  {
    id: 1,
    product: "Phonix Pro",
    productImage: "/products/product-1.jpg",
    customer: "Alex Johnson",
    email: "user1@example.test",
    rating: 3,
    text: "Good performance but battery life could be better. Camera quality meets expectations.",
    status: "Pending",
    statusClass: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200",
    time: "Just now"
  },
  {
    id: 2,
    product: "UltraBook Lite",
    productImage: "/products/product-2.jpg",
    customer: "Sarah Miller",
    email: "user2@example.test",
    rating: 1,
    text: "Very disappointed with build quality. Keyboard stopped working after 2 weeks!",
    status: "Rejected",
    statusClass: "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200",
    time: "Today"
  },
  {
    id: 3,
    product: "SmartVision TV",
    productImage: "/products/product-3.jpg",
    customer: "Raj Patel",
    email: "user3@example.test",
    rating: 5,
    text: "Excellent picture quality and sound system. The smart features work flawlessly.",
    status: "Confirmed",
    statusClass: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
    time: "Yesterday"
  },
  {
    id: 4,
    product: "Wireless Earbuds Pro",
    productImage: "/products/product-4.jpg",
    customer: "Maria Garcia",
    email: "user4@example.test",
    rating: 4,
    text: "Great sound quality and comfortable fit. Battery life is decent but could be better.",
    status: "Confirmed",
    statusClass: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
    time: "2 days ago"
  },
  {
    id: 5,
    product: "Fitness Tracker X",
    productImage: "/products/product-5.jpg",
    customer: "James Wilson",
    email: "user5@example.test",
    rating: 2,
    text: "Stopped syncing after a week. Customer service was unhelpful in resolving the issue.",
    status: "Pending",
    statusClass: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200",
    time: "3 days ago"
  },
  {
    id: 6,
    product: "Home Speaker Mini",
    productImage: "/products/product-6.jpg",
    customer: "Emma Thompson",
    email: "user6@example.test",
    rating: 5,
    text: "Surprisingly powerful sound for its size. Easy to set up and connect to multiple devices.",
    status: "Confirmed",
    statusClass: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
    time: "1 week ago"
  },
  {
    id: 7,
    product: "Gaming Mouse Pro",
    productImage: "/products/product-7.jpg",
    customer: "David Kim",
    email: "user7@example.test",
    rating: 4,
    text: "Precise tracking and comfortable grip. The customizable buttons are very useful for gaming.",
    status: "Confirmed",
    statusClass: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
    time: "1 week ago"
  },
  {
    id: 8,
    product: "Bluetooth Keyboard",
    productImage: "/products/product-8.jpg",
    customer: "Lisa Wong",
    email: "user8@example.test",
    rating: 3,
    text: "Typing experience is good but the keys are a bit noisy. Battery lasts long though.",
    status: "Confirmed",
    statusClass: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
    time: "2 weeks ago"
  }
])

// Search and filter
const searchQuery = ref('')
const statusFilter = ref('all')

const filteredReviews = computed(() => {
  return reviews.value.filter(review => {
    const matchesSearch = 
      review.product.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      review.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = 
      statusFilter.value === 'all' || 
      review.status.toLowerCase() === statusFilter.value.toLowerCase()
    
    return matchesSearch && matchesStatus
  })
})

// Pagination
const currentPage = ref(1)
const perPage = 5

const totalPages = computed(() => Math.ceil(filteredReviews.value.length / perPage))
const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredReviews.value.slice(start, start + perPage)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>