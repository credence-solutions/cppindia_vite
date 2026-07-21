<template>
  <div>
    <PageHero
      overline="Community Tech Talks"
      title="Learn. Share. Grow."
      subtitle="Recorded sessions from CppIndia's bi-monthly tech talks — covering modern C++, concurrency, performance, tooling, and more."
      :breadcrumb="[{ label: 'Tech Talks', path: '/tech-talks' }]"
    />

    <section class="section--sm">
      <div class="container">

        <!-- Year tabs + search -->
        <div class="flex items-start justify-between gap-4 flex-wrap mb-8 pb-4 border-b border-wire-light">
          <div
            class="flex items-center flex-wrap gap-2"
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
                : 'text-ink-2 hover:text-secondary hover:bg-[rgba(8,145,178,0.06)] border border-[rgba(8,145,178,0.2)] hover:border-[rgba(8,145,178,0.5)]'"
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
          <div class="w-full sm:w-72">
            <SearchBar v-model="query" placeholder="Search talks, speakers, tags…" />
          </div>
        </div>

        <!-- Search results info -->
        <p v-if="query" class="text-sm text-ink-3 mb-5">
          <span v-if="displayTalks.length">{{ displayTalks.length }} result{{ displayTalks.length !== 1 ? 's' : '' }} for "<span class="text-ink font-medium">{{ query }}</span>"</span>
          <span v-else>No results for "<span class="text-ink font-medium">{{ query }}</span>"</span>
        </p>

        <!-- Loading skeleton -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="n in 6" :key="n" class="skeleton h-[200px] rounded-xl" />
        </div>

        <!-- Empty -->
        <div v-else-if="!displayTalks.length" class="text-center py-16 text-ink-3">
          <p>{{ query ? 'No talks match your search.' : `No talks found for ${activeYear}.` }}</p>
        </div>

        <!-- Talks grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <article
            v-for="talk in displayTalks"
            :key="talk.id"
            class="flex flex-col bg-surface rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style="border: 1px solid rgba(8,145,178,0.25);"
            onmouseover="this.style.borderColor='rgba(8,145,178,0.6)'; this.style.boxShadow='0 4px 20px rgba(8,145,178,0.12)'"
            onmouseout="this.style.borderColor='rgba(8,145,178,0.25)'; this.style.boxShadow='none'"
          >
            <!-- YouTube thumbnail -->
            <a
              v-if="ytId(talk.video)"
              :href="talk.video"
              class="block relative aspect-video overflow-hidden bg-black group"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Watch: ${talk.title}`"
            >
              <img
                :src="`https://img.youtube.com/vi/${ytId(talk.video)}/mqdefault.jpg`"
                :alt="talk.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <!-- Play overlay -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
                <div class="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center shadow-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
            </a>
            <!-- No-video placeholder -->
            <div v-else class="aspect-video bg-surface-alt flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-ink-3 opacity-40"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3l-4 4-4-4"/></svg>
            </div>

            <!-- Card body -->
            <div class="flex flex-col gap-3 p-5 flex-1">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <div class="flex items-center gap-2">
                  <time class="font-mono text-xs text-ink-3" :datetime="talk.date">{{ formatDate(talk.date) }}</time>
                  <span v-if="query" class="px-1.5 py-px bg-surface-alt text-ink-3 rounded text-[10px] font-bold">{{ talk.date?.slice(0, 4) }}</span>
                </div>
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
                  v-if="talk.video && ytId(talk.video)"
                  :href="talk.video"
                  class="flex items-center gap-1 px-3 py-2 rounded-md text-xs font-semibold bg-[#FF0000] text-white hover:bg-[#cc0000] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Watch on YouTube
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
            </div>
          </article>
        </div>

      </div>
    </section>

    <!-- CTA strip -->
    <section class="section--sm bg-surface-alt border-t border-wire-light">
      <div class="container flex items-center justify-between gap-4 sm:gap-8 flex-wrap">
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
import SearchBar from '@/components/common/SearchBar.vue'
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
const query       = ref('')

const talks = computed(() => talksByYear.value[activeYear.value] ?? [])

// When searching: across all years. Otherwise: active year only.
const displayTalks = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return talks.value
  const all = Object.values(talksByYear.value).flat()
  return all.filter(t =>
    t.title?.toLowerCase().includes(q) ||
    t.speaker?.toLowerCase().includes(q) ||
    t.tags?.some(tag => tag.toLowerCase().includes(q))
  )
})

async function loadTalks() {
  loading.value = true
  talksByYear.value = await fetchTalks()
  loading.value = false
}

function setYear(yr) {
  activeYear.value = yr
  query.value = ''
  router.replace({ query: { year: yr } })
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

function ytId(url) {
  if (!url) return null
  // youtu.be/ID
  let m = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (m) return m[1]
  // youtube.com/watch?v=ID
  m = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (m) return m[1]
  return null
}

watch(() => route.query.year, (yr) => {
  if (yr) activeYear.value = Number(yr)
})

onMounted(loadTalks)
</script>
