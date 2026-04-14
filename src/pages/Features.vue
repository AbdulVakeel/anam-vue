<template>
  <section class="py-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-white border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-6">

      <!-- Header -->
      <div class="mb-16 text-center" data-aos="fade-down">
        <h2 class="text-4xl md:text-5xl font-bold leading-tight">
          <span class="bg-gradient-to-r from-sky-400 to-sky-100 text-transparent bg-clip-text">
            Future-Ready Development Solutions
          </span><br />
          <span class="text-white">Empowering Your Business to Scale Smarter</span>
        </h2>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"

          :class="[ 
            'rounded-t-full rounded-bl-full shadow-md p-6 flex flex-col items-center text-center relative',
            'transition-transform duration-300 hover:-translate-y-2 hover:scale-105',
            service.bg 
          ]"
        >
          <div class="text-4xl mb-4 text-black">
            <Icon :icon="service.icon" />
          </div>
          <h3 class="font-semibold text-lg mb-2 text-black">
            {{ service.title }}
          </h3>
          <p class="text-gray-700 text-sm">
            {{ service.description }}
          </p>
        </div>
      </div>

    </div>
  </section>

</template>

<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted } from 'vue'

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
  })
})

const services = [
  {
    title: 'Real-Time Chat Support',
    description: 'Engage users instantly with real-time chat integration for higher conversions.',
    icon: 'mdi:chat-outline',
    bg: 'bg-yellow-100',
  },
  {
    title: '24/7 Global Assistance',
    description: 'Deliver round-the-clock technical support and customer care services worldwide.',
    icon: 'mdi:headset',
    bg: 'bg-blue-100',
  },
  {
    title: 'Cloud-Powered Backoffice',
    description: 'Mobilize your operations with scalable, secure, and remote-ready backoffice tools.',
    icon: 'mdi:map-marker-path',
    bg: 'bg-pink-100',
  },
  {
    title: 'Intelligent Bot Systems',
    description: 'Automate workflows with AI-driven bots tailored for business efficiency.',
    icon: 'mdi:robot-outline',
    bg: 'bg-purple-100',
  },
  {
    title: 'Smart SMS Notifications',
    description: 'Stay connected with smart and secure SMS gateway integration.',
    icon: 'mdi:cellphone-message',
    bg: 'bg-pink-100',
  },
  {
    title: 'Secure Payment Solutions',
    description: 'Integrate multiple payment gateways with PCI-compliant encryption.',
    icon: 'mdi:credit-card-check-outline',
    bg: 'bg-purple-100',
  },
  {
    title: 'Centralized Ticket Management',
    description: 'Streamline support queries with a powerful ticket resolution platform.',
    icon: 'mdi:ticket-confirmation-outline',
    bg: 'bg-yellow-100',
  },
  {
    title: 'Custom Software Tailoring',
    description: 'Get fully tailored software solutions that align with your unique vision.',
    icon: 'mdi:code-tags',
    bg: 'bg-blue-100',
  },
]

</script>
