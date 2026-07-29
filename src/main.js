import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeStore } from './store/appStore'
import './styles/main.css'

initializeStore()

createApp(App).use(router).mount('#app')
