<template>
  <div>
    <PageHero
      overline="C++ Learning"
      title="Resources"
      subtitle="Curated C++ references, standards, articles, and community-recommended learning materials."
      :breadcrumb="[{ label: 'Resources', path: '/resources' }]"
    />

    <section class="section--sm" style="background: var(--emphasis-bg);">
      <div class="container">

        <!-- Search + level filter -->
        <div class="mb-10 flex flex-col gap-4">
          <SearchBar v-model="query" placeholder="Search resources, articles, newsletters…" />
          <div class="flex items-center gap-2 flex-wrap">
            <button
              v-for="lvl in levels" :key="lvl.value"
              @click="activeLevel = lvl.value"
              class="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150"
              :style="activeLevel === lvl.value
                ? `background:${lvl.bg}; color:${lvl.color}; border:1px solid ${lvl.border};`
                : 'background:transparent; color:var(--color-text-secondary); border:1px solid var(--color-border);'"
            >{{ lvl.label }}</button>
          </div>
          <p v-if="query || activeLevel !== 'all'" class="text-xs" style="color: var(--card-text-muted);">
            <span v-if="totalResults > 0">{{ totalResults }} result{{ totalResults !== 1 ? 's' : '' }}</span>
            <span v-else>No results match your filters.</span>
          </p>
        </div>

        <!-- References -->
        <div v-if="!query || filteredReferences.length" id="references" class="mb-14">
          <h2 class="font-display text-xl lg:text-3xl font-bold mb-6 pb-4 text-gradient-heading border-b-2 border-wire-light">
            C++ Language &amp; References
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <a
              v-for="r in filteredReferences"
              :key="r.id"
              :href="r.url"
              class="flex flex-col gap-3 p-6 rounded-xl transition-all duration-200"
              style="background: var(--card-bg); border: 1px solid var(--card-border);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(8,145,178,0.45)'; this.style.boxShadow='0 0 20px rgba(8,145,178,0.15)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='var(--card-border)'; this.style.boxShadow='none'"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.04em]"
                  style="background: rgba(8,145,178,0.1); border: 1px solid rgba(8,145,178,0.2); color: var(--color-text-muted);">{{ r.type }}</span>
                <div class="flex items-center gap-1.5">
                  <span v-if="r.level" class="px-2 py-0.5 rounded text-[10px] font-bold" :style="levelStyle(r.level)">{{ r.level }}</span>
                  <span v-if="r.free" class="px-2 py-0.5 rounded text-[10px] font-bold"
                    style="background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); color: #059669;">Free</span>
                </div>
              </div>
              <h3 class="font-display text-base font-bold leading-snug" style="color: var(--card-text);">{{ r.title }}</h3>
              <p class="text-sm leading-relaxed flex-1" style="color: var(--card-text-muted);">{{ r.description }}</p>
              <span class="flex items-center gap-1 text-xs font-semibold mt-auto" style="color: var(--color-secondary-mid);">
                Open resource
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </a>
          </div>
        </div>

        <!-- Articles -->
        <div v-if="!query || filteredArticles.length" id="articles" class="mb-14">
          <h2 class="font-display text-xl lg:text-3xl font-bold mb-6 pb-4 text-gradient-heading border-b-2 border-wire-light">
            Articles &amp; Blogs
          </h2>
          <div v-if="filteredArticles.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <a
              v-for="r in filteredArticles"
              :key="r.id"
              :href="r.url"
              class="flex flex-col gap-3 p-6 rounded-xl transition-all duration-200"
              style="background: var(--card-bg); border: 1px solid var(--card-border);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(8,145,178,0.45)'; this.style.boxShadow='0 0 20px rgba(8,145,178,0.15)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='var(--card-border)'; this.style.boxShadow='none'"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.04em]"
                  style="background: rgba(8,145,178,0.1); border: 1px solid rgba(8,145,178,0.2); color: var(--color-text-muted);">{{ r.type }}</span>
                <div class="flex items-center gap-1.5">
                  <span v-if="r.level" class="px-2 py-0.5 rounded text-[10px] font-bold" :style="levelStyle(r.level)">{{ r.level }}</span>
                  <span v-if="r.free" class="px-2 py-0.5 rounded text-[10px] font-bold"
                    style="background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); color: #059669;">Free</span>
                </div>
              </div>
              <h3 class="font-display text-base font-bold leading-snug" style="color: var(--card-text);">{{ r.title }}</h3>
              <p class="text-sm leading-relaxed flex-1" style="color: var(--card-text-muted);">{{ r.description }}</p>
            </a>
          </div>
          <div v-else class="p-8 rounded-xl text-base leading-relaxed"
            style="background: var(--card-bg); border: 1px solid var(--card-border); color: var(--card-text-muted);">
            <p>Community-curated articles coming soon. Check out the
              <a :href="SITE.social.github" target="_blank" rel="noopener noreferrer"
                style="color: var(--color-secondary-mid);"
                class="underline transition-colors"
                onmouseover="this.style.color='var(--color-primary-soft)'"
                onmouseout="this.style.color='var(--color-secondary-mid)'"
              >GitHub repo</a>
              for session materials from past talks.
            </p>
          </div>
        </div>

        <!-- Newsletter Archive -->
        <div v-if="!query || filteredNewsletters.length" id="newsletter" class="mb-14">
          <h2 class="font-display text-xl lg:text-3xl font-bold mb-6 pb-4 text-gradient-heading border-b-2 border-wire-light">
            Newsletter Archive
          </h2>
          <!-- Subscribe CTA -->
          <div class="rounded-xl p-5 mb-6 flex flex-wrap items-center justify-between gap-4"
            style="background: linear-gradient(135deg, rgba(8,145,178,0.08), rgba(34,211,238,0.05)); border: 1px solid rgba(8,145,178,0.2);">
            <div>
              <p class="font-semibold text-sm" style="color: var(--card-text);">Get the next issue in your inbox</p>
              <p class="text-xs mt-0.5" style="color: var(--card-text-muted);">Monthly newsletter — no spam, unsubscribe anytime.</p>
            </div>
            <a :href="SITE.discordInvite" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white flex-shrink-0"
              style="background: var(--gradient-btn);">
              Join Discord to Subscribe
            </a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <a
              v-for="nl in filteredNewsletters"
              :key="nl.id"
              :href="nl.url"
              class="flex flex-col gap-3 p-6 rounded-xl transition-all duration-200"
              style="background: var(--card-bg); border: 1px solid var(--card-border);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(8,145,178,0.45)'; this.style.boxShadow='0 0 20px rgba(8,145,178,0.15)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='var(--card-border)'; this.style.boxShadow='none'"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono px-2 py-0.5 rounded" style="background:rgba(8,145,178,0.12); color:var(--color-primary-soft);">#{{ nl.issueNumber }}</span>
                <time class="text-xs font-mono" style="color: var(--card-text-muted);">{{ formatDate(nl.date) }}</time>
              </div>
              <h3 class="font-display font-bold text-sm leading-snug" style="color: var(--card-text);">{{ nl.title }}</h3>
              <p class="text-xs flex-1" style="color: var(--card-text-muted);">{{ nl.summary }}</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="h in nl.highlights" :key="h"
                  class="text-[10px] font-semibold px-2 py-[2px] rounded-full"
                  style="background:rgba(34,211,238,0.08); color:#22D3EE; border:1px solid rgba(34,211,238,0.2);">
                  {{ h }}
                </span>
              </div>
              <span class="inline-flex items-center gap-1.5 text-xs font-semibold mt-auto" style="color:var(--color-primary-soft);">
                Read Issue
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </a>
          </div>
        </div>

        <!-- Newsletter signup -->
        <div class="mb-14">
          <NewsletterSignup :showArchive="false" />
        </div>

        <!-- Monthly picks -->
        <div id="monthly">
          <h2 class="font-display text-xl lg:text-3xl font-bold mb-6 pb-4 text-gradient-heading border-b-2 border-wire-light">
            Book / Blog / Video of the Month
          </h2>
          <div class="p-8 rounded-xl text-base leading-relaxed"
            style="background: var(--card-bg); border: 1px solid var(--card-border); color: var(--card-text-muted);">
            <p>Monthly community picks are shared on our
              <a :href="SITE.social.discord" target="_blank" rel="noopener noreferrer"
                style="color: var(--color-secondary-mid);"
                class="underline transition-colors"
                onmouseover="this.style.color='var(--color-primary-soft)'"
                onmouseout="this.style.color='var(--color-secondary-mid)'"
              >Discord server</a>
              and
              <a :href="SITE.social.linkedin" target="_blank" rel="noopener noreferrer"
                style="color: var(--color-secondary-mid);"
                class="underline transition-colors"
                onmouseover="this.style.color='var(--color-primary-soft)'"
                onmouseout="this.style.color='var(--color-secondary-mid)'"
              >LinkedIn</a>.
              Join us to stay updated!
            </p>
          </div>
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
import NewsletterSignup from '@/components/common/NewsletterSignup.vue'
import resourcesData from '@/data/resources.json'
import newsletters from '@/data/newsletters.json'
import { SITE } from '@/constants'

