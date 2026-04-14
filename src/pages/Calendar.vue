<template>
  <div class="space-y-6 p-4">

    <!-- View Switcher -->
    <div class="flex flex-wrap gap-2">
      <AppButton
        v-for="view in views"
        :key="view"
        :variant="activeView === view ? 'primary' : 'secondary'"
        @click="activeView = view"
        class="text-xs sm:text-sm font-medium"
      >
        {{ view }}
      </AppButton>
    </div>

    <!-- Month View -->
    <div v-if="activeView === 'Month'" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div class="font-semibold text-lg tracking-wide">{{ monthName }} {{ year }}</div>
        <div class="flex items-center gap-2">
          <AppButton variant="secondary" @click="prevMonth" class="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </AppButton>
          <AppButton variant="secondary" @click="today" class="px-3 py-2">Today</AppButton>
          <AppButton variant="secondary" @click="nextMonth" class="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </AppButton>
        </div>
      </div>

      <div class="grid grid-cols-7 gap-1 text-center text-sm">
        <div v-for="d in daysShort" :key="d" class="py-2 text-gray-500 dark:text-gray-400 font-medium">{{ d }}</div>
        <div v-for="i in startBlank" :key="'b'+i"></div>
        <div
          v-for="d in daysInMonth"
          :key="d"
          class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          :class="{
            'bg-blue-100 dark:bg-blue-900': isToday(year, month, d),
            'font-semibold text-blue-600 dark:text-blue-300': isSelected(year, month, d)
          }"
          @click="selectDate(year, month, d)"
        >
          <div class="mx-auto w-8 h-8 flex items-center justify-center rounded-full transition-colors"
               :class="{'bg-blue-500 text-white': isToday(year, month, d)}">
            {{ d }}
          </div>
          <div v-if="hasEvents(year, month, d)" class="flex justify-center gap-1 mt-1">
            <div v-for="n in Math.min(countEvents(year, month, d),3)" :key="n" class="h-1 w-1 rounded-full bg-blue-500"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Week View -->
    <div v-if="activeView === 'Week'" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 overflow-x-auto shadow-sm">
      <div class="min-w-[700px]">
        <div class="flex items-center justify-between mb-4">
          <div class="font-semibold text-lg tracking-wide">{{ weekRange }}</div>
          <div class="flex items-center gap-2">
            <AppButton variant="secondary" @click="prevWeek" class="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </AppButton>
            <AppButton variant="secondary" @click="today" class="px-3 py-2">Today</AppButton>
            <AppButton variant="secondary" @click="nextWeek" class="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </AppButton>
          </div>
        </div>

        <div class="grid grid-cols-8 border-b dark:border-gray-700">
          <div class="p-2 border-r dark:border-gray-700"></div>
          <div
            v-for="day in weekDays"
            :key="day.date"
            class="p-2 text-center border-r dark:border-gray-700 transition-colors rounded-md"
            :class="{
              'bg-blue-50 dark:bg-blue-900/30': isTodayDate(day.date),
              'bg-blue-100 dark:bg-blue-900/50': isSelectedDate(day.date)
            }"
          >
            <div class="font-medium text-sm text-gray-500 dark:text-gray-400">{{ day.name }}</div>
            <div
              class="mx-auto w-8 h-8 flex items-center justify-center rounded-full transition-colors"
              :class="{
                'bg-blue-500 text-white': isTodayDate(day.date),
                'font-bold text-blue-600 dark:text-blue-300': isSelectedDate(day.date) && !isTodayDate(day.date)
              }"
            >
              {{ day.date.getDate() }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-8">
          <div class="border-r dark:border-gray-700 p-1 text-xs text-gray-500 dark:text-gray-400">
            <div v-for="hour in hours" :key="hour" class="h-12 relative">
              <span class="absolute -top-2.5 -left-8">{{ hour }}</span>
            </div>
          </div>
          <div v-for="day in weekDays" :key="'col-'+day.date" class="border-r dark:border-gray-700 relative">
            <div v-for="hour in hours" :key="'cell-'+day.date+hour" class="h-12 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30"></div>
            <div
              v-for="event in getEventsForDay(day.date)"
              :key="event.id"
              class="absolute left-0 right-1 mx-1 px-2 py-1 text-xs rounded-lg bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 shadow-sm overflow-hidden transition-all"
              :style="{ top: `${(event.startHour + event.startMinute/60) * 48}px`, height: `${event.duration * 48/60}px` }"
            >
              <div class="font-medium truncate text-blue-800 dark:text-blue-100">{{ event.title }}</div>
              <div class="truncate text-xs text-blue-600 dark:text-blue-300">{{ event.time }}</div>
              <div v-if="event.location" class="flex items-center mt-1">
                <svg class="w-3 h-3 mr-1 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span class="truncate text-xs text-blue-600 dark:text-blue-400">{{ event.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Day View -->
    <div v-if="activeView === 'Day'" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 overflow-x-auto shadow-sm">
      <div class="min-w-[600px]">
        <div class="flex items-center justify-between mb-4">
          <div class="font-semibold text-lg tracking-wide">
            {{ selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) }}
          </div>
          <div class="flex items-center gap-2">
            <AppButton variant="secondary" @click="prevDay" class="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </AppButton>
            <AppButton variant="secondary" @click="today" class="px-3 py-2">Today</AppButton>
            <AppButton variant="secondary" @click="nextDay" class="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </AppButton>
          </div>
        </div>

        <div class="grid grid-cols-12">
          <div class="col-span-1 border-r dark:border-gray-700 p-1 text-xs text-gray-500 dark:text-gray-400">
            <div v-for="hour in hours" :key="hour" class="h-16 relative">
              <span class="absolute -top-2 -left-8">{{ hour }}</span>
            </div>
          </div>
          <div class="col-span-11 relative">
            <div v-for="hour in hours" :key="'hour-'+hour" class="h-16 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30"></div>

            <div
              v-for="event in getEventsForDay(selectedDate)"
              :key="event.id"
              class="absolute left-1 right-1 mx-1 px-3 py-2 text-sm rounded-lg bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 shadow-sm overflow-hidden transition-all"
              :style="{ top: `${(event.startHour + event.startMinute/60) * 64}px`, height: `${event.duration * 64/60}px` }"
            >
              <div class="font-medium text-blue-800 dark:text-blue-100">{{ event.title }}</div>
              <div class="text-blue-600 dark:text-blue-300 text-sm">{{ event.time }}</div>
              <div v-if="event.location" class="flex items-center mt-1">
                <svg class="w-3 h-3 mr-1 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span class="text-xs text-blue-600 dark:text-blue-400">{{ event.location }}</span>
              </div>
              <div v-if="event.duration > 60" class="mt-2 text-xs text-blue-600 dark:text-blue-400 line-clamp-2">
                {{ event.description || 'Additional details about this event would appear here...' }}
              </div>
              <div class="absolute bottom-1 right-1 text-xs px-2 py-0.5 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200">
                {{ event.duration }} min
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Year View -->
    <div v-if="activeView === 'Year'" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div class="font-semibold text-lg tracking-wide">{{ year }}</div>
        <div class="flex items-center gap-2">
          <AppButton variant="secondary" @click="prevYear" class="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </AppButton>
          <AppButton variant="secondary" @click="today" class="px-3 py-2">Today</AppButton>
          <AppButton variant="secondary" @click="nextYear" class="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </AppButton>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div
          v-for="(m, index) in months"
          :key="m"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          @click="selectMonth(index)"
        >
          <div class="text-center font-medium mb-1">{{ m }}</div>
          <div class="grid grid-cols-7 gap-1 text-xs">
            <div v-for="d in daysShort" :key="d" class="text-center text-gray-400">{{ d[0] }}</div>
            <div v-for="i in new Date(year, index, 1).getDay()" :key="'b'+i"></div>
            <div
              v-for="d in new Date(year, index+1, 0).getDate()"
              :key="d"
              class="text-center p-0.5 rounded transition-colors"
              :class="{
                'bg-blue-100 dark:bg-blue-900': isToday(year, index, d),
                'text-blue-600 dark:text-blue-300': isSelectedMonthDay(index, d)
              }"
            >
              {{ d }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Agenda View -->
    <div v-if="activeView === 'Agenda'" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div class="font-semibold text-lg tracking-wide">Agenda</div>
        <div class="flex items-center gap-2">
          <AppButton variant="secondary" @click="prevMonth" class="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </AppButton>
          <AppButton variant="secondary" @click="today" class="px-3 py-2">Today</AppButton>
          <AppButton variant="secondary" @click="nextMonth" class="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </AppButton>
        </div>
      </div>

      <div class="space-y-4">
        <div v-for="day in agendaDays" :key="day.date">
          <div class="font-medium mb-2 text-gray-600 dark:text-gray-400">
            {{ new Date(day.date).toLocaleDateString('en-US', { weekday:'long', month:'short', day:'numeric' }) }}
          </div>
          <div class="space-y-2">
            <div
              v-for="event in day.events"
              :key="event.id"
              class="p-2 rounded-lg bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 shadow-sm text-sm"
            >
              <div class="font-medium text-blue-800 dark:text-blue-100">{{ event.title }}</div>
              <div class="text-blue-600 dark:text-blue-300 text-xs">{{ event.time }} - {{ event.location || '' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mini Calendar View -->
    <div v-if="activeView === 'Mini'" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-2 shadow-sm">
      <div class="grid grid-cols-7 gap-1 text-center text-xs">
        <div v-for="d in daysShort" :key="d" class="py-1 text-gray-500 dark:text-gray-400 font-medium">{{ d }}</div>
        <div v-for="i in startBlank" :key="'bmini'+i"></div>
        <div
          v-for="d in daysInMonth"
          :key="'mini'+d"
          class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors text-xs"
          :class="{
            'bg-blue-100 dark:bg-blue-900': isToday(year, month, d),
            'font-semibold text-blue-600 dark:text-blue-300': isSelected(year, month, d)
          }"
          @click="selectDate(year, month, d)"
        >
          {{ d }}
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppButton from '../components/AppButton.vue'

// Configuration
const views = ['Month', 'Week', 'Day', 'Year', 'Agenda', 'Mini']
const activeView = ref('Month')
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const hours = Array.from({ length: 24 }, (_, i) => `${i % 12 === 0 ? 12 : i % 12}${i < 12 ? 'AM' : 'PM'}`)

// Date state
const todayDate = new Date()
const year = ref(todayDate.getFullYear())
const month = ref(todayDate.getMonth())
const selectedDate = ref(new Date())
const currentWeekStart = ref(new Date(
  todayDate.getFullYear(),
  todayDate.getMonth(),
  todayDate.getDate() - todayDate.getDay()
))

const sampleEvents = [
  { 
    id: 1, 
    title: 'Team Meeting', 
    date: new Date(), 
    startHour: 10, 
    startMinute: 0,
    duration: 60,
    time: '10:00 AM - 11:00 AM',
    location: 'Conference Room A',
    description: 'Weekly team sync to discuss project progress and blockers'
  },
  { 
    id: 2, 
    title: 'Lunch with Client', 
    date: new Date(new Date().setDate(new Date().getDate() + 1)), 
    startHour: 12, 
    startMinute: 30,
    duration: 90,
    time: '12:30 PM - 2:00 PM',
    location: 'Downtown Cafe',
    description: 'Discuss new project requirements with ABC Corp representatives'
  },
  { 
    id: 3, 
    title: 'Project Deadline', 
    date: new Date(new Date().setDate(new Date().getDate() + 5)), 
    startHour: 9, 
    startMinute: 0,
    duration: 480,
    time: 'All day',
    location: 'Office',
    description: 'Final submission for Q3 product launch materials'
  },
  { 
    id: 4, 
    title: 'Doctor Appointment', 
    date: new Date(new Date().setDate(new Date().getDate() + 3)), 
    startHour: 15, 
    startMinute: 0,
    duration: 30,
    time: '3:00 PM - 3:30 PM',
    location: 'Health Center',
    description: 'Annual physical checkup with Dr. Smith'
  },
  { 
    id: 5, 
    title: 'Weekly Sync', 
    date: new Date(), 
    startHour: 14, 
    startMinute: 0,
    duration: 30,
    time: '2:00 PM - 2:30 PM',
    location: 'Zoom',
    description: 'Cross-functional team alignment meeting'
  },
  { 
    id: 6, 
    title: 'Code Review', 
    date: new Date(new Date().setDate(new Date().getDate() + 2)), 
    startHour: 11, 
    startMinute: 0,
    duration: 45,
    time: '11:00 AM - 11:45 AM',
    location: 'Dev Room',
    description: 'Review new authentication module implementation'
  }
]

const monthName = computed(() => months[month.value])
const daysInMonth = computed(() => new Date(year.value, month.value + 1, 0).getDate())
const startBlank = computed(() => new Date(year.value, month.value, 1).getDay())

const weekRange = computed(() => {
  const start = new Date(currentWeekStart.value)
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: start.getMonth() !== end.getMonth() ? 'numeric' : undefined })}`
})

const weekDays = computed(() => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeekStart.value)
    date.setDate(date.getDate() + i)
    return {
      name: daysShort[date.getDay()],
      date: date
    }
  })
})

const agendaDays = computed(() => {
  return Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return {
      date: date,
      events: sampleEvents.filter(event => 
        event.date.toDateString() === date.toDateString()
      ).sort((a, b) => (a.startHour * 60 + a.startMinute) - (b.startHour * 60 + b.startMinute))
    }
  })
})

// Helper functions
function isToday(y, m, d) {
  const today = new Date()
  return y === today.getFullYear() && m === today.getMonth() && d === today.getDate()
}

function isTodayDate(date) {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

function isSelected(y, m, d) {
  return (
    y === selectedDate.value.getFullYear() &&
    m === selectedDate.value.getMonth() &&
    d === selectedDate.value.getDate()
  )
}

function isSelectedDate(date) {
  return date.toDateString() === selectedDate.value.toDateString()
}

function isSelectedMonthDay(m, d) {
  return (
    month.value === m &&
    year.value === selectedDate.value.getFullYear() &&
    d === selectedDate.value.getDate()
  )
}

function hasEvents(y, m, d) {
  const date = new Date(y, m, d)
  return sampleEvents.some(event => event.date.toDateString() === date.toDateString())
}

function countEvents(y, m, d) {
  const date = new Date(y, m, d)
  return sampleEvents.filter(event => event.date.toDateString() === date.toDateString()).length
}

function getEventsForDay(date) {
  return sampleEvents.filter(event => 
    event.date.toDateString() === date.toDateString()
  ).sort((a, b) => (a.startHour * 60 + a.startMinute) - (b.startHour * 60 + b.startMinute))
}

// Navigation functions
function today() {
  const today = new Date()
  year.value = today.getFullYear()
  month.value = today.getMonth()
  selectedDate.value = new Date()
  currentWeekStart.value = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  )
}

function prevMonth() {
  if (month.value === 0) {
    month.value = 11
    year.value--
  } else {
    month.value--
  }
}

function nextMonth() {
  if (month.value === 11) {
    month.value = 0
    year.value++
  } else {
    month.value++
  }
}

function prevWeek() {
  const newDate = new Date(currentWeekStart.value)
  newDate.setDate(newDate.getDate() - 7)
  currentWeekStart.value = newDate
}

function nextWeek() {
  const newDate = new Date(currentWeekStart.value)
  newDate.setDate(newDate.getDate() + 7)
  currentWeekStart.value = newDate
}

function prevDay() {
  const newDate = new Date(selectedDate.value)
  newDate.setDate(newDate.getDate() - 1)
  selectedDate.value = newDate
}

function nextDay() {
  const newDate = new Date(selectedDate.value)
  newDate.setDate(newDate.getDate() + 1)
  selectedDate.value = newDate
}

function prevYear() {
  year.value--
}

function nextYear() {
  year.value++
}

function selectDate(y, m, d) {
  selectedDate.value = new Date(y, m, d)
}

function selectMonth(m) {
  month.value = m
  activeView.value = 'Month'
}

onMounted(() => {
  // Initialize with today's date
  today()
})
</script>

<style scoped>
/* Smooth transitions */
.hover\:bg-gray-50, .hover\:bg-gray-100, .hover\:bg-gray-800\/30, .hover\:bg-gray-800\/50,
.bg-blue-100, .bg-blue-50, .bg-blue-500, .text-blue-600 {
  transition: all 0.2s ease;
}

/* Better event shadows */
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark .shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .min-w-\[700px\], .min-w-\[600px\] {
    min-width: calc(100vw - 2rem);
  }
  
  .absolute.-left-8 {
    left: -0.5rem;
  }
  
  .absolute.-left-10 {
    left: -0.5rem;
  }
  
  /* Compact month view on mobile */
  .grid-cols-7 {
    gap: 0.1rem;
  }
  
  .p-2 {
    padding: 0.25rem;
  }
  
  .text-sm {
    font-size: 0.75rem;
  }
}
.flex.justify-center.gap-1 {
  gap: 0.1rem;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>