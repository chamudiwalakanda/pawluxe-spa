<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'

const products = ref<any[]>([])

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  products.value = data.products
})
</script>

<template>
  <h1 class="text-3xl font-bold mb-6">Shop</h1>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <ProductCard
      v-for="p in products"
      :key="p.id"
      :product="p"
    />
  </div>
</template>