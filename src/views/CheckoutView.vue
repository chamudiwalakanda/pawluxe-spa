<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import PageHero from '../components/common/PageHero.vue'
import SafeImage from '../components/common/SafeImage.vue'
import { appState, cartTotal, placeOrder } from '../store/appStore.js'
import { formatLKR } from '../utils/formatters'
import { getDeliveryCharge, getDeliveryEstimate, provinces } from '../utils/shipping'

const route = useRoute()
const router = useRouter()
const submittedOrder = ref(null)
const busy = ref(false)
const promoApplied = computed(() => route.query.promo === 'WELCOME10')

const form = reactive({
  fullName: appState.currentUser?.name || '',
  email: appState.currentUser?.email || '',
  phone: appState.currentUser?.phone || '',
  address: '',
  city: appState.currentUser?.city || '',
  province: provinces.includes(route.query.province) ? route.query.province : (appState.currentUser?.province || 'Western'),
  postalCode: '',
  deliveryNotes: '',
  paymentMethod: 'Cash on delivery',
  agree: false,
})

const discount = computed(() => (promoApplied.value ? Math.round(cartTotal.value * 0.1) : 0))
const delivery = computed(() => getDeliveryCharge(form.province, cartTotal.value))
const total = computed(() => Math.max(0, cartTotal.value - discount.value) + delivery.value)

function submitOrder() {
  if (!appState.currentUser) {
    router.push({ name: 'login', query: { redirect: route.fullPath, reason: 'checkout' } })
    return
  }
  if (!appState.cart.length || !form.agree) return
  busy.value = true
  const order = placeOrder({
    ...form,
    subtotal: cartTotal.value,
    discount: discount.value,
    deliveryCharge: delivery.value,
    total: total.value,
    promoCode: promoApplied.value ? 'WELCOME10' : null,
    deliveryEstimate: getDeliveryEstimate(form.province),
  })
  if (order) submittedOrder.value = order
  busy.value = false
}
</script>

<template>
  <PageHero compact eyebrow="Secure front-end demo" title="Checkout" text="Enter Sri Lankan delivery details and place a complete demo order. No real payment is processed." />

  <section class="section checkout-page">
    <div v-if="submittedOrder" class="container order-confirmation">
      <span>✓</span>
      <p class="eyebrow">Order received</p>
      <h1>Thank you, {{ submittedOrder.fullName }}.</h1>
      <p>Your demo order <strong>{{ submittedOrder.id }}</strong> has been created. Estimated delivery to {{ submittedOrder.province }} Province is {{ submittedOrder.deliveryEstimate }}.</p>
      <div class="order-confirmation__details">
        <div><span>Total</span><strong>{{ formatLKR(submittedOrder.total) }}</strong></div>
        <div><span>Payment</span><strong>{{ submittedOrder.paymentMethod }}</strong></div>
        <div><span>Status</span><strong>{{ submittedOrder.status }}</strong></div>
      </div>
      <RouterLink class="button" to="/shop">Continue shopping</RouterLink>
    </div>

    <div v-else-if="appState.cart.length" class="container checkout-layout">
      <form class="checkout-form" @submit.prevent="submitOrder">
        <section>
          <p class="eyebrow">01 · Contact</p><h2>Customer details</h2>
          <div class="form-row"><label>Full name<input v-model="form.fullName" type="text" required autocomplete="name" /></label><label>Phone<input v-model="form.phone" type="tel" required autocomplete="tel" placeholder="07X XXX XXXX" /></label></div>
          <label>Email<input v-model="form.email" type="email" required autocomplete="email" /></label>
        </section>

        <section>
          <p class="eyebrow">02 · Delivery</p><h2>Sri Lankan address</h2>
          <label>Street address<textarea v-model="form.address" required rows="3" placeholder="House number, street and area"></textarea></label>
          <div class="form-row"><label>City<input v-model="form.city" type="text" required /></label><label>Postal code<input v-model="form.postalCode" type="text" required inputmode="numeric" /></label></div>
          <label>Province<select v-model="form.province"><option v-for="province in provinces" :key="province" :value="province">{{ province }}</option></select></label>
          <label>Delivery notes<textarea v-model="form.deliveryNotes" rows="3" placeholder="Landmark, gate instructions or preferred call time"></textarea></label>
        </section>

        <section>
          <p class="eyebrow">03 · Payment</p><h2>Choose a demo payment method</h2>
          <div class="payment-options">
            <label><input v-model="form.paymentMethod" type="radio" value="Cash on delivery" /><span><strong>Cash on delivery</strong><small>Pay the courier when the order arrives.</small></span></label>
            <label><input v-model="form.paymentMethod" type="radio" value="Card payment demo" /><span><strong>Card payment demo</strong><small>No card fields or real charge are used.</small></span></label>
            <label><input v-model="form.paymentMethod" type="radio" value="Bank transfer demo" /><span><strong>Bank transfer demo</strong><small>Order is recorded without a real transfer.</small></span></label>
          </div>
          <label class="checkout-agreement"><input v-model="form.agree" type="checkbox" required /><span>I confirm this is a front-end demonstration order and no real purchase will occur.</span></label>
          <button class="button button--full" type="submit" :disabled="busy || !form.agree">{{ busy ? 'Placing order...' : `Place demo order · ${formatLKR(total)}` }}</button>
        </section>
      </form>

      <aside class="checkout-summary">
        <h2>Your order</h2>
        <div class="checkout-summary__items">
          <article v-for="item in appState.cart" :key="item.id">
            <SafeImage :src="item.image" :fallback="item.fallback" :alt="item.name" />
            <div><strong>{{ item.name }}</strong><span>{{ item.quantity }} × {{ formatLKR(item.offerPrice) }}</span></div>
            <b>{{ formatLKR(item.quantity * item.offerPrice) }}</b>
          </article>
        </div>
        <div class="checkout-summary__totals">
          <div><span>Subtotal</span><strong>{{ formatLKR(cartTotal) }}</strong></div>
          <div v-if="discount"><span>Discount</span><strong>− {{ formatLKR(discount) }}</strong></div>
          <div><span>Delivery</span><strong>{{ delivery ? formatLKR(delivery) : 'Free' }}</strong></div>
          <div><span>Total</span><strong>{{ formatLKR(total) }}</strong></div>
        </div>
        <p>{{ getDeliveryEstimate(form.province) }} to {{ form.province }} Province.</p>
      </aside>
    </div>

    <div v-else class="container empty-state empty-state--cart">
      <span>🛒</span><h2>Nothing to check out</h2><p>Add a product to your cart before opening checkout.</p><RouterLink class="button" to="/shop">Visit the shop</RouterLink>
    </div>
  </section>
</template>
