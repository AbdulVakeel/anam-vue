<script setup>
import { Icon } from '@iconify/vue';
import { ref, computed, watchEffect } from 'vue';
import Pagination from '../components/Pagination.vue';

const iconList = [
  'mdi:ab-testing',
  'mdi:abacus',
  'mdi:abjad-arabic',
  'mdi:abjad-hebrew',
  'mdi:abugida-devanagari',
  'mdi:abugida-thai',
  'mdi:access-point',
  'mdi:access-point-network',
  'mdi:account',
  'mdi:account-alert',
  'mdi:account-arrow-down',
  'mdi:account-arrow-left',
  'mdi:account-arrow-right',
  'mdi:account-arrow-up',
  'mdi:account-box',
  'mdi:account-box-multiple',
  'mdi:account-box-outline',
  'mdi:account-cancel',
  'mdi:account-cash',
  'mdi:account-check',
  'mdi:account-child',
  'mdi:account-circle',
  'mdi:account-clock',
  'mdi:account-cog',
  'mdi:account-convert',
  'mdi:account-cowboy-hat',
  'mdi:account-details',
  'mdi:account-edit',
  'mdi:account-group',
  'mdi:account-hard-hat',
  'mdi:account-heart',
  'mdi:account-key',
  'mdi:account-lock',
  'mdi:account-minus',
  'mdi:account-multiple',
  'mdi:account-multiple-check',
  'mdi:account-multiple-minus',
  'mdi:account-multiple-outline',
  'mdi:account-multiple-plus',
  'mdi:account-multiple-remove',
  'mdi:account-music',
  'mdi:account-network',
  'mdi:account-off',
  'mdi:account-outline',
  'mdi:account-plus',
  'mdi:account-question',
  'mdi:account-remove',
  'mdi:account-search',
  'mdi:account-settings',
  'mdi:account-star',
  'mdi:account-supervisor',
  'mdi:account-switch',
  'mdi:account-tie',
  'mdi:account-voice',
  'mdi:adjust',
  'mdi:adobe',
  'mdi:air-conditioner',
  'mdi:airballoon',
  'mdi:airplane',
  'mdi:airplane-landing',
  'mdi:airplane-off',
  'mdi:airplane-takeoff',
  'mdi:airport',
  'mdi:alarm',
  'mdi:alarm-bell',
  'mdi:alarm-check',
  'mdi:alarm-light',
  'mdi:alarm-multiple',
  'mdi:alarm-off',
  'mdi:alarm-plus',
  'mdi:alarm-snooze',
  'mdi:album',
  'mdi:alert',
  'mdi:alert-box',
  'mdi:alert-circle',
  'mdi:alert-decagram',
  'mdi:alert-octagon',
  'mdi:alert-octagram',
  'mdi:alert-outline',
  'mdi:alien',
  'mdi:all-inclusive',
  'mdi:alpha',
  'mdi:alpha-a',
  'mdi:alpha-a-box',
  'mdi:alpha-a-circle',
  'mdi:alpha-a-circle-outline',
  'mdi:alpha-b',
  'mdi:alpha-b-box',
  'mdi:alpha-b-circle',
  'mdi:alpha-b-circle-outline',
  'mdi:alpha-c',
  'mdi:alpha-c-box',
  'mdi:alpha-c-circle',
  'mdi:alpha-c-circle-outline',
  'mdi:home',
  'mdi:email',
  'mdi:bell',
  'mdi:cog',
  'mdi:menu',
  'mdi:magnify',
  'mdi:heart',
  'mdi:star',
  'mdi:check',
  'mdi:close',
  'mdi:plus',
  'mdi:minus',
  'mdi:arrow-left',
  'mdi:arrow-right',
  'mdi:calendar',
  'mdi:clock',
  'mdi:settings',
  'mdi:logout',
  'mdi:download',
  'mdi:upload',
  'mdi:trash',
  'mdi:pencil',
  'mdi:eye',
  'mdi:eye-off',
  'mdi:facebook',
  'mdi:twitter',
  'mdi:github',
  'mdi:linkedin',
  'mdi:youtube',
  'mdi:instagram',
  'mdi:web',
  'mdi:apple',
  'mdi:microsoft',
  'mdi:google',
  'mdi:amazon',
  'mdi:android',
  'mdi:language-javascript',
  'mdi:language-typescript',
  'mdi:language-html5',
  'mdi:language-css3',
  'mdi:vuejs',
  'mdi:react',
  'mdi:angular',
  'mdi:language-python',
  'mdi:language-java',
  'mdi:language-php',
  'mdi:language-swift',
  'mdi:language-kotlin',
  'mdi:database',
  'mdi:server',
  'mdi:cloud',
  'mdi:docker',
  'mdi:kubernetes',
  'mdi:git',
  'mdi:github',
  'mdi:gitlab',
  'mdi:bitbucket',
  'mdi:visual-studio-code',
  'mdi:intellij',
  'mdi:eclipse',
  'mdi:atom',
  'mdi:sublime-text',
  // Continue adding more icons...
];

const searchQuery = ref('');
const copiedIcon = ref('');
const page = ref(1);
const itemsPerPage = 48;

// Get all icons
const allIcons = computed(() => {
  return iconList.map(iconName => ({
    displayName: iconName.split(':')[1].replace(/-/g, ' '), // Convert kebab-case to space separated
    originalName: iconName,
    component: Icon
  }));
});

// Filter icons based on search
const filteredIcons = computed(() => {
  if (!searchQuery.value) return allIcons.value;
  return allIcons.value.filter(icon => 
    icon.displayName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Paginated icons
const paginatedIcons = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredIcons.value.slice(start, end);
});

// Total pages calculation
const totalPages = computed(() => {
  return Math.ceil(filteredIcons.value.length / itemsPerPage);
});

// Reset to page 1 when search changes
watchEffect(() => {
  if (searchQuery.value) {
    page.value = 1;
  }
});

// Copy the icon usage code
const copyIcon = (iconName) => {
  const text = `<Icon icon="${iconName}" />`;
  navigator.clipboard.writeText(text);
  copiedIcon.value = iconName.split(':')[1];
  setTimeout(() => (copiedIcon.value = ''), 1500);
};
</script>

<template>
  <div class="space-y-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
    <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
      Iconify Icons ({{ filteredIcons.length }})
    </h1>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search icons..."
      class="mb-6 p-2 rounded-2xl w-full dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
    />

    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      <div
        v-for="icon in paginatedIcons"
        :key="icon.originalName"
        @click="copyIcon(icon.originalName)"
        class="flex flex-col items-center p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer border border-gray-200 dark:border-gray-700"
      >
        <component
          :is="icon.component"
          :icon="icon.originalName"
          class="w-6 h-6 text-gray-800 dark:text-gray-200"
        />
        <span class="mt-2 text-xs text-gray-600 dark:text-gray-400 text-center">
          {{ icon.displayName }}
        </span>
        <span
          v-if="copiedIcon === icon.displayName.replace(/ /g, '-')"
          class="text-sky-400 text-xs mt-1 animate-pulse"
        >
          Copied!
        </span>
      </div>
    </div>

    <Pagination 
      v-model:page="page" 
      :pages="totalPages" 
      class="mt-6"
    />
  </div>
</template>

<style scoped>
/* Custom focus styles */
input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 1px rgba(79, 70, 229, 0.3);
}

/* Animation for the copy feedback */
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>