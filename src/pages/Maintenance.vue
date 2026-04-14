<template>
    <div
      class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg w-full grid md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-12"
    >
      <!-- Left Illustration -->
      <div class="flex items-center justify-center order-1 md:order-none">
        <img
          src="/img/construction.jpg"
          alt="Maintenance Illustration"
          class="w-full max-w-xs md:max-w-md rounded-2xl"
          loading="lazy"
        />
      </div>

      <!-- Right Content -->
      <div class="flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
        <!-- Logo -->
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            <span class="text-indigo-600">⟨</span> AnamUI
          </h1>
        </div>

        <!-- Title -->
        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          We are currently performing maintenance
        </h2>

        <!-- Description -->
        <p class="text-gray-600 dark:text-gray-300 max-w-md text-sm sm:text-base">
          We're making the system more awesome. We'll be back shortly.
        </p>

        <!-- Button -->
        <button
          class="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition mb-6"
          aria-label="Contact Us"
        >
          Contact Us
        </button>
      </div>
    </div>
</template>

<script setup>
</script>