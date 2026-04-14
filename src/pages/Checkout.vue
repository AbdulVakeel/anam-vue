<script setup>
import { useCartStore } from '../stores/cart'
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'

const store = useCartStore()
</script>

<template>
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6 pb-3 border-b border-gray-300 dark:border-gray-700">
      <h1 class="text-2xl font-bold">
        Your Shopping Cart <span class="text-blue-600 dark:text-blue-400">({{ store.totalItems }})</span>
      </h1>
      <div class="text-gray-500 dark:text-gray-400 text-sm">
        <span v-if="store.totalItems > 0">{{ store.totalItems }} item(s)</span>
      </div>
    </div>

    <!-- Cart Items -->
    <div v-if="store.cartItems.length" class="space-y-4">
      <div class="hidden md:grid grid-cols-12 gap-4 px-4 pb-2 border-b border-gray-300 dark:border-gray-700">
        <div class="col-span-5 font-medium">Product</div>
        <div class="col-span-2 font-medium text-center">Price</div>
        <div class="col-span-2 font-medium text-center">Quantity</div>
        <div class="col-span-2 font-medium text-center">Total</div>
        <div class="col-span-1"></div>
      </div>

      <div
        v-for="item in store.cartItems"
        :key="item.id"
        class="grid grid-cols-12 gap-4 items-center p-4 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-50 dark:bg-gray-800"
      >
        <!-- Product Info -->
        <div class="col-span-12 md:col-span-5 flex items-center gap-4">
          <img 
            :src="item.image" 
            class="w-16 h-16 rounded-lg object-cover border border-gray-300 dark:border-gray-700 transition group-hover:border-blue-500"
            :alt="item.name"
          />
          <div>
            <p class="font-semibold text-lg">{{ item.name }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Size: <span class="text-gray-600 dark:text-gray-300">{{ item.size }}</span> | 
              Color: <span class="text-gray-600 dark:text-gray-300">{{ item.color }}</span>
            </p>
          </div>
        </div>

        <!-- Price -->
        <div class="col-span-4 md:col-span-2 text-center">
          ${{ item.price }}
        </div>

        <!-- Quantity -->
        <div class="col-span-4 md:col-span-2 flex items-center justify-center gap-2">
          <button
            @click="store.updateQty(item.id, item.qty - 1)"
            class="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 transition"
            :disabled="item.qty <= 1"
            :class="{'opacity-50 cursor-not-allowed': item.qty <= 1}"
          >
            <MinusIcon class="w-4 h-4" />
          </button>
          <span class="min-w-[20px] text-center">{{ item.qty }}</span>
          <button
            @click="store.updateQty(item.id, item.qty + 1)"
            class="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 transition"
          >
            <PlusIcon class="w-4 h-4" />
          </button>
        </div>

        <!-- Total -->
        <div class="col-span-3 md:col-span-2 font-medium text-center">
          ${{ (item.price * item.qty).toFixed(2) }}
        </div>

        <!-- Remove -->
        <div class="col-span-1 flex justify-end">
          <button
            @click="store.removeItem(item.id)"
            class="text-red-500 hover:text-red-400 transition p-1"
          >
            <TrashIcon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg mt-6 border border-gray-300 dark:border-gray-700">
        <h2 class="font-semibold mb-4 text-xl flex items-center gap-2 text-gray-900 dark:text-gray-100">
          Order Summary
        </h2>
        <div class="space-y-3 text-gray-900 dark:text-gray-100">
          <div class="flex justify-between py-1">
            <span class="text-gray-500 dark:text-gray-400">Subtotal</span>
            <span>${{ store.subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-gray-500 dark:text-gray-400">Discount (5%)</span>
            <span class="text-red-500">- ${{ store.discount }}</span>
          </div>
          <div class="flex justify-between py-3 border-t border-gray-300 dark:border-gray-700 mt-2 font-semibold">
            <span>Total Amount</span>
            <span class="text-xl text-blue-600 dark:text-blue-400">${{ store.total }}</span>
          </div>
        </div>
        <button
          class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="mx-auto w-24 h-24 text-gray-400 dark:text-gray-600 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 class="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Your cart is empty</h3>
      <p class="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added any items yet</p>
      <button
        class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        @click="$router.push('/products')"
      >
        Continue Shopping
      </button>
    </div>
  </div>
</template>