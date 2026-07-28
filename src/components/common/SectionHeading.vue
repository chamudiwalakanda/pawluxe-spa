<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  text: { type: String, default: '' },
  centered: { type: Boolean, default: false },
})
</script>

<template>
  <header class="section-heading" :class="{ 'section-heading--centered': centered }">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="text" class="section-heading__text">{{ text }}</p>
  </header>
</template>
