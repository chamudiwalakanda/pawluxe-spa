<script setup>
import PageHero from '../components/common/PageHero.vue'
import SafeImage from '../components/common/SafeImage.vue'
import SectionHeading from '../components/common/SectionHeading.vue'
</script>

<template>
  <PageHero
    eyebrow="Our Sri Lankan organisation"
    title="PAWLUXE makes dependable dog care easier to navigate."
    text="We connect practical products, responsible education and responsive support in one thoughtful experience for pet parents across the island."
    image="/images/about-dog-owner.jpg"
  />

  <section class="section">
    <div class="container story-grid">
      <div>
        <SectionHeading eyebrow="Our story" title="Built for people who consider dogs family" text="PAWLUXE began with a simple idea: Sri Lankan pet owners should not have to search across many disconnected places for clear products and understandable care guidance." />
        <p>We designed a modern dog-care destination around genuine everyday needs, including nutrition, tropical-weather grooming, parasite prevention, safe exercise, rest, enrichment and travel.</p>
        <p>Our product descriptions aim to be useful rather than exaggerated. Our health content helps owners notice warning signs and prepare better questions, while always directing diagnosis and medicine decisions to veterinary professionals.</p>
      </div>
      <SafeImage src="/images/about-dog-owner.jpg" fallback="/images/about-dog-owner.jpg" alt="Dog owner enjoying time with a dog" />
    </div>
  </section>

  <section class="section section--muted">
    <div class="container">
      <SectionHeading eyebrow="What guides us" title="Professional standards with a human touch" text="Four commitments influence every product, service and piece of guidance in this demonstration brand." centered />
      <div class="value-grid">
        <article><span>01</span><h3>Local relevance</h3><p>We consider heat, humidity, monsoon weather, islandwide delivery and the way Sri Lankan households care for pets.</p></article>
        <article><span>02</span><h3>Responsible guidance</h3><p>We separate everyday education from diagnosis and direct urgent concerns to veterinary professionals.</p></article>
        <article><span>03</span><h3>Transparent shopping</h3><p>Prices in rupees, stock visibility, delivery estimates and practical descriptions make decisions easier.</p></article>
        <article><span>04</span><h3>Long-term wellbeing</h3><p>We favour routines and products that support sustained comfort, safety, health and connection.</p></article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container mission-panel">
      <div><p class="eyebrow">Our mission</p><h2>Help dogs across Sri Lanka live with greater comfort, health and joy.</h2></div>
      <div class="mission-panel__details"><p>We pursue this through thoughtful product curation, accessible education, responsive customer support and clear pathways to veterinary help.</p><RouterLink class="button" to="/contact">Talk to our team</RouterLink></div>
    </div>
  </section>

  <section class="section section--dark-panel">
    <div class="container impact-grid">
      <article><strong>9</strong><span>Provinces included in delivery calculation</span></article>
      <article><strong>24</strong><span>Fully detailed demonstration products</span></article>
      <article><strong>8</strong><span>Common health conditions explained</span></article>
      <article><strong>4</strong><span>Fictional veterinary contact profiles</span></article>
    </div>
  </section>
</template>
