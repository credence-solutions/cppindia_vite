<template>
  <div>
  <div v-if="primaryEntry">
    <PageHero
      overline="CppIndiaCon Speaker"
      :title="primaryEntry.name"
      :subtitle="primaryEntry.role + (appearances.length > 1 ? ` · ${appearances.length} conferences` : ` · CppIndiaCon ${primaryEntry.conference}`)"
      :breadcrumb="[{ label: 'Conference', path: '/conference' }, { label: primaryEntry.name }]"
    />

    <section class="section--sm" style="background: var(--emphasis-bg);">
      <div class="container" style="max-width: 900px;">

        <!-- Profile header -->
        <div class="flex flex-col sm:flex-row gap-8 mb-10">
          <!-- Photo -->
          <div class="flex-shrink-0">
            <img
              v-if="primaryEntry.image"
              :src="primaryEntry.image"
              :alt="primaryEntry.name"
              class="w-36 h-36 rounded-2xl object-cover"
              style="border: 2px solid rgba(8,145,178,0.3);"
              @error="e => e.target.style.display='none'"
            />
            <div v-else
              class="w-36 h-36 rounded-2xl flex items-center justify-center font-display font-bold text-3xl"
              style="background:rgba(8,145,178,0.15); color:var(--color-primary-soft);">
              {{ initials(primaryEntry.name) }}
            </div>
          </div>

          <!-- Info -->
          <div class="flex flex-col gap-4 flex-1">
            <!-- Expertise tags -->
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in allExpertise"
                :key="tag"
                class="text-xs font-semibold px-2.5 py-1 rounded-full"
                style="background:rgba(8,145,178,0.1); color:var(--color-primary-soft); border:1px solid rgba(8,145,178,0.25);">
                {{ tag }}
              </span>
            </div>

            <!-- Bio -->
            <p class="text-sm leading-relaxed" style="color:var(--color-text-secondary);">
              {{ primaryEntry.intro || primaryEntry.bio }}
            </p>

            <!-- Social links -->
            <div class="flex items-center gap-2 flex-wrap">
              <a v-if="primaryEntry.website" :href="primaryEntry.website" target="_blank" rel="noopener noreferrer"
                aria-label="Website"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style="background:rgba(8,145,178,0.08); color:var(--color-text-muted); border:1px solid rgba(8,145,178,0.15);"
                onmouseover="this.style.background='rgba(8,145,178,0.18)'; this.style.color='var(--color-primary-soft)'"
                onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                Website
              </a>
              <a v-if="primaryEntry.linkedin" :href="primaryEntry.linkedin" target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style="background:rgba(8,145,178,0.08); color:var(--color-text-muted); border:1px solid rgba(8,145,178,0.15);"
                onmouseover="this.style.background='rgba(8,145,178,0.18)'; this.style.color='var(--color-primary-soft)'"
                onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a v-if="primaryEntry.twitter" :href="primaryEntry.twitter" target="_blank" rel="noopener noreferrer"
                aria-label="Twitter / X"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style="background:rgba(8,145,178,0.08); color:var(--color-text-muted); border:1px solid rgba(8,145,178,0.15);"
                onmouseover="this.style.background='rgba(8,145,178,0.18)'; this.style.color='var(--color-primary-soft)'"
                onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X / Twitter
              </a>
              <a v-if="primaryEntry.github" :href="primaryEntry.github" target="_blank" rel="noopener noreferrer"
                aria-label="GitHub"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style="background:rgba(8,145,178,0.08); color:var(--color-text-muted); border:1px solid rgba(8,145,178,0.15);"
                onmouseover="this.style.background='rgba(8,145,178,0.18)'; this.style.color='var(--color-primary-soft)'"
                onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
            </div>
          </div>
        </div>

        <!-- Conference appearances -->
        <div v-if="appearances.length" class="mb-10">
          <h2 class="font-display text-lg font-bold mb-4 pb-3 border-b" style="color:var(--color-text); border-color:var(--color-border);">
            CppIndiaCon Appearances
          </h2>
          <div class="flex flex-col gap-3">
            <div
              v-for="app in appearances"
              :key="app.conference"
              class="flex flex-wrap items-center gap-4 p-4 rounded-xl"
              style="background:var(--card-bg); border:1px solid var(--card-border);">
              <span class="text-xs font-bold px-2.5 py-1 rounded-lg flex-shrink-0"
                style="background:rgba(8,145,178,0.12); color:var(--color-primary-soft); border:1px solid rgba(8,145,178,0.25);">
                CppIndiaCon {{ app.conference }}
              </span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold" style="color:var(--color-text);">{{ app.role }}</p>
                <p class="text-xs mt-0.5" style="color:var(--color-text-muted);">{{ app.topic }}</p>
              </div>
              <RouterLink :to="`/conference?year=${app.conference}`"
                class="text-xs font-semibold flex-shrink-0 transition-colors duration-150"
                style="color:var(--color-primary-soft);">
                View conference →
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Talk recordings -->
        <div v-if="talkRecordings.length" class="mb-10">
          <h2 class="font-display text-lg font-bold mb-4 pb-3 border-b" style="color:var(--color-text); border-color:var(--color-border);">
            Talk Recordings
          </h2>
          <div class="flex flex-col gap-3">
            <a
              v-for="talk in talkRecordings"
              :key="talk.id"
              :href="talk.video || undefined"
              :target="talk.video ? '_blank' : undefined"
              :rel="talk.video ? 'noopener noreferrer' : undefined"
              class="flex items-start gap-3 p-4 rounded-xl transition-all duration-150"
              :class="talk.video ? 'cursor-pointer' : 'cursor-default opacity-60'"
              style="background:var(--card-bg); border:1px solid var(--card-border);"
              :onmouseover="talk.video ? `this.style.borderColor='rgba(8,145,178,0.4)'; this.style.background='rgba(8,145,178,0.05)'` : ''"
              :onmouseout="talk.video ? `this.style.borderColor='var(--card-border)'; this.style.background='var(--card-bg)'` : ''"
            >
              <div
                class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                :style="talk.video ? 'background:#FF0000;' : 'background:rgba(148,163,184,0.1);'"
              >
                <svg v-if="talk.video" width="11" height="11" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <svg v-else width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(148,163,184,0.5)" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold leading-snug" style="color:var(--color-text);">{{ talk.title }}</p>
                <p class="text-xs mt-1" style="color:var(--color-text-muted);">
                  {{ talk.source }} · {{ talk.year }}
                  <span v-if="!talk.video" class="ml-2 italic">No recording</span>
                </p>
              </div>
              <svg v-if="talk.video" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="flex-shrink-0 mt-1" style="color:var(--color-primary-soft);opacity:0.6;"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>

        <!-- Back -->
        <RouterLink to="/conference"
          class="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150"
          style="color:var(--color-primary-soft);">
          ← Back to CppIndiaCon
        </RouterLink>

      </div>
    </section>
  </div>

  <!-- 404 -->
  <div v-else class="section text-center" style="background: var(--emphasis-bg);">
    <div class="container">
      <p class="text-lg font-semibold mb-4" style="color:var(--color-text);">Speaker not found.</p>
      <RouterLink to="/conference" class="text-sm font-semibold" style="color:var(--color-primary-soft);">← Back to CppIndiaCon</RouterLink>
    </div>
  </div>
  </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import speakersData from '@/data/speakers.json'
