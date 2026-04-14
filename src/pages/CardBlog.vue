<script setup>
import { ref } from 'vue'

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
    image: "/blog/blog-1.jpg",
    readTime: "1 min read",
    author: { firstName: "Liam", lastName: "Smith" },
    views: 9678,
    comments: 2,
    date: "Tue, Aug 5"
  },
  {
    id: 2,
    title: "After Twitter Staff Cuts, Survivors Face 'Radio Silence'",
    category: "Lifestyle",
    categoryColor: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300",
    image: "/blog/blog-2.jpg",
    readTime: "9 min read",
    author: { firstName: "Steve", lastName: "Johnson" },
    views: 7991,
    comments: 3,
    date: "Wed, Aug 6"
  },
  {
    id: 3,
    title: "Apple is apparently working on a new 'streamlined' accessibility",
    category: "Design",
    categoryColor: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300",
    image: "/blog/blog-3.jpg",
    readTime: "14 min read",
    author: { firstName: "Jack", lastName: "Brown" },
    views: 2295,
    comments: 13,
    date: "Fri, Aug 8"
  },
  {
    id: 4,
    title: "The Future of AI in Everyday Life",
    category: "Technology",
    categoryColor: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300",
    image: "/blog/blog-4.jpg",
    readTime: "6 min read",
    author: { firstName: "Olivia", lastName: "Davis" },
    views: 12045,
    comments: 8,
    date: "Sat, Aug 9"
  },
  {
    id: 5,
    title: "10 Minimalist Interior Design Ideas",
    category: "Interior",
    categoryColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300",
    image: "/blog/blog-5.jpg",
    readTime: "7 min read",
    author: { firstName: "Noah", lastName: "Wilson" },
    views: 6342,
    comments: 15,
    date: "Mon, Aug 11"
  },
  {
    id: 6,
    title: "Top 5 Fitness Apps for a Healthier Lifestyle",
    category: "Health",
    categoryColor: "bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-300",
    image: "/blog/blog-6.jpg",
    readTime: "9 min read",
    author: { firstName: "Emma", lastName: "Taylor" },
    views: 8741,
    comments: 13,
    date: "Wed, Aug 13"
  }
])

</script>

<template>
    <div class="min-h-screen p-4 text-gray-900 dark:text-white p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <!-- First Blog Grid -->
    <div class="max-w-7xl mx-auto mb-12">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Blog Post Card</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="blog in blogs"
          :key="blog.id"
          class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
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
              <div
                class="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold text-sm"
              >
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
      </div>
    </div>

  </div>
</template>