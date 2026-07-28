<script setup>
import PageHero from '../components/common/PageHero.vue'
import SafeImage from '../components/common/SafeImage.vue'
import SectionHeading from '../components/common/SectionHeading.vue'
import { doctors } from '../data/doctors'
import { everydayCare, illnesses, medicineSafety } from '../data/health'
</script>

<template>
  <PageHero
    eyebrow="Dog health in a tropical climate"
    title="Clear guidance for more confident care."
    text="Learn about everyday routines, common warning signs and situations that need professional veterinary support in Sri Lanka."
    image="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=2000&q=82"
  />

  <section class="section">
    <div class="container">
      <SectionHeading eyebrow="Daily care" title="A practical foundation for wellbeing" text="Use these areas to build a routine suited to warm weather, monsoon conditions and everyday life in Sri Lanka." centered />
      <div class="care-grid care-grid--six">
        <article v-for="item in everydayCare" :key="item.title" class="care-card">
          <span>{{ item.icon }}</span><h3>{{ item.title }}</h3><p>{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--muted">
    <div class="container">
      <SectionHeading eyebrow="Common conditions" title="Know the signs, then seek the right help" text="These summaries are educational. A veterinarian should diagnose illness and select medicine." />
      <div class="illness-grid">
        <article v-for="illness in illnesses" :key="illness.name" class="illness-card">
          <div class="illness-card__title"><span>+</span><div><h3>{{ illness.name }}</h3><small>{{ illness.urgency }}</small></div></div>
          <p>{{ illness.summary }}</p>
          <div><strong>Common signs</strong><ul><li v-for="sign in illness.signs" :key="sign">{{ sign }}</li></ul></div>
          <div><strong>Care guidance</strong><p>{{ illness.care }}</p></div>
          <div class="illness-card__medicine"><strong>Medicine note</strong><p>{{ illness.medicine }}</p></div>
        </article>
      </div>
      <div class="medical-alert"><strong>Emergency warning</strong><p>Seek urgent veterinary care for breathing difficulty, collapse, seizures, repeated vomiting, severe bleeding, suspected poisoning, snake bite, heatstroke signs or a swollen abdomen.</p></div>
    </div>
  </section>

  <section class="section medicine-safety">
    <div class="container">
      <SectionHeading eyebrow="Medicine safety" title="Common categories, important limits" text="Medication choice and dose depend on the dog’s weight, age, diagnosis and health history. Never guess a dose." centered />
      <div class="medicine-grid">
        <article v-for="item in medicineSafety" :key="item.title"><span>✓</span><h3>{{ item.title }}</h3><p>{{ item.text }}</p></article>
      </div>
      <p class="medicine-safety__note"><strong>Never give human painkillers on your own.</strong> Paracetamol, ibuprofen and other common medicines can be dangerous to dogs.</p>
    </div>
  </section>

  <section id="meet-doctors" class="section section--muted doctors-section">
    <div class="container">
      <SectionHeading eyebrow="Meet doctors" title="Demo veterinary profiles across Sri Lanka" text="These profiles and contact details are fictional and included to demonstrate a complete appointment-contact interface." centered />
      <div class="doctor-grid">
        <article v-for="doctor in doctors" :key="doctor.id" class="doctor-card">
          <SafeImage :src="doctor.image" :fallback="doctor.fallback" :alt="doctor.name" />
          <div class="doctor-card__body">
            <span>{{ doctor.role }}</span><h3>{{ doctor.name }}</h3><p>{{ doctor.qualifications }}</p>
            <div class="doctor-card__specialties"><small v-for="specialty in doctor.specialties" :key="specialty">{{ specialty }}</small></div>
            <dl>
              <div><dt>Clinic</dt><dd>{{ doctor.location }}</dd></div>
              <div><dt>Availability</dt><dd>{{ doctor.availability }}</dd></div>
              <div><dt>Phone</dt><dd><a :href="`tel:${doctor.phone}`">{{ doctor.phone }}</a></dd></div>
              <div><dt>Email</dt><dd><a :href="`mailto:${doctor.email}`">{{ doctor.email }}</a></dd></div>
            </dl>
            <div class="doctor-card__actions">
              <a class="button button--small" :href="`tel:${doctor.phone}`">Call clinic</a>
              <a class="button button--small button--surface" :href="`https://wa.me/${doctor.whatsapp.replace(/\D/g, '')}`" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
