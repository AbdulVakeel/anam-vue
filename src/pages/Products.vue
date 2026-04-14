<template>
  <!-- Main Product Grid View -->
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h3 class="font-semibold text-xl text-gray-800 dark:text-gray-100">Products</h3>
    </div>

    <!-- Products Grid -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="p in products"
        :key="p.id"
        class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="aspect-video overflow-hidden">
          <img :src="p.image" :alt="p.title" class="w-full h-full object-cover" />
        </div>
        <div class="p-4">
          <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-1">{{ p.title }}</h4>
          <p class="text-sm text-gray-500 dark:text-gray-300 mb-3">{{ p.description }}</p>
          <div class="flex items-center justify-between">
            <span class="font-semibold text-gray-800 dark:text-gray-100">$ {{ p.price }}</span>
            <button 
              @click="openProductView(p)"
              class="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Product Modal -->
    <transition name="fade" v-if="!isMobile">
      <div
        v-if="showProductView"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="showProductView = false"
      >
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <!-- Header -->
          <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h2 class="font-bold text-gray-800 dark:text-gray-100">{{ selectedProduct?.title }}</h2>
            <button
              @click="showProductView = false"
              class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="overflow-y-auto flex-1 p-6">
            <div class="flex flex-col md:flex-row gap-6">
              <div class="w-full md:w-1/2 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <img 
                  :src="selectedProduct?.image" 
                  :alt="selectedProduct?.title" 
                  class="w-full h-full object-cover"
                />
              </div>
              
              <div class="w-full md:w-1/2 space-y-4">
                <p class="text-gray-500 dark:text-gray-300">{{ selectedProduct?.description }}</p>
                
                <div class="flex flex-col space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-xl text-gray-800 dark:text-gray-100">${{ selectedProduct?.price }}</span>
                    <div class="flex items-center space-x-2">
                      <button 
                        @click="quantity > 1 ? quantity-- : null"
                        class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span class="w-8 text-center">{{ quantity }}</span>
                      <button 
                        @click="quantity++"
                        class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="text-gray-500 dark:text-gray-400">Availability</span>
                      <p class="text-green-600 dark:text-green-400">In Stock</p>
                    </div>
                    <div>
                      <span class="text-gray-500 dark:text-gray-400">Brand</span>
                      <p>{{ selectedProduct?.brand || 'Premium' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div class="flex flex-col sm:flex-row justify-end gap-3">
              <button 
                @click="showProductView = false"
                class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
              <button 
                @click="buyProduct" 
                class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Buy Now ({{ quantity }})
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Mobile Bottom Sheet Product View -->
    <transition name="slide-up" v-if="isMobile">
      <div
        v-if="showProductView"
        class="fixed inset-0 z-50 flex flex-col"
      >
        <!-- Overlay -->
        <div 
          class="absolute inset-0 bg-black/50"
          @click="showProductView = false"
        ></div>
        
        <!-- Product Content -->
        <div class="relative mt-auto bg-white dark:bg-gray-900 rounded-t-xl shadow-xl max-h-[90vh] flex flex-col">
          <!-- Header -->
          <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h2 class="font-bold text-gray-800 dark:text-gray-100">{{ selectedProduct?.title }}</h2>
            <button
              @click="showProductView = false"
              class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="overflow-y-auto flex-1 p-4">
            <div class="aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4">
              <img 
                :src="selectedProduct?.image" 
                :alt="selectedProduct?.title" 
                class="w-full h-full object-cover"
              />
            </div>
            
            <div class="space-y-4">
              <p class="text-gray-500 dark:text-gray-300">{{ selectedProduct?.description }}</p>
              
              <div class="flex items-center justify-between">
                <span class="font-bold text-xl text-gray-800 dark:text-gray-100">${{ selectedProduct?.price }}</span>
                <div class="flex items-center space-x-2">
                  <button 
                    @click="quantity > 1 ? quantity-- : null"
                    class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <span class="w-8 text-center">{{ quantity }}</span>
                  <button 
                    @click="quantity++"
                    class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Availability</span>
                  <p class="text-green-600 dark:text-green-400">In Stock</p>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Brand</span>
                  <p>{{ selectedProduct?.brand || 'Premium' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div class="flex flex-col gap-3">
              <button 
                @click="buyProduct" 
                class="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Buy Now ({{ quantity }})
              </button>
              <button 
                @click="showProductView = false"
                class="w-full py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Product Notification Popup -->
    <div v-if="showProductPopup" class="fixed bottom-4 right-4 z-50 w-full max-w-xs sm:max-w-sm animate-fade-in-up">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-300">
        <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700">
          <h3 class="font-semibold text-gray-800 dark:text-white">New Product Alert</h3>
          <button @click="closePopup" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="p-4">
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <img :src="popupProduct.image" :alt="popupProduct.title" class="w-full h-full object-cover">
            </div>
            
            <div class="flex-1">
              <h4 class="font-medium text-gray-800 dark:text-white">{{ popupProduct.title }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">{{ popupProduct.description }}</p>
              <div class="mt-2 flex items-center justify-between">
                <span class="font-bold text-blue-600 dark:text-blue-400">${{ popupProduct.price }}</span>
                <button 
                  @click="viewProductFromPopup(popupProduct)" 
                  class="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="h-1 bg-gray-200 dark:bg-gray-600">
          <div 
            class="h-full bg-blue-500" 
            :class="{'animate-timer': showProductPopup}" 
            :style="{ animationDuration: `${displayTime/1000}s` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Screen size detection
const isMobile = ref(false)
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

// Product data
const products = ref([
  { 
    id: 1, 
    title: 'Premium Laptop', 
    description: 'High-performance laptop with 16GB RAM and 1TB SSD', 
    price: 1299, 
    image: '/products/product-9.jpg',
    brand: 'TechMaster'
  },
  { 
    id: 2, 
    title: 'Smartphone Pro', 
    description: 'Latest smartphone with triple camera and 5G support', 
    price: 899, 
    image: '/products/product-10.jpg',
    brand: 'MobileX'
  },
  { 
    id: 3, 
    title: 'Wireless Headphones', 
    description: 'Noise cancelling headphones with 30hr battery life', 
    price: 249, 
    image: '/products/product-11.jpg',
    brand: 'SoundPlus'
  },
  { 
    id: 4, 
    title: 'Smart Watch', 
    description: 'Fitness tracker with heart rate monitoring', 
    price: 199, 
    image: '/products/product-12.jpg',
    brand: 'FitTech'
  },
  { 
    id: 5, 
    title: '4K Camera', 
    description: 'Professional camera with 4K video recording', 
    price: 799, 
    image: '/products/product-13.jpg',
    brand: 'PhotoPro'
  },
  { 
    id: 6, 
    title: 'Gaming Console', 
    description: 'Next-gen gaming console with 1TB storage', 
    price: 499, 
    image: '/products/product-14.jpg',
    brand: 'GameBox'
  },
  { 
    id: 7, 
    title: 'Bluetooth Speaker', 
    description: 'Portable speaker with 20hr battery life', 
    price: 129, 
    image: '/products/product-15.jpg',
    brand: 'AudioWave'
  },
  { 
    id: 8, 
    title: 'E-Reader', 
    description: 'Paper-like display with adjustable front light', 
    price: 149, 
    image: '/products/product-16.jpg',
    brand: 'ReadEasy'
  }
])

// Product view state
const showProductView = ref(false)
const selectedProduct = ref(null)
const quantity = ref(1)

const openProductView = (product) => {
  selectedProduct.value = product
  quantity.value = 1
  showProductView.value = true
}

const buyProduct = () => {
  alert(`Order placed for ${quantity.value} ${selectedProduct.value.title}(s) - Total: $${selectedProduct.value.price * quantity.value}`)
  showProductView.value = false
}

// Product popup notification
const showProductPopup = ref(false)
const popupProduct = ref(null)
const displayTime = 5000 // 5 seconds
let timeoutId = null

const showRandomProductPopup = () => {
  const unshownProducts = products.value.filter(p => p.id !== selectedProduct.value?.id)
  const randomIndex = Math.floor(Math.random() * unshownProducts.length)
  popupProduct.value = unshownProducts[randomIndex]
  showProductPopup.value = true
  
  timeoutId = setTimeout(() => {
    showProductPopup.value = false
  }, displayTime)
}

const closePopup = () => {
  showProductPopup.value = false
  if (timeoutId) clearTimeout(timeoutId)
}

const viewProductFromPopup = (product) => {
  openProductView(product)
  closePopup()
}

// Initialize popup
onMounted(() => {
  setTimeout(showRandomProductPopup, 3000)
  setInterval(() => {
    if (!showProductPopup.value && !showProductView.value) {
      showRandomProductPopup()
    }
  }, 30000)
})
</script>

<style scoped>
/* Fade animation for desktop modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide up animation for mobile bottom sheet */
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

/* Animation for the popup */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}

/* Animation for the auto-close timer */
@keyframes timer {
  from { width: 100%; }
  to { width: 0%; }
}
.animate-timer {
  animation: timer linear forwards;
}

/* Line clamp for description */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
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