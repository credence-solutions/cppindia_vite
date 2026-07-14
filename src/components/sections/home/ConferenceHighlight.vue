<!--
  ConferenceHighlight — CppIndiaCon promo section
-->
<template>
  <section class="section bg-canvas">
    <div class="container">
      <div class="grid grid-cols-1 gap-10 items-center lg:grid-cols-2 lg:gap-16">

        <!-- Left: info -->
        <div class="gsap-reveal">
          <p class="overline mb-2">Annual Conference</p>
          <h2 class="font-display font-extrabold text-ink leading-none mb-1"
            style="font-size: clamp(1.875rem, 4vw, 3.5rem);">CppIndiaCon</h2>
          <p class="font-display text-lg font-medium text-secondary mb-5">The C++ Festival of India</p>
          <p class="text-base text-ink-2 leading-relaxed mb-7">
            Every year, CppIndia brings together C++ experts from India and around the world
            for two days of inspiring talks, hands-on sessions, and community networking.
            Past speakers include <strong class="text-ink">Bjarne Stroustrup</strong> (creator of C++),
            <strong class="text-ink">Jon Kalb</strong>, <strong class="text-ink">Andreas Fertig</strong>, and many more.
          </p>

          <!-- Edition pills -->
          <div class="flex flex-wrap items-center gap-3 mb-7">
            <RouterLink
              v-for="year in [2024, 2023, 2022, 2021]"
              :key="year"
              :to="`/conference?year=${year}`"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-fast border"
              :class="year === 2024
                ? 'bg-[rgba(155,116,245,0.1)] border-[rgba(155,116,245,0.4)] text-secondary'
                : 'border-wire text-ink-2 hover:border-secondary hover:text-secondary'"
            >
              <span class="font-bold">{{ year }}</span>
              <span v-if="year === 2024"
                class="px-1.5 py-[1px] rounded-full bg-secondary text-white text-[10px] font-bold">
                Latest
              </span>
            </RouterLink>
          </div>

          <RouterLink to="/conference?year=2024" class="btn btn--primary">View CppIndiaCon 2024</RouterLink>
        </div>

        <!-- Right: sponsors panel -->
        <div class="gsap-reveal-right p-8 bg-surface border border-wire-light rounded-2xl">
          <p class="text-xs font-semibold text-ink-3 uppercase tracking-[0.08em] mb-4">2024 Gold Sponsors</p>
          <div class="grid grid-cols-3 gap-3 mb-6">
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

          <p class="text-xs font-semibold text-ink-3 uppercase tracking-[0.08em] mb-4">Community Sponsors</p>
          <div class="grid grid-cols-3 gap-3 mb-6">
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

          <p class="text-xs text-ink-3 text-center">
            Interested in sponsoring CppIndiaCon?
            <RouterLink to="/contact" class="text-secondary underline hover:text-primary transition-colors duration-fast">Get in touch</RouterLink>
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGsap } from '@/composables/useGsap'
import sponsorsData from '@/data/sponsors.json'

const { staggerReveal, slideRight } = useGsap()
onMounted(() => {
  staggerReveal('.gsap-reveal', { y: 30 })
  slideRight('.gsap-reveal-right')
})

const goldSponsors      = sponsorsData.filter(s => s.type === 'gold').map(s => ({ name: s.name, logo: s.logo, website: s.url }))
const communitySponsors = sponsorsData.filter(s => s.type === 'community').map(s => ({ name: s.name, logo: s.logo, website: s.url }))
</script>
