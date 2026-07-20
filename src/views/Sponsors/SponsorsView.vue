<template>
  <div>
  <PageHero
    overline="Support CppIndia"
    title="Become a Sponsor"
    subtitle="Help us keep India's C++ community thriving — free talks, free conferences, free resources."
  />

  <!-- Why Sponsor -->
  <section class="section--sm" style="background: var(--emphasis-bg);">
    <div class="container">
      <div class="text-center mb-12">
        <p class="text-xs font-bold uppercase tracking-[0.14em] mb-2" style="color: var(--color-secondary-mid);">Why It Matters</p>
        <h2 class="font-display font-bold mb-3 text-gradient-heading" style="font-size: clamp(1.4rem,3vw,2rem);">Reach India's Top C++ Talent</h2>
        <p class="text-sm mx-auto" style="max-width:600px; color:var(--color-text-secondary);">CppIndia connects you with senior engineers, students, and decision-makers who live and breathe C++. Your sponsorship keeps the community free for everyone.</p>
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-16">
        <div v-for="stat in stats" :key="stat.label" class="text-center rounded-2xl p-6"
          style="background: var(--card-bg); border: 1px solid var(--card-border);">
          <div class="text-3xl font-bold font-display mb-1" style="color:var(--color-primary-soft);">{{ stat.value }}</div>
          <div class="text-sm" style="color:var(--color-text-secondary);">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Tiers -->
      <div class="text-center mb-8">
        <h2 class="font-display font-bold text-xl" style="color:var(--color-text);">Sponsorship Tiers</h2>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          v-for="tier in tiers"
          :key="tier.name"
          class="rounded-2xl p-6 flex flex-col gap-4"
          :style="`background: var(--card-bg); border: 1px solid ${tier.borderColor}; ${tier.featured ? 'box-shadow: 0 0 32px rgba(234,179,8,0.15);' : ''}`"
        >
          <div>
            <span class="text-xs font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full"
              :style="`background: ${tier.badgeBg}; color: ${tier.badgeColor};`">{{ tier.name }}</span>
          </div>
          <div class="font-display font-bold text-2xl" :style="`color: ${tier.badgeColor};`">{{ tier.price }}</div>
          <p class="text-sm" style="color:var(--color-text-secondary);">{{ tier.description }}</p>
          <ul class="flex flex-col gap-2 flex-1">
            <li v-for="benefit in tier.benefits" :key="benefit" class="flex items-start gap-2 text-sm" style="color: var(--color-text-secondary);">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="flex-shrink-0 mt-0.5" :style="`color:${tier.badgeColor};`"><polyline points="20 6 9 17 4 12"/></svg>
              {{ benefit }}
            </li>
          </ul>
          <a href="mailto:info@cppindia.co.in"
            class="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200"
            :style="`background: ${tier.btnBg}; color: ${tier.btnColor}; border: 1px solid ${tier.borderColor};`">
            Get Started
          </a>
        </div>
      </div>

      <!-- Current Sponsors -->
      <div class="mt-16 text-center">
        <p class="text-xs font-bold uppercase tracking-[0.14em] mb-6" style="color: var(--color-secondary-mid);">Our Current Sponsors</p>
        <div class="flex flex-wrap items-center justify-center gap-8">
          <div class="flex items-center justify-center rounded-xl px-6 py-4" style="background: var(--card-bg); border:1px solid rgba(234,179,8,0.35);">
            <span class="font-bold text-lg" style="color:#B45309;">Meeting C++</span>
          </div>
          <div class="flex items-center justify-center rounded-xl px-6 py-4" style="background:var(--card-bg); border:1px solid var(--card-border);">
            <span class="font-bold text-lg" style="color:var(--color-text-secondary);">think-cell</span>
          </div>
          <div class="flex items-center justify-center rounded-xl px-6 py-4" style="background:var(--card-bg); border:1px solid var(--card-border);">
            <span class="font-bold text-lg" style="color:var(--color-text-secondary);">Bloomberg</span>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="mt-14 text-center rounded-2xl p-8" style="background: linear-gradient(135deg, rgba(8,145,178,0.1) 0%, rgba(34,211,238,0.06) 100%); border: 1px solid rgba(8,145,178,0.25);">
        <h3 class="font-display font-bold text-lg mb-2" style="color:var(--color-text);">Ready to partner with CppIndia?</h3>
        <p class="text-sm mb-5" style="color:var(--color-text-secondary);">We'll customise a package for your budget and goals. Get in touch.</p>
        <a href="mailto:info@cppindia.co.in"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200"
          style="background: var(--gradient-btn);">
          Email Us at info@cppindia.co.in
        </a>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import PageHero from '@/components/common/PageHero.vue'

const stats = [
  { value: '1,000+', label: 'Community Members' },
  { value: '50+',    label: 'Tech Talks Recorded' },
  { value: '5+',     label: 'Years of Community' },
]

const tiers = [
  {
    name: 'Bronze',
    price: '₹25,000 / yr',
    description: 'Ideal for startups and small companies wanting to support the community.',
    borderColor: 'rgba(180,83,9,0.4)',
    badgeBg: 'rgba(180,83,9,0.15)',
    badgeColor: '#B45309',
    btnBg: 'transparent',
    btnColor: '#B45309',
    featured: false,
    benefits: [
      'Logo on website footer',
      'Mention in 2 newsletters',
      '1 job listing per quarter',
      'Social media shoutout',
    ],
  },
  {
    name: 'Silver',
    price: '₹60,000 / yr',
    description: 'Great visibility for mid-sized companies hiring C++ engineers.',
    borderColor: 'rgba(148,163,184,0.4)',
    badgeBg: 'rgba(148,163,184,0.12)',
    badgeColor: '#475569',
    btnBg: 'transparent',
    btnColor: '#475569',
    featured: false,
    benefits: [
      'Logo on website header & footer',
      'Mention in all newsletters',
      '3 job listings per quarter',
      'Conference banner placement',
      'Social media features (2x/yr)',
    ],
  },
  {
    name: 'Gold',
    price: '₹1,20,000 / yr',
    description: 'Maximum brand presence — be seen as a core pillar of the community.',
    borderColor: 'rgba(234,179,8,0.45)',
    badgeBg: 'rgba(234,179,8,0.15)',
    badgeColor: '#92400E',
    btnBg: 'rgba(234,179,8,0.15)',
    btnColor: '#92400E',
    featured: true,
    benefits: [
      'Prominent logo everywhere',
      'Dedicated newsletter section',
      'Unlimited job listings',
      'Speaking slot at CppIndiaCon',
      'Conference title sponsorship option',
      'Quarterly community call inclusion',
    ],
  },
]
</script>
