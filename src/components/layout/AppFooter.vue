<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('')
const subscribed = ref(false)

function subscribe() {
  const subscriptions = JSON.parse(localStorage.getItem('pawluxe_newsletter_v2') || '[]')
  if (!subscriptions.includes(email.value.toLowerCase())) subscriptions.push(email.value.toLowerCase())
  localStorage.setItem('pawluxe_newsletter_v2', JSON.stringify(subscriptions))
  subscribed.value = true
  email.value = ''
}
</script>

<template>
  <footer class="footer">
    <div class="container footer__newsletter">
      <div>
        <p class="eyebrow">The PAWLUXE note</p>
        <h2>Care tips and Sri Lanka offers, occasionally.</h2>
      </div>
      <form @submit.prevent="subscribe">
        <input v-model="email" type="email" required placeholder="Your email address" aria-label="Newsletter email" />
        <button class="button" type="submit">Subscribe</button>
      </form>
      <p v-if="subscribed" class="form-success" role="status">You are subscribed to the demo newsletter.</p>
    </div>

    <div class="container footer__grid">
      <div class="footer__brand">
        <img src="/pawluxe-logo.svg" alt="PAWLUXE Sri Lanka" />
        <p>Thoughtful products, practical dog-care guidance and friendly support for pet parents across Sri Lanka.</p>
        <div class="footer__socials" aria-label="Social media links">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">YT</a>
        </div>
      </div>

      <div>
        <h3>Quick links</h3>
        <div class="footer__links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/shop">Shop</RouterLink>
          <RouterLink to="/health">Health</RouterLink>
          <RouterLink to="/about">About us</RouterLink>
        </div>
      </div>

      <div>
        <h3>Customer care</h3>
        <div class="footer__links">
          <RouterLink to="/contact">Contact us</RouterLink>
          <RouterLink to="/cart">Your cart</RouterLink>
          <RouterLink to="/wishlist">Wishlist</RouterLink>
          <RouterLink to="/login">Account</RouterLink>
        </div>
      </div>

      <div>
        <h3>Contact us</h3>
        <address class="footer__contact">
          <span>32 Galle Road, Colombo 03, Sri Lanka</span>
          <a href="tel:+94112345678">+94 11 234 5678</a>
          <a href="https://wa.me/94771234567" target="_blank" rel="noreferrer">WhatsApp +94 77 123 4567</a>
          <a href="mailto:hello@pawluxe.lk">hello@pawluxe.lk</a>
          <span>Monday to Saturday, 8.30 AM to 7.00 PM</span>
        </address>
      </div>
    </div>

    <div class="container footer__bottom">
      <span>© {{ new Date().getFullYear() }} PAWLUXE Sri Lanka. Front-end demo.</span>
      <span>Care information is educational and does not replace veterinary diagnosis.</span>
    </div>
  </footer>
</template>
