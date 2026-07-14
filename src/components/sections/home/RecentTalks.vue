<!--
  RecentTalks — Recent tech talks on homepage
-->
<template>
  <section class="section bg-surface-alt">
    <div class="container">

      <!-- Header -->
      <div class="gsap-reveal flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <p class="overline mb-2">Community Tech Talks</p>
          <h2 class="font-display font-bold text-ink" style="font-size: clamp(1.5rem, 3vw, 2.5rem);">Recent Sessions</h2>
        </div>
        <RouterLink to="/tech-talks" class="btn btn--outline flex items-center gap-1 flex-shrink-0">
          All Talks
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </RouterLink>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="talk in recentTalks"
          :key="talk.id"
          class="gsap-reveal flex flex-col gap-3 p-6 bg-surface border border-wire-light rounded-xl transition-all duration-base
                 hover:border-[rgba(79,142,247,0.25)] hover:shadow-glow-primary hover:-translate-y-[3px]"
        >
          <!-- Meta row -->
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <time class="text-xs text-ink-3 font-mono" :datetime="talk.date">{{ formatDate(talk.date) }}</time>
            <div class="flex items-center gap-1">
              <span
                v-for="tag in talk.tags.slice(0, 2)"
                :key="tag"
                class="px-2 py-[2px] rounded bg-[rgba(155,116,245,0.12)] text-secondary text-[10px] font-semibold"
              >{{ tag }}</span>
            </div>
          </div>

          <h3 class="font-display font-bold text-base text-ink leading-snug flex-1">{{ talk.title }}</h3>
          <p class="text-sm text-ink-2 font-medium">{{ talk.speaker }}</p>

          <!-- Actions -->
          <div class="flex flex-wrap items-center gap-2 mt-2">
            <a
              v-if="talk.video"
              :href="talk.video"
              class="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-secondary text-white text-xs font-semibold transition-colors duration-fast hover:bg-secondary-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Watch Talk
            </a>
            <a
              v-if="talk.slides"
              :href="talk.slides"
              class="inline-flex items-center gap-1 px-3 py-2 rounded-md text-xs font-semibold transition-all duration-fast border border-wire text-ink-2 hover:border-secondary hover:text-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              Slides
            </a>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchTalksByYear } from '@/services/api/talks'
import { useGsap } from '@/composables/useGsap'

const recentTalks = ref([])
const { staggerReveal } = useGsap()

onMounted(async () => {
  const talks = await fetchTalksByYear(2024)
  recentTalks.value = talks.slice(0, 3)
  staggerReveal('.gsap-reveal', { y: 30 })
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}
</script>
