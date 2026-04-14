<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-2">
    <div class="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">

      <!-- Left column -->
      <div class="md:col-span-2 grid gap-6">
        <!-- Welcome Card -->
        <div class="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex-1">
            <h3 class="font-semibold text-xl">Welcome back Natalia!</h3>
            <p class="text-sm mt-2">
              You have earned 54% more than last month which is great progress.
            </p>
            <button class="mt-4 px-4 py-2 rounded-full text-sm font-medium">
              View Earnings
            </button>
          </div>
          <div class="w-full md:w-auto flex justify-center">
            <img 
              src="/banners/banner-1.jpg" 
              alt="Financial growth" 
              class="w-40 h-40 object-contain rounded-lg"
            />
          </div>
        </div>

        <!-- Transaction Card -->
        <div class="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex-1">
            <h3 class="font-semibold text-xl">Track Every Transaction</h3>
            <p class="text-sm mt-2">
              Monitor all income and expenses easily to control your finances.
            </p>
            <button class="mt-4 px-4 py-2 rounded-full text-sm font-medium">
              Download App
            </button>
          </div>
          <div class="w-full md:w-auto flex justify-center">
            <img 
              src="/banners/banner-2.jpg" 
              alt="Transaction tracking" 
              class="w-40 h-40 object-contain rounded-lg"
            />
          </div>
        </div>
      </div>

      <!-- Right column - Achievement Card -->
      <div class="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-center items-center text-center">
        <div class="w-24 h-24 mb-4 flex items-center justify-center rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="font-semibold text-lg">All Notifications Cleared</h3>
        <p class="text-sm mt-2 px-4">
          Congratulations! You've completed all tasks. Ready for the next challenge?
        </p>
        <button class="mt-4 px-6 py-2 rounded-full text-sm font-medium">
          Continue
        </button>
      </div>

      <!-- Bottom row cards -->
      <!-- Error Card -->
      <div class="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-center items-center text-center">
        <div class="w-24 h-24 mb-4 flex items-center justify-center rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="font-semibold text-lg">Temporary Error</h3>
        <p class="text-sm mt-2 px-4">
          We encountered an issue. Please try again shortly.
        </p>
        <button class="mt-4 px-6 py-2 rounded-full text-sm font-medium">
          Retry Now
        </button>
      </div>

      <!-- Empty Cart Card -->
      <div class="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-center items-center text-center">
        <div class="w-24 h-24 mb-4 flex items-center justify-center rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 class="font-semibold text-lg">Your Cart is Empty</h3>
        <p class="text-sm mt-2 px-4">
          Discover amazing products and enjoy exclusive rewards.
        </p>
        <button class="mt-4 px-6 py-2 rounded-full text-sm font-medium">
          Start Shopping
        </button>
      </div>

      <!-- Friend Request Card -->
      <div class="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-center items-center text-center">
        <img 
          src="/banners/banner-3.png" 
          alt="Friend profile" 
          class="w-20 h-20 mb-4 rounded-full object-cover bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
        />
        <h3 class="font-semibold text-lg">New Friend Request</h3>
        <p class="text-sm mt-2 px-4">
          Tommy Henderson wants to connect with you
        </p>
        <div class="flex space-x-3 mt-4">
          <button class="px-5 py-2 rounded-full text-sm font-medium">
            Accept
          </button>
          <button class="px-5 py-2 rounded-full text-sm font-medium">
            Decline
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// No image error handling needed since we're using local images
</script>

<style>
/* Basic responsive behavior */
html {
  scroll-behavior: smooth;
}
</style>