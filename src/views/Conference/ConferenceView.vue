<template>
  <div>
    <PageHero
      overline="Annual C++ Conference"
      title="CppIndiaCon"
      subtitle="India's premier C++ conference — bringing together global experts for talks, workshops, and community networking."
      :breadcrumb="[{ label: 'CppIndiaCon', path: '/conference' }]"
    />

    <section class="section">
      <div class="container">

        <!-- Year tabs + search -->
        <div class="flex items-start justify-between gap-4 flex-wrap mb-10 pb-4 border-b border-wire-light">
        <div
          class="flex items-center flex-wrap gap-2"
          role="tablist"
        >
          <button
            v-for="yr in years"
            :key="yr"
            role="tab"
            class="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-150"
            :class="activeYear === yr
              ? 'bg-secondary text-white border border-secondary'
              : 'text-ink-2 border border-[rgba(99,102,241,0.22)] hover:border-[rgba(99,102,241,0.55)] hover:text-secondary hover:bg-secondary/[0.06]'"
            :aria-selected="activeYear === yr"
            @click="setYear(yr)"
          >
            {{ yr }}
            <span
              v-if="yr === latestYear"
              class="px-1.5 py-px bg-white/20 rounded-full text-[10px] font-bold"
            >Latest</span>
          </button>
        </div>
          <div class="w-full sm:w-72">
            <SearchBar v-model="scheduleQuery" placeholder="Search sessions, speakers…" />
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="skeleton h-[500px] rounded-xl" />

        <!-- Conference content -->
        <template v-else-if="conf">

          <!-- Header -->
          <div class="flex items-start justify-between gap-8 flex-wrap mb-5">
            <div>
              <h2 class="font-display text-3xl lg:text-5xl font-extrabold text-ink mb-2">{{ conf.name }}</h2>
              <p class="font-mono text-sm text-ink-3 mb-3">
                <span>{{ conf.dates }}</span>
                <span class="mx-2 opacity-40">·</span>
                <span>{{ conf.format }}</span>
                <span class="mx-2 opacity-40">·</span>
                <span>Edition {{ conf.edition }}</span>
              </p>
              <p class="font-display text-lg font-semibold text-secondary">{{ conf.tagline }}</p>
            </div>
            <div class="flex items-center flex-wrap gap-3 flex-shrink-0">
              <a
                v-if="conf.registrationUrl"
                :href="conf.registrationUrl"
                class="btn btn--primary flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >Register Now</a>
              <a
                :href="conf.videosUrl"
                class="btn btn--outline flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
                Watch Talks
              </a>
            </div>
          </div>

          <!-- Conference banner -->
          <div v-if="conf.banner" class="conf-banner-wrap">
            <img :src="conf.banner" :alt="conf.name + ' banner'" class="conf-banner-img" />
          </div>

          <p class="text-base text-ink-2 leading-relaxed max-w-[780px] mb-10">{{ conf.description }}</p>

          <!-- Stats strip -->
          <div
            v-if="conf.stats"
            class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12 p-6 bg-surface border border-wire-light rounded-2xl"
          >
            <div class="text-center p-4 rounded-lg bg-surface-alt">
              <span class="block font-display text-3xl font-extrabold text-primary leading-none mb-2">{{ conf.stats.registrations }}</span>
              <span class="text-xs text-ink-3 uppercase tracking-[0.06em]">Registrations</span>
            </div>
            <div class="text-center p-4 rounded-lg bg-surface-alt">
              <span class="block font-display text-3xl font-extrabold text-primary leading-none mb-2">{{ conf.stats.day1Attendees }}</span>
              <span class="text-xs text-ink-3 uppercase tracking-[0.06em]">Day 1 Attendees</span>
            </div>
            <div class="text-center p-4 rounded-lg bg-surface-alt">
              <span class="block font-display text-3xl font-extrabold text-primary leading-none mb-2">{{ conf.stats.day2Attendees }}</span>
              <span class="text-xs text-ink-3 uppercase tracking-[0.06em]">Day 2 Attendees</span>
            </div>
            <div class="text-center p-4 rounded-lg bg-surface-alt">
              <span class="block font-display text-3xl font-extrabold text-primary leading-none mb-2">{{ conf.stats.talkProposals }}+</span>
              <span class="text-xs text-ink-3 uppercase tracking-[0.06em]">Talk Proposals</span>
            </div>
            <div class="text-center p-4 rounded-lg bg-surface-alt">
              <span class="block font-display text-3xl font-extrabold text-primary leading-none mb-2">{{ conf.stats.volunteers }}</span>
              <span class="text-xs text-ink-3 uppercase tracking-[0.06em]">Volunteers</span>
            </div>
          </div>

          <!-- Schedule -->
          <div v-if="conf.schedule?.length" class="mb-12">
            <div class="flex items-center justify-between gap-4 mb-6 pb-3 border-b-2 border-wire-light flex-wrap">
              <h3 class="font-display text-xl font-bold text-ink">Conference Schedule</h3>
              <p v-if="scheduleQuery" class="text-xs text-ink-3">
                {{ filteredSessionCount }} session{{ filteredSessionCount !== 1 ? 's' : '' }} match
                "<span class="text-ink font-medium">{{ scheduleQuery }}</span>"
              </p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                v-for="day in filteredSchedule"
                :key="day.day"
                class="bg-surface border border-wire-light rounded-2xl overflow-hidden"
              >
                <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[rgba(79,142,247,0.12)] to-[rgba(155,116,245,0.12)] border-b border-wire-light">
                  <span class="font-display font-bold text-base text-ink">Day {{ day.day }}</span>
                  <span class="font-mono text-xs text-ink-3">{{ day.date }}</span>
                </div>

                <div class="p-3">
                  <div
                    v-for="session in day.sessions"
                    :key="session.time + session.title"
                    v-show="!scheduleQuery || sessionMatchesQuery(session)"
                    class="flex items-start gap-4 px-3 py-3 rounded-lg mb-1 transition-colors"
                    :class="{
                      'opacity-55': ['break','intro','outro','activity'].includes(session.type),
                      'bg-surface-alt hover:bg-surface-raised': ['talk','keynote','lightning'].includes(session.type),
                      'border-l-[3px] border-secondary bg-secondary/[0.06]': session.type === 'keynote',
                    }"
                  >
                    <div class="font-mono text-[10px] text-ink-3 whitespace-nowrap min-w-[92px] pt-0.5 flex-shrink-0">
                      {{ session.time }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between gap-2">
                        <p class="text-sm font-semibold text-ink leading-snug flex-1">{{ session.title }}</p>
                        <div class="flex items-center gap-1 flex-shrink-0">
                          <a
                            v-if="session.videoUrl"
                            :href="session.videoUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center gap-1 px-2 py-px rounded text-[10px] font-bold bg-[#FF0000] text-white hover:bg-[#cc0000] transition-colors"
                            :aria-label="`Watch: ${session.title}`"
                          >
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            Video
                          </a>
                          <span
                            v-if="session.type === 'keynote'"
                            class="px-[7px] py-px rounded-full text-[9px] font-bold uppercase tracking-[0.05em] bg-secondary text-white"
                          >Keynote</span>
                          <span
                            v-else-if="session.type === 'lightning'"
                            class="px-[7px] py-px rounded-full text-[9px] font-bold uppercase tracking-[0.05em] bg-accent text-black"
                          >Lightning</span>
                        </div>
                      </div>
                      <p v-if="session.speaker" class="text-xs text-primary font-medium mt-1">{{ session.speaker }}</p>
                      <p v-if="session.abstract" class="text-xs text-ink-3 leading-relaxed mt-2">{{ session.abstract }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Session Videos -->
          <div v-if="sessionVideos.length" class="mb-12">
            <h3 class="font-display text-xl font-bold text-ink mb-6 pb-3 border-b-2 border-wire-light">Session Videos</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <a
                v-for="sv in sessionVideos"
                :key="sv.videoUrl"
                :href="sv.videoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex flex-col bg-surface border border-wire-light rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div class="relative aspect-video overflow-hidden bg-black">
                  <img
                    :src="`https://img.youtube.com/vi/${ytId(sv.videoUrl)}/mqdefault.jpg`"
                    :alt="sv.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <div class="w-11 h-11 rounded-full bg-[#FF0000] flex items-center justify-center shadow-lg">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  </div>
                  <span v-if="sv.type === 'keynote'" class="absolute top-2 left-2 px-2 py-0.5 bg-secondary text-white text-[10px] font-bold rounded uppercase">Keynote</span>
                </div>
                <div class="p-4">
                  <p class="text-sm font-semibold text-ink leading-snug mb-1">{{ sv.title }}</p>
                  <p class="text-xs text-ink-3">{{ sv.speaker }}</p>
                </div>
              </a>
            </div>
          </div>

          <!-- Speakers -->
          <div v-if="conf.speakers.length" class="mb-12">
            <h3 class="font-display text-xl font-bold text-ink mb-6 pb-3 border-b-2 border-wire-light">Speakers</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              <div
                v-for="s in conf.speakers"
                :key="s.name"
                class="flex flex-col bg-surface border border-wire-light rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                :class="{ 'border-secondary/35': s.role === 'Keynote' }"
              >
                <div class="speaker-photo-wrap">
                  <span class="speaker-photo-wrap__initial">{{ s.name.charAt(0) }}</span>
                  <img v-if="s.image" :src="s.image" :alt="s.name" class="speaker-photo" />
                </div>
                <div class="p-4 flex-1">
                  <div class="flex items-start justify-between gap-2 flex-wrap mb-1">
                    <p class="font-bold text-sm text-ink leading-snug">{{ s.name }}</p>
                    <span
                      v-if="s.role === 'Keynote'"
                      class="px-[7px] py-px bg-secondary text-white rounded-full text-[9px] font-bold uppercase tracking-[0.04em] flex-shrink-0 mt-0.5 self-start"
                    >Keynote</span>
                  </div>
                  <p v-if="s.topic" class="text-xs text-ink-2 leading-[1.5] italic">"{{ s.topic }}"</p>
                  <div v-if="s.rating" class="flex items-center gap-[3px] mt-2 text-xs text-yellow-400 font-semibold">
                    <span class="text-[12px]">★</span>
                    <span>{{ s.rating.toFixed(2) }} / 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Lightning Talks -->
          <div v-if="conf.lightningTalks?.length" class="mb-12">
            <h3 class="font-display text-xl font-bold text-ink mb-6 pb-3 border-b-2 border-wire-light">Lightning Talks</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="lt in conf.lightningTalks"
                :key="lt.speaker"
                class="px-5 py-4 bg-surface border border-wire-light border-l-[3px] border-l-accent rounded-lg"
              >
                <p class="text-sm font-bold text-ink mb-1">{{ lt.speaker }}</p>
                <p class="text-xs text-ink-2 leading-[1.4]">{{ lt.topic }}</p>
              </div>
            </div>
          </div>

          <!-- Sponsors -->
          <div
            v-if="conf.sponsors.gold.length || conf.sponsors.community.length"
            class="mb-12 rounded-2xl py-10 px-6"
            style="background: var(--card-bg); border: 1px solid var(--card-border);"
          >
            <!-- Label -->
            <p class="text-center text-xs font-semibold uppercase tracking-[0.12em] mb-8" style="color: var(--card-text-muted);">
              Supported by leading companies &amp; communities
            </p>

            <!-- Gold Sponsors -->
            <template v-if="conf.sponsors.gold.length">
              <div class="mb-6">
                <div class="flex items-center justify-center gap-2 mb-6">
                  <span class="h-px flex-1 max-w-[60px]" style="background: rgba(234,179,8,0.2);" />
                  <span class="text-[10px] font-bold uppercase tracking-[0.15em]" style="color: rgba(234,179,8,0.65);">Gold Sponsors {{ activeYear }}</span>
                  <span class="h-px flex-1 max-w-[60px]" style="background: rgba(234,179,8,0.2);" />
                </div>
                <div class="flex flex-wrap justify-center items-stretch gap-4">
                  <a
                    v-for="s in conf.sponsors.gold"
                    :key="s.name"
                    :href="s.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex flex-col items-center justify-center gap-1 px-6 py-4 rounded-xl transition-all duration-200 min-w-[160px]"
                    style="border: 1px solid rgba(234,179,8,0.25); background: rgba(234,179,8,0.05);"
                    onmouseover="this.style.borderColor='rgba(234,179,8,0.55)'; this.style.background='rgba(234,179,8,0.1)'"
                    onmouseout="this.style.borderColor='rgba(234,179,8,0.25)'; this.style.background='rgba(234,179,8,0.05)'"
                  >
                    <span class="font-display font-bold text-base" style="color: var(--card-text);">{{ s.name }}</span>
                    <span v-if="s.description" class="text-[10px] text-center leading-snug" style="color: var(--card-text-muted);">{{ s.description }}</span>
                  </a>
                </div>
              </div>
            </template>

            <!-- Community Sponsors -->
            <template v-if="conf.sponsors.community.length">
              <div class="mt-7">
                <div class="flex items-center justify-center gap-2 mb-5">
                  <span class="h-px flex-1 max-w-[60px]" style="background: rgba(99,102,241,0.2);" />
                  <span class="text-[10px] font-bold uppercase tracking-[0.15em]" style="color: var(--card-text-muted);">Community Sponsors</span>
                  <span class="h-px flex-1 max-w-[60px]" style="background: rgba(99,102,241,0.2);" />
                </div>
                <div class="flex flex-wrap justify-center items-center gap-3">
                  <a
                    v-for="s in conf.sponsors.community"
                    :key="s.name"
                    :href="s.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                    style="border: 1px solid var(--card-border); color: var(--card-text-muted);"
                    onmouseover="this.style.borderColor='rgba(99,102,241,0.45)'; this.style.color='#818CF8'; this.style.background='rgba(99,102,241,0.07)'"
                    onmouseout="this.style.borderColor='var(--card-border)'; this.style.color='var(--card-text-muted)'; this.style.background='transparent'"
                  >{{ s.name }}</a>
                </div>
              </div>
            </template>

            <!-- Become a sponsor CTA -->
            <p class="text-center text-sm mt-8" style="color: var(--card-text-muted);">
              Want to support India's C++ community?
              <RouterLink
                to="/contact"
                class="underline ml-1 transition-colors duration-150"
                style="color: #A78BFA;"
                onmouseover="this.style.color='#818CF8'"
                onmouseout="this.style.color='#A78BFA'"
              >Become a sponsor</RouterLink>
            </p>
          </div>

          <!-- Watch CTA -->
          <div class="flex flex-col items-center gap-4 p-10 bg-surface-alt border border-wire-light rounded-2xl text-center">
            <p class="text-sm text-ink-3">All sessions recorded and available on YouTube</p>
            <a
              :href="conf.videosUrl"
              class="btn btn--primary flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              Watch {{ conf.name }} Sessions
            </a>
          </div>

        </template>

        <div v-else class="text-center py-16 text-ink-3">
          No conference data found for {{ activeYear }}.
        </div>

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
import { fetchConferenceByYear } from '@/services/api/conferences'


useHead({
  title: "CppIndiaCon | India's Annual C++ Conference",
  description: "CppIndiaCon is India's premier annual C++ conference featuring international speakers, talks, workshops, and networking.",
})

const route         = useRoute()
const router        = useRouter()
const years         = [2024, 2023, 2022, 2021]
const latestYear    = 2024
const activeYear    = ref(Number(route.query.year) || 2024)
const conf          = ref(null)
const loading       = ref(true)
const scheduleQuery = ref('')

function sessionMatchesQuery(session) {
  const q = scheduleQuery.value.trim().toLowerCase()
  if (!q) return true
  return (
    session.title?.toLowerCase().includes(q) ||
    session.speaker?.toLowerCase().includes(q) ||
    session.abstract?.toLowerCase().includes(q)
  )
}

const filteredSchedule = computed(() => {
  if (!conf.value?.schedule) return []
  if (!scheduleQuery.value.trim()) return conf.value.schedule
  return conf.value.schedule.map(day => ({
    ...day,
    sessions: day.sessions.filter(s => sessionMatchesQuery(s)),
  })).filter(day => day.sessions.length > 0)
})

const filteredSessionCount = computed(() =>
  filteredSchedule.value.reduce((n, day) => n + day.sessions.filter(s =>
    ['talk', 'keynote', 'special', 'lightning'].includes(s.type)
  ).length, 0)
)

const sessionVideos = computed(() => {
  if (!conf.value?.schedule) return []
  return conf.value.schedule
    .flatMap(day => day.sessions)
    .filter(s => s.videoUrl && ytId(s.videoUrl))
})

function ytId(url) {
  if (!url) return null
  let m = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (m) return m[1]
  m = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (m) return m[1]
  return null
}

async function loadConference(year) {
  loading.value = true
  conf.value = await fetchConferenceByYear(year)
  loading.value = false
}

function setYear(yr) {
  activeYear.value = yr
  scheduleQuery.value = ''
  router.replace({ query: { year: yr } })
}

watch(activeYear, loadConference)
watch(() => route.query.year, (yr) => {
  if (yr) activeYear.value = Number(yr)
})
onMounted(() => loadConference(activeYear.value))
</script>
