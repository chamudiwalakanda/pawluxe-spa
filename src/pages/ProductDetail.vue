<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '../types/product'

const route = useRoute()
const product = ref<Product | null>(null)

onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
  product.value = await res.json()
})
</script>

<template>
  <div v-if="product" class="p-8">
    <img :src="product.thumbnail" class="w-64 mb-4" />
    <h1 class="text-2xl font-bold">{{ product.title }}</h1>
    <p class="text-gray-600">{{ product.description }}</p>
    <p class="text-pink-500 font-bold mt-2">${{ product.price }}</p>
  </div>
</template>