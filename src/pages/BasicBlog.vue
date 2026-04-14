<script setup>
const blogslatest = [
  {
    id: 1,
    title: "Garmin's Instinct Crossover is a rugged hybrid smartwatch",
    category: "Gadget",
    categoryColor: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400",
    image: "/blog/blog-slider/image-01.jpeg",
    excerpt: "Garmin introduces a rugged smartwatch that blends analog design with digital smart features."
  },
  {
    id: 2,
    title: "iPhone 15 Pro Max Review - Apple's new powerhouse",
    category: "Mobile",
    categoryColor: "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400",
    image: "/blog/blog-slider/image-02.jpeg",
    excerpt: "The iPhone 15 Pro Max sets new benchmarks in design, speed, and camera quality."
  },
  {
    id: 3,
    title: "Meta launches new VR headset for next-gen gaming",
    category: "Tech",
    categoryColor: "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400",
    image: "/blog/blog-slider/image-03.jpeg",
    excerpt: "Meta's latest VR headset brings a lighter design, improved visuals, and more immersive gameplay."
  },
  {
    id: 4,
    title: "Tesla announces affordable EV for global market",
    category: "Auto",
    categoryColor: "bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400",
    image: "/blog/blog-slider/image-04.jpeg",
    excerpt: "Tesla's new budget-friendly EV aims to revolutionize the mass market."
  },
  {
    id: 5,
    title: "Samsung unveils revolutionary foldable phone with improved durability",
    category: "Mobile",
    categoryColor: "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400",
    image: "/blog/blog-slider/image-05.jpg",
    excerpt: "Samsung's latest foldable phone features a more durable hinge and scratch-resistant display."
  },
  {
    id: 6,
    title: "NVIDIA announces breakthrough in AI-powered graphics technology",
    category: "Tech",
    categoryColor: "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400",
    image: "/blog/blog-slider/image-06.jpeg",
    excerpt: "New RTX 5000 series promises 2x performance with revolutionary AI rendering."
  },
  {
    id: 7,
    title: "Sony's new noise-canceling headphones set new industry standard",
    category: "Gadget",
    categoryColor: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400",
    image: "/blog/blog-slider/image-07.jpeg",
    excerpt: "WH-1000XM5 headphones feature improved ANC and 40-hour battery life."
  },
  {
    id: 8,
    title: "Microsoft Surface Pro 10 leaks reveal major design overhaul",
    category: "Tech",
    categoryColor: "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400",
    image: "/blog/blog-slider/image-08.jpeg",
    excerpt: "Leaked images show thinner bezels, new keyboard design, and ARM processor options."
  }
]
</script>

<template>
  <div class="min-h-screen p-4 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <!-- Blog Grid -->
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Latest Blog Posts</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="blog in blogslatest"
          :key="blog.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
        >
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
      </div>
    </div>
  </div>
</template>