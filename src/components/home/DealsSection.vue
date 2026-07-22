<script setup>
import { ref } from 'vue'
import ProductCard from '../common/ProductCard.vue'
import SectionHeading from '../common/SectionHeading.vue'
import { featuredDeals } from '../../data/products'

const notice = ref('')
let timer

function showNotice(product) {
  notice.value = `${product.name} added to your cart.`
  clearTimeout(timer)
  timer = setTimeout(() => (notice.value = ''), 2400)
}
</script>

<template>
  <section class="section section--muted">
    <div class="container">
      <div class="section-row">
        <SectionHeading
          eyebrow="Sri Lanka welcome offer"
          title="New user deals"
          text="Start with useful favourites selected for nutrition, walks, grooming and everyday care."
        />
        <RouterLink class="text-link" to="/shop">View every product →</RouterLink>
      </div>

      <div class="product-grid">
        <ProductCard
          v-for="product in featuredDeals"
          :key="product.id"
          :product="product"
          @added="showNotice"
        />
      </div>
    </div>

    <transition name="toast">
      <div v-if="notice" class="toast-message" role="status">{{ notice }}</div>
    </transition>
  </section>
</template>
