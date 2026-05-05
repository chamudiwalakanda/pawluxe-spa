<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const loading = ref(true)

const fetchDeals = async () => {
  try {
    // Fetching 4 products from DummyJSON
    const response = await axios.get('https://dummyjson.com/products?limit=4')
    products.value = response.data.products
  } catch (error) {
    console.error("Error fetching deals:", error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchDeals)
</script>

<template>
  <section class="bg-[#8B7E7E] py-16 px-10 relative">
    <!-- TITLE -->
    <h2 class="text-white text-5xl font-serif text-center mb-12">New User Deals</h2>

    <!-- PRODUCT GRID -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
      
      <div v-for="product in products" :key="product.id" class="bg-white p-4 shadow-lg">
        <!-- IMAGE CONTAINER -->
        <div class="aspect-square overflow-hidden mb-4 bg-gray-100">
          <img :src="product.thumbnail" class="w-full h-full object-cover" />
        </div>

        <!-- PRICE (Red text as per image) -->
        <p class="text-red-600 font-bold text-lg">LKR {{ Math.round(product.price * 300) }}</p>

        <!-- TITLE (Truncated) -->
        <h3 class="text-sm font-semibold text-gray-800 line-clamp-2 mt-1 h-10">
          {{ product.title }} - {{ product.description }}
        </h3>

        <!-- READ MORE BUTTON -->
        <button class="mt-4 bg-gray-300 text-black text-xs px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-400 transition">
          Read More <span class="font-bold">»</span>
        </button>
      </div>

    </div>

    <!-- LOADING STATE -->
    <div v-else class="text-white text-center">Loading deals...</div>

    <!-- NAVIGATION ARROWS (Decorative) -->
    <button class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl">❮</button>
    <button class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl">❯</button>

    <!-- SHOP MORE BUTTON -->
    <div class="flex justify-center mt-12">
      <button class="bg-[#B7B1B1] text-black px-10 py-3 rounded-md uppercase font-medium hover:bg-gray-400 transition shadow-md">
        Shop More
      </button>
    </div>
  </section>
</template>