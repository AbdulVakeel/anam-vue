<template>
  <div class="min-h-screen p-4 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <!-- Blog Post Header -->
    <header class="relative pt-10 pb-20 border border-gray-200 dark:border-gray-800 ext-gray-800 dark:text-gray-100 rounded-2xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center space-x-4 mb-6">
          <span 
            :class="[
              'px-3 py-1 rounded-full text-xs font-medium',
              post.categoryColor
            ]"
          >
            {{ post.category }}
          </span>
          <span class="ext-gray-800 dark:text-gray-100 text-sm">{{ formatDate(post.date) }}</span>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold ext-gray-800 dark:text-gray-100 mb-6">{{ post.title }}</h1>
        <div class="flex items-center space-x-4">
          <img 
            src="/user/avatars/user-1.jpg" 
            alt="Author" 
            class="w-10 h-10 rounded-full border-2 border-white"
          >
          <div>
            <p class="ext-gray-800 dark:text-gray-100font-medium">John Doe</p>
            <p class="ext-gray-800 dark:text-gray-100 text-sm">Tech Writer</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Blog Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article class="prose prose-lg dark:prose-invert max-w-none">
        <!-- Featured Image -->
        <img 
          :src="post.image" 
          :alt="post.title" 
          class="w-full rounded-xl shadow-lg mb-12"
        >

        <!-- Blog Content -->
        <div class="mb-12">
          <p class="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {{ post.excerpt }}
          </p>
          
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Introduction</h2>
          <p class="text-gray-700 dark:text-gray-300 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
          
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Key Features</h2>
          <ul class="text-gray-700 dark:text-gray-300 mb-6">
            <li class="mb-2">✔️ Feature one with detailed explanation</li>
            <li class="mb-2">✔️ Second important feature highlighted</li>
            <li class="mb-2">✔️ Third notable aspect of the product</li>
            <li class="mb-2">✔️ Fourth benefit that users will appreciate</li>
          </ul>
          
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Detailed Analysis</h2>
          <p class="text-gray-700 dark:text-gray-300 mb-6">Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
          
          <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Expert Insight</h3>
            <p class="text-gray-700 dark:text-gray-300">"This product represents a significant leap forward in its category. The attention to detail and user experience is unparalleled in the current market."</p>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Conclusion</h2>
          <p class="text-gray-700 dark:text-gray-300">In conclusion, this product offers a compelling set of features that make it stand out from the competition. Whether you're a casual user or a power user, you'll find something to appreciate in this well-designed product.</p>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-12">
          <span 
            v-for="(tag, index) in post.tags" 
            :key="index"
            class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Author Bio -->
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-12">
          <div class="flex items-center space-x-4">
            <img 
              src="/user/avatars/user-2.jpg" 
              alt="Author" 
              class="w-16 h-16 rounded-full"
            >
            <div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">John Doe</h3>
              <p class="text-gray-700 dark:text-gray-300 text-sm">Tech journalist with 10+ years of experience covering gadgets and consumer electronics.</p>
            </div>
          </div>
        </div>

        <!-- Related Posts -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Related Posts</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="related in relatedPosts" 
              :key="related.id"
              class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img 
                :src="related.image" 
                :alt="related.title" 
                class="w-full h-40 object-cover"
              >
              <div class="p-4">
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium mb-2 inline-block',
                    related.categoryColor
                  ]"
                >
                  {{ related.category }}
                </span>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{{ related.title }}</h3>
                <p class="text-gray-700 dark:text-gray-300 text-sm">{{ formatDate(related.date) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Comments Section -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Comments (3)</h2>
          
          <div class="space-y-6">
            <!-- Comment 1 -->
            <div class="flex space-x-4">
              <img 
                src="/user/avatars/user-3.jpg" 
                alt="User" 
                class="w-10 h-10 rounded-full"
              >
              <div>
                <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-medium text-gray-800 dark:text-gray-100">Sarah Johnson</h4>
                    <span class="text-gray-600 dark:text-gray-400 text-sm">2 days ago</span>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300">Great review! I've been considering this product and your insights were really helpful.</p>
                </div>
              </div>
            </div>
            
            <!-- Comment 2 -->
            <div class="flex space-x-4">
              <img 
                src="/user/avatars/user-4.jpg" 
                alt="User" 
                class="w-10 h-10 rounded-full"
              >
              <div>
                <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-medium text-gray-800 dark:text-gray-100">Michael Chen</h4>
                    <span class="text-gray-600 dark:text-gray-400 text-sm">1 week ago</span>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300">I've been using this for a month now and it's been fantastic. The battery life is even better than advertised.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comment Form -->
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Leave a Comment</h3>
          <form>
            <div class="mb-4">
              <textarea 
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100" 
                rows="4" 
                placeholder="Write your comment here..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Post Comment
            </button>
          </form>
        </div>
      </article>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const postId = parseInt(route.params.id)

const posts = [
  {
    id: 1,
    title: "Garmin's Instinct Crossover is a rugged hybrid smartwatch",
    category: "Gadget",
    categoryColor: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400",
    image: "blog/blog-slider/image-01.jpeg",
    excerpt: "Garmin introduces a rugged smartwatch that blends analog design with digital smart features.",
    date: "2023-05-15",
    tags: ["wearables", "smartwatch", "fitness"],
    content: "Full content would go here..."
  },
]

const relatedPosts = [
  {
    id: 2,
    title: "iPhone 15 Pro Max Review - Apple's new powerhouse",
    category: "Mobile",
    categoryColor: "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400",
    image: "blog/blog-slider/image-03.jpeg",
    date: "2023-06-20"
  },
  {
    id: 3,
    title: "Meta launches new VR headset for next-gen gaming",
    category: "Tech",
    categoryColor: "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400",
    image: "blog/blog-slider/image-04.jpeg",
    date: "2023-04-10"
  }
]

const post = ref(posts.find(p => p.id === postId) || posts[0])

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.prose {
  max-width: 100%;
}

.prose :where(img):not(:where([class~="not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}

/* Smooth transitions for dark mode */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>