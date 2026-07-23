<template>
  <div>
  <PageHero
    overline="Opportunities"
    title="C++ Jobs Board"
    subtitle="Curated C++ job listings for the Indian developer community — remote, hybrid, and onsite."
  />

  <section class="section--sm" style="background: var(--emphasis-bg);">
    <div class="container">

      <!-- Search -->
      <div class="mb-6">
        <SearchBar v-model="query" placeholder="Search by role, company, or technology…" />
        <p v-if="query" class="text-xs mt-2" style="color:var(--color-text-muted);">
          <span v-if="filtered.length">{{ filtered.length }} result{{ filtered.length !== 1 ? 's' : '' }}</span>
          <span v-else>No jobs match "<span style="color:var(--color-text);">{{ query }}</span>"</span>
        </p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-3 mb-8">
        <div class="flex flex-wrap gap-2">
          <button v-for="f in locationFilters" :key="f.value"
            @click="locFilter = f.value"
            class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
            :style="locFilter === f.value
              ? 'background:rgba(8,145,178,0.2); color:var(--color-primary-soft); border:1px solid rgba(8,145,178,0.45);'
              : 'background:transparent; color:var(--color-text-secondary); border:1px solid var(--color-border);'"
          >{{ f.label }}</button>
        </div>
        <div class="flex flex-wrap gap-2">
          <button v-for="f in levelFilters" :key="f.value"
            @click="levelFilter = f.value"
            class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
            :style="levelFilter === f.value
              ? 'background:rgba(52,211,153,0.15); color:#059669; border:1px solid rgba(52,211,153,0.4);'
              : 'background:transparent; color:var(--color-text-secondary); border:1px solid var(--color-border);'"
          >{{ f.label }}</button>
        </div>
      </div>

      <!-- Job cards -->
      <div class="flex flex-col gap-5">
        <article
          v-for="job in filtered"
          :key="job.id"
          class="rounded-2xl p-6 transition-all duration-200"
          :style="`background: var(--card-bg); border: 1px solid ${job.featured ? 'rgba(234,179,8,0.3)' : 'var(--card-border)'};`"
          onmouseover="this.style.transform='translateY(-2px)'"
          onmouseout="this.style.transform='translateY(0)'"
        >
          <div class="flex flex-wrap gap-4 items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <span v-if="job.featured" class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                  style="background:rgba(234,179,8,0.15); color:#EAB308; border:1px solid rgba(234,179,8,0.3);">Featured</span>
                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                  :style="locationTypeStyle(job.locationType)">{{ job.locationType }}</span>
                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                  style="background:rgba(52,211,153,0.1); color:#059669; border:1px solid rgba(52,211,153,0.25);">{{ job.level }}</span>
              </div>
              <h3 class="font-display font-bold text-base mb-0.5" style="color:var(--color-text);">{{ job.role }}</h3>
              <p class="text-sm font-semibold" style="color:var(--color-primary-soft);">{{ job.company }}</p>
            </div>
            <a :href="job.url" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white flex-shrink-0 transition-all duration-200"
              style="background: var(--gradient-btn);">Apply Now</a>
          </div>

          <p class="text-sm mb-4" style="color:var(--color-text-secondary);">{{ job.description }}</p>

          <div class="flex flex-wrap items-center gap-3">
            <div class="flex items-center gap-1.5 text-xs" style="color:var(--color-text-muted);">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {{ job.location }}
            </div>
            <div class="flex items-center gap-1.5 text-xs" style="color:var(--color-text-muted);">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Posted {{ formatDate(job.posted) }}
            </div>
            <div class="flex flex-wrap gap-1.5 ml-auto">
              <span v-for="tag in job.tags" :key="tag"
                class="text-[10px] font-semibold px-2 py-[2px] rounded"
                style="background:rgba(8,145,178,0.1); color:var(--color-primary-soft);">{{ tag }}</span>
            </div>
          </div>
        </article>

        <div v-if="filtered.length === 0" class="text-center py-16" style="color:var(--color-text-muted);">
          <p class="text-lg font-semibold">No jobs match your filters</p>
        </div>
      </div>

      <!-- Post a job CTA -->
      <div class="mt-12 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4"
        style="background: var(--card-bg); border: 1px solid rgba(234,179,8,0.35);">
        <div>
          <p class="font-semibold" style="color:var(--color-text);">Hiring C++ engineers?</p>
          <p class="text-sm mt-0.5" style="color:var(--color-text-secondary);">Reach 1,000+ C++ developers in India. Post a job or become a sponsor.</p>
        </div>
        <a :href="`mailto:${SITE.email}`"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm flex-shrink-0"
          style="background:rgba(234,179,8,0.12); color:#EAB308; border:1px solid rgba(234,179,8,0.3);">Post a Job Listing</a>
      </div>

    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import jobsData from '@/data/jobs.json'
import { SITE } from '@/constants'

useHead({
  title: 'C++ Jobs Board | CppIndia',
  description: 'Curated C++ job listings for Indian developers — remote, hybrid, and onsite roles from top companies.',
})

const locationFilters = [
  { value: 'all',    label: 'All Locations' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'Onsite' },
]
const levelFilters = [
  { value: 'all',    label: 'All Levels' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid',    label: 'Mid' },
  { value: 'senior', label: 'Senior' },
]

const query       = ref('')
const locFilter   = ref('all')
const levelFilter = ref('all')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return jobsData.filter(j => {
    const locOk   = locFilter.value   === 'all' || j.locationType === locFilter.value
    const levelOk = levelFilter.value === 'all' || j.level         === levelFilter.value
    if (!locOk || !levelOk) return false
    if (!q) return true
    return (
      j.role?.toLowerCase().includes(q) ||
      j.company?.toLowerCase().includes(q) ||
      j.description?.toLowerCase().includes(q) ||
      j.location?.toLowerCase().includes(q) ||
      j.tags?.some(t => t.toLowerCase().includes(q))
    )
  })
})

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
}

function locationTypeStyle(t) {
  if (t === 'remote') return 'background:rgba(52,211,153,0.12); color:#059669; border:1px solid rgba(52,211,153,0.3);'
  if (t === 'hybrid') return 'background:rgba(34,211,238,0.1); color:#22D3EE; border:1px solid rgba(34,211,238,0.25);'
  return 'background:rgba(8,145,178,0.12); color:var(--color-primary-soft); border:1px solid rgba(8,145,178,0.25);'
}
</script>
