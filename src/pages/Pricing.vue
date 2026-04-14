<template>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <!-- Heading -->
    <h2
      class="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 leading-snug"
    >
      Customizable Membership Options Designed for Your Group's Growth!
    </h2>

    <!-- Billing Toggle -->
    <div
      class="flex justify-center items-center mt-6 space-x-3 text-gray-700 dark:text-gray-300"
    >
      <span class="text-sm md:text-base">Monthly</span>
      <label
        class="relative inline-flex items-center cursor-pointer select-none"
        aria-label="Toggle billing period"
      >
        <input
          type="checkbox"
          v-model="isYearly"
          class="sr-only peer"
          aria-checked="isYearly"
        />
        <div
          class="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 
          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
          after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border 
          after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
        ></div>
      </label>
      <span class="text-sm md:text-base">
        Yearly
        <span class="text-xs text-green-500 font-medium">(Save 20%)</span>
      </span>
    </div>

    <!-- Pricing Cards -->
    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Silver Plan -->
      <div
        class="plan-card"
      >
        <span class="plan-label">ESSENTIAL</span>
        <h3 class="plan-price text-blue-500">Free</h3>
        <ul class="plan-features">
          <li class="feature-yes">✔ Up to 3 team members</li>
          <li class="feature-yes">✔ Basic collaboration</li>
          <li class="feature-no">✘ Expanded storage</li>
          <li class="feature-no">✘ Data protection</li>
          <li class="feature-no">✘ Advanced controls</li>
        </ul>
        <button class="btn-primary">Get Started</button>
      </div>

      <!-- Bronze Plan (Popular) -->
      <div
        class="plan-card border-2 border-orange-300 dark:border-orange-600 relative"
      >
        <span
          class="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow"
        >
          BEST VALUE
        </span>
        <span class="plan-label">PROFESSIONAL</span>
        <div class="plan-price-wrap">
          <span class="plan-price text-orange-500">
            {{ isYearly ? '$47.90' : '$4.99' }}
          </span>
          <span class="plan-duration">
            /{{ isYearly ? 'year' : 'mo' }}
          </span>
        </div>
        <ul class="plan-features">
          <li class="feature-yes">✔ Up to 5 collaborators</li>
          <li class="feature-yes">✔ Cross-device access</li>
          <li class="feature-yes">✔ 80GB secure storage</li>
          <li class="feature-no">✘ Automated backups</li>
          <li class="feature-no">✘ Team management</li>
        </ul>
        <button class="btn-orange">Upgrade Now</button>
      </div>

      <!-- Gold Plan -->
      <div class="plan-card">
        <span class="plan-label">ENTERPRISE</span>
        <div class="plan-price-wrap">
          <span class="plan-price text-blue-500">
            {{ isYearly ? '$95.90' : '$9.99' }}
          </span>
          <span class="plan-duration">
            /{{ isYearly ? 'year' : 'mo' }}
          </span>
        </div>
        <ul class="plan-features">
          <li class="feature-yes">✔ Unlimited members</li>
          <li class="feature-yes">✔ Priority support</li>
          <li class="feature-yes">✔ 120GB storage</li>
          <li class="feature-yes">✔ Weekly backups</li>
          <li class="feature-yes">✔ Advanced permissions</li>
        </ul>
        <button class="btn-primary">Go Premium</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isYearly = ref(false);
</script>

<style scoped>
.plan-card {
  @apply rounded-xl border border-gray-200 dark:border-gray-800 
    bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all duration-300 
    p-6 flex flex-col items-center text-center;
}
.plan-label {
  @apply text-sm tracking-wider text-gray-400 mb-2 uppercase;
}
.plan-price-wrap {
  @apply flex items-center mb-4;
}
.plan-price {
  @apply text-3xl font-bold;
}
.plan-duration {
  @apply ml-1 text-gray-400;
}
.plan-features {
  @apply text-sm space-y-2 mb-6;
}
.feature-yes {
  @apply text-blue-500;
}
.feature-no {
  @apply text-gray-500;
}
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full w-full transition-colors duration-200;
}
.btn-orange {
  @apply bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full w-full transition-colors duration-200;
}
</style>
