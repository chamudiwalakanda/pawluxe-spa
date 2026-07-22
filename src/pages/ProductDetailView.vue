<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import SafeImage from '../components/common/SafeImage.vue'
import RatingStars from '../components/common/RatingStars.vue'
import ProductCard from '../components/common/ProductCard.vue'
import { getProductById, products } from '../data/products'
import { addToCart, appState, isWishlisted, toggleWishlist } from '../store/appStore'
import { calculateDiscount, formatLKR } from '../utils/formatters'

const route = useRoute()
const router = useRouter()
const quantity = ref(1)
const activeTab = ref('details')
const notice = ref('')
let timer

const product = computed(() => getProductById(route.params.id))
const wished = computed(() => (product.value ? isWishlisted(product.value.id) : false))
const discount = computed(() => product.value ? calculateDiscount(product.value.price, product.value.offerPrice) : 0)
const related = computed(() => {
  if (!product.value) return []
  return products.filter((item) => item.category === product.value.category && item.id !== product.value.id).slice(0, 4)
})

watch(() => route.params.id, () => {
  quantity.value = 1
  activeTab.value = 'details'
})

function requestLogin(action) {
  router.push({ name: 'login', query: { redirect: route.fullPath, reason: action } })
}

function addProduct(item = product.value) {
  if (!item) return
  if (!appState.currentUser) {
    requestLogin('cart')
    return
  }
  addToCart(item, item.id === product.value.id ? quantity.value : 1)
  notice.value = `${item.name} added to your cart.`
  clearTimeout(timer)
  timer = setTimeout(() => (notice.value = ''), 2200)
}

function handleWishlist() {
  if (!product.value) return
  if (!appState.currentUser) {
    requestLogin('wishlist')
    return
  }
  toggleWishlist(product.value.id)
}
</script>

<template>
  <section v-if="product" class="product-detail section">
    <div class="container">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <RouterLink to="/">Home</RouterLink><span>/</span><RouterLink to="/shop">Shop</RouterLink><span>/</span><span>{{ product.name }}</span>
      </nav>

      <div class="product-detail__grid">
        <div class="product-detail__media">
          <SafeImage :src="product.image" :fallback="product.fallback" :alt="product.name" loading="eager" fetchpriority="high" />
          <span>{{ product.badge }}</span>
        </div>

        <div class="product-detail__content">
          <p class="eyebrow">{{ product.brand }} · {{ product.category }}</p>
          <h1>{{ product.name }}</h1>
          <RatingStars :rating="product.rating" :reviews="product.reviews" />
          <p class="product-detail__description">{{ product.description }}</p>

          <div class="product-detail__price">
            <strong>{{ formatLKR(product.offerPrice) }}</strong>
            <del>{{ formatLKR(product.price) }}</del>
            <span>Save {{ discount }}%</span>
          </div>

          <ul class="product-detail__highlights">
            <li v-for="highlight in product.highlights" :key="highlight">{{ highlight }}</li>
          </ul>

          <dl class="product-detail__meta">
            <div><dt>Pack size</dt><dd>{{ product.size }}</dd></div>
            <div><dt>Availability</dt><dd>{{ product.stock > 10 ? 'In stock' : `Only ${product.stock} left` }}</dd></div>
            <div><dt>SKU</dt><dd>{{ product.sku }}</dd></div>
          </dl>

          <div class="product-detail__actions">
            <label>Quantity
              <input v-model.number="quantity" type="number" min="1" :max="product.stock" />
            </label>
            <button class="button" type="button" @click="addProduct()">Add to cart</button>
            <button class="button button--surface" type="button" :aria-pressed="wished" @click="handleWishlist">
              {{ wished ? '♥ Saved' : '♡ Save' }}
            </button>
          </div>

          <div class="product-detail__delivery">
            <strong>Delivery across Sri Lanka</strong>
            <p>Estimated 2 to 5 working days. Free standard delivery when the product subtotal reaches Rs. 15,000.</p>
          </div>
        </div>
      </div>

      <section class="product-tabs">
        <div class="product-tabs__buttons" role="tablist" aria-label="Product information">
          <button type="button" :class="{ active: activeTab === 'details' }" @click="activeTab = 'details'">Product details</button>
          <button type="button" :class="{ active: activeTab === 'delivery' }" @click="activeTab = 'delivery'">Delivery and returns</button>
          <button type="button" :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">Reviews</button>
        </div>
        <div class="product-tabs__panel">
          <div v-if="activeTab === 'details'">
            <h2>Designed for practical daily use</h2>
            <p>{{ product.description }} Follow the product label for sizing, feeding, washing or safe-use instructions. Health products and supplements should be discussed with a veterinarian when your dog has an existing condition or takes other medicine.</p>
          </div>
          <div v-else-if="activeTab === 'delivery'">
            <h2>Islandwide fulfilment</h2>
            <p>Orders are prepared from the PAWLUXE demo store in Colombo. Standard delivery is estimated at 2 to 5 working days, depending on province. Unused products may be marked for a demo return within seven days; opened food and health items are not returnable in this front-end scenario.</p>
          </div>
          <div v-else>
            <h2>{{ product.rating }} out of 5</h2>
            <p>Based on {{ product.reviews }} demo review records. Customers most often value the clear product information, practical design and easy ordering experience.</p>
          </div>
        </div>
      </section>

      <section v-if="related.length" class="related-products">
        <div class="section-row"><div><p class="eyebrow">You may also like</p><h2>More from {{ product.category }}</h2></div><RouterLink class="text-link" to="/shop">View shop →</RouterLink></div>
        <div class="product-grid"><ProductCard v-for="item in related" :key="item.id" :product="item" @added="addProduct" /></div>
      </section>
    </div>
    <transition name="toast"><div v-if="notice" class="toast-message" role="status">{{ notice }}</div></transition>
  </section>

  <section v-else class="not-found">
    <div class="container"><span>404</span><h1>Product not found.</h1><p>This item may no longer be available in the PAWLUXE collection.</p><RouterLink class="button" to="/shop">Return to shop</RouterLink></div>
  </section>
</template>
