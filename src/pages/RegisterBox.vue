<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4 py-8 sm:py-12">
    <div class="w-full max-w-5xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

      <!-- Left Image Section -->
      <div class="hidden md:block md:w-1/2">
        <img 
          src="/auth/register-illustration.jpg" 
          alt="Login Illustration" 
          class="object-cover h-full w-full"
        />
      </div>

      <!-- Right Form Section -->
      <div class="w-full md:w-1/2 lg:w-3/5 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
        <!-- Header -->
        <div class="text-center md:text-left mb-6">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Create Account</h1>
          <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Get started in seconds</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="submit" class="space-y-4 sm:space-y-5">
          <FormInput v-model="name" label="Full Name" placeholder="John Doe" required />
          <FormInput v-model="email" type="email" label="Email" placeholder="you@example.com" required />

          <!-- Password -->
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

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <div class="relative">
              <input
                :type="showPassword2 ? 'text' : 'password'"
                v-model="password2"
                placeholder="••••••••"
                class="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 pr-10"
                required
              />
              <button
                type="button"
                @click="showPassword2 = !showPassword2"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <EyeIcon v-if="!showPassword2" class="w-5 h-5" />
                <EyeSlashIcon v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Terms -->
          <div class="flex items-start">
            <input 
              type="checkbox" 
              class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-blue-500" 
              required 
            />
            <label class="ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              I agree to <span class="text-primary-600 hover:underline cursor-pointer">Terms & Privacy</span>
            </label>
          </div>

          <AppButton block type="submit" class="mt-2">Create Account</AppButton>
        </form>

        <!-- Footer -->
        <p class="mt-5 text-xs sm:text-sm text-center md:text-left text-gray-600 dark:text-gray-400">
          Already have an account? 
          <RouterLink class="text-primary-600 hover:underline font-medium" :to="{ name: 'loginBox' }">
            Sign in
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

const name = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const showPassword = ref(false)
const showPassword2 = ref(false)

const submit = () => {
  if (password.value !== password2.value) {
    alert("Passwords do not match!")
    return
  }
  console.log('Register attempt:', { name: name.value, email: email.value, password: password.value })
}
</script>
