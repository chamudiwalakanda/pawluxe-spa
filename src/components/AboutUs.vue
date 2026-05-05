<script setup>
import aboutImg from '../assets/images/about-dogs.png' 
</script>

<template>
  <section class="bg-[#7D7171] py-20 px-10 md:px-20 min-h-[600px] flex items-center">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      
      <!-- LEFT SIDE: IMAGE -->
      <div class="flex justify-center">
        <img 
          :src="aboutImg" 
          alt="About Pawluxe" 
          class="w-full max-w-md shadow-2xl object-cover"
        />
      </div>

      <!-- RIGHT SIDE: CONTENT -->
      <div class="text-white space-y-6">
        <h2 class="text-5xl font-serif tracking-widest uppercase mb-8">
          About Us
        </h2>

        <div class="space-y-6 text-lg leading-relaxed font-light opacity-90">
          <p>
            At <span class="font-bold">Pawluxe</span>, we believe that every dog deserves a life of comfort, care, and a touch of luxury. Our brand was created with a simple vision to elevate everyday pet care into a refined and meaningful experience.
          </p>
          
          <p>
            We carefully curate premium-quality products and essentials that blend style, safety, and comfort, ensuring your furry companion enjoys nothing but the best. From cozy living to playful moments, every detail is designed with love and attention.
          </p>

          <p>
            More than just a pet brand, <span class="font-bold">Pawluxe</span> is a lifestyle one that celebrates the bond between you and your dog. Because to us, every paw matters, and every tail wag tells a story of happiness.
          </p>
        </div>
      </div>

    </div>
  </section>
</template>