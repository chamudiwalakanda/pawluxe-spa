<script setup>
import SafeImage from './SafeImage.vue'

defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  text: { type: String, default: '' },
  image: { type: String, default: '' },
  fallback: { type: String, default: '/images/about-dog-owner.jpg' },
  compact: { type: Boolean, default: false },
  imagePosition: { type: String, default: 'center' },
})
</script>

<template>
  <section class="page-hero" :class="{ 'page-hero--compact': compact }">
    <SafeImage
      v-if="image"
      class="page-hero__media"
      :src="image"
      :fallback="fallback"
      alt=""
      loading="eager"
      fetchpriority="high"
      :style="{ objectPosition: imagePosition }"
    />
    <div class="page-hero__overlay"></div>
    <div class="container page-hero__content">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p v-if="text">{{ text }}</p>
      <slot />
    </div>
  </section>
</template>