import talksData from '@/data/talks.json'
import conferencesData from '@/data/conferences.json'

const route = useRoute()
const slug  = computed(() => route.params.slug)

// Normalise an id to its base slug (strip trailing -YYYY)
function baseSlug(id) {
  return id.replace(/-\d{4}$/, '')
}

// Find all speaker entries that belong to this slug
const appearances = computed(() =>
  speakersData
    .filter(s => baseSlug(s.id) === slug.value)
    .sort((a, b) => b.conference - a.conference)
)

// Use the most recent entry as the primary (for photo, bio, social links)
const primaryEntry = computed(() => appearances.value[0] ?? null)

watchEffect(() => {
  if (primaryEntry.value) {
    useHead({
      title: `${primaryEntry.value.name} | CppIndia Speaker`,
      description: `${primaryEntry.value.name} — ${primaryEntry.value.role} at CppIndiaCon. ${primaryEntry.value.bio?.slice(0, 120) ?? ''}`,
    })
  }
})

// Merge expertise tags across all appearances, deduplicated
const allExpertise = computed(() => {
  const seen = new Set()
  const tags = []
  for (const app of appearances.value) {
    for (const tag of (app.expertise || [])) {
      if (!seen.has(tag)) { seen.add(tag); tags.push(tag) }
    }
  }
  return tags
})

// Pull talk recordings: conference sessions + tech talks
function namesMatch(a, b) {
  const norm = s => s.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ').trim()
  const na = norm(a), nb = norm(b)
  if (na === nb) return true
  const wa = na.split(' ').filter(w => w.length > 1)
  const wb = nb.split(' ').filter(w => w.length > 1)
  const [shorter, longer] = wa.length <= wb.length ? [wa, wb] : [wb, wa]
  return shorter.every(w => longer.includes(w))
}

const talkRecordings = computed(() => {
  if (!primaryEntry.value) return []
  const name = primaryEntry.value.name
  const list = []

  for (const [year, yearTalks] of Object.entries(talksData)) {
    for (const t of yearTalks) {
      if (namesMatch(name, t.speaker)) {
        list.push({ id: t.id, title: t.title, video: t.video || null, year, source: 'Tech Talk' })
      }
    }
  }

  for (const conf of conferencesData) {
    for (const day of (conf.schedule || [])) {
      for (const session of day.sessions) {
        if (['talk', 'keynote', 'special'].includes(session.type) && session.speaker && namesMatch(name, session.speaker)) {
          list.push({
            id: `${conf.year}-${session.time}`,
            title: session.title,
            video: session.videoUrl || null,
            year: String(conf.year),
            source: `CppIndiaCon ${conf.year}`,
          })
        }
      }
    }
  }

  return list.sort((a, b) => Number(b.year) - Number(a.year))
})

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2)
}
</script>
