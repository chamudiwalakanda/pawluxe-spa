<script setup>
import { computed, onMounted, ref } from 'vue'
import { fetchAllUsers } from '../services/authService'
import { appState, getContactMessages, getOrders, updateMessageStatus, updateOrderStatus } from '../store/appStore'
import { formatDate, formatLKR } from '../utils/formatters'

const users = ref([])
const orders = ref([])
const messages = ref([])
const loading = ref(true)
const error = ref('')
const search = ref('')
const activeTab = ref('users')

const filteredUsers = computed(() => {
  const term = search.value.toLowerCase()
  return users.value.filter((user) => `${user.name} ${user.email} ${user.city} ${user.province} ${user.dogName} ${user.dogBreed} ${user.role}`.toLowerCase().includes(term))
})

const filteredOrders = computed(() => {
  const term = search.value.toLowerCase()
  return orders.value.filter((order) => `${order.id} ${order.fullName} ${order.email} ${order.city} ${order.province} ${order.status}`.toLowerCase().includes(term))
})

const filteredMessages = computed(() => {
  const term = search.value.toLowerCase()
  return messages.value.filter((message) => `${message.id} ${message.name} ${message.email} ${message.subject} ${message.province} ${message.status}`.toLowerCase().includes(term))
})

const customerCount = computed(() => users.value.filter((user) => user.role === 'customer').length)
const dogCount = computed(() => users.value.filter((user) => user.dogName).length)
const revenue = computed(() => orders.value.reduce((total, order) => total + Number(order.total || 0), 0))
const newMessages = computed(() => messages.value.filter((message) => message.status === 'New').length)

onMounted(async () => {
  try {
    users.value = await fetchAllUsers()
    orders.value = getOrders()
    messages.value = getContactMessages()
  } catch (loadError) {
    error.value = loadError.message
  } finally {
    loading.value = false
  }
})

function setTab(tab) {
  activeTab.value = tab
  search.value = ''
}

function changeOrderStatus(orderId, status) {
  if (updateOrderStatus(orderId, status)) orders.value = getOrders()
}

function toggleMessage(message) {
  const nextStatus = message.status === 'New' ? 'Read' : 'New'
  if (updateMessageStatus(message.id, nextStatus)) messages.value = getContactMessages()
}

