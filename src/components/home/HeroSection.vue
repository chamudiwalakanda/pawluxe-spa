<script setup>
import { RouterLink } from 'vue-router'
import SafeImage from '../common/SafeImage.vue'
</script>

<template>
  <section class="hero-section">
    <SafeImage
      class="hero-section__media"
      src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=2000&q=88"
      fallback="/images/about-dog-owner.jpg"
      alt="Golden retriever outdoors"
      loading="eager"
      fetchpriority="high"
    />
    <div class="hero-section__overlay"></div>
    <div class="container hero-section__content">
      <div class="hero-section__copy">
        <p class="eyebrow">Premium dog care in Sri Lanka</p>
        <h1>Better everyday care for the dog you love.</h1>
        <p>Shop thoughtfully selected essentials in rupees, get islandwide delivery and find clear guidance for Sri Lanka’s tropical climate.</p>
        <div class="hero-section__actions">
          <RouterLink class="button" to="/shop">Shop essentials</RouterLink>
          <RouterLink class="button button--ghost" to="/health#meet-doctors">Meet doctors</RouterLink>
        </div>
        <div class="hero-section__trust">
          <span><strong>Islandwide</strong> delivery</span>
          <span><strong>Cash on delivery</strong> available</span>
          <span><strong>Vet-aware</strong> care guidance</span>
        </div>
      </div>
    </div>
  </section>
</template>
