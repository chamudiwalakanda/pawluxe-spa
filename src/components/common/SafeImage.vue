<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  fallback: { type: String, default: '/images/about-dog-owner.jpg' },
  alt: { type: String, default: '' },
  loading: { type: String, default: 'lazy' },
  fetchpriority: { type: String, default: 'auto' },
})

const failed = ref(false)

watch(
  () => props.src,
  () => {
    failed.value = false
  },
)

function useFallback(event) {
  if (failed.value) return
  failed.value = true
  event.currentTarget.src = props.fallback
}
</script>

<template>
  <img
    :src="failed || !src ? fallback : src"
    :alt="alt"
    :loading="loading"
    :fetchpriority="fetchpriority"
    decoding="async"
    @error="useFallback"
  />
</template>
