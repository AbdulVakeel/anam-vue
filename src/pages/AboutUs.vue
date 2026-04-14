<template>
  <!-- ABOUT SECTION -->
  <section class="py-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
      <div class="order-2 md:order-1">
        <p class="text-yellow-500 dark:text-yellow-400 font-semibold text-sm uppercase tracking-wider mb-3">Your  Software Experts</p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
          About <span class="text-green-500 dark:text-green-400">AnamUI</span> <span class="text-yellow-500 dark:text-yellow-400"> Solutions</span>!
        </h2>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
          At AnamUI Solutions, we specialize in building robust, scalable  software platforms for network marketing businesses. With over 8 years of experience, we've helped 150+ companies streamline their compensation plans, member management, and e-commerce operations.
        </p>
      </div>

      <!-- Image container -->
      <div class="relative group order-1 md:order-2">
        <img 
          src="/img/web/web_1.png" 
          alt="Software Dashboard" 
          class="w-full rounded-xl shadow-xl border-4 border-gray-200 dark:border-gray-700 contrast-125 brightness-110 saturate-150 hover:scale-105 transition-transform duration-500"
          @contextmenu.prevent
        />
        <div class="absolute bottom-4 right-4 bg-black/20 dark:bg-white/10 backdrop-blur-sm text-xs px-3 py-1.5 rounded-lg font-medium pointer-events-none select-none">
          <span class="font-bold text-white dark:text-gray-100 flex items-center gap-1">
            © <span class="text-sky-400">AnamUI</span>
          </span>
        </div>
      </div>
    </div>
  </section>

  <!-- VALUES SECTION -->
  <section class="py-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl mt-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
        What Defines <span class="text-green-500 dark:text-green-400">AnamUI</span> <span class="text-yellow-500 dark:text-yellow-400">Solutions</span>?
      </h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-6">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        <div class="flex justify-center mb-5">
          <Icon :icon="feature.icon" class="text-yellow-500 dark:text-yellow-400" width="40" height="40" />
        </div>
        <h3 class="text-lg sm:text-xl font-semibold mb-3 text-center text-gray-900 dark:text-white">{{ feature.title }}</h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed text-center">
          {{ feature.text }}
        </p>
      </div>
    </div>
  </section>

  <!-- STATISTICS SECTION -->
  <section class="py-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl mt-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p class="text-yellow-500 dark:text-yellow-400 font-semibold uppercase text-sm mb-2 tracking-wider">Achievements</p>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-12 text-gray-900 dark:text-white">
        Our Development <span class="text-green-500 dark:text-green-400">Milestones</span> and <span class="text-yellow-500 dark:text-yellow-400">Capabilities</span>
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition"
        >
          <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">{{ stat.label }}</p>
          <p class="text-2xl sm:text-3xl font-bold text-yellow-500 dark:text-yellow-400">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- MISSION, VISION, GOALS -->
  <section class="py-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl mt-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(card, index) in aboutCards"
        :key="index"
        class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        <img
          :src="card.image"
          :alt="card.title"
          class="w-full h-48 object-cover"
        />
        <div class="p-6">
          <h3 class="text-yellow-500 dark:text-yellow-400 text-lg font-semibold mb-3">{{ card.title }}</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const features = [
  {
    icon: 'mdi:handshake-outline',
    title: 'Trustworthy Services',
    text: 'We prioritize trust from the beginning with a smooth Live Trading Account setup. Identity verified? Your account is quickly ready.',
  },
  {
    icon: 'mdi:shield-account-outline',
    title: 'Reliable Experience',
    text: 'With a secure verification process, we ensure a dependable experience from the start of your trading journey.',
  },
  {
    icon: 'mdi:diamond-stone',
    title: 'Value-Centric Approach',
    text: 'Trade from anywhere — PC, Android, iPad, iPhone, or browser — with seamless accessibility.',
  },
]

const stats = [
  { label: 'Our Clients', value: '837+' },
  { label: 'Compensation Plans', value: '35+' },
  { label: 'Development Team', value: '12' },
  { label: 'Avg. Delivery Time', value: '11 Days' },
]

const aboutCards = [
  {
    title: 'Our Mission',
    description: 'To empower  businesses with cutting-edge technology solutions that simplify operations, enhance distributor experience, and drive growth.',
    image: '/about/goals.jpg',
  },
  {
    title: 'Our Vision',
    description: 'To become the global leader in  software development, transforming how network marketing companies operate in the digital age.',
    image: '/about/vision.jpg',
  },
  {
    title: 'Our Expertise',
    description: 'Specialized in complex compensation plans, multi-level genealogy, e-wallet systems, and automated payout processing for  businesses.',
    image: '/about/mission.jpg',
  },
  {
    title: 'Core Values',
    description: 'Innovation, Reliability, Client Success, Technical Excellence, and Ethical Business Practices form the foundation of our operations.',
    image: '/about/values.jpg',
  },
]
</script>

<style scoped>
/* Smooth transitions for dark mode */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* Hover effects */
.hover-scale {
  transition: transform 0.3s ease;
}
.hover-scale:hover {
  transform: scale(1.02);
}

/* Gradient text for special elements */
.gradient-text {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(90deg, #3b82f6, #10b981);
}

/* Responsive typography */
@media (max-width: 640px) {
  .responsive-text {
    font-size: 1.25rem;
    line-height: 1.5;
  }
}
</style>