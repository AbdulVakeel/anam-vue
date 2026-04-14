<template>
  <div class="container mx-auto p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Product Images -->
      <div class="lg:w-1/2">
        <img :src="selectedImage" alt="Product Image" class="w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm" />
        <div class="flex gap-3 mt-4 overflow-x-auto pb-2">
          <img
            v-for="(img, index) in images"
            :key="index"
            :src="img"
            @click="selectedImage = img"
            :class="['w-20 h-20 object-cover rounded-lg cursor-pointer transition-all', 
                    selectedImage === img ? 'ring-2 ring-blue-500' : 'border border-gray-200 dark:border-gray-700']"
          />
        </div>
      </div>

      <!-- Product Details -->
      <div class="lg:w-1/2 flex flex-col gap-5">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-blue-600 dark:text-blue-400 font-medium text-sm uppercase tracking-wider">{{ brand }}</h2>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{{ title }}</h1>
          </div>
          <button @click="isWishlisted = !isWishlisted" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <HeartIcon v-if="isWishlisted" class="h-5 w-5 text-red-500" />
            <HeartIconOutline v-else class="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <!-- Rating -->
        <div class="flex items-center gap-2">
          <div class="flex text-yellow-400">
            <StarIcon v-for="n in 5" :key="n" class="h-4 w-4 fill-current" />
          </div>
          <span class="text-gray-500 dark:text-gray-400 text-sm">({{ reviews }} reviews)</span>
        </div>

        <!-- Price -->
        <div class="flex items-center gap-4">
          <span class="text-red-500 dark:text-red-400 font-semibold text-lg">FLAT $12</span>
          <span class="line-through text-gray-400 text-sm">${{ oldPrice }}</span>
          <span class="font-bold text-gray-900 dark:text-gray-100 text-xl">${{ price }}</span>
          <span class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">In Stock</span>
        </div>

        <!-- Options -->
        <div class="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label class="block text-gray-600 dark:text-gray-300 mb-1 text-sm font-medium">Color</label>
            <select v-model="selectedColor" class="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
              <option v-for="color in colors" :key="color">{{ color }}</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-600 dark:text-gray-300 mb-1 text-sm font-medium">Size</label>
            <select v-model="selectedSize" class="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
              <option v-for="size in sizes" :key="size">{{ size }}</option>
            </select>
          </div>
        </div>

        <!-- Highlights -->
        <div class="mt-2">
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1">
            <CheckCircleIcon class="h-5 w-5 text-green-500" />
            <span>Key Features</span>
          </h3>
          <ul class="space-y-2 text-gray-600 dark:text-gray-300">
            <li v-for="(item, index) in about.slice(0, 3)" :key="index" class="flex items-start gap-2">
              <CheckIcon class="h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 mt-6">
          <button @click="addToCart" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
            <ShoppingCartIcon class="h-5 w-5" />
            Add to Cart
          </button>
          <button class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <ArrowPathIcon class="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <!-- Additional Info -->
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center gap-2">
            <TruckIcon class="h-5 w-5" />
            <span>Free shipping</span>
          </div>
          <div class="flex items-center gap-2">
            <ShieldCheckIcon class="h-5 w-5" />
            <span>2-year warranty</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  HeartIcon as HeartIconOutline,
  StarIcon,
  ShoppingCartIcon,
  ArrowPathIcon,
  TruckIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  CheckIcon
} from '@heroicons/vue/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid';

const isWishlisted = ref(false);

const brand = "Hooli";
const title = "Adam ROMA USB-C / USB-A 3.1 (2-in-1 Flash Drive) – 128GB";
const reviews = 650;
const oldPrice = 854;
const price = 842;
const colors = ["Black", "Silver"];
const sizes = ["128 GB", "256 GB", "512 GB"];
const selectedColor = ref(colors[0]);
const selectedSize = ref(sizes[1]);

const images = [
  "products/product-1.jpg", 
  "products/product-2.jpg",
  "products/product-3.jpg",
  "products/product-5.jpg",
];
const selectedImage = ref(images[0]);

const about = [
  "Quad LED Backlit IPS Display (227 PPI, 400 nits Brightness)",
  "Built-in Speakers with Wide Stereo Sound",
  "Three-mic Array with Directional Beamforming",
  "49.9 WHr Li-polymer Battery",
  "Backlit Magic Keyboard",
];

const addToCart = () => {
  // Add to cart logic
  console.log('Added to cart:', { 
    product: title,
    color: selectedColor.value,
    size: selectedSize.value
  });
};
</script>

<style>
/* Smooth transitions for dark mode */
* {
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
</style>