<!--
  ConferenceHighlight — CppIndiaCon promo section
-->
<template>
  <section class="section" style="background: var(--emphasis-bg);">
    <div class="container">
      <div class="grid grid-cols-1 gap-10 items-center lg:grid-cols-2 lg:gap-16">

        <!-- Left: info -->
        <div class="gsap-reveal">
          <p class="text-xs font-bold uppercase tracking-[0.14em] mb-2" style="color: var(--color-secondary-mid);">Annual Conference</p>
          <h2 class="font-display font-extrabold leading-none mb-1 text-gradient-heading"
            style="font-size: clamp(1.875rem, 4vw, 3.5rem);">CppIndiaCon</h2>
          <p class="font-display text-lg font-medium mb-5" style="color: var(--color-secondary-mid);">The C++ Festival of India</p>
          <p class="text-base leading-relaxed mb-7" style="color: var(--color-text-secondary);">
            Every year, CppIndia brings together C++ experts from India and around the world
            for two days of inspiring talks, hands-on sessions, and community networking.
            Past speakers include <strong style="color: var(--color-text);">Bjarne Stroustrup</strong> (creator of C++),
            <strong style="color: var(--color-text);">Jon Kalb</strong>, <strong style="color: var(--color-text);">Andreas Fertig</strong>, and many more.
          </p>

          <!-- Edition pills -->
          <div class="flex flex-wrap items-center gap-3 mb-7">
            <RouterLink
              v-for="year in [2024, 2023, 2022, 2021]"
              :key="year"
              :to="`/conference?year=${year}`"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              :style="year === 2024
                ? 'background: rgba(8,145,178,0.12); border: 1px solid rgba(8,145,178,0.4); color: var(--color-secondary-mid);'
                : 'border: 1px solid var(--color-border); color: var(--color-text-secondary);'"
            >
              <span class="font-bold">{{ year }}</span>
              <span v-if="year === 2024"
                class="px-1.5 py-[1px] rounded-full text-white text-[10px] font-bold"
                style="background: linear-gradient(135deg, #2563EB, #0891B2);">
                Latest
              </span>
            </RouterLink>
          </div>

          <RouterLink
            to="/conference?year=2024"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200"
            style="background: linear-gradient(135deg, #2563EB 0%, #0891B2 100%); box-shadow: 0 0 20px rgba(8,145,178,0.35);"
            onmouseover="this.style.boxShadow='0 0 30px rgba(8,145,178,0.55)'"
            onmouseout="this.style.boxShadow='0 0 20px rgba(8,145,178,0.35)'"
          >View CppIndiaCon 2024</RouterLink>
        </div>

        <!-- Right: conference highlight card -->
        <div class="gsap-reveal-right p-5 sm:p-8 rounded-2xl flex flex-col gap-6"
          style="background: var(--card-bg); border: 1px solid var(--card-border);">

          <!-- Edition + dates -->
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style="border: 1px solid rgba(8,145,178,0.4); background: rgba(8,145,178,0.1);">
              <span class="w-2 h-2 rounded-full animate-pulse" style="background: var(--color-secondary-mid);" />
              <span class="text-xs font-bold uppercase tracking-widest" style="color: var(--color-secondary-mid);">4th Edition</span>
            </div>
            <h3 class="font-display font-extrabold text-xl mb-1" style="color: var(--color-text);">CppIndiaCon 2024</h3>
            <p class="text-sm mb-1" style="color: var(--color-text-secondary);">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline mr-1 -mt-px"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              August 23–24, 2024
            </p>
            <p class="text-sm" style="color: var(--color-text-muted);">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline mr-1 -mt-px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Online · Free to Attend
            </p>
          </div>

          <!-- Featured speakers -->
          <div>
            <p class="text-[10px] font-bold uppercase tracking-[0.12em] mb-3" style="color: var(--color-text-muted);">Featured Speakers</p>
            <div class="flex flex-col gap-3">
              <div
                v-for="speaker in featuredSpeakers"
                :key="speaker.name"
                class="flex items-center gap-3"
              >
                <div
                  class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style="background: var(--gradient-btn)"
                >
                  {{ speaker.name.charAt(0) }}
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-semibold leading-none truncate" style="color: var(--color-text);">{{ speaker.name }}</p>
                  <p class="text-[11px] mt-0.5 truncate" style="color: var(--color-text-secondary);">{{ speaker.topic }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sponsors row -->
          <div>
            <p class="text-[10px] font-bold uppercase tracking-[0.12em] mb-2" style="color: var(--color-text-muted);">Gold Sponsors</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="sp in conferenceSponsors"
                :key="sp"
                class="px-2.5 py-1 rounded-md text-xs font-semibold"
                style="border: 1px solid rgba(234,179,8,0.25); background: rgba(234,179,8,0.06); color: var(--color-text);"
              >{{ sp }}</span>
            </div>
          </div>

          <!-- CTA -->
          <a
            href="https://www.youtube.com/@CppIndiaUG"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full text-center justify-center inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200"
            style="background: linear-gradient(135deg, #2563EB 0%, #0891B2 100%); box-shadow: 0 0 20px rgba(8,145,178,0.35);"
            onmouseover="this.style.boxShadow='0 0 30px rgba(8,145,178,0.55)'"
            onmouseout="this.style.boxShadow='0 0 20px rgba(8,145,178,0.35)'"
          >
            Watch Recordings
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
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
