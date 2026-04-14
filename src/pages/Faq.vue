<template>
  <section class="py-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-white border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <p class="text-yellow-400 font-bold uppercase text-sm tracking-wider mb-3">FAQ</p>
          <h2 class="text-4xl md:text-5xl font-bold leading-tight">
            <span class="bg-gradient-to-r from-sky-400 to-sky-100 text-transparent bg-clip-text">
              Got Any Questions?
            </span><br />
            <span class="text-white">We're Here to Help</span>
          </h2>
        </div>

        <div class="text-lg text-gray-400">
          Whether you're new or experienced, our FAQ helps you find quick and reliable answers so you can focus on what matters.
        </div>
      </div>

      <!-- FAQ List -->
      <div class="max-w-4xl mx-auto space-y-6">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-gray-900 border border-gray-800 rounded-sm p-6 transition hover:shadow-xl"
        >
          <button
            @click="toggle(index)"
            class="w-full flex justify-between items-center text-left text-lg md:text-xl font-semibold text-white hover:text-sky-400 transition"
          >
            <span>{{ faq.question }}</span>
            <svg
              :class="{ 'rotate-180': activeIndex === index }"
              class="w-5 h-5 transform transition-transform duration-300 text-sky-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <transition name="fade">
            <div v-if="activeIndex === index" class="mt-4 text-gray-400 text-base leading-relaxed">
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>


</template>
<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue';

const activeIndex = ref(null)

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const faqs = ref([
  {
    question: 'What types of software do you develop?',
    answer:
      'We specialize in MLM systems (Unilevel, Binary, Matrix), ecommerce platforms, custom crypto tools, MT4/MT5 trading bots, and scalable web applications.',
  },
  {
    question: 'How long does it take to build a project?',
    answer:
      'Timelines vary by project complexity. A basic MLM or ecommerce system can take 2–4 weeks, while advanced platforms with integrations may take longer. We always give realistic deadlines.',
  },
  {
    question: 'Do you provide source code after project completion?',
    answer:
      'Yes. Once the final payment is made, we deliver the complete source code along with deployment support and documentation, unless stated otherwise in the contract.',
  },
  {
    question: 'Can you integrate payment gateways and crypto wallets?',
    answer:
      'Absolutely. We integrate various fiat gateways (like Razorpay, Stripe, etc.) and crypto wallets (like USDT, BTC, MetaMask) based on your requirements.',
  },
  {
    question: 'Do you offer technical support after delivery?',
    answer:
      'Yes, we provide up to 3 months of free bug support and offer extended maintenance packages for long-term updates and monitoring.',
  },
  {
    question: 'Will my platform be mobile-friendly?',
    answer:
      'All our projects are 100% responsive and optimized for both mobile and desktop devices with smooth UX/UI using frameworks like Vue.js and Tailwind CSS.',
  },
  {
    question: 'Can I request custom features or automation?',
    answer:
      'Definitely. Every system is built from scratch, and we welcome custom logic—whether it’s referral systems, reward engines, automation tools, or reporting dashboards.',
  },
])

</script>
