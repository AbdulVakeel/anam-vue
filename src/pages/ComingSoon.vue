<template>
    <div
      class="min-h-screen bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-8 md:p-12 text-center  w-full"
    >
      <!-- Logo -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          <span class="text-indigo-600">⟨</span>AnamUI
        </h1>
      </div>

      <!-- Title -->
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
        We Are Launching Soon...
      </h2>
      <p class="text-gray-600 dark:text-gray-300 mb-8">
        Exciting news is on the horizon! We're thrilled to announce that something 
        incredible is coming your way very soon. Our team has been hard at work 
        behind the scenes, crafting something special just for you.
      </p>

      <!-- Countdown -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div class="flex flex-col items-center">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ timeLeft.days }}</span>
          <span class="text-gray-600 dark:text-gray-300 uppercase text-sm">Days</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ timeLeft.hours }}</span>
          <span class="text-gray-600 dark:text-gray-300 uppercase text-sm">Hours</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ timeLeft.minutes }}</span>
          <span class="text-gray-600 dark:text-gray-300 uppercase text-sm">Minutes</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ timeLeft.seconds }}</span>
          <span class="text-gray-600 dark:text-gray-300 uppercase text-sm">Seconds</span>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

// target date (example: 3 days later)
const targetDate = new Date()
targetDate.setDate(targetDate.getDate() + 3)

const timeLeft = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

const calculateTimeLeft = () => {
  const now = new Date().getTime()
  const difference = targetDate - now

  if (difference > 0) {
    timeLeft.value = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  } else {
    timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
}

let timer
onMounted(() => {
  calculateTimeLeft()
  timer = setInterval(calculateTimeLeft, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
