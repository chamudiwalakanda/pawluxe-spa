
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/HomeView.vue'
import Shop from '../pages/ShopView.vue/index.js'
import Health from '../pages/HealthView.vue/index.js'
import Login from '../pages/LoginView.vue/index.js'
import ProductDetail from '../pages/ProductDetailView.vue/index.js'

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/health', component: Health },
  { path: '/login', component: Login },
  { path: '/product/:id', component: ProductDetail }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})