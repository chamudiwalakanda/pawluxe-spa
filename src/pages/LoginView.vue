<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SafeImage from '../components/common/SafeImage.vue'
import { authenticateUser, findUserByEmail } from '../services/authService'
import { registerUser, setCurrentUser } from '../store/appStore'
import { provinces } from '../utils/shipping'

const router = useRouter()
const route = useRoute()
const mode = ref('login')
const busy = ref(false)
const error = ref('')

const loginForm = reactive({ email: 'nimal@example.com', password: 'Pawluxe123' })
const registerForm = reactive({ name: '', email: '', password: '', phone: '', city: '', province: 'Western', dogName: '', dogBreed: '' })
const title = computed(() => (mode.value === 'login' ? 'Welcome back' : 'Create your PAWLUXE account'))
const loginReason = computed(() => {
  const reason = route.query.reason
  if (reason === 'cart') return 'Please log in to add products to your personal cart.'
  if (reason === 'wishlist') return 'Please log in to save products to your personal wishlist.'
  if (reason === 'account') return 'Please log in to open your personal cart or wishlist.'
  if (reason === 'checkout') return 'Please log in before placing an order.'
  if (reason === 'admin') return 'Administrator access requires an admin account.'
  return ''
})

function switchMode(nextMode) {
  mode.value = nextMode
  error.value = ''
}

async function handleLogin() {
  busy.value = true
  error.value = ''
  try {
    const user = await authenticateUser(loginForm.email, loginForm.password)
    if (!user) {
      error.value = 'The email or password is incorrect.'
      return
    }
    const { password, ...safeUser } = user
    setCurrentUser(safeUser)
    router.push(route.query.redirect || (safeUser.role === 'admin' ? '/admin' : '/'))
  } catch (loginError) {
    error.value = loginError.message
  } finally {
    busy.value = false
  }
}

async function handleRegister() {
  busy.value = true
  error.value = ''
  try {
    const existing = await findUserByEmail(registerForm.email)
    if (existing) {
      error.value = 'An account already uses this email address.'
      return
    }
    const newUser = registerUser({ ...registerForm })
    const { password, ...safeUser } = newUser
    setCurrentUser(safeUser)
    router.push(route.query.redirect || '/')
  } catch (registrationError) {
    error.value = registrationError.message || 'Unable to create the demo account.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <section class="auth-page">
    <div class="auth-page__image">
      <SafeImage src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1400&q=82" fallback="/images/about-dog-owner.jpg" alt="Dog account experience" loading="eager" fetchpriority="high" />
      <div class="auth-page__shade"></div>
      <div class="auth-page__image-content">
        <img src="/pawluxe-logo.svg" alt="PAWLUXE" />
        <p class="eyebrow">Sri Lankan member experience</p><h1>Care, products and support in one account.</h1><p>Save your details, use the wishlist, manage your cart and place local demonstration orders.</p>
      </div>
    </div>

    <div class="auth-page__form-wrap">
      <div class="auth-card">
        <div class="auth-tabs"><button type="button" :class="{ active: mode === 'login' }" @click="switchMode('login')">Login</button><button type="button" :class="{ active: mode === 'register' }" @click="switchMode('register')">Register</button></div>
        <p v-if="loginReason" class="auth-notice" role="status">{{ loginReason }}</p><header><p class="eyebrow">PAWLUXE account</p><h2>{{ title }}</h2><p v-if="mode === 'login'">Use a Sri Lankan demo customer or administrator account.</p><p v-else>Create a local browser-only account for the demonstration.</p></header>

        <form v-if="mode === 'login'" @submit.prevent="handleLogin">
          <label>Email<input v-model="loginForm.email" type="email" required autocomplete="email" /></label>
          <label>Password<input v-model="loginForm.password" type="password" required autocomplete="current-password" /></label>
          <button class="button button--full" type="submit" :disabled="busy">{{ busy ? 'Signing in...' : 'Login' }}</button>
        </form>

        <form v-else @submit.prevent="handleRegister">
          <label>Full name<input v-model="registerForm.name" type="text" required autocomplete="name" /></label>
          <div class="form-row"><label>Email<input v-model="registerForm.email" type="email" required autocomplete="email" /></label><label>Password<input v-model="registerForm.password" type="password" minlength="6" required autocomplete="new-password" /></label></div>
          <div class="form-row"><label>Phone<input v-model="registerForm.phone" type="tel" required placeholder="07X XXX XXXX" /></label><label>City<input v-model="registerForm.city" type="text" required /></label></div>
          <label>Province<select v-model="registerForm.province"><option v-for="province in provinces" :key="province">{{ province }}</option></select></label>
          <div class="form-row"><label>Dog name<input v-model="registerForm.dogName" type="text" /></label><label>Dog breed<input v-model="registerForm.dogBreed" type="text" /></label></div>
          <button class="button button--full" type="submit" :disabled="busy">{{ busy ? 'Creating account...' : 'Create account' }}</button>
        </form>

        <p v-if="error" class="form-error" role="alert">{{ error }}</p>
        <div v-if="mode === 'login'" class="demo-credentials">
          <div><strong>Customer</strong><span>nimal@example.com</span><span>Pawluxe123</span></div>
          <div><strong>Admin</strong><span>admin@pawluxe.lk</span><span>Admin123</span></div>
        </div>
      </div>
    </div>
  </section>
</template>
