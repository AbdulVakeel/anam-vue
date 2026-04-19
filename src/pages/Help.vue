<template>
  <div class="space-y-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
    <div
      v-for="(f, idx) in faqs"
      :key="idx"
      class="border border-gray-200 dark:border-gray-800 rounded-2xl"
    >
      <button
        class="w-full text-left px-4 py-3 font-medium flex items-center justify-between"
        @click="toggleFAQ(idx)"
      >
        {{ f.q }}
        <span class="text-lg font-bold">{{ f.open ? '−' : '+' }}</span>
      </button>
      <div
        v-if="f.open"
        class="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300"
      >
        {{ f.a }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const faqs = reactive([
  { q: 'How to reset password?', a: 'Go to Forgot Password page and enter your email.', open: false },
  { q: 'How to change theme?', a: 'Use the toggle on the top bar to switch between dark and light modes.', open: false },
  { q: 'How to contact support?', a: 'Send us a message from the Help page or email support@example.com.', open: false },
  { q: 'Can I use this on mobile?', a: 'Yes! The entire site is fully responsive and works great on all devices.', open: false },
  { q: 'Is my data secure?', a: 'Absolutely! We use encryption and strict privacy measures to protect your data.', open: false },

  // 🔥 NEW FAQs
  { q: 'How to create an account?', a: 'Click on the Sign Up button and fill in your details to get started.', open: false },
  { q: 'How to upgrade my plan?', a: 'Go to the pricing page and choose the plan that fits your needs.', open: false },
  { q: 'How to withdraw earnings?', a: 'Navigate to the withdrawal section and submit your request.', open: false },
  { q: 'How to update profile details?', a: 'Go to your profile settings and edit your personal information.', open: false },
  { q: 'What payment methods are supported?', a: 'We support multiple payment gateways including crypto and manual methods.', open: false },
  { q: 'Do I need KYC verification?', a: 'Yes, KYC verification is required before making withdrawals.', open: false },
  { q: 'How long does withdrawal take?', a: 'Withdrawal processing time depends on the selected payment method.', open: false },
  { q: 'Can I change my password anytime?', a: 'Yes, you can change your password anytime from account settings.', open: false }
])
const toggleFAQ = (index) => {
  faqs.forEach((item, i) => {
    item.open = (i === index) ? !item.open : false
  })
}
</script>
