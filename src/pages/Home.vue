import { ref, onMounted } from 'vue'
import type { Product } from '../types/product'

const products = ref<Product[]>([])
const loading = ref(true)

onMounted(async () => {
  const res = await fetch('[dummyjson.com](https://dummyjson.com/products)')
  const data = await res.json()
  products.value = data.products
  loading.value = false
})
