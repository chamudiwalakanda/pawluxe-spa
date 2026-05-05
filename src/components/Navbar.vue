<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import logo from '../assets/images/PawluxeLogo.png'

const router = useRouter()
const dark = ref(false)

onMounted(() => {
  dark.value = localStorage.getItem('theme') === 'dark'
  document.documentElement.classList.toggle('dark', dark.value)
})

const toggleDark = () => {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
  localStorage.setItem('theme', dark.value ? 'dark' : 'light')
}
</script>

<template>
  
  <nav class="sticky top-0 z-50 flex justify-between items-center px-6 py-1 bg-black text-white shadow-md">
    <!-- LOGO -->
    <img 
      :src="logo"
      class="h-24 object-contain cursor-pointer hover:scale-110 transition duration-300"
      @click="router.push('/')"
    />

    <!-- RIGHT SIDE -->
    <div class="flex items-center gap-8">

      <!-- NAV LINKS -->
      <ul class="flex gap-8 font-medium">
        <li @click="router.push('/')" class="cursor-pointer hover:text-primary transition">Home</li>
        <li @click="router.push('/shop')" class="cursor-pointer hover:text-primary transition">Shop</li>
        <li @click="router.push('/health')" class="cursor-pointer hover:text-primary transition">Health</li>
        <li @click="router.push('/login')" class="cursor-pointer hover:text-primary transition">Login</li>
      </ul>

      <!-- SEARCH BAR -->
      <div class="flex items-center bg-gray-800 rounded-full px-4 py-1">
  <input 
    v-model="search"
    type="text"
    placeholder="Search..."
    class="bg-transparent outline-none text-sm px-2 text-white placeholder-gray-400"
  />
  <button @click="handleSearch" class="text-sm hover:text-primary">
    🔍
  </button>
</div>

      <!-- DARK MODE BUTTON -->
      <button 
        @click="toggleDark"
        class="ml-4 px-3 py-1 border rounded dark:border-gray-500"
      >
        {{ dark ? '☀️' : '🌙' }}
      </button>
    </div>

  </nav>
</template>