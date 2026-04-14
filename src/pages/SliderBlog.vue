<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

const modules = [Navigation, Pagination, Autoplay]

const initials = (firstName, lastName) => {
  const f = firstName ? firstName[0].toUpperCase() : ''
  const l = lastName ? lastName[0].toUpperCase() : ''
  return f + l
}

const blogs = ref([
  {
    id: 1,
    title: "Garmins Instinct Crossover is a rugged hybrid smartwatch",
    category: "Gadget",
    categoryColor: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
    image: "/blog/blog-slider/image-01.jpeg",
    readTime: "1 min read",
    author: { firstName: "Liam", lastName: "Smith" },
    views: 9678,
    comments: 2,
    date: "Tue, Aug 5"
  },

  {
    id: 2,
    title: "Apple is apparently working on a new 'streamlined' accessibility",
    category: "Tech",
    categoryColor: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300",
    image: "/blog/blog-slider/image-02.jpeg",
    readTime: "14 min read",
    author: { firstName: "Jack", lastName: "Brown" },
    views: 2295,
    comments: 13,
    date: "Fri, Aug 8"
  },
  
  {
    id: 3,
    title: "10 Minimalist Interior Design Ideas",
    category: "Design",
    categoryColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300",
    image: "/blog/blog-slider/image-03.jpeg",
    readTime: "7 min read",
    author: { firstName: "Noah", lastName: "Wilson" },
    views: 6342,
    comments: 15,
    date: "Mon, Aug 11"
  },
  {
    id: 4,
    title: "Top 5 Fitness Apps for a Healthier Lifestyle",
    category: "Health",
    categoryColor: "bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-300",
    image: "/blog/blog-slider/image-04.jpeg",
    readTime: "9 min read",
    author: { firstName: "Emma", lastName: "Taylor" },
    views: 8741,
    comments: 13,
    date: "Wed, Aug 13"
  }
])

const blogslatest = [
  {
    id: 1,
    title: "Garmin's Instinct Crossover is a rugged hybrid smartwatch",
    category: "Wearables",
    categoryColor: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400",
    image: "blog/blog-slider/image-05.jpg",
    excerpt: "Garmin introduces a rugged smartwatch that blends analog design with digital smart features."
  },
  {
    id: 2,
    title: "iPhone 15 Pro Max Review - Apple's new powerhouse",
    category: "Mobile",
    categoryColor: "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400",
    image: "blog/blog-slider/image-06.jpeg",
    excerpt: "The iPhone 15 Pro Max sets new benchmarks in design, speed, and camera quality."
  },
  {
    id: 3,
    title: "Meta launches new VR headset for next-gen gaming",
    category: "VR",
    categoryColor: "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400",
    image: "blog/blog-slider/image-07.jpeg",
    excerpt: "Meta's latest VR headset brings a lighter design, improved visuals, and more immersive gameplay."
  },
  {
    id: 4,
    title: "Tesla announces affordable EV for global market",
    category: "Automotive",
    categoryColor: "bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400",
    image: "blog/blog-slider/image-08.jpeg",
    excerpt: "Tesla's new budget-friendly EV aims to revolutionize the mass market."
  },

]
</script>

<template>
  <div class="min-h-screen p-4 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    
    <!-- First Blog Slider -->
    <div class="max-w-7xl mx-auto mb-12">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Featured Posts</h2>
      
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="20"
        :autoplay="{ delay: 5000 }"
        :pagination="{ clickable: true }"
        :navigation="true"
        :breakpoints="{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }"
        class="pb-10"
      >
        <swiper-slide v-for="blog in blogs" :key="blog.id">
          <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
            <!-- Image -->
            <div class="relative aspect-[4/3]">
              <img 
                :src="blog.image" 
                :alt="blog.title" 
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <span class="absolute top-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                {{ blog.readTime }}
              </span>
            </div>

            <!-- Content -->
            <div class="p-4 sm:p-5">
              <!-- Author & Category -->
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold text-sm">
                  {{ initials(blog.author.firstName, blog.author.lastName) }}
                </div>
                <span class="text-xs sm:text-sm px-2.5 py-1 rounded-full font-medium" :class="blog.categoryColor">
                  {{ blog.category }}
                </span>
              </div>

              <!-- Title -->
              <h3 class="font-semibold text-base sm:text-lg mb-3 leading-snug text-gray-900 dark:text-white line-clamp-2">
                {{ blog.title }}
              </h3>

              <!-- Meta -->
              <div class="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                <span class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {{ blog.views.toLocaleString() }}
                </span>
                <span class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {{ blog.comments }}
                </span>
                <span>{{ blog.date }}</span>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- Second Blog Slider -->
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Latest Updates</h2>
      
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="20"
        :autoplay="{ delay: 4500 }"
        :pagination="{ clickable: true }"
        :breakpoints="{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 }
        }"
        class="pb-10"
      >
        <swiper-slide v-for="blog in blogslatest" :key="blog.id">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full">
            <img
              :src="blog.image"
              :alt="blog.title"
              class="w-full h-48 sm:h-40 object-cover"
            />
            <div class="p-4 sm:p-5">
              <span
                :class="[
                  'px-2.5 py-1 rounded-full text-xs font-medium mb-3 inline-block',
                  blog.categoryColor
                ]"
              >
                {{ blog.category }}
              </span>
              <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {{ blog.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {{ blog.excerpt }}
              </p>
              <button
                class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 inline-flex items-center"
              >
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style>
.swiper-pagination-bullet {
  @apply bg-gray-400 dark:bg-gray-600;
}
.swiper-pagination-bullet-active {
  @apply bg-blue-600 dark:bg-blue-400;
}
.swiper-button-next,
.swiper-button-prev {
  @apply text-gray-900 dark:text-gray-100 after:text-xl;
}
</style>