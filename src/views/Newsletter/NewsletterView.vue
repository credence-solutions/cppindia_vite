<template>
  <PageHero
    overline="Stay Informed"
    title="Newsletter Archive"
    subtitle="Every edition of the CppIndia newsletter — C++ news, community updates, and curated resources."
  />

  <section class="section" style="background: #07091C;">
    <div class="container">

      <!-- Subscribe CTA -->
      <div class="rounded-2xl p-6 mb-12 flex flex-wrap items-center justify-between gap-4"
        style="background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(34,211,238,0.06)); border: 1px solid rgba(99,102,241,0.25);">
        <div>
          <p class="font-semibold" style="color:#E2E8F5;">Get the next issue in your inbox</p>
          <p class="text-sm mt-0.5" style="color:rgba(148,163,184,0.65);">Monthly newsletter — no spam, unsubscribe anytime.</p>
        </div>
        <a href="https://discord.gg/Wz42tX5" target="_blank" rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white flex-shrink-0"
          style="background: linear-gradient(135deg, #6366F1, #818CF8);">
          Join Discord to Subscribe
        </a>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="nl in newsletters"
          :key="nl.id"
          class="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200"
          style="background: rgba(15,17,45,0.85); border: 1px solid rgba(99,102,241,0.18);"
          onmouseover="this.style.borderColor='rgba(99,102,241,0.4)'; this.style.transform='translateY(-3px)'"
          onmouseout="this.style.borderColor='rgba(99,102,241,0.18)'; this.style.transform='translateY(0)'"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono px-2 py-0.5 rounded" style="background:rgba(99,102,241,0.12); color:#818CF8;">#{{ nl.issueNumber }}</span>
            <time class="text-xs font-mono" style="color:rgba(148,163,184,0.5);">{{ formatDate(nl.date) }}</time>
          </div>
          <h3 class="font-display font-bold text-base leading-snug" style="color:#E2E8F5;">{{ nl.title }}</h3>
          <p class="text-sm flex-1" style="color:rgba(148,163,184,0.7);">{{ nl.summary }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="h in nl.highlights" :key="h"
              class="text-[10px] font-semibold px-2 py-[2px] rounded-full"
              style="background:rgba(34,211,238,0.08); color:#22D3EE; border:1px solid rgba(34,211,238,0.2);">
              {{ h }}
            </span>
          </div>
          <a :href="nl.url" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-sm font-semibold mt-auto transition-colors duration-150"
            style="color:#818CF8;">
            Read Issue
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </article>
      </div>

    </div>
  </section>
</template>

<script setup>
import PageHero from '@/components/common/PageHero.vue'
import newsletters from '@/data/newsletters.json'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
}
</script>
