<script setup>
import { computed, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import ThemeToggle from '../common/ThemeToggle.vue'
import { appState, cartCount, logout, wishlistCount } from '../../store/appStore'

const route = useRoute()
const router = useRouter()
const displayName = computed(() => appState.currentUser?.name?.split(' ')[0] || '')

function closeMenu() {
  appState.mobileMenuOpen = false
}

function handleLogout() {
  logout()
  closeMenu()
  router.push('/')
}

watch(
  () => route.fullPath,
  () => closeMenu(),
)

watch(
  () => appState.mobileMenuOpen,
  (open) => {
    document.body.classList.toggle('menu-open', open)
  },
)
</script>

<template>
  <header class="navbar-wrap">
    <div class="topbar">
      <div class="container topbar__inner">
        <span>Islandwide delivery across Sri Lanka</span>
        <a href="tel:+94112345678">Customer care: +94 11 234 5678</a>
      </div>
    </div>

    <nav class="navbar container" aria-label="Main navigation">
      <RouterLink class="navbar__brand" to="/" @click="closeMenu">
        <img src="/pawluxe-logo.svg" alt="PAWLUXE Sri Lanka" />
      </RouterLink>

      <button
        class="navbar__menu-button"
        type="button"
        aria-label="Toggle navigation"
        :aria-expanded="appState.mobileMenuOpen"
        aria-controls="main-navigation-panel"
        @click="appState.mobileMenuOpen = !appState.mobileMenuOpen"
      >
        <span></span><span></span><span></span>
      </button>

      <div
        id="main-navigation-panel"
        class="navbar__content"
        :class="{ 'navbar__content--open': appState.mobileMenuOpen }"
      >
        <div class="navbar__links">
          <RouterLink to="/" @click="closeMenu">Home</RouterLink>
          <RouterLink to="/health" @click="closeMenu">Health</RouterLink>
          <RouterLink to="/about" @click="closeMenu">About us</RouterLink>
          <RouterLink to="/contact" @click="closeMenu">Contact us</RouterLink>
          <RouterLink to="/shop" @click="closeMenu">Shop</RouterLink>
        </div>

        <div class="navbar__actions">
          <ThemeToggle />

          <RouterLink class="navbar__utility" to="/wishlist" aria-label="Open wishlist" @click="closeMenu">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" /></svg>
            <span class="navbar__utility-label">Wishlist</span>
            <strong v-if="wishlistCount">{{ wishlistCount }}</strong>
          </RouterLink>

          <RouterLink class="navbar__utility" to="/cart" aria-label="Open shopping cart" @click="closeMenu">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 1.9-1.4L21 8H7" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
            <span class="navbar__utility-label">Cart</span>
            <strong v-if="cartCount">{{ cartCount }}</strong>
          </RouterLink>

          <RouterLink v-if="!appState.currentUser" class="navbar__login" to="/login" @click="closeMenu">
            Login
          </RouterLink>
          <div v-else class="navbar__account">
            <RouterLink v-if="appState.currentUser.role === 'admin'" to="/admin" @click="closeMenu">Admin</RouterLink>
            <span>Hi, {{ displayName }}</span>
            <button type="button" @click="handleLogout">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <button
      v-if="appState.mobileMenuOpen"
      class="navbar-backdrop"
      type="button"
      aria-label="Close navigation"
      @click="closeMenu"
    ></button>
  </header>
</template>
