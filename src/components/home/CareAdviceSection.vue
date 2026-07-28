<script setup>
import { RouterLink } from 'vue-router'
import SectionHeading from '../common/SectionHeading.vue'
import SafeImage from '../common/SafeImage.vue'
</script>

<template>
  <section class="section">
    <div class="container care-advice">
      <div class="care-advice__image">
        <SafeImage
          src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=82"
          fallback="/images/about-dog-owner.jpg"
          alt="Happy dog receiving attentive care"
        />
        <div class="care-advice__badge">
          <strong>Tropical wellness</strong>
          <span>Hydration, parasite prevention and dry skin care matter.</span>
        </div>
      </div>

      <div class="care-advice__content">
        <SectionHeading
          eyebrow="Care with confidence"
          title="Simple habits for dogs living in Sri Lanka"
          text="Good care is built around consistency, observation and timely support from qualified professionals."
        />
        <div class="care-advice__list">
          <article><span>01</span><div><h3>Exercise in cooler hours</h3><p>Prefer early mornings and evenings, and test hot ground before longer walks.</p></div></article>
          <article><span>02</span><div><h3>Check for ticks often</h3><p>Inspect ears, paws, neck and skin folds after outdoor time.</p></div></article>
          <article><span>03</span><div><h3>Dry after rain and baths</h3><p>Humid, damp coats can contribute to skin and ear problems.</p></div></article>
          <article><span>04</span><div><h3>Keep preventive care current</h3><p>Follow your clinic’s vaccine, deworming and parasite-control schedule.</p></div></article>
        </div>
        <RouterLink class="button" to="/health#meet-doctors">Meet Doctors</RouterLink>
      </div>
    </div>
  </section>
</template>
