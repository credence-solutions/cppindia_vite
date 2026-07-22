<template>
  <div>
  <PageHero
    overline="Support CppIndia"
    title="Become a Sponsor"
    subtitle="Help keep India's C++ community free — free talks, free conferences, free resources for everyone."
    :breadcrumb="[{ label: 'Sponsors', path: '/sponsors' }]"
  />

  <section class="section--sm" style="background: var(--emphasis-bg);">
    <div class="container">

      <!-- Reach strip -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <div v-for="stat in sponsorship.stats" :key="stat.label"
          class="text-center rounded-2xl p-6"
          style="background: var(--card-bg); border: 1px solid var(--card-border);">
          <div class="text-3xl font-bold font-display mb-1" style="color:var(--color-primary-soft);">{{ stat.value }}</div>
          <div class="text-sm" style="color:var(--color-text-secondary);">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Why sponsor -->
      <div class="text-center mb-12">
        <p class="text-xs font-bold uppercase tracking-[0.14em] mb-2" style="color: var(--color-secondary-mid);">Why It Matters</p>
        <h2 class="font-display font-bold mb-3 text-gradient-heading" style="font-size: clamp(1.4rem,3vw,2rem);">Reach India's Top C++ Talent</h2>
        <p class="text-sm mx-auto" style="max-width:600px; color:var(--color-text-secondary);">CppIndia connects you with senior engineers, students, and decision-makers who live and breathe C++. Your sponsorship keeps everything free for everyone.</p>
      </div>

      <!-- Tier cards -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
        <div
          v-for="tier in sponsorship.tiers"
          :key="tier.id"
          class="rounded-2xl p-6 flex flex-col gap-5 relative transition-all duration-200"
          :style="tier.featured
            ? `background: var(--card-bg); border: 2px solid ${tierStyle(tier.id).border}; box-shadow: 0 0 40px ${tierStyle(tier.id).glow};`
            : `background: var(--card-bg); border: 1px solid var(--card-border);`"
        >
          <!-- Featured badge -->
          <div v-if="tier.featured" class="absolute -top-3 left-1/2 -translate-x-1/2">
            <span class="text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full"
              :style="`background:${tierStyle(tier.id).badge}; color:${tierStyle(tier.id).text}; border:1px solid ${tierStyle(tier.id).border};`">
              Most Popular
            </span>
          </div>

          <!-- Header -->
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full"
                :style="`background:${tierStyle(tier.id).badge}; color:${tierStyle(tier.id).text};`">
                {{ tier.name }}
              </span>
            </div>
            <div class="font-display font-extrabold text-3xl" :style="`color:${tierStyle(tier.id).text};`">
              {{ tier.price }}
              <span class="text-sm font-normal" style="color:var(--color-text-muted);">/yr</span>
            </div>
            <p class="text-xs mt-1 font-medium" :style="`color:${tierStyle(tier.id).text}; opacity:0.8;`">{{ tier.tagline }}</p>
          </div>

          <p class="text-sm" style="color:var(--color-text-secondary);">{{ tier.description }}</p>

          <!-- Benefits -->
          <ul class="flex flex-col gap-2 flex-1">
            <li v-for="b in tier.benefits" :key="b.text"
              class="flex items-start gap-2 text-sm"
              :style="b.included ? 'color:var(--color-text-secondary);' : 'color:var(--color-text-muted); opacity:0.5;'">
              <svg v-if="b.included" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="flex-shrink-0 mt-0.5" :style="`color:${tierStyle(tier.id).text};`"><polyline points="20 6 9 17 4 12"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="flex-shrink-0 mt-0.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              <span>{{ b.text }}<span v-if="b.included && b.detail" class="ml-1 text-[10px] font-semibold px-1.5 py-0.5 rounded" :style="`background:${tierStyle(tier.id).badge}; color:${tierStyle(tier.id).text};`">{{ b.detail }}</span></span>
            </li>
          </ul>

          <a href="mailto:info@cppindia.co.in?subject=Sponsorship%20Enquiry%20—%20{{ tier.name }}%20Tier"
            class="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200"
            :style="tier.featured
              ? `background:${tierStyle(tier.id).badge}; color:${tierStyle(tier.id).text}; border:1px solid ${tierStyle(tier.id).border};`
              : `background:transparent; color:${tierStyle(tier.id).text}; border:1px solid ${tierStyle(tier.id).border};`"
          >
            Get Started
          </a>
        </div>
      </div>

      <!-- Comparison note -->
      <p class="text-center text-xs mb-16" style="color:var(--color-text-muted);">
        Custom packages available for unique goals and budgets.
        <a href="mailto:info@cppindia.co.in" class="underline ml-1" style="color:var(--color-primary-soft);">Contact us to discuss.</a>
      </p>

      <!-- Past sponsors by year -->
      <div class="mb-16">
        <h2 class="font-display text-xl font-bold text-center mb-3" style="color:var(--color-text);">Companies That Have Supported Us</h2>
        <p class="text-sm text-center mb-8" style="color:var(--color-text-muted);">Past and present sponsors of CppIndiaCon</p>

        <div v-for="year in sponsorYears" :key="year" class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-xs font-bold uppercase tracking-[0.1em]" style="color:var(--color-text-muted);">CppIndiaCon {{ year }}</span>
            <span class="flex-1 h-px" style="background:var(--color-border);"></span>
          </div>
          <div class="flex flex-wrap gap-3">
            <!-- Gold -->
            <a v-for="s in sponsorsByYear(year, 'gold')" :key="s.id"
              :href="s.url" target="_blank" rel="noopener noreferrer"
              class="flex items-center justify-center rounded-xl px-5 py-3 transition-all duration-200"
              style="background: var(--card-bg); border:1px solid rgba(234,179,8,0.35);"
              onmouseover="this.style.borderColor='rgba(234,179,8,0.7)'; this.style.boxShadow='0 0 16px rgba(234,179,8,0.12)'"
              onmouseout="this.style.borderColor='rgba(234,179,8,0.35)'; this.style.boxShadow='none'"
            >
              <img v-if="s.logo" :src="s.logo" :alt="s.name" class="h-6 w-auto object-contain" @error="e => e.target.style.display='none'" />
              <span v-else class="font-bold text-sm" style="color:#B45309;">{{ s.name }}</span>
            </a>
            <!-- Community -->
            <a v-for="s in sponsorsByYear(year, 'community')" :key="s.id"
              :href="s.url" target="_blank" rel="noopener noreferrer"
              class="flex items-center justify-center rounded-xl px-5 py-3 transition-all duration-200"
              style="background:var(--card-bg); border:1px solid var(--card-border);"
              onmouseover="this.style.borderColor='rgba(8,145,178,0.4)'; this.style.boxShadow='0 0 12px rgba(8,145,178,0.08)'"
              onmouseout="this.style.borderColor='var(--card-border)'; this.style.boxShadow='none'"
            >
              <img v-if="s.logo" :src="s.logo" :alt="s.name" class="h-5 w-auto object-contain" @error="e => e.target.style.display='none'" />
              <span v-else class="font-medium text-sm" style="color:var(--color-text-secondary);">{{ s.name }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center rounded-2xl p-6 sm:p-10"
        style="background: linear-gradient(135deg, rgba(8,145,178,0.1) 0%, rgba(34,211,238,0.06) 100%); border: 1px solid rgba(8,145,178,0.25);">
        <h3 class="font-display font-bold text-xl mb-2" style="color:var(--color-text);">Ready to partner with CppIndia?</h3>
        <p class="text-sm mb-6 mx-auto" style="color:var(--color-text-secondary); max-width:500px;">We'll customise a package for your budget and goals. Get in touch and we'll respond within 2 business days.</p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:info@cppindia.co.in"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200"
            style="background: var(--gradient-btn);">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email info@cppindia.co.in
          </a>
          <RouterLink to="/press"
            class="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
            style="background:rgba(8,145,178,0.08); color:var(--color-primary-soft); border:1px solid rgba(8,145,178,0.25);"
            onmouseover="this.style.background='rgba(8,145,178,0.15)'"
            onmouseout="this.style.background='rgba(8,145,178,0.08)'">
            Download Media Kit →
          </RouterLink>
        </div>
      </div>

    </div>
  </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import sponsorsData from '@/data/sponsors.json'
import sponsorship from '@/data/sponsorship.json'

useHead({
  title: 'Become a Sponsor | CppIndia',
  description: 'Support India\'s C++ community. View sponsorship tiers — Bronze, Silver, Gold — and reach 1,000+ C++ engineers.',
})

const sponsorYears = [2024, 2023, 2022, 2021]

function sponsorsByYear(year, type) {
  return sponsorsData.filter(s => s.conference === year && s.type === type)
}

const tierStyles = {
  bronze: {
    border: 'rgba(180,83,9,0.45)',
    badge:  'rgba(180,83,9,0.15)',
    text:   '#B45309',
    glow:   'rgba(180,83,9,0.08)',
  },
  silver: {
    border: 'rgba(148,163,184,0.4)',
    badge:  'rgba(148,163,184,0.12)',
    text:   '#475569',
    glow:   'rgba(148,163,184,0.06)',
  },
  gold: {
    border: 'rgba(234,179,8,0.55)',
    badge:  'rgba(234,179,8,0.15)',
    text:   '#92400E',
    glow:   'rgba(234,179,8,0.18)',
  },
}

function tierStyle(id) {
  return tierStyles[id] ?? tierStyles.bronze
}
</script>
