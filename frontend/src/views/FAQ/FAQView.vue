<template>
  <div>
  <PageHero
    overline="Community"
    title="Frequently Asked Questions"
    subtitle="Everything you need to know about CppIndia — from joining to speaking to sponsoring."
  />

  <section class="section--sm" style="background: var(--emphasis-bg);">
    <div class="container" style="max-width: 860px;">

      <!-- Category filter -->
      <div class="flex flex-wrap gap-2 mb-10">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
          :style="activeCategory === cat
            ? 'background: rgba(8,145,178,0.25); color: var(--color-primary-soft); border: 1px solid rgba(8,145,178,0.5);'
            : 'background: transparent; color: var(--color-text-secondary); border: 1px solid var(--color-border);'"
        >{{ cat }}</button>
      </div>

      <!-- Accordion -->
      <div class="flex flex-col gap-3">
        <div
          v-for="item in filtered"
          :key="item.id"
          class="rounded-xl overflow-hidden transition-all duration-200"
          style="border: 1px solid var(--card-border); background: var(--card-bg);"
        >
          <button
            class="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
            @click="toggle(item.id)"
          >
            <span class="font-semibold text-base" style="color: var(--color-text);">{{ item.question }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2.5"
              class="flex-shrink-0 transition-transform duration-200"
              :style="open === item.id ? 'color:var(--color-primary-soft); transform:rotate(180deg)' : 'color:var(--color-text-muted)'"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div v-if="open === item.id" class="px-6 pb-5">
            <p class="text-sm leading-relaxed" style="color: var(--color-text-secondary);">{{ item.answer }}</p>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="mt-10 sm:mt-14 text-center rounded-2xl p-5 sm:p-8" style="background: var(--card-bg); border: 1px solid var(--card-border);">
        <p class="font-semibold mb-1" style="color: var(--color-text);">Still have questions?</p>
        <p class="text-sm mb-5" style="color: var(--color-text-secondary);">Ask the community on Discord or reach out to us directly.</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <a :href="SITE.discordInvite" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-200"
            style="background: #5865F2;">Join Discord</a>
          <RouterLink to="/contact"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200"
            style="border: 1px solid rgba(8,145,178,0.3); color: var(--color-primary-soft);">Contact Us</RouterLink>
        </div>
      </div>

    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHero from '@/components/common/PageHero.vue'
import faqData from '@/data/faq.json'
import { SITE } from '@/constants'

const categories = ['All', ...new Set(faqData.map(f => f.category))]
const activeCategory = ref('All')
const open = ref(null)

const filtered = computed(() =>
  activeCategory.value === 'All'
    ? faqData
    : faqData.filter(f => f.category === activeCategory.value)
)

function toggle(id) {
  open.value = open.value === id ? null : id
}
</script>
