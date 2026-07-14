<template>
  <div class="min-h-[80vh] flex items-center justify-center text-center py-24">
    <div class="container max-w-[560px] flex flex-col items-center gap-5">
      <div
        aria-hidden="true"
        class="font-display text-[clamp(5rem,15vw,10rem)] font-extrabold leading-none tracking-[-0.05em] text-gradient-brand"
      >
        404
      </div>
      <h1 class="font-display text-3xl font-bold text-ink">Page Not Found</h1>
      <p class="text-lg text-ink-2 leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>
      <div class="flex items-center justify-center flex-wrap gap-3 mt-4">
        <RouterLink to="/" class="btn btn--primary btn--lg">Go to Homepage</RouterLink>
        <RouterLink to="/tech-talks" class="btn btn--outline btn--lg">Watch Talks</RouterLink>
        <RouterLink to="/contact" class="btn btn--outline btn--lg">Contact Us</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@/composables/useHead'
useHead({ title: '404 — Page Not Found | CppIndia' })
</script>
