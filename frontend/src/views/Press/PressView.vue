<template>
  <div>
  <PageHero
    overline="Media Resources"
    title="Press & Media Kit"
    subtitle="Brand assets, key facts, and everything journalists and partners need to cover CppIndia."
    :breadcrumb="[{ label: 'Press Kit', path: '/press' }]"
  />

  <section class="section--sm" style="background: var(--emphasis-bg);">
    <div class="container" style="max-width: 900px;">

      <!-- Quick facts -->
      <div class="mb-14">
        <h2 class="font-display text-lg font-bold mb-6 pb-3 border-b" style="color:var(--color-text); border-color:var(--color-border);">
          Key Facts
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="fact in facts" :key="fact.label"
            class="flex items-start gap-4 p-4 rounded-xl"
            style="background:var(--card-bg); border:1px solid var(--card-border);">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style="background:rgba(8,145,178,0.1); border:1px solid rgba(8,145,178,0.2);">
              <span class="text-sm font-bold" style="color:var(--color-primary-soft);">{{ fact.icon }}</span>
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide mb-0.5" style="color:var(--color-text-muted);">{{ fact.label }}</p>
              <p class="text-sm font-medium" style="color:var(--color-text);">{{ fact.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Brand assets -->
      <div class="mb-14">
        <h2 class="font-display text-lg font-bold mb-6 pb-3 border-b" style="color:var(--color-text); border-color:var(--color-border);">
          Brand Assets
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <!-- Logo preview -->
          <div class="flex flex-col gap-3 p-5 rounded-xl"
            style="background:var(--card-bg); border:1px solid var(--card-border);">
            <div class="flex items-center justify-center h-24 rounded-lg"
              style="background:rgba(8,145,178,0.06); border:1px dashed rgba(8,145,178,0.2);">
              <img src="/assets/images/logo.png" alt="CppIndia Logo" class="h-14 w-auto object-contain" />
            </div>
            <p class="text-xs font-semibold text-center" style="color:var(--color-text);">Primary Logo</p>
            <a href="/assets/images/logo.png" download="cppindia-logo.png"
              class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150"
              style="background:rgba(8,145,178,0.08); color:var(--color-primary-soft); border:1px solid rgba(8,145,178,0.2);"
              onmouseover="this.style.background='rgba(8,145,178,0.15)'"
              onmouseout="this.style.background='rgba(8,145,178,0.08)'">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PNG
            </a>
          </div>

          <!-- Logo on dark -->
          <div class="flex flex-col gap-3 p-5 rounded-xl"
            style="background:var(--card-bg); border:1px solid var(--card-border);">
            <div class="flex items-center justify-center h-24 rounded-lg" style="background:#0B1929; border: 1px solid rgba(255,255,255,0.1);">
              <img src="/assets/images/logo.png" alt="CppIndia Logo on Dark" class="h-14 w-auto object-contain" />
            </div>
            <p class="text-xs font-semibold text-center" style="color:var(--color-text);">Logo on Dark</p>
            <a href="/assets/images/logo.png" download="cppindia-logo.png"
              class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150"
              style="background:rgba(8,145,178,0.08); color:var(--color-primary-soft); border:1px solid rgba(8,145,178,0.2);"
              onmouseover="this.style.background='rgba(8,145,178,0.15)'"
              onmouseout="this.style.background='rgba(8,145,178,0.08)'">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PNG
            </a>
          </div>

          <!-- OG image preview -->
          <div class="flex flex-col gap-3 p-5 rounded-xl"
            style="background:var(--card-bg); border:1px solid var(--card-border);">
            <div class="flex items-center justify-center h-24 rounded-lg overflow-hidden"
              style="background:rgba(8,145,178,0.06); border:1px dashed rgba(8,145,178,0.2);">
              <span class="text-xs font-semibold" style="color:var(--color-text-muted);">Social Preview</span>
            </div>
            <p class="text-xs font-semibold text-center" style="color:var(--color-text);">OG / Social Image</p>
            <a href="/og-image.jpg" download="cppindia-og.jpg"
              class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150"
              style="background:rgba(8,145,178,0.08); color:var(--color-primary-soft); border:1px solid rgba(8,145,178,0.2);"
              onmouseover="this.style.background='rgba(8,145,178,0.15)'"
              onmouseout="this.style.background='rgba(8,145,178,0.08)'">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download JPG
            </a>
          </div>
        </div>
      </div>

      <!-- Brand colors -->
      <div class="mb-14">
        <h2 class="font-display text-lg font-bold mb-6 pb-3 border-b" style="color:var(--color-text); border-color:var(--color-border);">
          Brand Colors
        </h2>
        <div class="flex flex-wrap gap-4">
          <div v-for="color in colors" :key="color.hex" class="flex flex-col items-center gap-2">
            <div class="w-16 h-16 rounded-xl border shadow-sm" :style="`background:${color.hex}; border-color:var(--card-border);`"></div>
            <div class="text-center">
              <p class="text-xs font-bold" style="color:var(--color-text);">{{ color.name }}</p>
              <p class="text-[10px] font-mono" style="color:var(--color-text-muted);">{{ color.hex }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Usage guidelines -->
      <div class="mb-14">
        <h2 class="font-display text-lg font-bold mb-6 pb-3 border-b" style="color:var(--color-text); border-color:var(--color-border);">
          Usage Guidelines
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="g in guidelines" :key="g.title"
            class="p-5 rounded-xl flex gap-3"
            :style="`background:var(--card-bg); border:1px solid ${g.ok ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.25)'};`">
            <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              :style="g.ok ? 'background:rgba(52,211,153,0.15);' : 'background:rgba(239,68,68,0.12);'">
              <svg v-if="g.ok" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              <svg v-else width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </div>
            <div>
              <p class="text-xs font-semibold mb-0.5" :style="g.ok ? 'color:#059669;' : 'color:#DC2626;'">{{ g.title }}</p>
              <p class="text-xs" style="color:var(--color-text-secondary);">{{ g.body }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Press contact -->
      <div class="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        style="background: linear-gradient(135deg, rgba(8,145,178,0.08), rgba(34,211,238,0.04)); border: 1px solid rgba(8,145,178,0.2);">
        <div>
          <p class="font-display font-bold text-base mb-1" style="color:var(--color-text);">Press & Media Enquiries</p>
          <p class="text-sm" style="color:var(--color-text-secondary);">
            For interviews, press coverage, or partnership questions, reach us at
            <a :href="`mailto:${SITE.email}`" class="underline" style="color:var(--color-primary-soft);">{{ SITE.email }}</a>.
            We typically respond within 2 business days.
          </p>
        </div>
        <a :href="`mailto:${SITE.email}?subject=Press%20Enquiry%20—%20${encodeURIComponent(SITE.name)}`"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white flex-shrink-0"
          style="background: var(--gradient-btn);">
          Contact Press Team
        </a>
      </div>

    </div>
  </section>
  </div>
</template>

<script setup>
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import { SITE } from '@/constants'

useHead({
  title: 'Press & Media Kit | CppIndia',
  description: 'Brand assets, key facts, and press resources for CppIndia — India\'s C++ developer community.',
})

const facts = [
  { icon: '🗓',  label: 'Founded',          value: `${SITE.founded} — ${new Date().getFullYear() - SITE.founded + 1} years of community` },
  { icon: '👥',  label: 'Community Size',   value: '1,000+ registered members' },
  { icon: '🎙',  label: 'Tech Talks',       value: '80+ recorded sessions on YouTube' },
  { icon: '🏛',  label: 'Annual Conference', value: 'CppIndiaCon — held every year since 2021' },
  { icon: '🌏',  label: 'Audience',         value: 'C++ developers across India and globally' },
  { icon: '📧',  label: 'Press Contact',    value: SITE.email },
]

const colors = [
  { name: 'Primary',    hex: '#0891B2' },
  { name: 'Secondary',  hex: '#22D3EE' },
  { name: 'Accent',     hex: '#34D399' },
  { name: 'Dark BG',    hex: '#0B1929' },
  { name: 'Surface',    hex: '#0F2336' },
  { name: 'Text',       hex: '#E2E8F5' },
]

const guidelines = [
  { ok: true,  title: 'Use the logo on light and dark backgrounds',  body: 'The PNG logo works on both light and dark surfaces.' },
  { ok: true,  title: 'Maintain clear space around the logo',        body: 'Keep at least half the logo height of clear space on all sides.' },
  { ok: true,  title: 'Reference us as "CppIndia"',                 body: 'Full name: "CppIndia User Group". Short form: "CppIndia".' },
  { ok: false, title: 'Do not alter the logo colours or proportions', body: 'Do not stretch, rotate, recolour, or add effects to the logo.' },
  { ok: false, title: 'Do not use our name to imply endorsement',    body: 'Sponsorship does not imply product endorsement by CppIndia.' },
  { ok: false, title: 'Do not use outdated logos or screenshots',    body: 'Always download the latest assets from this page.' },
]
</script>
