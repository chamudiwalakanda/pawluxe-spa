<script setup>
defineProps({
  rating: { type: Number, required: true },
  reviews: { type: Number, default: 0 },
})
</script>

<template>
  <div class="rating" :aria-label="`${rating} out of 5 stars from ${reviews} reviews`">
    <span class="rating__star" aria-hidden="true">★</span>
    <strong>{{ rating.toFixed(1) }}</strong>
    <span class="rating__reviews">({{ reviews }})</span>
  </div>
</template>

