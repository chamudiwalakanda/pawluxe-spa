<script setup>
import { reactive, ref } from 'vue'
import PageHero from '../components/common/PageHero.vue'
import SafeImage from '../components/common/SafeImage.vue'
import SectionHeading from '../components/common/SectionHeading.vue'
import { saveContactMessage } from '../store/appStore.js'
import { provinces } from '../utils/shipping'

const submitted = ref(false)
const reference = ref('')
const form = reactive({ name: '', email: '', phone: '', province: 'Western', subject: 'Product question', message: '' })

function submitForm() {
  const record = saveContactMessage({ ...form })
  reference.value = record.id
  submitted.value = true
  Object.assign(form, { name: '', email: '', phone: '', province: 'Western', subject: 'Product question', message: '' })
}
</script>

<template>
  <PageHero
    eyebrow="Contact PAWLUXE Sri Lanka"
    title="Friendly support for products, orders and care services."
    text="Send a message, call or use WhatsApp and our demo team will direct your question to the right place."
    image="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=2000&q=82"
  />

  <section class="section">
    <div class="container contact-layout">
      <div class="contact-details">
        <SectionHeading eyebrow="Speak with us" title="We are ready to help" text="Use the contact details below or record a message through the fully functional local demo form." />
        <div class="contact-cards">
          <article><span>Call</span><a href="tel:+94112345678">+94 11 234 5678</a><p>Monday to Saturday, 8.30 AM to 7.00 PM</p></article>
          <article><span>WhatsApp</span><a href="https://wa.me/94771234567" target="_blank" rel="noreferrer">+94 77 123 4567</a><p>Product and delivery support</p></article>
          <article><span>Email</span><a href="mailto:hello@pawluxe.lk">hello@pawluxe.lk</a><p>General enquiries and partnerships</p></article>
          <article><span>Visit</span><strong>32 Galle Road, Colombo 03</strong><p>Demo office address, Sri Lanka</p></article>
        </div>
        <div class="contact-image"><SafeImage src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1100&q=82" fallback="/images/about-dog-owner.jpg" alt="Two dogs outdoors" /></div>
      </div>

      <form class="contact-form" @submit.prevent="submitForm">
        <h2>Send a message</h2><p>Your message is saved in this browser and becomes visible in the admin dashboard.</p>
        <label>Full name<input v-model="form.name" type="text" required placeholder="Your name" /></label>
        <div class="form-row"><label>Email<input v-model="form.email" type="email" required placeholder="name@example.com" /></label><label>Phone<input v-model="form.phone" type="tel" required placeholder="07X XXX XXXX" /></label></div>
        <div class="form-row"><label>Province<select v-model="form.province"><option v-for="province in provinces" :key="province">{{ province }}</option></select></label><label>Subject<select v-model="form.subject"><option>Product question</option><option>Order support</option><option>Doctor appointment</option><option>Delivery question</option><option>Partnership enquiry</option></select></label></div>
        <label>Message<textarea v-model="form.message" required rows="7" placeholder="Tell us how we can help"></textarea></label>
        <button class="button button--full" type="submit">Record message</button>
        <p v-if="submitted" class="form-success" role="status">Thank you. Message {{ reference }} has been saved for the demo admin team.</p>
      </form>
    </div>
  </section>
</template>
