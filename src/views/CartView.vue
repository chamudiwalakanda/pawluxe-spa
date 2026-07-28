<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import SafeImage from '../components/common/SafeImage.vue'
import PageHero from '../components/common/PageHero.vue'
import { appState, cartTotal, removeFromCart, updateCartQuantity } from '../store/appStore.js'
import { formatLKR } from '../utils/formatters'
import { FREE_DELIVERY_THRESHOLD, getDeliveryCharge, getDeliveryEstimate, provinces } from '../utils/shipping'

const router = useRouter()
const province = ref(appState.currentUser?.province || 'Western')
const promoInput = ref('')
const promoApplied = ref(false)
const promoMessage = ref('')

const discount = computed(() => (promoApplied.value ? Math.round(cartTotal.value * 0.1) : 0))
const discountedSubtotal = computed(() => Math.max(0, cartTotal.value - discount.value))
const delivery = computed(() => getDeliveryCharge(province.value, cartTotal.value))
const grandTotal = computed(() => discountedSubtotal.value + delivery.value)
const remainingForFreeDelivery = computed(() => Math.max(0, FREE_DELIVERY_THRESHOLD - cartTotal.value))

function applyPromo() {
  if (promoInput.value.trim().toUpperCase() === 'WELCOME10') {
    promoApplied.value = true
    promoMessage.value = 'WELCOME10 applied: 10% off products.'
  } else {
    promoApplied.value = false
    promoMessage.value = 'That demo code is not valid. Try WELCOME10.'
  }
}

function proceedToCheckout() {
  router.push({
    name: 'checkout',
    query: {
      province: province.value,
      promo: promoApplied.value ? 'WELCOME10' : undefined,
    },
  })
}
</script>

<template>
  <PageHero compact eyebrow="Your selection" title="Shopping cart" text="Review quantities, estimate Sri Lankan delivery and apply a welcome code before checkout." />

  <section class="section">
    <div v-if="appState.cart.length" class="container cart-layout">
      <div>
        <div class="cart-list">
          <article v-for="item in appState.cart" :key="item.id" class="cart-item">
            <RouterLink :to="`/product/${item.id}`">
              <SafeImage :src="item.image" :fallback="item.fallback" :alt="item.name" />
            </RouterLink>
            <div class="cart-item__info">
              <span>{{ item.category }} · {{ item.brand }}</span>
              <RouterLink :to="`/product/${item.id}`"><h2>{{ item.name }}</h2></RouterLink>
              <p>{{ item.size }}</p>
              <button type="button" @click="removeFromCart(item.id)">Remove</button>
            </div>
            <label class="quantity-control">
              <span>Quantity</span>
              <input :value="item.quantity" type="number" min="1" :max="item.stock" @input="updateCartQuantity(item.id, $event.target.value)" />
            </label>
            <strong class="cart-item__price">{{ formatLKR(item.offerPrice * item.quantity) }}</strong>
          </article>
        </div>

        <div class="cart-benefits">
          <article><strong>Secure demo checkout</strong><span>No real payment is charged.</span></article>
          <article><strong>Islandwide delivery</strong><span>{{ getDeliveryEstimate(province) }}</span></article>
          <article><strong>Need help?</strong><a href="https://wa.me/94771234567" target="_blank" rel="noreferrer">Chat on WhatsApp</a></article>
        </div>
      </div>

      <aside class="order-summary">
        <h2>Order summary</h2>
        <label class="summary-field">Delivery province
          <select v-model="province"><option v-for="item in provinces" :key="item" :value="item">{{ item }}</option></select>
        </label>

        <div><span>Product subtotal</span><strong>{{ formatLKR(cartTotal) }}</strong></div>
        <div v-if="discount" class="summary-discount"><span>WELCOME10 discount</span><strong>− {{ formatLKR(discount) }}</strong></div>
        <div><span>Delivery</span><strong>{{ delivery ? formatLKR(delivery) : 'Free' }}</strong></div>
        <div class="order-summary__total"><span>Total</span><strong>{{ formatLKR(grandTotal) }}</strong></div>

        <div class="promo-form">
          <label for="promo-code">Promo code</label>
          <div><input id="promo-code" v-model="promoInput" type="text" placeholder="WELCOME10" /><button type="button" @click="applyPromo">Apply</button></div>
          <small :class="{ 'promo-success': promoApplied }">{{ promoMessage }}</small>
        </div>

        <button class="button button--full" type="button" @click="proceedToCheckout">Proceed to checkout</button>
        <RouterLink class="text-link" to="/shop">Continue shopping</RouterLink>
        <small v-if="remainingForFreeDelivery">Add {{ formatLKR(remainingForFreeDelivery) }} more for free standard delivery.</small>
        <small v-else>Free standard delivery has been applied.</small>
      </aside>
    </div>

    <div v-else class="container empty-state empty-state--cart">
      <span>🛒</span><h2>Your cart is empty</h2><p>Explore the PAWLUXE collection and add products for your dog.</p><RouterLink class="button" to="/shop">Visit the shop</RouterLink>
    </div>
  </section>
</template>
