
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import type { Product } from '../types/product'

const products = ref<Product[]>([])

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  products.value = data.products
})
</script>

<template>
  <!-- HERO SECTION -->
  <section class="bg-pink-100 py-16 text-center">
    <h1 class="text-4xl font-bold mb-4">Luxury Care for Your Pets</h1>
    <p class="text-gray-600 mb-6">Premium products for your furry friends</p>
    <button class="bg-pink-500 text-white px-6 py-2 rounded-lg">
      Shop Now
    </button>
  </section>

  <!-- PRODUCT GRID -->
  <section class="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </section>
</template>