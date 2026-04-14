<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-30 flex flex-col h-screen text-white shadow-xl transition-all duration-300',
      sidebarColor,
      collapsed ? 'w-20' : 'w-72',
      open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
    aria-label="Main navigation"
  >
    <div class="h-16 flex items-center justify-between px-4 border-b border-white/20">
      <div class="flex items-center space-x-2">
        <div class="w-9 h-9 rounded-full bg-sky-600 flex items-center justify-center font-bold text-white">
          A
        </div>
        <span v-if="!collapsed" class="glow-text text-2xl font-bold tracking-wide">
          Anam <span class="text-sky-400">UI</span>
        </span>
      </div>

      <div class="flex items-center gap-2">
        <button
          v-if="!open"
          class="hidden lg:flex p-2 rounded-xl hover:bg-white/10 transition-colors"
          @click="$emit('toggle-collapse')"
          :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <ChevronLeftIcon v-if="!collapsed" class="w-5 h-5" />
          <ChevronRightIcon v-else class="w-5 h-5" />
        </button>

        <button
          class="p-2 rounded-xl hover:bg-white/10 lg:hidden"
          @click="$emit('close')"
          aria-label="Close sidebar"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
    </div>

    <nav aria-label="Primary" class="px-2 py-2 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent flex-1">
      <ul class="space-y-1">
        <template v-for="item in items" :key="item.label">
          <!-- Has Submenu -->
          <li v-if="item.children">
            <div class="space-y-1">
              <button
                :class="[
                  'flex items-center gap-3 px-3 py-2 w-full rounded-xl transition-colors text-left',
                  isSubmenuActive(item) ? 'bg-white/10' : 'hover:bg-white/10'
                ]"
                @click="toggleSubmenu(item.label)"
                :aria-expanded="isSubmenuOpen(item.label)"
                :aria-controls="`submenu-${item.label.toLowerCase().replace(' ', '-')}`"
              >
                <component :is="item.icon" class="w-5 h-5" />
                <span v-if="!collapsed" class="flex-1 text-sm font-medium">{{ item.label }}</span>
                <ChevronRightIcon
                  v-if="!collapsed"
                  :class="[
                    'w-4 h-4 transform transition-transform duration-200',
                    isSubmenuOpen(item.label) ? 'rotate-90 text-white' : ''
                  ]"
                />
              </button>

              <transition name="slide">
                <ul 
                  v-if="isSubmenuOpen(item.label)"
                  :id="`submenu-${item.label.toLowerCase().replace(' ', '-')}`"
                  class="pl-10 space-y-1"
                >
                  <li v-for="sub in item.children" :key="sub.label">
                    <RouterLink
                      :to="sub.to"
                      class="flex items-center gap-3 px-3 py-2 rounded-xl transition-colors"
                      :class="isRouteActive(sub.to.name) ? 'bg-white/10' : 'hover:bg-white/10'"
                      v-slot="{ isActive }"
                    >
                      <span class="w-2 h-2 rounded-full" :class="isActive ? 'bg-white' : 'bg-white/50'"></span>
                      <span
                        v-if="!collapsed"
                        :class="['text-sm', isActive ? 'font-semibold text-white' : 'text-white/80']"
                      >
                        {{ sub.label }}
                      </span>
                    </RouterLink>
                  </li>
                </ul>
              </transition>
            </div>
          </li>

          <!-- No Submenu -->
          <li v-else>
            <RouterLink
              :to="item.to"
              class="flex items-center gap-3 px-3 py-2 rounded-xl transition-colors"
              :class="isRouteActive(item.to.name) ? 'bg-white/10' : 'hover:bg-white/10'"
              v-slot="{ isActive }"
              @click="closeAllSubmenus"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span v-if="!collapsed" :class="['text-sm', isActive ? 'font-semibold text-white' : 'text-white/80']">
                {{ item.label }}
              </span>
            </RouterLink>
          </li>
        </template>
      </ul>
    </nav>
  </aside>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
  HomeIcon, UsersIcon, Cog6ToothIcon, ChatBubbleLeftRightIcon,
  KeyIcon, ChevronRightIcon, ChevronLeftIcon, XMarkIcon,
  ShoppingBagIcon, TicketIcon, WindowIcon, RectangleStackIcon, 
  RssIcon, InformationCircleIcon, AtSymbolIcon, TableCellsIcon
} from '@heroicons/vue/24/outline'
import { IconIcons, IconSmartHome, IconPageBreak } from '@tabler/icons-vue'

