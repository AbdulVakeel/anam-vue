<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
    <div class="w-full max-w-5xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      
      <!-- Left Image Section -->
      <div class="hidden md:block md:w-1/2">
        <img 
          src="/auth/login-illustration.jpg" 
          alt="Login Illustration" 
          class="object-cover h-full w-full"
        />
      </div>

      <!-- Right Form Section -->
      <div class="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
        <!-- Header -->
        <h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100 text-center md:text-left">Welcome Back</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center md:text-left">Sign in to your account</p>

        <!-- Form -->
        <form @submit.prevent="submit" class="space-y-5">
          <FormInput
            v-model="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            required
          />

          <!-- Password with show/hide -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="••••••••"
                class="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 pr-10"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <EyeIcon v-if="!showPassword" class="w-5 h-5" />
                <EyeSlashIcon v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <label class="inline-flex items-center gap-2">
              <input type="checkbox" class="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-blue-500" />
              Remember me
            </label>
            <RouterLink class="text-primary-600 hover:underline" :to="{ name: 'forgotPassword' }">
              Forgot password?
            </RouterLink>
          </div>

          <AppButton block type="submit">Sign In</AppButton>
        </form>

        <!-- Footer -->
        <p class="mt-6 text-sm text-center md:text-left text-gray-600 dark:text-gray-400">
          Don’t have an account? 
          <RouterLink class="text-primary-600 hover:underline font-medium" :to="{ name: 'registerBox' }">
            Create one
          </RouterLink>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import AppButton from '../components/AppButton.vue'
import FormInput from '../components/FormInput.vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const submit = () => {
  console.log('Login attempt:', { email: email.value, password: password.value })
}
</script>

<style scoped>
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3); 
}
</style>
