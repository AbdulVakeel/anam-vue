<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
    <div class="w-full max-w-5xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      
      <!-- Left Image Section -->
      <div class="hidden md:block md:w-1/2">
        <img 
          src="/auth/forgot-password-illustration.jpg" 
          alt="Forgot Password Illustration" 
          class="object-cover h-full w-full"
        />
      </div>

      <!-- Right Form Section -->
      <div class="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
        <!-- Header -->
        <h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100 text-center md:text-left">
          Forgot Password
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center md:text-left">
          Enter your email below and we'll send you a reset link.
        </p>

        <!-- Form -->
        <form @submit.prevent="submit" class="space-y-5">
          <FormInput 
            v-model="email" 
            type="email" 
            label="Email" 
            placeholder="you@example.com" 
            required 
          />
          <AppButton block type="submit">Send Reset Link</AppButton>
        </form>

        <!-- Footer -->
        <p class="mt-6 text-sm text-center md:text-left text-gray-600 dark:text-gray-400">
          Remembered your password? 
          <RouterLink 
            class="text-primary-600 hover:underline font-medium" 
            :to="{ name: 'loginBox' }"
          >
            Back to login
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppButton from '../components/AppButton.vue'
import FormInput from '../components/FormInput.vue'

const email = ref('')

const submit = () => {
  if (!email.value) {
    alert('Please enter your email.')
    return
  }
  console.log('Forgot password request:', email.value)
}
</script>

<style scoped>
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
</style>
