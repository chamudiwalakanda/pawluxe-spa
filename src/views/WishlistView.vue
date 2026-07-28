<script setup>
import { computed, ref } from 'vue'
import ProductCard from '../components/common/ProductCard.vue'
import PageHero from '../components/common/PageHero.vue'
import { products } from '../data/products'
import { appState } from '../store/appStore.js'

const notice = ref('')
let timer
const wishlistProducts = computed(() => products.filter((product) => appState.wishlist.includes(product.id)))

function showNotice(product) {
  notice.value = `${product.name} added to your cart.`
  clearTimeout(timer)
  timer = setTimeout(() => (notice.value = ''), 2200)
}
</script>

<template>
  <PageHero compact eyebrow="Saved for later" title="Your wishlist" text="Keep useful products together and move them to your cart when you are ready." />
  <section class="section">
    <div v-if="wishlistProducts.length" class="container">
      <div class="section-row"><div><p class="eyebrow">Saved items</p><h2>{{ wishlistProducts.length }} product{{ wishlistProducts.length === 1 ? '' : 's' }}</h2></div><RouterLink class="text-link" to="/shop">Continue shopping →</RouterLink></div>
      <div class="product-grid product-grid--shop"><ProductCard v-for="product in wishlistProducts" :key="product.id" :product="product" @added="showNotice" /></div>
    </div>
    <div v-else class="container empty-state empty-state--cart">
      <span>♡</span><h2>Your wishlist is empty</h2><p>Save products from the shop to compare or revisit them later.</p><RouterLink class="button" to="/shop">Explore products</RouterLink>
    </div>
    <transition name="toast"><div v-if="notice" class="toast-message" role="status">{{ notice }}</div></transition>
  </section>
</template>
