<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl transition-colors duration-300">
    <div class="container mx-auto px-4 py-4">
      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Revenue Card -->
          <div class="bg-[#1b394f] rounded-2xl p-6 text-white shadow-lg">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-indigo-100">Total Revenue</p>
                <h3 class="text-2xl font-bold mt-1">$48,230</h3>
                <div class="flex items-center mt-3 text-indigo-100">
                  <ArrowUpIcon class="w-4 h-4 mr-1" />
                  <span class="text-sm">12.5% from last month</span>
                </div>
              </div>
              <div class="p-3 rounded-lg bg-white/10">
                <CurrencyDollarIcon class="w-6 h-6" />
              </div>
            </div>
            <div class="mt-6">
              <div class="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div class="h-full bg-white rounded-full" style="width: 65%"></div>
              </div>
              <p class="text-xs text-indigo-100 mt-2">65% of annual target</p>
            </div>
          </div>

          <!-- Tickets Section -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 class="text-lg font-semibold">Recent Tickets</h3>
            </div>
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
              <div 
                v-for="ticket in tickets" 
                :key="ticket.id"
                class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div class="flex justify-between items-center">
                  <div class="flex items-center space-x-3">
                    <div class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <UserIcon class="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 class="font-medium">{{ ticket.title }}</h4>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Ticket #{{ ticket.id }}</p>
                    </div>
                  </div>
                  <span 
                    class="px-3 py-1 rounded-full text-xs font-medium"
                    :class="statusClasses[ticket.status]"
                  >
                    {{ ticket.status }}
                  </span>
                </div>
              </div>
            </div>
            <div class="p-4 text-center border-t border-gray-100 dark:border-gray-700">
              <button class="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                View all tickets
              </button>
            </div>
          </div>

          <!-- Project Progress -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-semibold">Project Progress</h3>
              <span class="text-sm text-indigo-600 dark:text-indigo-400">4/8 tasks</span>
            </div>
            <div class="space-y-4">
              <div v-for="i in 3" :key="i" class="flex items-center">
                <div :class="`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${i % 2 === 0 ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'}`">
                  <CheckIcon class="w-4 h-4" />
                </div>
                <div class="flex-1">
                  <div class="flex justify-between text-sm">
                    <span>Task #{i}</span>
                    <span class="text-gray-500 dark:text-gray-400">${i}0%</span>
                  </div>
                  <div class="mt-1 h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      :class="`h-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-blue-500'} rounded-full`" 
                      :style="`width: ${i}0%`"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <button class="w-full mt-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
              View All Tasks
            </button>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Profile Card -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden text-center">
            <div class="relative h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            <div class="px-6 pb-6 -mt-10">
              <div class="relative mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
                <img src="/user/avatars/user-2.jpg" alt="Profile" class="w-full h-full object-cover">
                <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap shadow-sm">PRO</div>
              </div>
              <h3 class="text-lg font-bold mt-4">Sarah Johnson</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm">UI/UX Designer</p>
              <div class="mt-4 flex justify-center space-x-4">
                <div class="text-center">
                  <div class="font-bold">124</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Posts</div>
                </div>
                <div class="text-center">
                  <div class="font-bold">1.2K</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Followers</div>
                </div>
                <div class="text-center">
                  <div class="font-bold">348</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Following</div>
                </div>
              </div>
              <button class="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                Follow
              </button>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 class="text-lg font-semibold">Recent Activity</h3>
            </div>
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
              <div v-for="activity in activities" :key="activity.id" class="p-4">
                <div class="flex space-x-3">
                  <div class="flex-shrink-0">
                    <img :src="activity.avatar" alt="User" class="h-10 w-10 rounded-full">
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium">{{ activity.user }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ activity.action }}</p>
                    <p class="text-xs text-gray-400 mt-1">{{ activity.time }}</p>
                  </div>
                  <div v-if="activity.unread" class="flex-shrink-0 self-center">
                    <span class="h-2 w-2 rounded-full bg-indigo-600"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-4 text-center border-t border-gray-100 dark:border-gray-700">
              <button class="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                View all activity
              </button>
            </div>
          </div>

          <!-- Event Card -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <img src="/card/card-01.jpg" alt="Event" class="w-full h-40 object-cover">
            <div class="p-6">
              <h3 class="font-semibold">Figma Tips and Tricks</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Join Stephan for an interactive session on Figma</p>
              <div class="flex items-center mt-4">
                <div class="flex -space-x-2">
                  <img 
                    v-for="(avatar, index) in eventAvatars" 
                    :key="index" 
                    :src="avatar" 
                    class="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                  >
                </div>
                <span class="text-gray-500 dark:text-gray-400 text-sm ml-3">+18 attending</span>
              </div>
              <button class="w-full mt-6 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  UserIcon, 
  CurrencyDollarIcon, 
  ArrowUpIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

const tickets = ref([
  { id: 1, title: "Login issue", status: "Pending" },
  { id: 2, title: "Payment problem", status: "Open" },
  { id: 3, title: "Feature request", status: "Closed" },
  { id: 4, title: "Bug report", status: "Open" },
  { id: 5, title: "Account setup", status: "Pending" }
])

const statusClasses = {
  Open: "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-400",
  Pending: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-400",
  Closed: "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-400",
}

const activities = [
  {
    id: 1,
    user: "Michael Foster",
    action: "Completed the Figma design system",
    time: "2h ago",
    avatar: "/user/avatars/user-3.jpg",
    unread: true
  },
  {
    id: 2,
    user: "Emma Wilson",
    action: "Submitted the new project proposal",
    time: "5h ago",
    avatar: "/user/avatars/user-4.jpg",
    unread: true
  },
  {
    id: 3,
    user: "James Rodriguez",
    action: "Commented on your post",
    time: "1d ago",
    avatar: "/user/avatars/user-1.jpg",
    unread: false
  },
  {
    id: 4,
    user: "Sophia Garcia",
    action: "Shared your project",
    time: "2d ago",
    avatar: "/user/avatars/user-2.jpg",
    unread: false
  }
]

const eventAvatars = [
  "/user/avatars/user-1.jpg",
  "/user/avatars/user-2.jpg",
  "/user/avatars/user-3.jpg",
  "/user/avatars/user-4.jpg"
]
</script>

<style>
/* Smooth transitions for dark mode */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-track {
  background: #2d3748;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4a5568;
}

/* Animation for cards */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.dark .card-hover:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
</style>