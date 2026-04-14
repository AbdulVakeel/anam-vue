<template>
<div class="flex flex-col lg:flex-row gap-2 p-2 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="w-full lg:w-2/3 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <input
        class="w-full mb-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
        placeholder="Search users..."
        v-model="search"
      />
      <ul class="space-y-1 overflow-y-auto flex-1">
        <li
          v-for="c in filteredContacts"
          :key="c.id"
          class="flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all"
          :class="selectedContact?.id === c.id ? 'bg-primary-100 dark:bg-primary-900 shadow-md' : 'hover:bg-gray-50 dark:hover:bg-gray-800'"
          @click="selectContact(c)"
        >
          <div class="relative">
            <img
              v-if="c.avatar"
              :src="c.avatar"
              alt="avatar"
              class="w-12 h-12 rounded-full object-cover ring-1 ring-gray-300 dark:ring-gray-700"
            />
            <div v-else class="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center text-primary-800 font-semibold">
              {{ initials(c.name) }}
            </div>
            <span 
              class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900"
              :class="c.online ? 'bg-green-500' : 'bg-gray-400'"
              :title="c.online ? 'Online' : 'Offline'"
            ></span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-medium truncate">{{ c.name }}</div>
            <div class="text-xs text-gray-500 truncate flex items-center gap-1">
              <span v-if="c.online" class="text-green-500">• Online</span>
              <span v-else class="text-gray-400">• Offline</span>
              <span class="truncate">{{ c.last }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Chat area -->
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col shadow-lg">
      <!-- Chat header -->
      <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-t-2xl">
        <template v-if="selectedContact">
          <div class="relative">
            <img
              v-if="selectedContact.avatar"
              :src="selectedContact.avatar"
              alt="avatar"
              class="w-12 h-12 rounded-full object-cover ring-1 ring-gray-300 dark:ring-gray-700"
            />
            <div v-else class="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center text-primary-800 font-semibold">
              {{ initials(selectedContact.name) }}
            </div>
            <span 
              class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900"
              :class="selectedContact.online ? 'bg-green-500' : 'bg-gray-400'"
            ></span>
          </div>
          <div>
            <div class="font-semibold text-gray-900 dark:text-white">{{ selectedContact.name }}</div>
            <div class="text-xs" :class="selectedContact.online ? 'text-green-500' : 'text-gray-400'">
              {{ selectedContact.online ? 'Online' : 'Offline' }}
              <span v-if="selectedContact.lastSeen && !selectedContact.online">
                • Last seen {{ formatLastSeen(selectedContact.lastSeen) }}
              </span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="text-gray-500 dark:text-gray-400">Select a user to start chatting</div>
        </template>
      </div>

      <!-- Messages -->
      <div class="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
        <template v-if="selectedContact">
          <div
            v-for="m in currentMessages"
            :key="m.id"
            class="flex"
            :class="m.me ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-xs rounded-2xl px-4 py-2 shadow-sm"
              :class="m.me ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm'"
            >
              {{ m.text }}
              <div class="text-xs mt-1 text-right" :class="m.me ? 'text-primary-200' : 'text-gray-500 dark:text-gray-400'">
                {{ formatTime(m.timestamp) }}
                <span v-if="m.read" class="ml-1 text-blue-400">✓✓</span>
                <span v-else-if="m.delivered" class="ml-1">✓</span>
              </div>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="selectedContact.typing" class="flex justify-start">
            <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl px-3 py-2 rounded-bl-sm flex items-center gap-1">
              <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </template>
      </div>

      <!-- Input area -->
      <form v-if="selectedContact" @submit.prevent="send" class="p-3 flex items-center gap-2 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
        <input
          v-model="draft"
          @input="handleTyping"
          class="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          placeholder="Type a message..."
        />
        <button 
          type="submit" 
          class="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 transition"
          :disabled="!draft.trim()"
        >
          Send
        </button>
      </form>
    </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { format, formatDistanceToNow } from 'date-fns'

// Contacts list
const contacts = ref([
  { 
    id: 1, 
    name: 'Alice Johnson', 
    last: 'See you soon!', 
    avatar: '', 
    online: true,
    lastSeen: null,
    typing: false,
    messages: [
      { id: 1, text: 'Hello!', me: false, timestamp: new Date(Date.now() - 3600000), read: true, delivered: true }
    ] 
  },
  { 
    id: 2, 
    name: 'Bob Smith', 
    last: 'Thanks!', 
    avatar: '', 
    online: false,
    lastSeen: new Date(Date.now() - 1800000),
    typing: false,
    messages: [
      { id: 2, text: 'Hi there 👋', me: true, timestamp: new Date(Date.now() - 7200000), read: true, delivered: true }
    ] 
  },
  { 
    id: 3,
    name: 'Emma Wilson',
    last: 'The documents are ready',
    avatar: '',
    online: true,
    lastSeen: null,
    typing: false,
    messages: [
      { id: 1, text: 'Hi, have you finished the report?', me: false, timestamp: new Date(Date.now() - 1800000), read: true, delivered: true },
      { id: 2, text: 'Yes, just sent it to you', me: true, timestamp: new Date(Date.now() - 1700000), read: true, delivered: true },
      { id: 3, text: 'The documents are ready for review', me: false, timestamp: new Date(Date.now() - 120000), read: true, delivered: true }
    ]
  },
  { 
    id: 4,
    name: 'Michael Brown',
    last: 'Meeting at 3pm',
    avatar: '',
    online: false,
    lastSeen: new Date(Date.now() - 3600000),
    typing: false,
    messages: [
      { id: 1, text: 'Can we reschedule our meeting?', me: false, timestamp: new Date(Date.now() - 86400000), read: true, delivered: true },
      { id: 2, text: 'How about 3pm tomorrow?', me: true, timestamp: new Date(Date.now() - 82800000), read: true, delivered: true },
      { id: 3, text: 'Meeting at 3pm works for me', me: false, timestamp: new Date(Date.now() - 3600000), read: true, delivered: true }
    ]
  },
  { 
    id: 5,
    name: 'Sophia Garcia',
    last: 'The design looks great!',
    avatar: '',
    online: true,
    lastSeen: null,
    typing: true,
    messages: [
      { id: 1, text: 'What do you think of the new design?', me: true, timestamp: new Date(Date.now() - 600000), read: true, delivered: true },
      { id: 2, text: 'The design looks great!', me: false, timestamp: new Date(Date.now() - 300000), read: true, delivered: true }
    ]
  },
  { 
    id: 6,
    name: 'James Martinez',
    last: 'I need the files ASAP',
    avatar: '',
    online: false,
    lastSeen: new Date(Date.now() - 14400000),
    typing: false,
    messages: [
      { id: 1, text: 'Did you get my email?', me: false, timestamp: new Date(Date.now() - 28800000), read: true, delivered: true },
      { id: 2, text: 'Yes, I\'ll send the files soon', me: true, timestamp: new Date(Date.now() - 25200000), read: true, delivered: true },
      { id: 3, text: 'I need the files ASAP', me: false, timestamp: new Date(Date.now() - 14400000), read: true, delivered: true }
    ]
  },
  { 
    id: 7,
    name: 'Olivia Davis',
    last: 'Thanks for your help!',
    avatar: '',
    online: true,
    lastSeen: null,
    typing: false,
    messages: [
      { id: 1, text: 'Can you help me with this problem?', me: false, timestamp: new Date(Date.now() - 1800000), read: true, delivered: true },
      { id: 2, text: 'Of course, what do you need?', me: true, timestamp: new Date(Date.now() - 1500000), read: true, delivered: true },
      { id: 3, text: 'Thanks for your help!', me: false, timestamp: new Date(Date.now() - 600000), read: true, delivered: true }
    ]
  },
  { 
    id: 8,
    name: 'William Rodriguez',
    last: 'Let me check the numbers',
    avatar: '',
    online: false,
    lastSeen: new Date(Date.now() - 7200000),
    typing: false,
    messages: [
      { id: 1, text: 'What are the Q3 results?', me: true, timestamp: new Date(Date.now() - 14400000), read: true, delivered: true },
      { id: 2, text: 'Let me check the numbers', me: false, timestamp: new Date(Date.now() - 7200000), read: true, delivered: true }
    ]
  },
 
])


const search = ref('')
const draft = ref('')
const selectedContact = ref(null)
let typingTimeout = null

// Computed
const filteredContacts = computed(() =>
  contacts.value.filter(c => 
    c.name.toLowerCase().includes(search.value.toLowerCase()) ||
    c.last.toLowerCase().includes(search.value.toLowerCase())
  )
)

const currentMessages = computed(() =>
  selectedContact.value ? selectedContact.value.messages : []
)

// Methods
const selectContact = (contact) => {
  selectedContact.value = contact
  if (contact) contact.messages.forEach(m => { if (!m.me) m.read = true })
}

const send = () => {
  if (!draft.value.trim() || !selectedContact.value) return
  const newMessage = { id: Date.now(), text: draft.value, me: true, timestamp: new Date(), delivered: false, read: false }
  selectedContact.value.messages.push(newMessage)
  selectedContact.value.last = draft.value
  draft.value = ''
  setTimeout(() => { newMessage.delivered = true; if (selectedContact.value?.online) setTimeout(() => newMessage.read = true, 1000) }, 500)
  
  if (selectedContact.value?.online) {
    setTimeout(() => {
      selectedContact.value.typing = true
      setTimeout(() => {
        const reply = getRandomReply()
        selectedContact.value.messages.push({ id: Date.now(), text: reply, me: false, timestamp: new Date(), read: true })
        selectedContact.value.last = reply
        selectedContact.value.typing = false
      }, 2000)
    }, 3000)
  }
}

const handleTyping = () => {
  if (selectedContact.value) {
    clearTimeout(typingTimeout)
    selectedContact.value.typing = true
    typingTimeout = setTimeout(() => selectedContact.value.typing = false, 2000)
  }
}

const initials = (name) => name.split(' ').map(p => p[0]?.toUpperCase()).join('')
const formatTime = (date) => format(date, 'h:mm a')
const formatLastSeen = (date) => formatDistanceToNow(date, { addSuffix: true })
const getRandomReply = () => { const replies = ["Sounds good!","I'll get back to you soon","Thanks for letting me know","Got it!","Let me check and confirm","Perfect!","I appreciate it","Will do!","That works for me","Great news!"]; return replies[Math.floor(Math.random()*replies.length)] }

// Default select first chat on mount
onMounted(() => {
  if (contacts.value.length > 0) selectedContact.value = contacts.value[0]

  const interval = setInterval(() => {
    contacts.value.forEach(contact => {
      if (Math.random() < 0.3) {
        contact.online = !contact.online
        if (!contact.online) contact.lastSeen = new Date()
      }
    })
  }, 10000)

  onUnmounted(() => clearInterval(interval))
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 10px; }
.dark ::-webkit-scrollbar-track { background: #2d3748; }
.dark ::-webkit-scrollbar-thumb { background: #4a5568; }
</style>
