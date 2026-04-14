<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const store = useCartStore()
const showCart = ref(false)
const route = useRoute()
const isMobile = ref(false)

// Check screen size
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
}

// Handle click outside
const cartDropdownRef = ref(null)
const handleClickOutside = (event) => {
  if (cartDropdownRef.value && !cartDropdownRef.value.contains(event.target)) {
    showCart.value = false
  }
}

// Setup event listeners
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  document.addEventListener('click', handleClickOutside)
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
  document.removeEventListener('click', handleClickOutside)
})

// Close cart when navigating to checkout
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/checkout') {
      showCart.value = false
    }
  }
)
</script>

<template>
  <div class="relative" ref="cartDropdownRef">
    <!-- Cart Button -->
    <button
      @click.stop="showCart = !showCart"
      class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      <ShoppingCartIcon class="w-6 h-6 text-gray-700 dark:text-gray-300" />
      <span
        v-if="store.totalItems"
        class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5"
      >
        {{ store.totalItems }}
      </span>
    </button>

    <!-- Desktop Dropdown -->
    <transition name="fade" v-if="!isMobile">
      <div
        v-if="showCart"
        class="absolute right-0 mt-3 w-96 bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden z-50"
      >
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h2 class="font-bold text-gray-800 dark:text-gray-100">Your Cart</h2>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ store.totalItems }} items</span>
          </div>

          <!-- Items -->
          <div v-if="store.cartItems.length" class="overflow-y-auto max-h-96">
            <div
              v-for="item in store.cartItems"
              :key="item.id"
              class="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition border-b border-gray-100 dark:border-gray-700"
            >
              <img 
                :src="item.image" 
                class="w-14 h-14 rounded-lg object-cover border border-gray-200 dark:border-gray-600" 
              />
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-800 dark:text-gray-100 truncate">{{ item.name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ item.qty }} × ${{ item.price }}
                  <span class="ml-2 font-medium text-gray-700 dark:text-gray-300">
                    (${{ (item.price * item.qty).toFixed(2) }})
                  </span>
                </p>
              </div>
              <button
                @click="store.removeItem(item.id)"
                class="text-gray-400 hover:text-red-500 transition"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="p-6 text-center">
            <div class="mx-auto w-16 h-16 text-gray-400 dark:text-gray-500 mb-3">
              <ShoppingCartIcon class="w-full h-full" />
            </div>
            <p class="text-gray-500 dark:text-gray-400">Your cart is empty</p>
            <router-link
              to="/products"
              class="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm"
              @click="showCart = false"
            >
              Browse Products
            </router-link>
          </div>

          <!-- Footer -->
          <div v-if="store.cartItems.length" class="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div class="flex justify-between mb-3">
              <span class="text-gray-600 dark:text-gray-300">Subtotal:</span>
              <span class="font-medium text-gray-800 dark:text-gray-100">${{ store.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between mb-4">
              <span class="text-gray-600 dark:text-gray-300">Discount (5%):</span>
              <span class="text-red-500">-${{ store.discount }}</span>
            </div>
            <div class="flex justify-between font-bold text-lg pt-3 text-gray-800 dark:text-gray-100">
              <span>Total:</span>
              <span>${{ store.total }}</span>
            </div>
            <router-link
              to="/checkout"
              class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition mt-4"
              @click="showCart = false"
            >
              Proceed to Checkout
            </router-link>
          </div>
        </div>
      </div>
    </transition>

    <!-- Mobile Bottom Sheet -->
    <transition name="slide-up" v-if="isMobile">
      <div
        v-if="showCart"
        class="fixed inset-0 z-50 flex flex-col"
      >
        <!-- Overlay -->
        <div 
          class="absolute inset-0 bg-black/50"
          @click="showCart = false"
        ></div>
        
        <!-- Cart Content -->
        <div class="relative mt-auto bg-white dark:bg-gray-900 rounded-t-xl shadow-xl max-h-[85vh] flex flex-col">
          <!-- Header -->
          <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h2 class="font-bold text-gray-800 dark:text-gray-100">Your Cart</h2>
            <button
              @click="showCart = false"
              class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Items -->
          <div v-if="store.cartItems.length" class="overflow-y-auto flex-1">
            <div
              v-for="item in store.cartItems"
              :key="item.id"
              class="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition border-b border-gray-100 dark:border-gray-700"
            >
              <img 
                :src="item.image" 
                class="w-14 h-14 rounded-lg object-cover border border-gray-200 dark:border-gray-600" 
              />
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-800 dark:text-gray-100 truncate">{{ item.name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ item.qty }} × ${{ item.price }}
                  <span class="ml-2 font-medium text-gray-700 dark:text-gray-300">
                    (${{ (item.price * item.qty).toFixed(2) }})
                  </span>
                </p>
              </div>
              <button
                @click="store.removeItem(item.id)"
                class="text-gray-400 hover:text-red-500 transition"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="p-6 text-center flex-1 flex flex-col items-center justify-center">
            <div class="w-16 h-16 text-gray-400 dark:text-gray-500 mb-3">
              <ShoppingCartIcon class="w-full h-full" />
            </div>
            <p class="text-gray-500 dark:text-gray-400">Your cart is empty</p>
            <router-link
              to="/products"
              class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm"
              @click="showCart = false"
            >
              Browse Products
            </router-link>
          </div>

          <!-- Footer -->
          <div v-if="store.cartItems.length" class="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div class="flex justify-between mb-3">
              <span class="text-gray-600 dark:text-gray-300">Subtotal:</span>
              <span class="font-medium text-gray-800 dark:text-gray-100">${{ store.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between mb-4">
              <span class="text-gray-600 dark:text-gray-300">Discount (5%):</span>
              <span class="text-red-500">-${{ store.discount }}</span>
            </div>
            <div class="flex justify-between font-bold text-lg pt-3 text-gray-800 dark:text-gray-100">
              <span>Total:</span>
              <span>${{ store.total }}</span>
            </div>
            <router-link
              to="/checkout"
              class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition mt-4"
              @click="showCart = false"
            >
              Proceed to Checkout
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Fade animation for desktop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Slide up animation for mobile */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from {
  transform: translateY(100%);
}
.slide-up-leave-to {
  transform: translateY(100%);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600;
  border-radius: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>