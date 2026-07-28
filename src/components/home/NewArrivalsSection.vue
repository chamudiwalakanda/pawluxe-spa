<script setup>
import { ref } from 'vue'
import ProductCard from '../common/ProductCard.vue'
import SectionHeading from '../common/SectionHeading.vue'
import { newArrivals } from '../../data/products'

const notice = ref('')
let timer

function showNotice(product) {
  notice.value = `${product.name} added to your cart.`
  clearTimeout(timer)
  timer = setTimeout(() => (notice.value = ''), 2200)
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-row">
        <SectionHeading
          eyebrow="Fresh additions"
          title="New to the PAWLUXE collection"
          text="Useful new products for travel, enrichment, monsoon walks and warm-weather comfort."
        />
        <RouterLink class="text-link" to="/shop">Browse the full shop →</RouterLink>
      </div>
      <div class="product-grid">
        <ProductCard v-for="product in newArrivals" :key="product.id" :product="product" @added="showNotice" />
      </div>
    </div>
    <transition name="toast"><div v-if="notice" class="toast-message" role="status">{{ notice }}</div></transition>
  </section>
</template>
