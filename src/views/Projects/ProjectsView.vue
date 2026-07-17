<template>
  <div>
  <PageHero
    overline="Open Source"
    title="Community Projects"
    subtitle="Open-source C++ projects built and maintained by CppIndia members. Fork, contribute, and build."
  />

  <section class="section" style="background: #07091C;">
    <div class="container">

      <!-- Tag filter -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button v-for="tag in allTags" :key="tag"
          @click="activeTag = tag"
          class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
          :style="activeTag === tag
            ? 'background:rgba(99,102,241,0.2); color:#818CF8; border:1px solid rgba(99,102,241,0.45);'
            : 'background:transparent; color:rgba(148,163,184,0.6); border:1px solid rgba(99,102,241,0.15);'"
        >{{ tag }}</button>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="proj in filtered"
          :key="proj.id"
          class="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200"
          :style="`background: rgba(15,17,45,0.85); border: 1px solid ${proj.featured ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.18)'};`"
          onmouseover="this.style.borderColor='rgba(99,102,241,0.5)'; this.style.boxShadow='0 0 24px rgba(99,102,241,0.15)'; this.style.transform='translateY(-3px)'"
          onmouseout="this.style.borderColor='rgba(99,102,241,0.18)'; this.style.boxShadow='none'; this.style.transform='translateY(0)'"
        >
          <!-- Header -->
          <div class="flex items-start justify-between gap-2">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:#818CF8;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                <span v-if="proj.featured" class="text-[9px] font-bold uppercase px-1.5 py-[1px] rounded" style="background:rgba(99,102,241,0.2); color:#818CF8;">Featured</span>
              </div>
              <h3 class="font-display font-bold text-base" style="color:#E2E8F5;">{{ proj.name }}</h3>
              <p class="text-xs mt-0.5" style="color:rgba(148,163,184,0.5);">by {{ proj.owner }}</p>
            </div>
            <!-- Stars -->
            <div class="flex items-center gap-1 flex-shrink-0 text-xs font-semibold px-2 py-1 rounded-lg" style="background:rgba(234,179,8,0.1); color:#EAB308; border:1px solid rgba(234,179,8,0.2);">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              {{ proj.starCount }}
            </div>
          </div>

          <p class="text-sm flex-1" style="color:rgba(148,163,184,0.75);">{{ proj.description }}</p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5">
            <span class="text-[10px] font-bold px-2 py-[2px] rounded" style="background:rgba(34,211,238,0.1); color:#22D3EE; border:1px solid rgba(34,211,238,0.2);">{{ proj.language }}</span>
            <span v-for="tag in proj.tags" :key="tag"
              class="text-[10px] font-semibold px-2 py-[2px] rounded"
              style="background:rgba(99,102,241,0.1); color:#818CF8;">{{ tag }}</span>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between mt-auto pt-2">
            <span class="text-xs" style="color:rgba(148,163,184,0.4);">Updated {{ formatDate(proj.lastUpdated) }}</span>
            <a :href="proj.repoUrl" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-150"
              style="color:#818CF8;">
              View on GitHub
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          </div>
        </article>
      </div>

      <!-- Submit CTA -->
      <div class="mt-12 text-center rounded-2xl p-8" style="background: rgba(15,17,45,0.6); border: 1px solid rgba(99,102,241,0.2);">
        <p class="font-semibold mb-1" style="color:#E2E8F5;">Have a C++ project to showcase?</p>
        <p class="text-sm mb-5" style="color:rgba(148,163,184,0.6);">Share it on our Discord and we'll feature it here for the community.</p>
        <a href="https://discord.gg/Wz42tX5" target="_blank" rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
          style="background:#5865F2;">Share on Discord</a>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHero from '@/components/common/PageHero.vue'
import projectsData from '@/data/projects.json'

const allTags = ['All', ...new Set(projectsData.flatMap(p => p.tags))]
const activeTag = ref('All')

const filtered = computed(() =>
  activeTag.value === 'All'
    ? projectsData
    : projectsData.filter(p => p.tags.includes(activeTag.value))
)

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}
</script>
