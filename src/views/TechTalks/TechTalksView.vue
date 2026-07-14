<template>
  <div>
    <PageHero
      overline="Community Tech Talks"
      title="Learn. Share. Grow."
      subtitle="Recorded sessions from CppIndia's bi-monthly tech talks — covering modern C++, concurrency, performance, tooling, and more."
      :breadcrumb="[{ label: 'Tech Talks', path: '/tech-talks' }]"
    />

    <section class="section">
      <div class="container">

        <!-- Year tabs -->
        <div
          class="flex items-center flex-wrap gap-2 mb-8 pb-4 border-b border-wire-light"
          role="tablist"
          aria-label="Select year"
        >
          <button
            v-for="yr in years"
            :key="yr"
            role="tab"
            class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer"
            :class="activeYear === yr
              ? 'bg-secondary text-white hover:bg-secondary-dark'
              : 'text-ink-2 hover:text-secondary hover:bg-[rgba(79,142,247,0.06)]'"
            :aria-selected="activeYear === yr"
            @click="setYear(yr)"
          >
            {{ yr }}
            <span
              class="px-1.5 py-px rounded-full text-[10px] font-bold"
              :class="activeYear === yr ? 'bg-white/20 text-white' : 'bg-surface-alt text-ink-3'"
            >{{ talksByYear[yr]?.length ?? 0 }}</span>
          </button>
        </div>

        <!-- Loading skeleton -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="n in 6" :key="n" class="skeleton h-[200px] rounded-xl" />
        </div>

        <!-- Empty -->
        <div v-else-if="!talks.length" class="text-center py-16 text-ink-3">
          <p>No talks found for {{ activeYear }}.</p>
        </div>

        <!-- Talks grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <article
            v-for="talk in talks"
            :key="talk.id"
            class="flex flex-col gap-3 p-6 bg-surface border border-wire-light rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
          >
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <time class="font-mono text-xs text-ink-3" :datetime="talk.date">{{ formatDate(talk.date) }}</time>
              <div class="flex items-center gap-1">
                <span
                  v-for="tag in talk.tags.slice(0, 2)"
                  :key="tag"
                  class="px-2 py-0.5 bg-[rgba(79,142,247,0.10)] text-secondary rounded text-[10px] font-semibold"
                >{{ tag }}</span>
              </div>
            </div>

            <h2 class="font-display text-base font-bold text-ink leading-[1.35] flex-1">{{ talk.title }}</h2>

            <p class="flex items-center gap-2 text-sm text-ink-2 font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>
              {{ talk.speaker }}
            </p>

            <div class="flex items-center flex-wrap gap-2 mt-auto">
              <a
                v-if="talk.video"
                :href="talk.video"
                class="flex items-center gap-1 px-3 py-2 rounded-md text-xs font-semibold bg-secondary text-white hover:bg-secondary-dark transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Watch
              </a>
              <a
                v-if="talk.slides"
                :href="talk.slides"
                class="flex items-center gap-1 px-3 py-2 rounded-md text-xs font-semibold bg-transparent border border-wire text-ink-2 hover:border-secondary hover:text-secondary transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                Slides
              </a>
            </div>
          </article>
        </div>

      </div>
    </section>

    <!-- CTA strip -->
    <section class="section--sm bg-surface-alt border-t border-wire-light">
      <div class="container flex items-center justify-between gap-8 flex-wrap">
        <div>
          <h3 class="font-display text-2xl font-bold text-ink mb-2">Want to give a talk?</h3>
          <p class="text-base text-ink-2">Share your C++ knowledge with the community. All experience levels welcome.</p>
        </div>
        <RouterLink to="/call-for-speakers" class="btn btn--primary flex-shrink-0">Submit a Talk Proposal</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import { fetchTalks } from '@/services/api/talks'

useHead({
  title: 'Community Tech Talks | CppIndia',
  description: 'Watch recorded CppIndia tech talks from 2020–2024 on modern C++, concurrency, performance, debugging, and more.',
})

const route  = useRoute()
const router = useRouter()

const years       = [2024, 2023, 2022, 2021, 2020]
const activeYear  = ref(Number(route.query.year) || 2024)
const talksByYear = ref({})
const loading     = ref(true)

const talks = computed(() => talksByYear.value[activeYear.value] ?? [])

async function loadTalks() {
  loading.value = true
  talksByYear.value = await fetchTalks()
  loading.value = false
}

function setYear(yr) {
  activeYear.value = yr
  router.replace({ query: { year: yr } })
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

watch(() => route.query.year, (yr) => {
  if (yr) activeYear.value = Number(yr)
})

onMounted(loadTalks)
</script>
