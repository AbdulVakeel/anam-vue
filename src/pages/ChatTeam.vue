<script setup>
import { ref, reactive, computed } from 'vue';

const users = ref([
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', active: true, lastSeen: '2 min ago' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Manager', active: true, lastSeen: '5 min ago' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor', active: false, lastSeen: '1 hour ago' },
  { id: 4, name: 'David Wilson', email: 'david@example.com', role: 'Viewer', active: true, lastSeen: 'Online' },
  { id: 5, name: 'Eva Davis', email: 'eva@example.com', role: 'Admin', active: true, lastSeen: 'Online' }
]);

const messages = ref([
  { id: 1, sender: 'Alice Johnson', text: 'Hey team, how is the project going?', time: '10:30 AM', avatar: 'AJ' },
  { id: 2, sender: 'Bob Smith', text: 'Going well! Just finished the dashboard design.', time: '10:32 AM', avatar: 'BS' },
  { id: 3, sender: 'You', text: 'Great! I just pushed the latest updates to staging.', time: '10:35 AM', avatar: 'ME' },
  { id: 4, sender: 'Eva Davis', text: 'I\'ll review the changes this afternoon.', time: '10:37 AM', avatar: 'ED' }
]);

const newMessage = ref('');
const activeTab = ref('chat');
const searchQuery = ref('');

const filteredUsers = computed(() => {
  return users.value.filter(user => 
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: messages.value.length + 1,
      sender: 'You',
      text: newMessage.value,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'ME'
    });
    newMessage.value = '';
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-messages');
      if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 50);
  }
};

const roleColors = {
  Admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  Manager: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  Editor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  Viewer: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
};
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-2 p-2 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="w-full lg:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Team Members</h2>
        <div class="mt-3 relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users..."
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div class="overflow-y-auto max-h-[calc(100vh-200px)]">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li 
            v-for="user in filteredUsers" 
            :key="user.id" 
            class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            @click="activeTab = 'chat'"
          >
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  {{ user.name.split(' ').map(n => n[0]).join('') }}
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ user.name }}
                  <span v-if="user.lastSeen === 'Online'" class="ml-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ user.email }}</p>
              </div>
              <div>
                <span 
                  class="px-2 py-1 text-xs rounded-full" 
                  :class="roleColors[user.role]"
                >
                  {{ user.role }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Right Content - Chat or User Details -->
    <div class="w-full lg:w-2/3 bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
      <!-- Tabs -->
      <div class="border-b border-gray-200 dark:border-gray-700">
        <nav class="flex -mb-px">
          <button
            @click="activeTab = 'chat'"
            :class="activeTab === 'chat' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'"
            class="whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm"
          >
            Team Chat
          </button>
          <button
            @click="activeTab = 'user'"
            :class="activeTab === 'user' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'"
            class="whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm"
          >
            User Details
          </button>
        </nav>
      </div>

      <!-- Chat Tab Content -->
      <div v-if="activeTab === 'chat'" class="flex flex-col h-[calc(100vh-200px)]">
        <div class="chat-messages flex-1 overflow-y-auto p-4 space-y-4">
          <div 
            v-for="message in messages" 
            :key="message.id"
            :class="message.sender === 'You' ? 'justify-end' : 'justify-start'"
            class="flex"
          >
            <div 
              :class="message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'"
              class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg"
            >
              <div v-if="message.sender !== 'You'" class="flex items-center space-x-2 mb-1">
                <div class="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                  {{ message.avatar }}
                </div>
                <span class="font-medium text-sm">{{ message.sender }}</span>
              </div>
              <p>{{ message.text }}</p>
              <p 
                :class="message.sender === 'You' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'"
                class="text-xs mt-1 text-right"
              >
                {{ message.time }}
              </p>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
          <form @submit.prevent="sendMessage" class="flex space-x-2">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type a message..."
              class="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <!-- User Details Tab Content -->
      <div v-if="activeTab === 'user'" class="p-6">
        <div class="flex flex-col items-center mb-6">
          <div class="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
            AJ
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Alice Johnson</h3>
          <p class="text-gray-500 dark:text-gray-400">Admin</p>
          <p class="text-sm text-green-500 mt-2 flex items-center">
            <span class="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            Online
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 dark:text-white mb-3">Contact Information</h4>
            <div class="space-y-2">
              <p class="text-sm"><span class="text-gray-500 dark:text-gray-400">Email:</span> alice@example.com</p>
              <p class="text-sm"><span class="text-gray-500 dark:text-gray-400">Phone:</span> (123) 456-7890</p>
              <p class="text-sm"><span class="text-gray-500 dark:text-gray-400">Location:</span> San Francisco, CA</p>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 dark:text-white mb-3">Activity</h4>
            <div class="space-y-3">
              <div class="flex items-start">
                <div class="h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                <div>
                  <p class="text-sm font-medium">Last login</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Today at 10:30 AM</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="h-2 w-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                <div>
                  <p class="text-sm font-medium">Active projects</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Dashboard redesign, User management</p>
                </div>
              </div>
            </div>
          </div>

          <div class="md:col-span-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 dark:text-white mb-3">Permissions</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-sm">Create users</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-sm">Edit content</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-sm">Manage roles</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-sm">View analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.dark .chat-messages::-webkit-scrollbar-track {
  background: #374151;
}

.dark .chat-messages::-webkit-scrollbar-thumb {
  background: #6b7280;
}
</style>