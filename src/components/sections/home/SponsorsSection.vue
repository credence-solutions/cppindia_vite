<!--
  SponsorsSection — Sponsors & community supporters
-->
<template>
  <section class="section--sm bg-surface-alt border-t border-wire-light border-b">
    <div class="container">
      <p class="gsap-reveal text-center text-xs font-semibold text-ink-3 uppercase tracking-[0.1em] mb-6">
        Supported by
      </p>

      <!-- Gold sponsors -->
      <div class="gsap-reveal flex flex-wrap justify-center items-center gap-5 mb-4">
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
      <div class="gsap-reveal flex flex-wrap justify-center items-center gap-3 mb-6">
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

      <p class="gsap-reveal text-center text-sm text-ink-3">
        Want to support India's C++ community?
        <RouterLink to="/contact" class="text-secondary underline hover:text-primary transition-colors duration-fast ml-1">
          Become a sponsor
        </RouterLink>
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

const goldSponsors      = computed(() => sponsorsData.filter(s => s.type === 'gold'))
const communitySponsors = computed(() => sponsorsData.filter(s => s.type === 'community'))
</script>
