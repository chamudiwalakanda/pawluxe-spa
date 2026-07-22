<script setup>
import { RouterLink } from 'vue-router'
import SectionHeading from '../common/SectionHeading.vue'
import SafeImage from '../common/SafeImage.vue'
</script>

<template>
  <section class="section section--dark-panel">
    <div class="container about-preview">
      <div class="about-preview__content">
        <SectionHeading
          eyebrow="About PAWLUXE"
          title="A Sri Lankan dog-care experience built around trust"
          text="PAWLUXE brings thoughtfully selected products, practical education and responsive support into one modern destination."
        />
        <p>Our catalogue is organised around real daily needs: feeding, grooming, enrichment, travel, rest and preventive care. Product information is written clearly, while health guidance always separates education from veterinary diagnosis.</p>
        <div class="about-preview__metrics">
          <div><strong>24</strong><span>Demo products</span></div>
          <div><strong>9</strong><span>Product categories</span></div>
          <div><strong>9</strong><span>Provinces served</span></div>
        </div>
        <RouterLink class="button button--light" to="/about">Discover our story</RouterLink>
      </div>
      <div class="about-preview__image">
        <SafeImage
          src="https://images.unsplash.com/photo-1601758123927-196e9d4842de?auto=format&fit=crop&w=1200&q=82"
          fallback="/images/about-dog-owner.jpg"
          alt="Pet owner spending time with a dog"
        />
      </div>
    </div>
  </section>
</template>
