<script setup>
import { computed, ref } from 'vue'
import ProductCard from '../components/common/ProductCard.vue'
import PageHero from '../components/common/PageHero.vue'
import SectionHeading from '../components/common/SectionHeading.vue'
import { categories, products } from '../data/products'
import { formatLKR } from '../utils/formatters'

const selectedCategory = ref('All')
const searchTerm = ref('')
const sortBy = ref('featured')
const maxPrice = ref(20000)
const inStockOnly = ref(false)
const notice = ref('')
let timer

const filteredProducts = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  let result = products.filter((product) => {
    const categoryMatch = selectedCategory.value === 'All' || product.category === selectedCategory.value
    const searchMatch = `${product.name} ${product.brand} ${product.description} ${product.category}`.toLowerCase().includes(term)
    const priceMatch = product.offerPrice <= maxPrice.value
    const stockMatch = !inStockOnly.value || product.stock > 0
    return categoryMatch && searchMatch && priceMatch && stockMatch
  })

  if (sortBy.value === 'price-low') result = [...result].sort((a, b) => a.offerPrice - b.offerPrice)
  if (sortBy.value === 'price-high') result = [...result].sort((a, b) => b.offerPrice - a.offerPrice)
  if (sortBy.value === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
  if (sortBy.value === 'newest') result = [...result].sort((a, b) => b.id - a.id)
  return result
})

function categoryCount(category) {
  return category === 'All' ? products.length : products.filter((product) => product.category === category).length
}

function resetFilters() {
  selectedCategory.value = 'All'
  searchTerm.value = ''
  sortBy.value = 'featured'
  maxPrice.value = 20000
  inStockOnly.value = false
}

function showNotice(product) {
  notice.value = `${product.name} added to your cart.`
  clearTimeout(timer)
  timer = setTimeout(() => (notice.value = ''), 2200)
}
</script>

<template>
  <PageHero
    eyebrow="The PAWLUXE Sri Lanka collection"
    title="Useful essentials for healthier, happier dogs."
    text="Explore food, treats, health support, grooming, toys, beds, accessories and travel products with prices in Sri Lankan rupees."
    image="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=2000&q=82"
    image-position="center 42%"
  />

  <section class="section">
    <div class="container shop-layout">
      <aside class="shop-sidebar" aria-label="Shop filters">
        <div class="shop-sidebar__header"><h2>Categories</h2><span>{{ filteredProducts.length }} items</span></div>
        <div class="category-list">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            :class="{ active: selectedCategory === category }"
            @click="selectedCategory = category"
          >
            <span>{{ category }}</span><small>{{ categoryCount(category) }}</small>
          </button>
        </div>

        <div class="filter-block">
          <label for="price-filter">Maximum price <strong>{{ formatLKR(maxPrice) }}</strong></label>
          <input id="price-filter" v-model.number="maxPrice" type="range" min="2500" max="20000" step="500" />
        </div>

        <label class="check-filter">
          <input v-model="inStockOnly" type="checkbox" />
          <span>Show in-stock items only</span>
        </label>

        <button class="text-button" type="button" @click="resetFilters">Reset all filters</button>

        <div class="shop-sidebar__help">
          <span>Need help choosing?</span><strong>Ask our care team.</strong><RouterLink to="/contact">Contact PAWLUXE →</RouterLink>
        </div>
      </aside>

      <div class="shop-results">
        <div class="shop-toolbar">
          <div class="shop-search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>
            <input v-model="searchTerm" type="search" placeholder="Search food, toys, grooming..." aria-label="Search shop products" />
          </div>
          <select v-model="sortBy" aria-label="Sort products">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest rated</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </div>

        <SectionHeading
          :eyebrow="selectedCategory === 'All' ? 'Full collection' : selectedCategory"
          :title="selectedCategory === 'All' ? 'Shop every essential' : `${selectedCategory} products`"
          :text="`${filteredProducts.length} products match your current filters.`"
        />

        <div v-if="filteredProducts.length" class="product-grid product-grid--shop">
          <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" @added="showNotice" />
        </div>
        <div v-else class="empty-state">
          <h3>No matching products</h3><p>Try a wider price range, another search term or a different category.</p>
          <button class="button" type="button" @click="resetFilters">Reset filters</button>
        </div>
      </div>
    </div>

    <transition name="toast"><div v-if="notice" class="toast-message" role="status">{{ notice }}</div></transition>
  </section>
</template>
