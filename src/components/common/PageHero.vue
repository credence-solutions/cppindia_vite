<template>
  <section class="page-hero" :style="bgStyle" :aria-label="`${title} page hero`">
    <div class="page-hero__overlay" aria-hidden="true" />
    <div class="container page-hero__inner">
      <!-- Breadcrumb -->
      <nav v-if="breadcrumb?.length" class="page-hero__breadcrumb" aria-label="Breadcrumb">
        <ol class="page-hero__crumbs" role="list">
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li v-for="crumb in breadcrumb" :key="crumb.path">
            <span class="page-hero__crumb-sep" aria-hidden="true">/</span>
            <RouterLink v-if="crumb.path" :to="crumb.path">{{ crumb.label }}</RouterLink>
            <span v-else>{{ crumb.label }}</span>
          </li>
        </ol>
      </nav>

      <!-- Content -->
      <div class="page-hero__content">
        <p v-if="overline" class="overline page-hero__overline">{{ overline }}</p>
        <h1 class="page-hero__title">{{ title }}</h1>
        <p v-if="subtitle" class="page-hero__subtitle">{{ subtitle }}</p>
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title:      { type: String, required: true },
  overline:   { type: String, default: '' },
  subtitle:   { type: String, default: '' },
  image:      { type: String, default: '' },
  breadcrumb: { type: Array, default: () => [] },
})

const bgStyle = computed(() => ({
  backgroundImage: props.image
    ? `url(${props.image})`
    : 'linear-gradient(135deg, #060B1A 0%, #0D1A35 60%, #061020 100%)',
}))
</script>

<style lang="scss" scoped>
.page-hero {
  position: relative;
  padding-block: var(--space-20) var(--space-16);
  background-size: cover;
  background-position: center;
  overflow: hidden;

  &__overlay {
    @include overlay;
    background: linear-gradient(135deg, rgba(6,9,15,0.75) 0%, rgba(13,26,53,0.65) 100%);
  }

  &__inner {
    position: relative;
    z-index: 1;
  }

  &__breadcrumb { margin-bottom: var(--space-6); }

  &__crumbs {
    @include flex(center, flex-start, var(--space-2));
    flex-wrap: wrap;
    font-size: var(--text-xs);
    color: rgba(255,255,255,0.5);

    a {
      color: rgba(255,255,255,0.65);
      transition: color var(--transition-fast);
      &:hover { color: white; }
    }
  }

  &__crumb-sep { color: rgba(255,255,255,0.3); }

  &__overline { color: rgba(255,255,255,0.65) !important; }

  &__title {
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-family: var(--font-secondary);
    font-weight: var(--weight-extrabold);
    color: white;
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
    max-width: 720px;
    margin-bottom: var(--space-4);
  }

  &__subtitle {
    font-size: var(--text-lg);
    color: rgba(255,255,255,0.7);
    max-width: 560px;
    line-height: var(--leading-relaxed);
  }
}
</style>
