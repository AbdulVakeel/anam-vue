<template>
  <!-- Services Section -->
  <section class="py-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          data-aos="fade-up"
          :data-aos-delay="100 * index"
          :class="[ 
            'rounded-2xl shadow-lg p-6 flex flex-col items-center text-center relative overflow-hidden',
            'transform transition-all duration-500 hover:-translate-y-3 hover:shadow-xl',
            'before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
            service.bg,
            service.beforeGradient
          ]"
        >
          <div class="relative z-10">
            <div class="text-4xl mb-4 text-black dark:text-white">
              <Icon :icon="service.icon" />
            </div>
            <h3 class="font-semibold text-lg mb-2 text-black dark:text-white">
              {{ service.title }}
            </h3>
            <p class="text-gray-700 dark:text-gray-300 text-sm">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Expertise Section -->
  <section class="py-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="(expertise, index) in expertises"
          :key="index"
          data-aos="zoom-in"
          :data-aos-delay="150 * index"
          class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-sky-500 transition-all duration-300 hover:-translate-y-2 group"
        >
          <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-6 mx-auto group-hover:bg-sky-100/30 dark:group-hover:bg-sky-900/30 group-hover:border-sky-500 transition-all">
            <Icon :icon="expertise.icon" class="w-8 h-8 text-sky-500 group-hover:scale-110 transition-transform" />
          </div>
          <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">{{ expertise.title }}</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {{ expertise.description }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process Section -->
  <section class="py-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <div class="max-w-7xl mx-auto px-4">
      <div class="relative">
        <div class="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-500/10 via-cyan-500/10 to-blue-500/10 z-0" data-aos="zoom-in"></div>

        <div class="grid md:grid-cols-3 gap-8 relative z-10">
          <div 
            v-for="(step, index) in processSteps"
            :key="index"
            data-aos="fade-up"
            :data-aos-delay="200 * index"
            class="text-center flex flex-col items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-sky-500 transition-all hover:shadow-lg group"
          >
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-6 group-hover:bg-sky-100/30 dark:group-hover:bg-sky-900/30 group-hover:border-sky-500 transition-all">
              <Icon :icon="step.icon" class="text-sky-500 text-3xl group-hover:scale-110 transition-transform" />
            </div>
            <h3 class="text-xl font-bold text-sky-500 mb-3">{{ step.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {{ step.description }}
            </p>
            <span class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-yellow-400">{{ step.step }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Tech Stack Section -->
  <section class="py-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-6">
        <div
          v-for="(tech, index) in techStack"
          :key="index"
          data-aos="flip-left"
          :data-aos-delay="150 * index"
          class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:shadow-xl transition-all hover:-translate-y-2 hover:border-sky-500 group"
        >
          <div class="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
            <Icon :icon="tech.icon" class="text-yellow-500" width="48" height="48" />
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{{ tech.title }}</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">{{ tech.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(feature, index) in features"
          :key="index"
          data-aos="fade-up"
          :data-aos-delay="100 * (index % 3)"
          class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex items-start gap-5 hover:border-sky-500 hover:shadow-lg transition-all hover:-translate-y-2"
        >
          <div :class="`p-3.5 rounded-full ${feature.color} bg-gradient-to-br flex-shrink-0`">
            <Icon :icon="feature.icon" class="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Reasons Section -->
  <section class="py-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="(card, index) in reasons"
          :key="index"
          data-aos="zoom-in"
          :data-aos-delay="150 * index"
          class="border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-3 hover:border-sky-500 text-center flex flex-col items-center"
        >
          <div class="w-16 h-16 rounded-full bg-sky-100/20 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-500/50 flex items-center justify-center mb-4 group-hover:bg-sky-500/20 transition-colors">
            <Icon :icon="card.icon" class="text-sky-500 w-8 h-8 group-hover:scale-110 transition-transform" />
          </div>
          <h4 class="text-lg font-bold text-sky-500 mb-2">{{ card.title }}</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue';

onMounted(() => {
  AOS.init({
    duration: 800,
    once: false,
    easing: 'ease-in-out-quad',
    mirror: true
  })
})

const expertises = [
  {
    icon: 'mdi:brain',
    title: 'Strategic Thinking',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'
  },
  {
    icon: 'mdi:tools',
    title: 'Creative Solutions',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'
  },
  {
    icon: 'mdi:rocket-launch',
    title: 'Rapid Execution',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  },
  {
    icon: 'mdi:shield-check',
    title: 'Reliable Security',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
]

const processSteps = [
  {
    step: '1',
    title: 'Discovery Phase',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    icon: 'mdi:lightbulb-on-outline'
  },
  {
    step: '2',
    title: 'Development Stage',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
    icon: 'mdi:code-tags'
  },
  {
    step: '3',
    title: 'Deployment',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: 'mdi:rocket-launch'
  }
]

const reasons = [
  {
    icon: 'mdi:robot-outline',
    title: 'Innovative Technology',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
  },
  {
    icon: 'mdi:currency-usd-circle-outline',
    title: 'Cost Effective',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  },
  {
    icon: 'mdi:web-box',
    title: 'Web Solutions',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    icon: 'mdi:shield-check-outline',
    title: 'Data Protection',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
]

const features = [
  {
    title: "User Management",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    icon: "mdi:account-group",
    color: "from-blue-600 to-blue-800",
  },
  {
    title: "Payment Processing",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    icon: "mdi:credit-card-multiple",
    color: "from-green-600 to-green-800",
  },
  {
    title: "Data Analytics",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    icon: "mdi:chart-bar",
    color: "from-yellow-500 to-yellow-700",
  }
];

const techStack = [
  {
    icon: 'logos:react',
    title: 'React',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
  },
  {
    icon: 'logos:nodejs-icon',
    title: 'Node.js',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
  },
  {
    icon: 'logos:mongodb-icon',
    title: 'MongoDB',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
  },
  {
    icon: 'logos:aws',
    title: 'AWS',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.',
  }
]

const services = [
  {
    title: 'Web Development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
    icon: 'mdi:web',
    bg: 'bg-yellow-100 dark:bg-yellow-400/30',
    beforeGradient: 'before:from-yellow-200/50 before:to-yellow-100/20'
  },
  {
    title: 'Mobile Apps',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    icon: 'mdi:cellphone',
    bg: 'bg-blue-100 dark:bg-blue-600/30',
    beforeGradient: 'before:from-blue-200/50 before:to-blue-100/20'
  },
  {
    title: 'UI/UX Design',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
    icon: 'mdi:palette',
    bg: 'bg-pink-100 dark:bg-pink-600/30',
    beforeGradient: 'before:from-pink-200/50 before:to-pink-100/20'
  },
  {
    title: 'Cloud Solutions',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.',
    icon: 'mdi:cloud',
    bg: 'bg-green-100 dark:bg-green-600/30',
    beforeGradient: 'before:from-green-200/50 before:to-green-100/20'
  },
]
</script>

<style>
[data-aos="zoom-in"] {
  transform: scale(0.95);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="zoom-in"].aos-animate {
  transform: scale(1);
  opacity: 1;
}

[data-aos] {
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
}
</style>