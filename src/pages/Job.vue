<template>
  <div class="space-y-6 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-xl overflow-hidden">
    <!-- Header with Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Total Applications -->
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border-l-4 border-blue-500">
        <div class="flex justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Applications</p>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">1,428</h3>
          </div>
          <div class="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <DocumentTextIcon class="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <p class="text-sm mt-3">
          <span class="text-green-500 font-medium">+12.5%</span> from last month
        </p>
      </div>

      <!-- Interviews Scheduled -->
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border-l-4 border-purple-500">
        <div class="flex justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Interviews</p>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">86</h3>
          </div>
          <div class="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <CalendarIcon class="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <p class="text-sm mt-3">
          <span class="text-green-500 font-medium">+8.2%</span> from last month
        </p>
      </div>

      <!-- Offers Received -->
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border-l-4 border-green-500">
        <div class="flex justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Offers</p>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">23</h3>
          </div>
          <div class="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckBadgeIcon class="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <p class="text-sm mt-3">
          <span class="text-red-500 font-medium">-3.1%</span> from last month
        </p>
      </div>

      <!-- Active Applications -->
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border-l-4 border-amber-500">
        <div class="flex justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Active</p>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">94</h3>
          </div>
          <div class="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <ClockIcon class="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <p class="text-sm mt-3">
          <span class="text-green-500 font-medium">+5.7%</span> from last month
        </p>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Application Timeline Chart -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Application Timeline</h2>
          <select class="bg-gray-100 dark:bg-gray-700 border-none text-sm rounded-lg px-3 py-1">
            <option>Last 7 days</option>
            <option selected>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div class="h-80">
          <JobTimelineChart />
        </div>
      </div>

      <!-- Application Status -->
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Application Status</h2>
        <div class="h-64">
          <JobStatusPieChart />
        </div>
        <div class="mt-6 space-y-3">
          <div v-for="status in applicationStatus" :key="status.name" class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: status.color }"></span>
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ status.name }}</span>
            </div>
            <span class="text-sm font-medium">{{ status.value }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Applications -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Applications</h2>
          <button class="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                <th class="pb-3">Position</th>
                <th class="pb-3">Company</th>
                <th class="pb-3">Date</th>
                <th class="pb-3">Status</th>
                <th class="pb-3"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="application in recentApplications" :key="application.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="py-4">
                  <p class="font-medium text-gray-900 dark:text-white">{{ application.position }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ application.type }}</p>
                </td>
                <td>
                  <div class="flex items-center">
                    <img :src="application.logo" :alt="application.company" class="w-8 h-8 rounded-full mr-3" />
                    <span>{{ application.company }}</span>
                  </div>
                </td>
                <td class="text-sm text-gray-500 dark:text-gray-400">{{ application.date }}</td>
                <td>
                  <span :class="getStatusClass(application.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ application.status }}
                  </span>
                </td>
                <td class="text-right">
                  <button class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                    <EllipsisHorizontalIcon class="h-5 w-5 text-gray-400" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Upcoming Interviews -->
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Interviews</h2>
          <button class="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All</button>
        </div>
        <div class="space-y-4">
          <div v-for="interview in upcomingInterviews" :key="interview.id" class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div class="flex justify-between">
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{{ interview.position }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ interview.company }}</p>
              </div>
              <span class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">
                {{ interview.type }}
              </span>
            </div>
            <div class="flex items-center mt-3 text-sm text-gray-500 dark:text-gray-400">
              <CalendarIcon class="h-4 w-4 mr-1" />
              <span>{{ interview.date }}</span>
              <ClockIcon class="h-4 w-4 ml-3 mr-1" />
              <span>{{ interview.time }}</span>
            </div>
            <div class="mt-3 flex justify-between items-center">
              <div class="flex -space-x-2">
                <img 
                  v-for="participant in interview.participants" 
                  :key="participant.id"
                  :src="participant.avatar" 
                  :alt="participant.name"
                  class="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                />
              </div>
              <button class="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills Analysis Section -->
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Skills Analysis</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div v-for="skill in skillsAnalysis" :key="skill.name" class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div class="flex justify-between items-start mb-2">
            <span class="font-medium text-gray-900 dark:text-white">{{ skill.name }}</span>
            <span class="text-sm font-medium">{{ skill.match }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              class="h-2 rounded-full" 
              :class="{
                'bg-red-500': skill.match < 40,
                'bg-yellow-500': skill.match >= 40 && skill.match < 70,
                'bg-green-500': skill.match >= 70
              }"
              :style="{ width: skill.match + '%' }"
            ></div>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {{ skill.jobs }} jobs require this
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { 
  DocumentTextIcon,
  CalendarIcon,
  CheckBadgeIcon,
  ClockIcon,
  EllipsisHorizontalIcon
} from '@heroicons/vue/24/outline'
import JobTimelineChart from '../components/JobTimelineChart.vue'
import JobStatusPieChart from '../components/JobStatusPieChart.vue'

// Data
const applicationStatus = [
  { name: 'Applied', value: 42, color: '#3b82f6' },
  { name: 'Interview', value: 23, color: '#8b5cf6' },
  { name: 'Offer', value: 8, color: '#10b981' },
  { name: 'Rejected', value: 27, color: '#ef4444' }
]

const recentApplications = [
  {
    id: 1,
    position: 'Senior Frontend Developer',
    type: 'Full-time',
    company: 'TechCorp',
    logo: '/company/image-01.jpg',
    date: 'Today',
    status: 'Applied'
  },
  {
    id: 2,
    position: 'UX Designer',
    type: 'Contract',
    company: 'DesignHub',
    logo: '/company/image-02.jpg',
    date: 'Yesterday',
    status: 'Interview'
  },
  {
    id: 3,
    position: 'Product Manager',
    type: 'Full-time',
    company: 'ProductLabs',
    logo: '/company/image-03.jpg',
    date: 'Mar 15',
    status: 'Rejected'
  },
  {
    id: 4,
    position: 'Backend Engineer',
    type: 'Remote',
    company: 'DevSolutions',
    logo: '/company/image-04.jpg',
    date: 'Mar 14',
    status: 'Offer'
  }
]

const upcomingInterviews = [
  {
    id: 1,
    position: 'Senior Frontend Developer',
    company: 'TechCorp',
    date: 'Tomorrow',
    time: '10:30 AM',
    type: 'Technical',
    participants: [
      { id: 1, name: 'Sarah K.', avatar: '/user/avatars/user-2.jpg' },
      { id: 2, name: 'Michael T.', avatar: '/user/avatars/user-3.jpg' }
    ]
  },
  {
    id: 2,
    position: 'UX Designer',
    company: 'DesignHub',
    date: 'Mar 20',
    time: '2:00 PM',
    type: 'Culture Fit',
    participants: [
      { id: 1, name: 'Emma L.', avatar: '/user/avatars/user-4.jpg' }
    ]
  }
]

const skillsAnalysis = [
  { name: 'React', match: 85, jobs: 42 },
  { name: 'TypeScript', match: 78, jobs: 38 },
  { name: 'Node.js', match: 65, jobs: 31 },
  { name: 'UI/UX', match: 72, jobs: 28 },
  { name: 'AWS', match: 58, jobs: 24 }
]

// Methods
const getStatusClass = (status) => {
  switch(status) {
    case 'Applied': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
    case 'Interview': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
    case 'Offer': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
    case 'Rejected': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
    default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
  }
}
</script>

<style>
* {
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
</style>