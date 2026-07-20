<template>
  <div>
    <PageHero
      overline="C++ Learning"
      title="Resources"
      subtitle="Curated C++ references, standards, articles, and community-recommended learning materials."
      :breadcrumb="[{ label: 'Resources', path: '/resources' }]"
    />

    <section class="section" style="background: #0B0D2E;">
      <div class="container">

        <!-- Search -->
        <div class="mb-10">
          <SearchBar v-model="query" placeholder="Search resources, articles, newsletters…" :dark="true" />
          <p v-if="query" class="text-xs mt-2" style="color:rgba(148,163,184,0.5);">
            <span v-if="totalResults > 0">{{ totalResults }} result{{ totalResults !== 1 ? 's' : '' }} for "<span style="color:#E2E8F5;">{{ query }}</span>"</span>
            <span v-else>No results for "<span style="color:#E2E8F5;">{{ query }}</span>"</span>
          </p>
        </div>

        <!-- References -->
        <div v-if="!query || filteredReferences.length" id="references" class="mb-14">
          <h2 class="font-display text-xl lg:text-3xl font-bold mb-6 pb-4"
            style="background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; border-bottom: 2px solid rgba(99,102,241,0.2);">
            C++ Language &amp; References
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <a
              v-for="r in filteredReferences"
              :key="r.id"
              :href="r.url"
              class="flex flex-col gap-3 p-6 rounded-xl transition-all duration-200"
              style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(99,102,241,0.45)'; this.style.boxShadow='0 0 20px rgba(99,102,241,0.15)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(99,102,241,0.2)'; this.style.boxShadow='none'"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.04em]"
                  style="background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2); color: rgba(148,163,184,0.65);">{{ r.type }}</span>
                <span v-if="r.free" class="px-2 py-0.5 rounded text-[10px] font-bold"
                  style="background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); color: #34D399;">Free</span>
              </div>
              <h3 class="font-display text-base font-bold leading-snug" style="color: #E2E8F5;">{{ r.title }}</h3>
              <p class="text-sm leading-relaxed flex-1" style="color: rgba(148,163,184,0.75);">{{ r.description }}</p>
              <span class="flex items-center gap-1 text-xs font-semibold mt-auto" style="color: #A78BFA;">
                Open resource
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </a>
          </div>
        </div>

        <!-- Articles -->
        <div v-if="!query || filteredArticles.length" id="articles" class="mb-14">
          <h2 class="font-display text-xl lg:text-3xl font-bold mb-6 pb-4"
            style="background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; border-bottom: 2px solid rgba(99,102,241,0.2);">
            Articles &amp; Blogs
          </h2>
          <div v-if="filteredArticles.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <a
              v-for="r in filteredArticles"
              :key="r.id"
              :href="r.url"
              class="flex flex-col gap-3 p-6 rounded-xl transition-all duration-200"
              style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(99,102,241,0.45)'; this.style.boxShadow='0 0 20px rgba(99,102,241,0.15)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(99,102,241,0.2)'; this.style.boxShadow='none'"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.04em]"
                  style="background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2); color: rgba(148,163,184,0.65);">{{ r.type }}</span>
                <span v-if="r.free" class="px-2 py-0.5 rounded text-[10px] font-bold"
                  style="background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); color: #34D399;">Free</span>
              </div>
              <h3 class="font-display text-base font-bold leading-snug" style="color: #E2E8F5;">{{ r.title }}</h3>
              <p class="text-sm leading-relaxed flex-1" style="color: rgba(148,163,184,0.75);">{{ r.description }}</p>
            </a>
          </div>
          <div v-else class="p-8 rounded-xl text-base leading-relaxed"
            style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2); color: rgba(148,163,184,0.75);">
            <p>Community-curated articles coming soon. Check out the
              <a :href="SITE.social.github" target="_blank" rel="noopener noreferrer"
                style="color: #A78BFA;"
                class="underline transition-colors"
                onmouseover="this.style.color='#818CF8'"
                onmouseout="this.style.color='#A78BFA'"
              >GitHub repo</a>
              for session materials from past talks.
            </p>
          </div>
        </div>

        <!-- Newsletter Archive -->
        <div v-if="!query || filteredNewsletters.length" id="newsletter" class="mb-14">
          <h2 class="font-display text-xl lg:text-3xl font-bold mb-6 pb-4"
            style="background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; border-bottom: 2px solid rgba(99,102,241,0.2);">
            Newsletter Archive
          </h2>
          <!-- Subscribe CTA -->
          <div class="rounded-xl p-5 mb-6 flex flex-wrap items-center justify-between gap-4"
            style="background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(34,211,238,0.05)); border: 1px solid rgba(99,102,241,0.2);">
            <div>
              <p class="font-semibold text-sm" style="color:#E2E8F5;">Get the next issue in your inbox</p>
              <p class="text-xs mt-0.5" style="color:rgba(148,163,184,0.65);">Monthly newsletter — no spam, unsubscribe anytime.</p>
            </div>
            <a :href="SITE.discordInvite" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white flex-shrink-0"
              style="background: linear-gradient(135deg, #6366F1, #818CF8);">
              Join Discord to Subscribe
            </a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <a
              v-for="nl in filteredNewsletters"
              :key="nl.id"
              :href="nl.url"
              class="flex flex-col gap-3 p-6 rounded-xl transition-all duration-200"
              style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(99,102,241,0.45)'; this.style.boxShadow='0 0 20px rgba(99,102,241,0.15)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(99,102,241,0.2)'; this.style.boxShadow='none'"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono px-2 py-0.5 rounded" style="background:rgba(99,102,241,0.12); color:#818CF8;">#{{ nl.issueNumber }}</span>
                <time class="text-xs font-mono" style="color:rgba(148,163,184,0.5);">{{ formatDate(nl.date) }}</time>
              </div>
              <h3 class="font-display font-bold text-sm leading-snug" style="color:#E2E8F5;">{{ nl.title }}</h3>
              <p class="text-xs flex-1" style="color:rgba(148,163,184,0.7);">{{ nl.summary }}</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="h in nl.highlights" :key="h"
                  class="text-[10px] font-semibold px-2 py-[2px] rounded-full"
                  style="background:rgba(34,211,238,0.08); color:#22D3EE; border:1px solid rgba(34,211,238,0.2);">
                  {{ h }}
                </span>
              </div>
              <span class="inline-flex items-center gap-1.5 text-xs font-semibold mt-auto" style="color:#818CF8;">
                Read Issue
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </a>
          </div>
        </div>

        <!-- Monthly picks -->
        <div id="monthly">
          <h2 class="font-display text-xl lg:text-3xl font-bold mb-6 pb-4"
            style="background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; border-bottom: 2px solid rgba(99,102,241,0.2);">
            Book / Blog / Video of the Month
          </h2>
          <div class="p-8 rounded-xl text-base leading-relaxed"
            style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2); color: rgba(148,163,184,0.75);">
            <p>Monthly community picks are shared on our
              <a :href="SITE.social.discord" target="_blank" rel="noopener noreferrer"
                style="color: #A78BFA;"
                class="underline transition-colors"
                onmouseover="this.style.color='#818CF8'"
                onmouseout="this.style.color='#A78BFA'"
              >Discord server</a>
              and
              <a :href="SITE.social.linkedin" target="_blank" rel="noopener noreferrer"
                style="color: #A78BFA;"
                class="underline transition-colors"
                onmouseover="this.style.color='#818CF8'"
                onmouseout="this.style.color='#A78BFA'"
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
import resourcesData from '@/data/resources.json'
import newsletters from '@/data/newsletters.json'
import { SITE } from '@/constants'

useHead({
  title: 'C++ Resources | CppIndia',
  description: 'Curated C++ standards, references, articles, and community-recommended learning materials.',
})

const resources = resourcesData
const query     = ref('')

function matches(item) {
  const q = query.value.trim().toLowerCase()
  if (!q) return true
  return (
    item.title?.toLowerCase().includes(q) ||
    item.description?.toLowerCase().includes(q) ||
    item.summary?.toLowerCase().includes(q) ||
    item.type?.toLowerCase().includes(q) ||
    item.highlights?.some(h => h.toLowerCase().includes(q))
  )
}

const filteredReferences  = computed(() => resources.references.filter(matches))
const filteredArticles    = computed(() => resources.articles.filter(matches))
const filteredNewsletters = computed(() => newsletters.filter(matches))
const totalResults        = computed(() =>
  filteredReferences.value.length + filteredArticles.value.length + filteredNewsletters.value.length
)

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
}
</script>
