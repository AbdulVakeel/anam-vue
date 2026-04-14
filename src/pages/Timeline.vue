<template>
  <section class="py-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden">
    <!-- Header Section -->
    <div class="text-center mb-20 px-4">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Our <span class="bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text">Work Process</span>
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Discover our systematic approach to delivering exceptional results through collaboration and innovation.
      </p>
    </div>

    <!-- Main Timeline -->
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Vertical Line -->
      <div class="absolute left-1/2 w-1 h-full bg-gradient-to-b from-sky-400 to-blue-600 transform -translate-x-1/2 z-0"></div>

      <!-- Timeline Items -->
      <div v-for="(item, index) in timeline" :key="index" class="relative mb-16">
        <!-- Item Container -->
        <div class="flex flex-col md:flex-row items-center relative z-10" :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
          <!-- Date/Circle -->
          <div class="w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0" :class="index % 2 === 0 ? 'md:justify-end pr-10' : 'md:justify-start pl-10'">
            <div class="relative group">
              <div class="absolute inset-0 bg-sky-400 rounded-full blur-md opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div class="relative w-24 h-24 flex items-center justify-center bg-white dark:bg-gray-800 border-4 border-sky-400 rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110">
                <div class="text-sky-500 dark:text-sky-400 text-3xl">
                  <Icon :icon="item.icon" />
                </div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="w-full md:w-1/2 px-4" :class="index % 2 === 0 ? 'md:pr-4 md:pl-10' : 'md:pl-4 md:pr-10'">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <div class="flex items-center mb-3">
                <span class="inline-block w-3 h-3 rounded-full bg-sky-400 mr-2"></span>
                <span class="text-sm font-semibold text-sky-500 dark:text-sky-400">{{ `Step ${index + 1}` }}</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">{{ item.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const timeline = [
  {
    title: 'Discovery Phase',
    description: 'We start by understanding your vision, goals, and requirements through comprehensive discussions and research.',
    icon: 'mdi:magnify'
  },
  {
    title: 'Planning & Strategy',
    description: 'Our team crafts a detailed roadmap with milestones, technologies, and methodologies tailored to your project.',
    icon: 'mdi:chart-gantt'
  },
  {
    title: 'Design & Prototyping',
    description: 'We create intuitive user interfaces and interactive prototypes to visualize the final product.',
    icon: 'mdi:palette-outline'
  },
  {
    title: 'Development',
    description: 'Our developers implement the solution using best practices, clean code, and modern technologies.',
    icon: 'mdi:code-braces'
  },
  {
    title: 'Quality Assurance',
    description: 'Rigorous testing ensures your product meets the highest standards of performance and reliability.',
    icon: 'mdi:check-circle-outline'
  },
  {
    title: 'Deployment & Support',
    description: 'We handle seamless deployment and provide ongoing support to ensure your success.',
    icon: 'mdi:cloud-upload-outline'
  }
]
</script>

<style scoped>
/* Smooth animations */
.timeline-item-enter-active,
.timeline-item-leave-active {
  transition: all 0.5s ease;
}
.timeline-item-enter-from,
.timeline-item-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Glow effect on hover */
.hover-glow:hover {
  box-shadow: 0 0 15px rgba(56, 182, 255, 0.3);
}

/* Pulse animation for active step */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.pulse {
  animation: pulse 2s infinite;
}
</style>