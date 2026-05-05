<script setup>

import footerBgImg from '../assets/images/footer-bg.png'
// If you have image icons, import them here, e.g.:
// import fbIcon from '../assets/images/facebook.png'
</script>

<template>
  <footer class="relative w-full text-white overflow-hidden mt-16 font-sans">
    
    <!-- 1. BACKGROUND IMAGE & THE BLACK SHADE (OVERLAY) -->
    <div class="absolute inset-0 z-0">
      <img 
        :src="footerBgImg" 
        alt="Footer Background" 
        class="w-full h-full object-cover object-top"
      />
      <!-- This is the crucial part that "shades the image in black" -->
      <div class="absolute inset-0 bg-black/70"></div> 
    </div>

    <!-- 2. MAIN CONTENT AREA -->
<div class="relative z-10 max-w-7xl mx-auto px-10 md:px-20 flex flex-col items-center min-h-[500px] justify-between">
  <!-- TOP SPACING: Replaces the logo to keep the top of the image clear -->
  <!--div class="h-32 md:h-48 w-full"></div>-->
  <div class="h-16 md:h-20 w-full"></div>

  <!-- SPACER: Pushes everything below it to the bottom -->
  <div class="flex-grow"></div>

  <!-- CONTENT GRID (Now sits lower on the dog's chest area) -->
  <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-12 text-sm pb-10">
    <!-- COLUMN 1: TAGLINE & DESCRIPTION -->
    <div class="space-y-4">
      <p class="font-bold text-base leading-tight">The art of pampering paws.</p>
      <p class="opacity-90 leading-relaxed max-w-[280px]">
        Bringing luxury, comfort, and care to every furry friend.
      </p>
    </div>

    <!-- COLUMN 2: QUICK LINKS -->
    <div class="space-y-4">
      <h4 class="font-bold uppercase tracking-wider mb-5">Quick Links</h4>
      <ul class="space-y-3 opacity-90">
        <li><a href="#" class="hover:text-[#D6A243]">Home</a></li>
        <li><a href="#" class="hover:text-[#D6A243]">About Us</a></li>
        <li><a href="#" class="hover:text-[#D6A243]">Shop</a></li>
        <li><a href="#" class="hover:text-[#D6A243]">Health</a></li>
      </ul>
    </div>

    <!-- COLUMN 3: CUSTOMER CARE -->
    <div class="space-y-4">
      <h4 class="font-bold uppercase tracking-wider mb-5">Customer Care</h4>
      <ul class="space-y-3 opacity-90">
        <li><a href="#" class="hover:text-[#D6A243]">FAQs</a></li>
        <li><a href="#" class="hover:text-[#D6A243]">Shipping & Delivery</a></li>
        <li><a href="#" class="hover:text-[#D6A243]">Returns & Refunds</a></li>
        <li><a href="#" class="hover:text-[#D6A243]">Privacy Policy</a></li>
      </ul>
    </div>

    <!-- COLUMN 4: CONTACT & SOCIALS -->
    <div class="space-y-4">
      <h4 class="font-bold uppercase tracking-wider mb-5">Contact</h4>
      <ul class="space-y-3 opacity-90 mb-8">
        <li>+94 761267777</li>
        <li>support@pawluxe.com</li>
      </ul>
      
      <h4 class="font-bold uppercase tracking-wider mb-5">Stay Connected</h4>
      <div class="flex gap-6 pt-2">
        <a href="#" class="w-8 h-8 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">f</a>
        <a href="#" class="w-8 h-8 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">i</a>
        <a href="#" class="w-8 h-8 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">t</a>
      </div>
    </div>
  </div>
</div>

    <!-- 3. BOTTOM BAR (COPYRIGHT) -->
    <div class="relative z-10 w-full bg-black/60 py-6 text-center text-xs opacity-70 border-t border-white/10">
      &copy; 2026 Pawluxe. All rights reserved.
    </div>

  </footer>
</template>