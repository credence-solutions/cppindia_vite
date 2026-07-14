<!--
  RecentTalks — Recent tech talks on homepage
-->
<template>
  <section class="section bg-surface-alt">
    <div class="container">

      <!-- Header -->
      <div class="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p class="overline mb-2">Community</p>
          <h2 class="font-display font-bold text-ink" style="font-size: clamp(1.5rem, 3vw, 2.5rem);">
            Recent <span class="text-gradient-brand">Tech Talks</span>
          </h2>
          <p class="text-sm text-ink-3 mt-2">
            {{ totalTalks }} sessions recorded &amp; available for free
          </p>
        </div>
        <RouterLink to="/tech-talks" class="btn btn--outline flex items-center gap-1 flex-shrink-0">
          View All Talks
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </RouterLink>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="talk in recentTalks"
          :key="talk.id"
          class="group relative flex flex-col bg-surface border border-wire-light rounded-2xl overflow-hidden
                 hover:border-primary/30 hover:shadow-glow-primary hover:-translate-y-1 transition-all duration-200"
        >
          <!-- Card header bar -->
          <div
            class="flex items-center justify-between px-5 py-3 border-b border-wire-light"
            style="background: linear-gradient(90deg, rgba(79,142,247,0.06) 0%, rgba(155,116,245,0.06) 100%);"
          >
            <time class="font-mono text-xs text-ink-3" :datetime="talk.date">{{ formatDate(talk.date) }}</time>
            <div class="flex items-center gap-1 flex-wrap justify-end">
              <span
                v-for="tag in talk.tags.slice(0, 2)"
                :key="tag"
                class="px-2 py-[2px] rounded-full bg-[rgba(79,142,247,0.1)] text-primary text-[10px] font-semibold border border-[rgba(79,142,247,0.2)]"
              >{{ tag }}</span>
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-col flex-1 gap-3 p-5">
            <h3 class="font-display font-bold text-base text-ink leading-snug flex-1">{{ talk.title }}</h3>
            <p class="text-sm text-ink-2 font-medium">{{ talk.speaker }}</p>

            <!-- Actions -->
            <div class="flex flex-wrap items-center gap-2 mt-auto pt-3">
              <a
                v-if="talk.video"
                :href="talk.video"
                class="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#FF0000] text-white text-xs font-semibold transition-all duration-200 hover:bg-[#cc0000] hover:shadow-[0_0_12px_rgba(255,0,0,0.4)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Watch Talk
              </a>
              <a
                v-if="talk.slides"
                :href="talk.slides"
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-all duration-200 border border-wire text-ink-2 hover:border-secondary hover:text-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                Slides
              </a>
            </div>
          </div>

          <!-- Play overlay on hover for video talks -->
          <div
            v-if="talk.video"
            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            style="background: rgba(6,11,26,0.45);"
          >
            <div class="w-14 h-14 rounded-full flex items-center justify-center"
              style="background: rgba(255,0,0,0.85); box-shadow: 0 0 30px rgba(255,0,0,0.5);">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white" style="margin-left: 3px;"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
          </div>
        </article>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-10">
        <RouterLink to="/tech-talks" class="btn btn--outline">
          View All {{ totalTalks }} Talks
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import talksData from '@/data/talks.json'

// Flatten all talks across all years, sort by date descending, take 6
const allTalks = Object.values(talksData).flat()
allTalks.sort((a, b) => new Date(b.date) - new Date(a.date))

const recentTalks = allTalks.slice(0, 6)
const totalTalks = computed(() => allTalks.length)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}
</script>
