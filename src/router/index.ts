
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Shop from '../pages/Shop.vue'
import Health from '../pages/Health.vue'
import Login from '../pages/Login.vue'
import ProductDetail from '../pages/ProductDetail.vue'

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