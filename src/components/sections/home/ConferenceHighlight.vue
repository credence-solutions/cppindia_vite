<!--
  ConferenceHighlight — CppIndiaCon promo section
-->
<template>
  <section class="conf-highlight section">
    <div class="container">
      <div class="conf-highlight__inner">
        <!-- Left: info -->
        <div class="conf-highlight__content gsap-reveal">
          <p class="conf-highlight__overline">Annual Conference</p>
          <h2 class="conf-highlight__title">CppIndiaCon</h2>
          <p class="conf-highlight__subtitle">The C++ Festival of India</p>
          <p class="conf-highlight__body">
            Every year, CppIndia brings together C++ experts from India and around the world
            for two days of inspiring talks, hands-on sessions, and community networking.
            Past speakers include <strong>Bjarne Stroustrup</strong> (creator of C++),
            <strong>Jon Kalb</strong>, <strong>Andreas Fertig</strong>, and many more.
          </p>

          <div class="conf-highlight__editions">
            <RouterLink
              v-for="year in [2024, 2023, 2022, 2021]"
              :key="year"
              :to="`/conference?year=${year}`"
              class="conf-highlight__edition"
              :class="{ 'conf-highlight__edition--latest': year === 2024 }"
            >
              <span class="conf-highlight__edition-year">{{ year }}</span>
              <span v-if="year === 2024" class="conf-highlight__edition-badge">Latest</span>
            </RouterLink>
          </div>

          <RouterLink to="/conference?year=2024" class="btn btn--primary">
            View CppIndiaCon 2024
          </RouterLink>
        </div>

        <!-- Right: sponsors -->
        <div class="conf-highlight__sponsors gsap-reveal-right">
          <p class="conf-highlight__sponsors-label">2024 Gold Sponsors</p>
          <div class="conf-highlight__sponsor-list">
            <a
              v-for="sponsor in goldSponsors"
              :key="sponsor.name"
              :href="sponsor.website"
              target="_blank"
              rel="noopener noreferrer"
              class="sponsor-logo-card sponsor-logo-card--gold"
              :title="sponsor.name"
            >
              <img :src="sponsor.logo" :alt="sponsor.name" class="sponsor-logo-img sponsor-logo-img--gold" />
            </a>
          </div>

          <p class="conf-highlight__sponsors-label conf-highlight__sponsors-label--sm">
            Community Sponsors
          </p>
          <div class="conf-highlight__sponsor-list conf-highlight__sponsor-list--community">
            <a
              v-for="sponsor in communitySponsors"
              :key="sponsor.name"
              :href="sponsor.website"
              target="_blank"
              rel="noopener noreferrer"
              class="sponsor-logo-card sponsor-logo-card--community"
              :title="sponsor.name"
            >
              <img :src="sponsor.logo" :alt="sponsor.name" class="sponsor-logo-img sponsor-logo-img--community" />
            </a>
          </div>

          <p class="conf-highlight__sponsor-note">
            Interested in sponsoring CppIndiaCon?
            <RouterLink to="/contact" class="conf-highlight__sponsor-link">Get in touch</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGsap } from '@/composables/useGsap'

const { staggerReveal, slideRight } = useGsap()
onMounted(() => {
  staggerReveal('.gsap-reveal', { y: 30 })
  slideRight('.gsap-reveal-right')
})

import sponsorsData from '@/data/sponsors.json'

const goldSponsors = sponsorsData
  .filter(s => s.type === 'gold')
  .map(s => ({ name: s.name, logo: s.logo, website: s.url }))

const communitySponsors = sponsorsData
  .filter(s => s.type === 'community')
  .map(s => ({ name: s.name, logo: s.logo, website: s.url }))
</script>

<style lang="scss" scoped>
.conf-highlight {
  background: var(--color-bg);

  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: center;

    @include below(lg) { grid-template-columns: 1fr; gap: var(--space-10); }
  }

  &__overline {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: $color-secondary;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-2);
  }

  &__title {
    font-family: var(--font-secondary);
    font-size: clamp(var(--text-3xl), 4vw, 3.5rem);
    font-weight: var(--weight-extrabold);
    color: var(--color-text);
    line-height: 1;
    margin-bottom: var(--space-1);
  }

  &__subtitle {
    font-family: var(--font-secondary);
    font-size: var(--text-lg);
    font-weight: var(--weight-medium);
    color: $color-secondary;
    margin-bottom: var(--space-5);
  }

  &__body {
    font-size: var(--text-base);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-7);
  }

  &__editions {
    @include flex(center, flex-start, var(--space-3));
    margin-bottom: var(--space-7);
    flex-wrap: wrap;
  }

  &__edition {
    @include flex(center, center, var(--space-2));
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-text-secondary);
    transition: all var(--transition-fast);

    &:hover {
      border-color: $color-secondary;
      color: $color-secondary;
    }

    &--latest {
      background: rgba(155, 116, 245, 0.1);
      border-color: rgba(155, 116, 245, 0.4);
      color: $color-secondary;
    }

    &-year { font-weight: var(--weight-bold); }

    &-badge {
      padding: 1px 6px;
      background: $color-secondary;
      color: white;
      border-radius: var(--radius-full);
      font-size: 10px;
    }
  }

  // Sponsors panel
  &__sponsors {
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
  }

  &__sponsors-label {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: var(--space-4);

    &--sm { margin-top: var(--space-6); }
  }

  &__sponsor-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-3);

    &--community { grid-template-columns: repeat(3, 1fr); }
  }


  &__sponsor-note {
    margin-top: var(--space-6);
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    text-align: center;
  }

  &__sponsor-link {
    color: $color-secondary;
    text-decoration: underline;
    transition: color var(--transition-fast);
    &:hover { color: $color-primary; }
  }
}
</style>
