<template>
  <div class="not-found">
    <div class="container not-found__inner">
      <div class="not-found__code" aria-hidden="true">404</div>
      <h1 class="not-found__title">Page Not Found</h1>
      <p class="not-found__body">
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>
      <div class="not-found__actions">
        <RouterLink to="/" class="btn btn--primary btn--lg">Go to Homepage</RouterLink>
        <RouterLink to="/products" class="btn btn--outline btn--lg">Browse Products</RouterLink>
        <RouterLink to="/contact" class="btn btn--outline btn--lg">Contact Us</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@/composables/useHead'
useHead({ title: '404 — Page Not Found | CPP India' })
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 80vh;
  @include flex(center, center);
  text-align: center;
  padding-block: var(--space-24);

  &__inner {
    max-width: 560px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-5);
  }

  &__code {
    font-family: var(--font-secondary);
    font-size: clamp(5rem, 15vw, 10rem);
    font-weight: var(--weight-extrabold);
    line-height: 1;
    letter-spacing: -0.05em;
    @include text-gradient($color-secondary, $color-accent);
  }

  &__title {
    font-size: var(--text-3xl);
    font-family: var(--font-secondary);
    font-weight: var(--weight-bold);
    color: var(--color-text);
  }

  &__body {
    font-size: var(--text-lg);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
  }

  &__actions {
    @include flex(center, center, var(--space-3));
    flex-wrap: wrap;
    margin-top: var(--space-4);
  }
}
</style>
