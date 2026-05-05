
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import type { Product } from '../types/product'
import heroImg from '../assets/images/imagehero.png'
import NewUserDeals from '../components/NewUserDeals.vue'
import AboutUs from '../components/AboutUs.vue'
import layerImg from '../assets/images/layer.png'
import Footer from '../components/Footer.vue'

const products = ref<Product[]>([])

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  products.value = data.products
})
</script>

<template>
  <!-- HERO SECTION -->
   <section class="relative h-[700px] flex items-center justify-start text-left pl-12 ">
    
    <!-- BACKGROUND IMAGE -->
    <img 
      :src="heroImg"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- DARK OVERLAY -->
    <div class="absolute inset-0 bg-black/40"></div>

    <!-- CONTENT ON IMAGE -->
    <div class="relative z-10 text-white px-4">
      <h1 class="text-4xl font-bold mb-4">
        The art of pampering paws.
      </h1>

      <p class="mb-6 text-lg">
Welcome to Pawluxe, where every paw is treated with care, comfort, and a touch of luxury. <br>
We believe your dog deserves more than just the basics  they deserve an experience filled with love, style, and premium quality. <br>
From carefully selected products to thoughtful services, everything we offer is designed to keep tails wagging and hearts happy.
      </p>

       </div>
    
  </section>

  <section>
    <NewUserDeals />
  </section>

 <!-- CARE SECTION -->
<section class="relative min-h-[800px] w-full flex flex-col overflow-hidden bg-[#AFA9A9]">
  
  <!-- BACKGROUND IMAGE (The patterned layer) -->
  <img 
    :src="layerImg"
    class="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply z-0"
    alt="Pattern Background"
  />

  <!-- SECTION TITLE (Top Left) -->
  <div class="relative z-20 pt-16 pl-16">
    <h2 class="text-3xl font-serif text-black tracking-widest uppercase">
      How to Care for Your Dog
    </h2>
  </div>

  <!-- CENTERED CONTENT CARD -->
  <div class="relative z-20 flex-grow flex flex-col items-center justify-center px-4">
    
    <!-- GLASS/WHITE ROUNDED BOX -->
    <div class="bg-white/30 backdrop-blur-sm rounded-[50px] p-12 max-w-4xl shadow-sm border border-white/20">
      <div class="space-y-8 text-black text-lg md:text-xl leading-relaxed text-center font-serif">
        <p>
          Caring for your dog goes beyond the basics it’s about creating a life filled with 
          love, comfort, and well-being. A happy dog needs a balanced routine that includes 
          nutritious food, regular exercise, proper grooming, and plenty of affection.
        </p>

        <p>
          Make sure your dog has a healthy diet suited to their age and breed, along 
          with fresh water at all times. Daily walks and playtime keep them active, 
          while regular grooming helps maintain their hygiene and comfort.
        </p>

        <p>
          Routine vet check-ups are essential to ensure their long-term health. 
          Most importantly, spend quality time with your dog. Love, attention, and a 
          safe environment help build trust and keep their tail wagging every day.
        </p>
      </div>
    </div>

    <!-- MEET DOCTORS BUTTON -->
    <button class="mt-12 bg-[#B7B1B1] hover:bg-gray-500 text-black px-12 py-3 rounded-md transition shadow-md uppercase tracking-wider text-sm font-serif border border-gray-500/30">
      Meet Doctors
    </button>
  </div>

</section>

  <section>
    <AboutUs />
    </section>

    <Footer />
</template>