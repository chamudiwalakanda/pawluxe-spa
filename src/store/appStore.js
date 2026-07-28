import { computed, reactive } from 'vue'

const KEYS = {
  user: 'pawluxe_current_user_v3',
  registeredUsers: 'pawluxe_registered_users_v2',
  theme: 'pawluxe_theme',
  orders: 'pawluxe_orders_v2',
  messages: 'pawluxe_messages_v2',
}

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function accountKey(type, user = appState.currentUser) {
  if (!user) return null
  const identity = String(user.id || user.email || '').trim().toLowerCase()
  if (!identity) return null
  return `pawluxe_${type}_v3_${encodeURIComponent(identity)}`
}

function loadAccountCollections(user = appState.currentUser) {
  const cartKey = accountKey('cart', user)
  const wishlistKey = accountKey('wishlist', user)

  if (!cartKey || !wishlistKey) {
    appState.cart = []
    appState.wishlist = []
    return
  }

  const cart = readStorage(cartKey, [])
  const wishlist = readStorage(wishlistKey, [])
  appState.cart = Array.isArray(cart) ? cart : []
  appState.wishlist = Array.isArray(wishlist) ? wishlist : []
}

function saveCart() {
  const key = accountKey('cart')
  if (key) writeStorage(key, appState.cart)
}

function saveWishlist() {
  const key = accountKey('wishlist')
  if (key) writeStorage(key, appState.wishlist)
}

export const appState = reactive({
  cart: [],
  wishlist: [],
  currentUser: null,
  theme: 'dark',
  mobileMenuOpen: false,
  initialized: false,
})

export const cartCount = computed(() =>
  appState.cart.reduce((total, item) => total + item.quantity, 0),
)

export const cartTotal = computed(() =>
  appState.cart.reduce((total, item) => total + item.offerPrice * item.quantity, 0),
)

export const wishlistCount = computed(() => appState.wishlist.length)
export const isAuthenticated = computed(() => Boolean(appState.currentUser))

export function initializeStore() {
  if (appState.initialized) return

  appState.currentUser = readStorage(KEYS.user, readStorage('pawluxe_current_user_v2', null))
  loadAccountCollections(appState.currentUser)
  setTheme(localStorage.getItem(KEYS.theme) || 'dark')
  appState.initialized = true
}

export function setTheme(theme) {
  appState.theme = theme === 'light' ? 'light' : 'dark'
  document.documentElement.dataset.theme = appState.theme
  localStorage.setItem(KEYS.theme, appState.theme)
}

export function toggleTheme() {
  setTheme(appState.theme === 'dark' ? 'light' : 'dark')
}

export function addToCart(product, quantity = 1) {
  if (!appState.currentUser) return false

  const requestedQuantity = Math.max(1, Number(quantity) || 1)
  const existing = appState.cart.find((item) => item.id === product.id)

  if (existing) {
    existing.quantity = Math.min(product.stock || 99, existing.quantity + requestedQuantity)
  } else {
    appState.cart.push({ ...product, quantity: Math.min(product.stock || 99, requestedQuantity) })
  }

  saveCart()
  return true
}

export function updateCartQuantity(productId, quantity) {
  if (!appState.currentUser) return false
  const item = appState.cart.find((entry) => entry.id === productId)
  if (!item) return false

  const nextQuantity = Math.max(1, Number(quantity) || 1)
  item.quantity = Math.min(item.stock || 99, nextQuantity)
  saveCart()
  return true
}

export function removeFromCart(productId) {
  if (!appState.currentUser) return false
  appState.cart = appState.cart.filter((item) => item.id !== productId)
  saveCart()
  return true
}

export function clearCart() {
  appState.cart = []
  saveCart()
}

export function isWishlisted(productId) {
  return appState.currentUser ? appState.wishlist.includes(productId) : false
}

export function toggleWishlist(productId) {
  if (!appState.currentUser) return false

  if (isWishlisted(productId)) {
    appState.wishlist = appState.wishlist.filter((id) => id !== productId)
  } else {
    appState.wishlist.push(productId)
  }
  saveWishlist()
  return true
}

export function setCurrentUser(user) {
  appState.currentUser = user
  if (user) writeStorage(KEYS.user, user)
  else localStorage.removeItem(KEYS.user)
  loadAccountCollections(user)
}

export function logout() {
  setCurrentUser(null)
}

export function getRegisteredUsers() {
  const users = readStorage(KEYS.registeredUsers, [])
  return Array.isArray(users) ? users : []
}

export function registerUser(user) {
  const users = getRegisteredUsers()
  const newUser = {
    id: `local-${Date.now()}`,
    role: 'customer',
    joinedAt: new Date().toISOString(),
    ...user,
  }
  users.push(newUser)
  writeStorage(KEYS.registeredUsers, users)
  return newUser
}

export function getOrders() {
  const orders = readStorage(KEYS.orders, [])
  return Array.isArray(orders) ? orders : []
}

export function placeOrder(orderDetails) {
  if (!appState.currentUser || !appState.cart.length) return null

  const orders = getOrders()
  const order = {
    id: `PLX${Date.now().toString().slice(-8)}`,
    createdAt: new Date().toISOString(),
    status: 'Processing',
    customerId: appState.currentUser.id || appState.currentUser.email,
    customerEmail: appState.currentUser.email,
    items: appState.cart.map((item) => ({ ...item })),
    ...orderDetails,
  }
  orders.unshift(order)
  writeStorage(KEYS.orders, orders)
  clearCart()
  return order
}

export function updateOrderStatus(orderId, status) {
  const orders = getOrders()
  const order = orders.find((item) => item.id === orderId)
  if (!order) return false
  order.status = status
  writeStorage(KEYS.orders, orders)
  return true
}

export function getContactMessages() {
  const messages = readStorage(KEYS.messages, [])
  return Array.isArray(messages) ? messages : []
}

export function saveContactMessage(message) {
  const messages = getContactMessages()
  const record = {
    id: `MSG${Date.now().toString().slice(-8)}`,
    createdAt: new Date().toISOString(),
    status: 'New',
    ...message,
  }
  messages.unshift(record)
  writeStorage(KEYS.messages, messages)
  return record
}

export function updateMessageStatus(messageId, status) {
  const messages = getContactMessages()
  const message = messages.find((item) => item.id === messageId)
  if (!message) return false
  message.status = status
  writeStorage(KEYS.messages, messages)
  return true
}
