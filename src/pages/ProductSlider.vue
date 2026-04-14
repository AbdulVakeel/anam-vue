<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Icon } from "@iconify/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const modules = [Navigation, Pagination, Autoplay];

const products = ref([
  {
    id: 1,
    title: "Premium Laptop",
    category: { name: "TechMaster" },
    price: 299,
    rating: 4.5,
    url: "#",
    image: "/products/product-9.jpg",
  },
  {
    id: 2,
    title: "Smartphone Pro",
    category: { name: "MobileX" },
    price: 199,
    rating: 4,
    url: "#",
    image: "/products/product-10.jpg",
  },
  {
    id: 3,
    title: "Wireless Headphones",
    category: { name: "SoundPlus" },
    price: 249,
    rating: 5,
    url: "#",
    image: "/products/product-11.jpg",
  },
  {
    id: 4,
    title: "Smart Watch",
    category: { name: "FitTech" },
    price: 89,
    rating: 4.5,
    url: "#",
    image: "/products/product-12.jpg",
  },
  {
    id: 5,
    title: "4K Camera",
    category: { name: "PhotoPro" },
    price: 159,
    rating: 4,
    url: "#",
    image: "/products/product-13.jpg",
  },
]);
</script>

<template>
  <section class="py-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Latest
          <span class="bg-gradient-to-r from-sky-400 to-purple-500 text-transparent bg-clip-text">
            Product
          </span>
        </h2>
        
         <RouterLink to="/products" class="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-medium px-6 py-3 rounded-xl border border-gray-700 hover:border-sky-500 transition-all">
        View All
      </RouterLink>
      </div>

      <!-- Product Slider -->
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="30"
        :loop="true"
        :autoplay="{ delay: 3000 }"
        :pagination="{ clickable: true }"
        :navigation="true"
        :breakpoints="{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 }
        }"
        class="my-10 pb-12"
      >
        <SwiperSlide v-for="product in products" :key="product.id">
          <div
            class="h-full rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-sky-500 hover:shadow-xl transition-all overflow-hidden flex flex-col"
          >
            <!-- Product Image -->
            <div class="h-48 bg-gray-100 dark:bg-gray-700 relative overflow-hidden group">
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <!-- Quick Preview -->
              <a
                :href="product.url"
                target="_blank"
                rel="noopener"
                class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span class="bg-white text-sky-600 px-4 py-2 rounded-md font-medium">
                  Quick Preview
                </span>
              </a>
            </div>

            <!-- Product Details -->
            <div class="p-5 flex flex-col flex-grow">
              <div class="flex-grow">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {{ product.title }}
                </h3>
                
                <!-- Rating - Moved above price -->
                <div class="flex items-center gap-1 mb-3">
                  <div class="flex text-yellow-400">
                    <template v-for="n in 5" :key="n">
                      <Icon
                        v-if="n <= Math.floor(product.rating)"
                        icon="mdi:star"
                        class="text-sm"
                      />
                      <Icon
                        v-else-if="n === Math.ceil(product.rating) && product.rating % 1 !== 0"
                        icon="mdi:star-half-full"
                        class="text-sm"
                      />
                      <Icon 
                        v-else 
                        icon="mdi:star-outline" 
                        class="text-sm text-gray-300 dark:text-gray-600"
                      />
                    </template>
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    {{ product.rating }} (24 reviews)
                  </span>
                </div>

                <!-- Price - Moved below rating -->
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Icon icon="mdi:tag-outline" />
                    {{ product.category.name }}
                  </span>
                  <span class="font-bold text-2xl text-sky-600 dark:text-sky-400">
                    ${{ product.price }}
                  </span>
                </div>
              </div>

              <div class="flex justify-between items-center pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <!-- Add to Cart Button -->
                <button
                  class="w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white px-4 py-3 rounded-md font-medium shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Icon icon="mdi:cart-outline" class="text-lg" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style scoped>
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #38bdf8 !important;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  backdrop-filter: blur(4px);
}

:deep(.swiper-button-next):after,
:deep(.swiper-button-prev):after {
  font-size: 20px;
}

:deep(.swiper-pagination-bullet) {
  background: #9ca3af !important;
  opacity: 1 !important;
  width: 10px;
  height: 10px;
}

:deep(.swiper-pagination-bullet-active) {
  background: #38bdf8 !important;
  width: 30px;
  border-radius: 5px;
}
</style>