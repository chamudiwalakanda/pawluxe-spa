
<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Product } from '../types/product'

const props = defineProps<{ product: Product }>()
const router = useRouter()

const goToDetail = () => {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div class="border rounded-xl shadow hover:shadow-lg p-4">
    
    <img 
      :src="product.thumbnail" 
      class="w-full h-48 object-cover rounded-lg"
    />

    <h2 class="font-semibold mt-2">{{ product.title }}</h2>

    <p class="text-gray-500 text-sm">
      {{ product.description.slice(0, 60) }}...
    </p>

    <div class="flex justify-between items-center mt-3">
      <span class="text-pink-500 font-bold">${{ product.price }}</span>
      
      <button 
      @click="goToDetail"
      class="bg-pink-500 text-white px-3 py-1 rounded">
       View
     </button>
    </div>

  </div>
</template>