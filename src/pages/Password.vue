<template>
  <div class="min-h-screen  bg-gray-50 dark:bg-gray-950 px-4">
    <div class="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-8 sm:p-10">
      
      <!-- Header -->
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">Change Password</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
        Enter your current and new password to update your account securely.
      </p>

      <!-- Form -->
      <form @submit.prevent="submit" class="space-y-5">
        <!-- Current Password -->
        <div class="relative">
          <FormInput
            v-model="currentPassword"
            :type="showCurrent ? 'text' : 'password'"
            label="Current Password"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            @click="showCurrent = !showCurrent"
            class="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            <EyeIcon v-if="!showCurrent" class="w-5 h-5" />
            <EyeSlashIcon v-else class="w-5 h-5" />
          </button>
        </div>

        <!-- New Password -->
        <div class="relative">
          <FormInput
            v-model="newPassword"
            :type="showNew ? 'text' : 'password'"
            label="New Password"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            @click="showNew = !showNew"
            class="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            <EyeIcon v-if="!showNew" class="w-5 h-5" />
            <EyeSlashIcon v-else class="w-5 h-5" />
          </button>
        </div>

        <!-- Confirm Password -->
        <div class="relative">
          <FormInput
            v-model="confirmPassword"
            :type="showConfirm ? 'text' : 'password'"
            label="Confirm New Password"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            @click="showConfirm = !showConfirm"
            class="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            <EyeIcon v-if="!showConfirm" class="w-5 h-5" />
            <EyeSlashIcon v-else class="w-5 h-5" />
          </button>
        </div>

        <!-- Submit -->
        <AppButton block type="submit">Update Password</AppButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from '../components/AppButton.vue'
import FormInput from '../components/FormInput.vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

const submit = () => {
  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    alert('Please fill in all fields.')
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    alert('New password and confirmation do not match.')
    return
  }
  console.log('Password change request:', {
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
  })
}
</script>

<style scoped>
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3); 
}
</style>