function downloadCsv() {
  let rows = []
  let filename = 'pawluxe-data.csv'

  if (activeTab.value === 'users') {
    rows = [['Name', 'Email', 'Role', 'Phone', 'City', 'Province', 'Dog name', 'Dog breed'], ...filteredUsers.value.map((user) => [user.name, user.email, user.role, user.phone, user.city, user.province, user.dogName, user.dogBreed])]
    filename = 'pawluxe-users.csv'
  } else if (activeTab.value === 'orders') {
    rows = [['Order', 'Date', 'Customer', 'Province', 'Payment', 'Status', 'Total'], ...filteredOrders.value.map((order) => [order.id, order.createdAt, order.fullName, order.province, order.paymentMethod, order.status, order.total])]
    filename = 'pawluxe-orders.csv'
  } else {
    rows = [['Message', 'Date', 'Name', 'Email', 'Subject', 'Province', 'Status', 'Message'], ...filteredMessages.value.map((message) => [message.id, message.createdAt, message.name, message.email, message.subject, message.province, message.status, message.message])]
    filename = 'pawluxe-messages.csv'
  }

  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <section class="admin-page">
    <div class="container">
      <header class="admin-header">
        <div><p class="eyebrow">PAWLUXE administration</p><h1>Store dashboard</h1><p>Signed in as {{ appState.currentUser?.email }}. User data comes from dummy.json and local registrations; orders and messages are stored in this browser.</p></div>
        <span class="admin-header__status">Admin access</span>
      </header>

      <div class="admin-metrics">
        <article><span>Customers</span><strong>{{ customerCount }}</strong><small>Registered accounts</small></article>
        <article><span>Dog profiles</span><strong>{{ dogCount }}</strong><small>Profiles with dog details</small></article>
        <article><span>Demo orders</span><strong>{{ orders.length }}</strong><small>{{ formatLKR(revenue) }} recorded</small></article>
        <article><span>New messages</span><strong>{{ newMessages }}</strong><small>Require review</small></article>
      </div>

      <div class="admin-tabs" role="tablist" aria-label="Admin data sections">
        <button type="button" :class="{ active: activeTab === 'users' }" @click="setTab('users')">Users <span>{{ users.length }}</span></button>
        <button type="button" :class="{ active: activeTab === 'orders' }" @click="setTab('orders')">Orders <span>{{ orders.length }}</span></button>
        <button type="button" :class="{ active: activeTab === 'messages' }" @click="setTab('messages')">Messages <span>{{ messages.length }}</span></button>
      </div>

      <section class="admin-table-card">
        <div class="admin-table-card__header">
          <div><h2>{{ activeTab === 'users' ? 'Registered users' : activeTab === 'orders' ? 'Demo orders' : 'Contact messages' }}</h2><p>Search, review and export the active data set.</p></div>
          <div class="admin-table-card__actions"><input v-model="search" type="search" :placeholder="`Search ${activeTab}`" :aria-label="`Search ${activeTab}`" /><button class="button button--small button--surface" type="button" @click="downloadCsv">Export CSV</button></div>
        </div>

        <p v-if="loading" class="admin-message">Loading dashboard records...</p>
        <p v-else-if="error" class="form-error">{{ error }}</p>

        <div v-else-if="activeTab === 'users'" class="table-scroll">
          <table><thead><tr><th>User</th><th>Role</th><th>Phone</th><th>Location</th><th>Dog profile</th><th>Joined</th></tr></thead>
            <tbody><tr v-for="user in filteredUsers" :key="user.id"><td><strong>{{ user.name }}</strong><span>{{ user.email }}</span></td><td><span class="role-pill" :class="`role-pill--${user.role}`">{{ user.role }}</span></td><td>{{ user.phone || 'Not provided' }}</td><td><strong>{{ user.city || 'Not provided' }}</strong><span>{{ user.province || '' }}</span></td><td><strong>{{ user.dogName || 'Not provided' }}</strong><span>{{ user.dogBreed || '' }}</span></td><td>{{ formatDate(user.joinedAt) }}</td></tr></tbody>
          </table>
          <p v-if="!filteredUsers.length" class="admin-message">No users match the search.</p>
        </div>

        <div v-else-if="activeTab === 'orders'" class="table-scroll">
          <table><thead><tr><th>Order</th><th>Customer</th><th>Delivery</th><th>Items</th><th>Payment</th><th>Total</th><th>Status</th></tr></thead>
            <tbody><tr v-for="order in filteredOrders" :key="order.id"><td><strong>{{ order.id }}</strong><span>{{ formatDate(order.createdAt) }}</span></td><td><strong>{{ order.fullName }}</strong><span>{{ order.email }}</span></td><td><strong>{{ order.city }}</strong><span>{{ order.province }}</span></td><td>{{ order.items.reduce((sum, item) => sum + item.quantity, 0) }}</td><td>{{ order.paymentMethod }}</td><td><strong>{{ formatLKR(order.total) }}</strong></td><td><select :value="order.status" @change="changeOrderStatus(order.id, $event.target.value)"><option>Processing</option><option>Packed</option><option>Dispatched</option><option>Delivered</option><option>Cancelled</option></select></td></tr></tbody>
          </table>
          <p v-if="!filteredOrders.length" class="admin-message">No demo orders have been placed yet.</p>
        </div>

        <div v-else class="admin-message-list">
          <article v-for="message in filteredMessages" :key="message.id" :class="{ 'admin-message-list__item--new': message.status === 'New' }">
            <header><div><span>{{ message.subject }}</span><h3>{{ message.name }}</h3><p>{{ message.email }} · {{ message.phone }} · {{ message.province }}</p></div><div><small>{{ formatDate(message.createdAt) }}</small><button type="button" @click="toggleMessage(message)">{{ message.status === 'New' ? 'Mark read' : 'Mark new' }}</button></div></header>
            <p>{{ message.message }}</p>
          </article>
          <p v-if="!filteredMessages.length" class="admin-message">No contact messages have been recorded yet.</p>
        </div>
      </section>
    </div>
  </section>
</template>