const props = defineProps({
  collapsed: { type: Boolean, default: false },
  open: { type: Boolean, default: false },
  direction: { type: String, default: 'ltr' },
  sidebarColor: { type: String, default: 'bg-gradient-to-b from-gray-900 via-gray-850 to-gray-950' }
})

const emit = defineEmits(['close', 'toggle-collapse'])
const openSubmenu = ref(null)
const route = useRoute()
const router = useRouter()

const items = computed(() => [
  {
    label: 'Dashboard',
    icon: HomeIcon,
    children: [
      { to: { name: 'dashboard' }, label: 'Dashboard' },
      { to: { name: 'ecommerce' }, label: 'Ecommerce' },
      { to: { name: 'investment' }, label: 'Investment' },
      { to: { name: 'job' }, label: 'Job Portals' },
      { to: { name: 'nft' }, label: 'NFT' },
      { to: { name: 'advanceCrypto' }, label: 'Advance Crypto' },
      { to: { name: 'crypto' }, label: 'Tradingview Crypto' }
    ]
  },
  { to: { name: 'users' }, label: 'Users', icon: UsersIcon },
  {
    label: 'Auth',
    icon: KeyIcon,
    children: [
      { to: { name: 'login' }, label: 'Login' },
      { to: { name: 'loginBox' }, label: 'Login Box' },
      { to: { name: 'register' }, label: 'Register' },
      { to: { name: 'registerBox' }, label: 'Register Box' },
      { to: { name: 'forgotPassword' }, label: 'Forgot Password' },
      { to: { name: 'forgotPasswordBox' }, label: 'Forgot Password Box' },
      { to: { name: 'twoStepVerification' }, label: 'Two Step Verification' },
      { to: { name: 'twoStepBox' }, label: 'Two Step Box' },
      { to: { name: 'password' }, label: 'Password' },
      { to: { name: 'profile' }, label: 'Profile' },
      { to: { name: 'security' }, label: 'Security' }
    ]
  },
  {
    label: 'Products',
    icon: ShoppingBagIcon,
    children: [
      { to: { name: 'products' }, label: 'Products' },
      { to: { name: 'productsList' }, label: 'Products List' },
      { to: { name: 'checkout' }, label: 'Checkout' },
      { to: { name: 'productDetails' }, label: 'ProductDetails' },
      { to: { name: 'productSlider' }, label: 'Product Slider' },
      { to: { name: 'customers' }, label: 'Customers' },
      { to: { name: 'seller' }, label: 'Seller' }
    ]
  },

  {
    label: 'Widgets',
    icon: WindowIcon,
    children: [
      { to: { name: 'calendar' }, label: 'Calendar' },
      { to: { name: 'notifications' }, label: 'Notifications' },
      { to: { name: 'chart' }, label: 'Chart' }
      ]
  },
  {
    label: 'Tables',
    icon: TableCellsIcon,
    children: [
      { to: { name: 'basicTables' }, label: 'Basic Tables' },
      { to: { name: 'responsiveTables' }, label: 'Responsive Tables' },
      { to: { name: 'dataTables' }, label: 'Data Tables' }
    ]
  },
  {
    label: 'Card',
    icon: RectangleStackIcon,
    children: [
      { to: { name: 'basicCard' }, label: 'Basic Card' },
      { to: { name: 'banners' }, label: 'Banners Card' },
      { to: { name: 'card' }, label: 'Vertical & Horizontal Card' },
      { to: { name: 'animationCard' }, label: 'Animation Card' },
      { to: { name: 'demoCard' }, label: 'Software Demo Card' },
      { to: { name: 'demoSlider' }, label: 'Demo Slider' },
      { to: { name: 'advanceCard' }, label: 'Advance Card' },
      { to: { name: 'rankCard' }, label: 'Rank Card' }
    ]
  },
  {
    label: 'Ui Elements',
    icon: AtSymbolIcon,
    children: [
      { to: { name: 'grid' }, label: 'Grid' },
      { to: { name: 'badge' }, label: 'Badge' },
      { to: { name: 'tabButton' }, label: 'Tab Button' },
      { to: { name: 'alert' }, label: 'Alert' },
      { to: { name: 'avatar' }, label: 'Avatar' },
      { to: { name: 'toggleInput' }, label: 'Toggle Input' },
      { to: { name: 'textEditor' }, label: 'Text Editor' },
      { to: { name: 'button' }, label: 'Button' },
      { to: { name: 'dropdown' }, label: 'Drop Down' },
      { to: { name: 'sectionCard' }, label: 'Section Card' },
      { to: { name: 'flashMessage' }, label: 'Flash Message' },
      { to: { name: 'dateTimePicker' }, label: 'Date Time Picker' },
      { to: { name: 'tooltip' }, label: 'Tool tip' },
      { to: { name: 'typography' }, label: 'Typography' },
      { to: { name: 'dialogModal' }, label: 'Dialog Modal' },
      { to: { name: 'colorPicker' }, label: 'Color Picker' }
    ]
  },
  {
    label: 'Icons',
    icon: IconIcons,
    children: [
      { to: { name: 'heroicons' }, label: 'Hero icons' },
      { to: { name: 'tablerIcons' }, label: 'Tabler Icons' },
      { to: { name: 'lucideIcons' }, label: 'Lucide Icons' },
      { to: { name: 'boxIcons' }, label: 'Box Icons' },
      { to: { name: 'iconifyIcons' }, label: 'Iconify Icons' }
    ]
  },
  {
    label: 'Pages',
    icon: IconPageBreak,
    children: [
      { to: { name: 'help' }, label: 'Help' },
      { to: { name: 'pricing' }, label: 'Pricing' },
      { to: { name: 'tickets' }, label: 'Tickets', icon: TicketIcon },
      { to: { name: 'comingSoon' }, label: 'Coming Soon' },
      { to: { name: 'maintenance' }, label: 'Maintenance Mode' },
      { to: { name: 'timeline' }, label: 'Timeline' },
      { to: { name: 'aboutUs' }, label: 'About Us' },
      { to: { name: 'package' }, label: 'Package' }
    ]
  },
  {
    label: 'Error',
    icon: InformationCircleIcon,
    children: [
      { to: { name: 'notFound' }, label: 'Not Found' },
      { to: { name: 'serverError' }, label: 'Server Error' },
      { to: { name: 'serviceUnavailable' }, label: 'Service Unavailable' },
      { to: { name: 'accessDenied' }, label: 'Access Denied' },
    ]
  },
  {
    label: 'Chat',
    icon: ChatBubbleLeftRightIcon,
    children: [
      { to: { name: 'chat' }, label: 'Chat'},
      { to: { name: 'chatTeam' }, label: 'Chat Team' },
    ]
  },
  {
    label: 'Blog',
    icon: RssIcon,
    children: [
      { to: { name: 'cardBlog' }, label: 'Card Blog' },
      { to: { name: 'basicBlog' }, label: 'Basic Blog' },
       { to: { name: 'sliderBlog' }, label: 'Slider Blog' },
      { to: { name: 'postDetails' }, label: 'Post Details' }



    ]
  },
  { to: { name: 'settings' }, label: 'Settings', icon: Cog6ToothIcon }
])

