<template>
  <div class="max-w-6xl mx-auto px-4 py-16">
    <!-- Heading -->
    <div class="text-center mb-12">
      <h2
        class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight"
      >
        Customizable Membership Options
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mt-3 text-lg">
        Designed for Your Group's Growth!
      </p>
    </div>

    <!-- Billing Toggle -->
    <div class="flex justify-center items-center mb-12">
      <div class="bg-gray-100 dark:bg-gray-800 rounded-full p-1 inline-flex gap-1">
        <button
          @click="isYearly = false"
          :class="[
            'px-6 py-2 rounded-full text-sm font-medium transition-all duration-200',
            !isYearly
              ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          Monthly
        </button>
        <button
          @click="isYearly = true"
          :class="[
            'px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2',
            isYearly
              ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          Yearly
          <span class="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
            Save 20%
          </span>
        </button>
      </div>
    </div>

    <!-- Pricing Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Silver Plan -->
      <div class="group plan-card">
        <div class="w-full">
          <span class="plan-label">Essential</span>
          <div class="mt-4 mb-6">
            <div class="text-5xl font-bold text-gray-900 dark:text-white">
              Free
            </div>
          </div>
          <ul class="plan-features">
            <li class="feature-yes">
              <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Up to 3 team members</span>
            </li>
            <li class="feature-yes">
              <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Basic collaboration</span>
            </li>
            <li class="feature-no">
              <svg class="w-5 h-5 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              <span class="text-gray-500">Expanded storage</span>
            </li>
            <li class="feature-no">
              <svg class="w-5 h-5 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              <span class="text-gray-500">Data protection</span>
            </li>
            <li class="feature-no">
              <svg class="w-5 h-5 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              <span class="text-gray-500">Advanced controls</span>
            </li>
          </ul>
          <button class="btn-secondary mt-auto">
            Get Started
          </button>
        </div>
      </div>

      <!-- Bronze Plan (Popular) -->
      <div class="group plan-card popular relative">
        <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span class="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
            🔥 Best Value
          </span>
        </div>
        <div class="w-full pt-4">
          <span class="plan-label">Professional</span>
          <div class="mt-4 mb-6">
            <div class="flex items-baseline justify-center gap-1">
              <span class="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                {{ isYearly ? '$47.90' : '$4.99' }}
              </span>
              <span class="text-gray-500 dark:text-gray-400">/{{ isYearly ? 'year' : 'mo' }}</span>
            </div>
            <p v-if="isYearly" class="text-sm text-green-600 dark:text-green-400 mt-2">
              Save $11.89 annually
            </p>
          </div>
          <ul class="plan-features">
            <li class="feature-yes">
              <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Up to 5 collaborators</span>
            </li>
            <li class="feature-yes">
              <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Cross-device access</span>
            </li>
            <li class="feature-yes">
              <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>80GB secure storage</span>
            </li>
            <li class="feature-no">
              <svg class="w-5 h-5 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              <span class="text-gray-500">Automated backups</span>
            </li>
            <li class="feature-no">
              <svg class="w-5 h-5 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              <span class="text-gray-500">Team management</span>
            </li>
          </ul>
          <button class="btn-primary">
            Upgrade Now
          </button>
        </div>
      </div>

      <!-- Gold Plan -->
      <div class="group plan-card">
        <div class="w-full">
          <span class="plan-label">Enterprise</span>
          <div class="mt-4 mb-6">
            <div class="flex items-baseline justify-center gap-1">
              <span class="text-5xl font-bold text-gray-900 dark:text-white">
                {{ isYearly ? '$95.90' : '$9.99' }}
              </span>
              <span class="text-gray-500 dark:text-gray-400">/{{ isYearly ? 'year' : 'mo' }}</span>
            </div>
          </div>
          <ul class="plan-features">
            <li class="feature-yes">
              <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Unlimited members</span>
            </li>
            <li class="feature-yes">
              <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Priority support</span>
            </li>
            <li class="feature-yes">
              <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>120GB storage</span>
            </li>
            <li class="feature-yes">
              <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Weekly backups</span>
            </li>
            <li class="feature-yes">
              <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Advanced permissions</span>
            </li>
          </ul>
          <button class="btn-secondary mt-auto">
            Go Premium
          </button>
        </div>
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
  @apply relative rounded-2xl border border-gray-200 dark:border-gray-800 
    bg-white dark:bg-gray-900/50 backdrop-blur-sm
    shadow-lg hover:shadow-xl transition-all duration-300 
    p-8 flex flex-col;
}

.plan-card.popular {
  @apply border-2 border-orange-500/50 dark:border-orange-500/50
    shadow-xl shadow-orange-500/10;
}

.plan-label {
  @apply text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 
    uppercase text-center block;
}

.plan-features {
  @apply space-y-3 mb-8 flex-1;
}

.feature-yes, .feature-no {
  @apply flex items-center gap-3 text-sm;
}

.feature-yes span {
  @apply text-gray-700 dark:text-gray-300;
}

.btn-primary {
  @apply w-full bg-gradient-to-r from-orange-500 to-orange-600 
    hover:from-orange-600 hover:to-orange-700 
    text-white font-semibold px-6 py-3 rounded-xl 
    transition-all duration-200 transform hover:scale-[1.02]
    shadow-lg shadow-orange-500/25;
}

.btn-secondary {
  @apply w-full bg-gray-100 dark:bg-gray-800 
    hover:bg-gray-200 dark:hover:bg-gray-700 
    text-gray-900 dark:text-white font-semibold px-6 py-3 rounded-xl 
    transition-all duration-200;
}

/* Hover Effects */
.plan-card:hover {
  @apply transform -translate-y-1;
}

.plan-card.popular:hover {
  @apply transform -translate-y-1 shadow-2xl shadow-orange-500/20;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .plan-card {
    @apply p-6;
  }
  
  .plan-features {
    @apply space-y-2;
  }
}
</style>