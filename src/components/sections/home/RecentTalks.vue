<!--
  RecentTalks — Recent tech talks on homepage
-->
<template>
  <section class="section" style="background: var(--emphasis-bg);">
    <div class="container">

      <!-- Header -->
      <div class="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.14em] mb-2" style="color: #A78BFA;">Community</p>
          <h2 class="font-display font-bold" style="font-size: clamp(1.5rem, 3vw, 2.5rem);">
            <span style="background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Recent Tech Talks</span>
          </h2>
          <p class="text-sm mt-2" style="color: var(--color-text-muted);">
            {{ totalTalks }} sessions recorded &amp; available for free
          </p>
        </div>
        <RouterLink
          to="/tech-talks"
          class="inline-flex items-center gap-1 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 flex-shrink-0"
          style="border: 1px solid rgba(99,102,241,0.3); color: #818CF8; background: transparent;"
          onmouseover="this.style.borderColor='rgba(99,102,241,0.55)'; this.style.background='rgba(99,102,241,0.08)'"
          onmouseout="this.style.borderColor='rgba(99,102,241,0.3)'; this.style.background='transparent'"
        >
          View All Talks
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </RouterLink>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="talk in recentTalks"
          :key="talk.id"
          class="group flex flex-col rounded-2xl overflow-hidden transition-all duration-200"
          style="background: var(--card-bg); border: 1px solid var(--card-border);"
          onmouseover="this.style.borderColor='rgba(99,102,241,0.45)'; this.style.boxShadow='0 0 28px rgba(99,102,241,0.2)'; this.style.transform='translateY(-4px)'"
          onmouseout="this.style.borderColor='rgba(99,102,241,0.2)'; this.style.boxShadow='none'; this.style.transform='translateY(0)'"
        >
          <!-- YouTube thumbnail -->
          <a
            v-if="ytId(talk.video)"
            :href="talk.video"
            class="block relative aspect-video overflow-hidden"
            style="background: var(--emphasis-bg);"
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
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style="background: rgba(7,9,28,0.45);">
              <div class="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
          </a>
          <!-- No-video placeholder -->
          <div v-else class="aspect-video flex items-center justify-center"
            style="background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.06) 100%);">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: rgba(129,140,248,0.3);"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3l-4 4-4-4"/></svg>
          </div>

          <!-- Content -->
          <div class="flex flex-col flex-1 gap-3 p-5">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <time class="font-mono text-xs" style="color: var(--color-text-muted);" :datetime="talk.date">{{ formatDate(talk.date) }}</time>
              <div class="flex items-center gap-1 flex-wrap justify-end">
                <span
                  v-for="tag in talk.tags.slice(0, 2)"
                  :key="tag"
                  class="px-2 py-[2px] rounded-full text-[10px] font-semibold"
                  style="background: rgba(99,102,241,0.12); color: #818CF8; border: 1px solid rgba(99,102,241,0.25);"
                >{{ tag }}</span>
              </div>
            </div>

            <h3 class="font-display font-bold text-base leading-snug flex-1" style="color: var(--color-text);">{{ talk.title }}</h3>
            <p class="text-sm font-medium" style="color: var(--color-text-secondary);">{{ talk.speaker }}</p>

            <!-- Actions -->
            <div class="flex flex-wrap items-center gap-2 mt-auto pt-3">
              <a
                v-if="ytId(talk.video)"
                :href="talk.video"
                class="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white text-xs font-semibold transition-all duration-200"
                style="background: #FF0000;"
                onmouseover="this.style.background='#cc0000'; this.style.boxShadow='0 0 12px rgba(255,0,0,0.4)'"
                onmouseout="this.style.background='#FF0000'; this.style.boxShadow='none'"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Watch on YouTube
              </a>
              <a
                v-if="talk.slides"
                :href="talk.slides"
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-all duration-200"
                style="border: 1px solid var(--card-border); color: var(--color-text-secondary);"
                onmouseover="this.style.borderColor='rgba(139,92,246,0.45)'; this.style.color='#A78BFA'"
                onmouseout="this.style.borderColor='var(--card-border)'; this.style.color='var(--color-text-secondary)'"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                Slides
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-10">
        <RouterLink
          to="/tech-talks"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
          style="border: 1px solid rgba(99,102,241,0.3); color: #818CF8; background: transparent;"
          onmouseover="this.style.borderColor='rgba(99,102,241,0.55)'; this.style.background='rgba(99,102,241,0.08)'"
          onmouseout="this.style.borderColor='rgba(99,102,241,0.3)'; this.style.background='transparent'"
        >
          View All {{ totalTalks }} Talks
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import talksData from '@/data/talks.json'

// Flatten all talks across all years, sort by date descending, take 6
const allTalks = Object.values(talksData).flat()
allTalks.sort((a, b) => new Date(b.date) - new Date(a.date))

const recentTalks = allTalks.slice(0, 6)
const totalTalks = computed(() => allTalks.length)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

function ytId(url) {
  if (!url) return null
  let m = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (m) return m[1]
  m = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (m) return m[1]
  return null
}
</script>
