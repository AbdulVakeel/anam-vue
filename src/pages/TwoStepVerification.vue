<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
    <div class="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-8 sm:p-10">
      
      <!-- Header -->
      <h2 class="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Two Step Verification</h2>
      <p class="text-gray-500 dark:text-gray-300 mb-4">
        We sent a verification code to your mobile. Enter the code from the mobile in the field below.
      </p>
      <p class="text-gray-400 mb-6">******1234</p>

      <!-- OTP Inputs -->
      <div class="flex gap-3 mb-6">
        <input
          v-for="(digit, index) in otp"
          :key="index"
          v-model="otp[index]"
          maxlength="1"
          class="w-12 h-12 text-center text-lg rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Verify Button -->
      <button
        @click="verify"
        class="w-full bg-blue-500 hover:bg-blue-600 transition-colors py-3 rounded-full font-semibold text-white"
      >
        Verify My Account
      </button>

      <!-- Footer -->
      <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm">
        Didn't get the code? 
        <button @click="resend" class="text-blue-500 hover:underline">Resend</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const otp = ref(["", "", "", "", "", ""])

const verify = () => {
  const code = otp.value.join("")
  if (code.length < 6) {
    alert("Please enter the full 6-digit code")
    return
  }
  console.log("Verifying code:", code)
}

const resend = () => {
  console.log("Resend code")
}
</script>
