<template>
  <div class="min-h-screen  bg-gray-50 dark:bg-gray-950 px-4">
    <AppCard class="w-full max-w-2xl p-6 sm:p-8 shadow-lg">
      <!-- Header -->
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center sm:text-left">
        Update Profile
      </h1>
      
      <!-- Form Fields -->
      <form @submit.prevent="saveProfile" class="grid gap-4 sm:grid-cols-2 w-full">
        <FormInput
          v-model="name"
          label="Full Name"
          placeholder="John Doe"
          required
        />
        <FormInput
          v-model="email"
          label="Email"
          placeholder="you@example.com"
          type="email"
          required
        />
        <FormInput
          v-model="phone"
          label="Phone"
          placeholder="+91-99999-99999"
          pattern="^\+?\d{1,4}-\d{5}-\d{5}$"
          title="Phone format: +91-99999-99999"
          required
        />
        <FormInput
          v-model="company"
          label="Company"
          placeholder="Your Company"
          required
        />
      </form>

      <!-- Footer / Save Button -->
      <template #footer>
        <div class="flex justify-end mt-6">
          <AppButton @click="saveProfile">Save changes</AppButton>
        </div>
      </template>
    </AppCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppCard from '../components/AppCard.vue'
import AppButton from '../components/AppButton.vue'
import FormInput from '../components/FormInput.vue'

const name = ref('John Doe')
const email = ref('john@example.com')
const phone = ref('+91-99999-99999')
const company = ref('Acme Corp')

const saveProfile = () => {
  alert('Profile updated successfully (demo only)')
  console.log('Profile updated:', {
    name: name.value,
    email: email.value,
    phone: phone.value,
    company: company.value
  })
}
</script>

<style scoped>
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3); 
}

form {
  width: 100%;
}
</style>
