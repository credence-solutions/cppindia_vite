<!--
  SponsorsSection — Sponsors & community supporters
-->
<template>
  <section class="sponsors section--sm">
    <div class="container">
      <p class="sponsors__label gsap-reveal">Supported by</p>

      <!-- Gold sponsors -->
      <div class="sponsors__grid gsap-reveal">
        <a
          v-for="sponsor in goldSponsors"
          :key="sponsor.id"
          :href="sponsor.url"
          target="_blank"
          rel="noopener noreferrer"
          class="sponsor-logo-card sponsor-logo-card--gold"
          :title="sponsor.name"
        >
          <img :src="sponsor.logo" :alt="sponsor.name" class="sponsor-logo-img sponsor-logo-img--gold" />
        </a>
      </div>

      <!-- Community sponsors -->
      <div class="sponsors__grid sponsors__grid--community gsap-reveal">
        <a
          v-for="sponsor in communitySponsors"
          :key="sponsor.id"
          :href="sponsor.url"
          target="_blank"
          rel="noopener noreferrer"
          class="sponsor-logo-card sponsor-logo-card--community"
          :title="sponsor.name"
        >
          <img :src="sponsor.logo" :alt="sponsor.name" class="sponsor-logo-img sponsor-logo-img--community" />
        </a>
      </div>

      <p class="sponsors__cta gsap-reveal">
        Want to support India's C++ community?
        <RouterLink to="/contact" class="sponsors__cta-link">Become a sponsor</RouterLink>
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import sponsorsData from '@/data/sponsors.json'
import { useGsap } from '@/composables/useGsap'

const { staggerReveal } = useGsap()
onMounted(() => staggerReveal('.gsap-reveal', { y: 20 }))

const goldSponsors = computed(() => sponsorsData.filter(s => s.type === 'gold'))
const communitySponsors = computed(() => sponsorsData.filter(s => s.type === 'community'))
</script>

<style lang="scss" scoped>
.sponsors {
  background: var(--color-surface-alt);
  border-top: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);

  &__label {
    text-align: center;
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-6);
  }

  &__grid {
    @include flex(center, center, var(--space-5));
    flex-wrap: wrap;
    margin-bottom: var(--space-4);

    &--community {
      gap: var(--space-3);
      margin-bottom: var(--space-6);
    }
  }

  &__cta {
    text-align: center;
    font-size: var(--text-sm);
    color: var(--color-text-muted);

    &-link {
      color: $color-secondary;
      text-decoration: underline;
      transition: color var(--transition-fast);
      &:hover { color: $color-primary; }
    }
  }
}
</style>
