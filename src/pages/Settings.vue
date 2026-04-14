<template>
  <div class="space-y-6">
    <AppCard>
      <template #header>
        <h3 class="font-semibold">General Settings</h3>
      </template>

      <div class="grid gap-4 md:grid-cols-2">
        <!-- Site Title -->
        <FormInput v-model="siteTitle" label="Site Title *" />

        <!-- Preloader Title -->
        <FormInput v-model="preloaderTitle" label="Preloader Title *" />

        <!-- Currency -->
        <FormInput v-model="currency" label="Currency *" />

        <!-- Currency Symbol -->
        <FormInput v-model="currencySymbol" label="Currency Symbol *" />

        <!-- Timezone -->
        <label for="timezone" class="space-y-1 w-full">
          <span class="text-sm text-gray-600 dark:text-gray-300">Timezone *</span>
          <select
            id="timezone"
            v-model="timezone"
            class="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          >
            <option>UTC</option>
            <option>Asia/Kolkata (IST)</option>
            <option>America/New_York (EST)</option>
            <option>America/Los_Angeles (PST)</option>
            <option>Europe/London (GMT)</option>
            <option>Europe/Paris (CET)</option>
            <option>Asia/Tokyo (JST)</option>
            <option>Australia/Sydney (AEST)</option>
            <option>Asia/Dubai (GST)</option>
            <option>America/Sao_Paulo (BRT)</option>
            <option>Africa/Johannesburg (SAST)</option>
          </select>
        </label>


        <!-- Site Base Color -->
        <div>
          <span class="text-sm text-gray-600 dark:text-gray-300">Site Base Color *</span>
          <div class="flex items-center gap-2">
            <input type="color" v-model="siteBaseColor" class="h-10 w-12 border-none rounded" />
            <input
              type="text"
              v-model="siteBaseColor"
              class="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none w-full"
            />
          </div>
        </div>

        <!-- Records Per Page -->
        <label class="space-y-1 w-full">
          <span class="text-sm text-gray-600 dark:text-gray-300">Record to Display Per Page *</span>
          <select
            v-model="recordsPerPage"
            class="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          >
            <option>10 items per page</option>
            <option>20 items per page</option>
            <option>50 items per page</option>
          </select>
        </label>

        <!-- Currency Format -->
        <label class="space-y-1 w-full">
          <span class="text-sm text-gray-600 dark:text-gray-300">Currency Showing Format *</span>
          <select
            v-model="currencyFormat"
            class="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          >
            <option>Show Currency Text and Symbol Both</option>
            <option>Show Symbol Only</option>
            <option>Show Text Only</option>
          </select>
        </label>

        <!-- Recently Viewed Products -->
        <FormInput v-model="recentlyViewed" label="Number of Recently Viewed Products *" type="number" />

        <!-- Track Views From Past Days -->
        <div>
          <span class="text-sm text-gray-600 dark:text-gray-300">Track Views From the Past (Days) *</span>
          <div class="flex items-center gap-2">
            <input
              type="number"
              v-model="trackViewsDays"
              class="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none w-full"
            />
            <span class="text-gray-500 dark:text-gray-400">Days</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <template #footer>
        <div class="flex justify-end mt-4">
          <AppButton @click="saveSettings">Submit</AppButton>
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

const siteTitle = ref('AnamUI')
const preloaderTitle = ref('AnamUI')
const currency = ref('USD')
const currencySymbol = ref('$')
const timezone = ref('UTC')
const siteBaseColor = ref('#f3532b')
const recordsPerPage = ref('20 items per page')
const currencyFormat = ref('Show Currency Text and Symbol Both')
const recentlyViewed = ref(12)
const trackViewsDays = ref(7)

const saveSettings = () => {
  console.log({
    siteTitle: siteTitle.value,
    preloaderTitle: preloaderTitle.value,
    currency: currency.value,
    currencySymbol: currencySymbol.value,
    timezone: timezone.value,
    siteBaseColor: siteBaseColor.value,
    recordsPerPage: recordsPerPage.value,
    currencyFormat: currencyFormat.value,
    recentlyViewed: recentlyViewed.value,
    trackViewsDays: trackViewsDays.value
  })
  alert('Settings saved (demo only)')
}
</script>

<style scoped>
input[type="color"] {
  -webkit-appearance: none;
  appearance: none;
  background: none;
  padding: 0;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 6px;
}
</style>