useHead({
  title: 'C++ Resources | CppIndia',
  description: 'Curated C++ standards, references, articles, and community-recommended learning materials.',
})

const resources = resourcesData
const query      = ref('')
const activeLevel = ref('all')

const levels = [
  { value: 'all',          label: 'All Levels',   bg: 'rgba(8,145,178,0.15)',  color: 'var(--color-primary-soft)', border: 'rgba(8,145,178,0.4)'  },
  { value: 'beginner',     label: 'Beginner',     bg: 'rgba(52,211,153,0.15)', color: '#059669',                   border: 'rgba(52,211,153,0.4)' },
  { value: 'intermediate', label: 'Intermediate', bg: 'rgba(251,191,36,0.15)', color: '#D97706',                   border: 'rgba(251,191,36,0.4)' },
  { value: 'advanced',     label: 'Advanced',     bg: 'rgba(239,68,68,0.12)',  color: '#DC2626',                   border: 'rgba(239,68,68,0.35)' },
]

function matches(item) {
  const q = query.value.trim().toLowerCase()
  const levelOk = activeLevel.value === 'all' || item.level === activeLevel.value
  if (!levelOk) return false
  if (!q) return true
  return (
    item.title?.toLowerCase().includes(q) ||
    item.description?.toLowerCase().includes(q) ||
    item.summary?.toLowerCase().includes(q) ||
    item.type?.toLowerCase().includes(q) ||
    item.highlights?.some(h => h.toLowerCase().includes(q)) ||
    (item.free && 'free'.includes(q))
  )
}

const filteredReferences  = computed(() => resources.references.filter(matches))
const filteredArticles    = computed(() => resources.articles.filter(matches))
const filteredNewsletters = computed(() => newsletters.filter(matches))
const totalResults        = computed(() =>
  filteredReferences.value.length + filteredArticles.value.length + filteredNewsletters.value.length
)

function levelStyle(level) {
  if (level === 'beginner')     return 'background:rgba(52,211,153,0.1); color:#059669; border:1px solid rgba(52,211,153,0.3);'
  if (level === 'intermediate') return 'background:rgba(251,191,36,0.1); color:#D97706; border:1px solid rgba(251,191,36,0.3);'
  if (level === 'advanced')     return 'background:rgba(239,68,68,0.1); color:#DC2626; border:1px solid rgba(239,68,68,0.3);'
  return ''
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
}
</script>
