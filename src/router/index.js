import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from '../views/ShopView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import WishlistView from '../views/WishlistView.vue'
import HealthView from '../views/HealthView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import AdminView from '../views/AdminView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { appState } from '../store/appStore'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 112 }
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/shop', name: 'shop', component: ShopView },
    { path: '/product/:id', name: 'product', component: ProductDetailView },
    { path: '/wishlist', name: 'wishlist', component: WishlistView, meta: { requiresAuth: true } },
    { path: '/health', name: 'health', component: HealthView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/contact', name: 'contact', component: ContactView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/cart', name: 'cart', component: CartView, meta: { requiresAuth: true } },
    { path: '/checkout', name: 'checkout', component: CheckoutView, meta: { requiresAuth: true } },
    { path: '/admin', name: 'admin', component: AdminView, meta: { requiresAdmin: true } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAdmin && appState.currentUser?.role !== 'admin') {
    return { name: 'login', query: { redirect: to.fullPath, reason: 'admin' } }
  }

  if (to.meta.requiresAuth && !appState.currentUser) {
    const reason = to.name === 'cart' ? 'cart' : to.name === 'wishlist' ? 'wishlist' : 'checkout'
    return { name: 'login', query: { redirect: to.fullPath, reason } }
  }
})

export default router
