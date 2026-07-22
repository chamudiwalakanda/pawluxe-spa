<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from './components/layout/AppNavbar.vue'
import AppFooter from './components/layout/AppFooter.vue'
import ChatbotWidget from './components/common/ChatbotWidget.vue'
</script>

<template>
  <div class="app-shell">
    <AppNavbar />
    <main class="site-main">
      <RouterView />
    </main>
    <AppFooter />
    <ChatbotWidget />
  </div>
</template>
