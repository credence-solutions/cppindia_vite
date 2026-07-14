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

        <!-- Right: conference highlight card -->
        <div class="gsap-reveal-right p-8 bg-surface border border-wire-light rounded-2xl flex flex-col gap-6">

          <!-- Edition + dates -->
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 mb-4">
              <span class="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span class="text-xs font-bold text-secondary uppercase tracking-widest">4th Edition</span>
            </div>
            <h3 class="font-display font-extrabold text-ink text-xl mb-1">CppIndiaCon 2024</h3>
            <p class="text-sm text-ink-2 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline mr-1 -mt-px"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              August 23–24, 2024
            </p>
            <p class="text-sm text-ink-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline mr-1 -mt-px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Online · Free to Attend
            </p>
          </div>

          <!-- Featured speakers -->
          <div>
            <p class="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-3 mb-3">Featured Speakers</p>
            <div class="flex flex-col gap-3">
              <div
                v-for="speaker in featuredSpeakers"
                :key="speaker.name"
                class="flex items-center gap-3"
              >
                <div
                  class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style="background: linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
                >
                  {{ speaker.name.charAt(0) }}
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-ink leading-none truncate">{{ speaker.name }}</p>
                  <p class="text-[11px] text-ink-3 mt-0.5 truncate">{{ speaker.topic }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sponsors row -->
          <div>
            <p class="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-3 mb-2">Gold Sponsors</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="sp in conferenceSponsors"
                :key="sp"
                class="px-2.5 py-1 rounded-md border border-yellow-500/25 bg-yellow-500/5 text-xs font-semibold text-ink"
              >{{ sp }}</span>
            </div>
          </div>

          <!-- CTA -->
          <a
            href="https://www.youtube.com/@CppIndiaUG"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn--primary w-full text-center justify-center"
          >
            Watch Recordings
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="ml-1"><polyline points="9 18 15 12 9 6"/></svg>
          </a>

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

const featuredSpeakers = [
  { name: 'Alex Dathskovsky', topic: 'Modern C++ Performance Patterns' },
  { name: 'Ankur Satle',      topic: 'Recursive Static Types' },
  { name: 'Mike Shah',        topic: 'C++ Tooling & Debugging' },
  { name: 'Jonathan Müller',  topic: 'C++ Library Design' },
]

const conferenceSponsors = ['MulticoreWare', 'think-cell', 'Bloomberg LP']
</script>