// Initialize open submenu based on current route
const initializeOpenSubmenu = () => {
  // Don't automatically open any submenu if no route matches
  openSubmenu.value = null
  
  // Only open submenu if current route matches exactly
  for (const item of items.value) {
    if (item.children) {
      const activeChild = item.children.find(child => 
        child.to.name === route.name // Exact match only
      )
      if (activeChild) {
        openSubmenu.value = item.label
        break
      }
    }
  }
}

// Close all submenus
const closeAllSubmenus = () => {
  openSubmenu.value = null
}

const toggleSubmenu = (label) => {
  openSubmenu.value = openSubmenu.value === label ? null : label
}

const isSubmenuOpen = (label) => {
  return openSubmenu.value === label
}

const isSubmenuActive = (item) => {
  if (!item.children) return false
  return item.children.some(child => isRouteActive(child.to.name))
}

const isRouteActive = (routeName) => {
  if (!routeName) return false
  if (Array.isArray(routeName)) {
    return routeName.includes(route.name)
  }
  if (routeName === 'dashboard') {
    return route.name === 'dashboard'
  }
  return route.name === routeName
}

// Watch for route changes
watch(
  () => route.name,
  (newRouteName) => {
    if (window.innerWidth < 1024) emit('close')
    
    let foundInSubmenu = false
    
    // Check if the new route is in any submenu
    for (const item of items.value) {
      if (item.children) {
        const hasActiveChild = item.children.some(child => 
          child.to.name === newRouteName || 
          (Array.isArray(child.to.name) && child.to.name.includes(newRouteName))
        )
        if (hasActiveChild) {
          openSubmenu.value = item.label
          foundInSubmenu = true
          break
        }
      }
    }
    
    // If not found in any submenu, close all submenus
    if (!foundInSubmenu) {
      closeAllSubmenus()
    }
  },
  { immediate: true }
)

// Initialize on mount
onMounted(() => {
  initializeOpenSubmenu()
})
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.glow-text {
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}

.router-link-active {
  @apply bg-white/10;
}
</style>