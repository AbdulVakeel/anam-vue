<script setup>
import { HomeIcon, UserIcon, Cog6ToothIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'
import TabButton from '../components/TabButton.vue'
import { ref, computed } from 'vue'

const selectedTab = ref('home')

const tabs = [
  { key: 'home', text: 'Home', icon: HomeIcon, content: 'Welcome to the home page! 🏠' },
  { key: 'profile', text: 'Profile', icon: UserIcon, content: 'Here is your profile information. 👤' },
  { key: 'messages', text: 'Messages', icon: EnvelopeIcon, content: 'You have 5 new messages. 📩' },
  { key: 'settings', text: 'Settings', icon: Cog6ToothIcon, content: 'Adjust your preferences here. ⚙️' }
]

const selectedContent = computed(() => {
  const tab = tabs.find(t => t.key === selectedTab.value)
  return tab ? tab.content : ''
})
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-2">
      <TabButton
        v-for="tab in tabs"
        :key="tab.key"
        :icon="tab.icon"
        :text="tab.text"
        :selected="selectedTab === tab.key"
        @click="selectedTab = tab.key"
      />
    </div>

    <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      {{ selectedContent }}
    </div>
  </div>
</template>
