<template>
<section class="py-6 md:py-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <div class="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
      
        <h2 class="text-3xl sm:text-4xl md:text-5xl  mb-4 md:mb-6 leading-tight">
          Anam UI <span class="text-green-400"> Admin</span>
          <span class="text-yellow-400"> Mobile Solutions</span><span class="text-yellow-400">!</span>
        </h2>
        <p class="text-gray-400 leading-relaxed text-base sm:text-lg">
          At Anam UI Admin, we specialize in building fast, responsive, and beautiful mobile applications using Flutter for Android and iOS. With 8+ years of industry experience, we've delivered 150+ cross-platform apps, helping startups and businesses scale with efficient and robust digital solutions.
        </p>
      </div>

      <div class="flex justify-center">
        <Swiper
          :modules="modules"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          navigation
          class="w-[80%] sm:w-[250px] sm:h-[500px] border border-gray-800 
         contrast-125 brightness-110 rounded-3xl bg-gray-800 border-4 border-sky-400 shadow-2xl overflow-hidden"
        >
        <div class="absolute bottom-2 right-2  backdrop-blur-sm text-xs px-2 py-1 rounded font-semibold pointer-events-none select-none z-20">
      <h2 class=" font-bold text-white  flex items-center relative z-10">© 
            <span class="glow-text"> Anam <span class="text-sky-400">UI</span> Admin</span>
          </h2>
  </div>
         <SwiperSlide>
            <img src="/img/android/app_1.jpg" class="w-full h-full object-cover rounded-[1.2rem]"   @contextmenu.prevent />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/android/app_2.jpg" class="w-full h-full object-cover rounded-[1.2rem]"   @contextmenu.prevent />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/android/app_3.jpg" class="w-full h-full object-cover rounded-[1.2rem]"   @contextmenu.prevent />
          </SwiperSlide>
           <SwiperSlide>
            <img src="/img/android/app_4.jpg" class="w-full h-full object-cover rounded-[1.2rem]"   @contextmenu.prevent />
          </SwiperSlide>
           <SwiperSlide>
            <img src="/img/android/app_5.jpg" class="w-full h-full object-cover rounded-[1.2rem]"   @contextmenu.prevent />
          </SwiperSlide>
           <SwiperSlide>
            <img src="/img/android/app_7.jpg" class="w-full h-full object-cover rounded-[1.2rem]"   @contextmenu.prevent />
          </SwiperSlide>
           <SwiperSlide>
            <img src="/img/android/app_8.jpg" class="w-full h-full object-cover rounded-[1.2rem]"   @contextmenu.prevent />
          </SwiperSlide>
           <SwiperSlide>
            <img src="/img/android/app_10.jpg" class="w-full h-full object-cover rounded-[1.2rem]"   @contextmenu.prevent />
          </SwiperSlide>
           <SwiperSlide>
            <img src="/img/android/app_11.jpg" class="w-full h-full object-cover rounded-[1.2rem]"   @contextmenu.prevent />
          </SwiperSlide>
           <SwiperSlide>
            <img src="/img/android/app_12.jpg" class="w-full h-full object-cover rounded-[1.2rem]"   @contextmenu.prevent />
          </SwiperSlide>
           <SwiperSlide>
            <img src="/img/android/app_13.jpg" class="w-full h-full object-cover rounded-[1.2rem]"   @contextmenu.prevent />
          </SwiperSlide>
        </Swiper>
      </div>

    </div>
  </section>
<section class="py-6 px-4 sm:px-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

    <!-- Left Content -->
    <div>
      <h2 class="text-3xl sm:text-4xl md:text-4xl  mb-6 leading-tight text-center md:text-left">
        Custom <span class="text-green-400">Software</span>
        <span class="text-yellow-400"> Solutions</span><span class="text-yellow-400">!</span>
      </h2>

      <p class="text-gray-400 leading-relaxed text-base sm:text-lg">
          At Anam UI Admin, we specialize in building fast, responsive, and beautiful mobile applications using Flutter for Android and iOS. With 8+ years of industry experience, we've delivered 150+ cross-platform apps, helping startups and businesses scale with efficient and robust digital solutions.
        </p>

     
    </div>

    <!-- Right Swiper/Image -->
    <div class="w-full mt-10 md:mt-0">
      <Swiper
        :modules="modules"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        navigation
        class="rounded-3xl bg-gray-800 border-4 border-sky-400 shadow-2xl overflow-hidden"
      >
      <div class="absolute bottom-2 right-2  backdrop-blur-sm text-xs px-2 py-1 rounded font-semibold pointer-events-none select-none z-20">
      <h2 class=" font-bold text-white  flex items-center relative z-10">© 
            <span class="glow-text"> Anam <span class="text-sky-400">UI</span> Admin</span>
          </h2>
  </div>
       <SwiperSlide>
          <img src="/img/web/web_1.png"
            class="w-full h-auto object-cover contrast-125 brightness-110 saturate-150 hover:scale-105 transition-transform duration-500"   @contextmenu.prevent />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/web/web_2.png"
            class="w-full h-auto object-cover contrast-125 brightness-110 saturate-150 hover:scale-105 transition-transform duration-500"   @contextmenu.prevent />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/web/web_3.png"
            class="w-full h-auto object-cover contrast-125 brightness-110 saturate-150 hover:scale-105 transition-transform duration-500"   @contextmenu.prevent />
        </SwiperSlide>
         <SwiperSlide>
          <img src="/img/web/web_4.png"
            class="w-full h-auto object-cover contrast-125 brightness-110 saturate-150 hover:scale-105 transition-transform duration-500"   @contextmenu.prevent />
        </SwiperSlide>
         <SwiperSlide>
          <img src="/img/web/web_5.png"
            class="w-full h-auto object-cover contrast-125 brightness-110 saturate-150 hover:scale-105 transition-transform duration-500"   @contextmenu.prevent />
        </SwiperSlide>
         <SwiperSlide>
          <img src="/img/web/web_6.png"
            class="w-full h-auto object-cover contrast-125 brightness-110 saturate-150 hover:scale-105 transition-transform duration-500"   @contextmenu.prevent />
        </SwiperSlide>
      </Swiper>
    </div>

  </div>
</section>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Icon } from '@iconify/vue';
import 'swiper/css/autoplay';
import SwiperClass from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
SwiperClass.use([Navigation, Pagination, Autoplay]);
</script>