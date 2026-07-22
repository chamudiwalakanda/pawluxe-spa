<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import RatingStars from './RatingStars.vue'
import SafeImage from './SafeImage.vue'
import { addToCart, appState, isWishlisted, toggleWishlist } from '../../store/appStore'
import { formatLKR } from '../../utils/formatters'

const props = defineProps({
  product: { type: Object, required: true },
})

const emit = defineEmits(['added', 'wishlist-changed'])
const router = useRouter()
const route = useRoute()
const wished = computed(() => isWishlisted(props.product.id))

function requestLogin(action) {
  router.push({
    name: 'login',
    query: { redirect: route.fullPath, reason: action },
  })
}

function handleAdd() {
  if (!appState.currentUser) {
    requestLogin('cart')
    return
  }
  if (addToCart(props.product)) emit('added', props.product)
}

function handleWishlist() {
  if (!appState.currentUser) {
    requestLogin('wishlist')
    return
  }
  if (toggleWishlist(props.product.id)) emit('wishlist-changed', props.product)
}
</script>

<template>
  <article class="product-card">
    <div class="product-card__image-wrap">
      <RouterLink :to="`/product/${product.id}`" :aria-label="`View ${product.name}`">
        <SafeImage :src="product.image" :fallback="product.fallback" :alt="product.name" class="product-card__image" />
      </RouterLink>
      <span class="product-card__badge">{{ product.badge }}</span>
      <button class="product-card__wish" :class="{ 'product-card__wish--active': wished }" type="button" :aria-label="wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`" :aria-pressed="wished" @click="handleWishlist">
        {{ wished ? '♥' : '♡' }}
      </button>
    </div>

    <div class="product-card__body">
      <div class="product-card__meta"><span>{{ product.category }}</span><RatingStars :rating="product.rating" :reviews="product.reviews" /></div>
      <RouterLink class="product-card__title" :to="`/product/${product.id}`"><h3>{{ product.name }}</h3></RouterLink>
      <p>{{ product.description }}</p>
      <div class="product-card__stock" :class="{ 'product-card__stock--low': product.stock <= 10 }">{{ product.stock > 10 ? 'In stock' : `Only ${product.stock} left` }} · {{ product.size }}</div>
      <div class="product-card__footer">
        <div class="product-card__price"><strong>{{ formatLKR(product.offerPrice) }}</strong><del>{{ formatLKR(product.price) }}</del></div>
        <button class="button button--small" type="button" @click="handleAdd">Add to cart</button>
      </div>
    </div>
  </article>
</template>
