<!--
  SponsorsSection — Sponsors & community supporters
-->
<template>
  <section class="section--sm bg-surface border-t border-wire-light border-b">
    <div class="container">

      <!-- Label -->
      <p class="text-center text-xs font-semibold text-ink-3 uppercase tracking-[0.1em] mb-8">
        Supported by leading companies &amp; communities
      </p>

      <!-- Gold Sponsors -->
      <div class="mb-3">
        <div class="flex items-center justify-center gap-2 mb-5">
          <span class="h-px flex-1 max-w-[60px] bg-yellow-500/20" />
          <span class="text-[10px] font-bold uppercase tracking-[0.15em] text-yellow-500/70">Gold Sponsors 2024</span>
          <span class="h-px flex-1 max-w-[60px] bg-yellow-500/20" />
        </div>
        <div class="flex flex-wrap justify-center items-stretch gap-4">
          <a
            v-for="sponsor in goldSponsors"
            :key="sponsor.name"
            :href="sponsor.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center justify-center gap-1 px-6 py-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5
                   hover:border-yellow-500/60 hover:bg-yellow-500/10 transition-all duration-200 min-w-[160px]"
            :title="sponsor.name"
          >
            <span class="font-display font-bold text-ink text-base group-hover:text-yellow-400 transition-colors duration-200">{{ sponsor.name }}</span>
            <span class="text-[10px] text-ink-3 text-center leading-snug">{{ sponsor.desc }}</span>
          </a>
        </div>
      </div>

      <!-- Community Sponsors -->
      <div class="mt-7 mb-6">
        <div class="flex items-center justify-center gap-2 mb-5">
          <span class="h-px flex-1 max-w-[60px] bg-wire" />
          <span class="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-3">Community Sponsors</span>
          <span class="h-px flex-1 max-w-[60px] bg-wire" />
        </div>
        <div class="flex flex-wrap justify-center items-center gap-3">
          <a
            v-for="sponsor in communitySponsors"
            :key="sponsor.name"
            :href="sponsor.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center px-4 py-2 rounded-full border border-wire text-sm font-medium text-ink-2
                   hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200"
            :title="sponsor.name"
          >
            {{ sponsor.name }}
          </a>
        </div>
      </div>

      <!-- Footer CTA -->
      <p class="text-center text-sm text-ink-3">
        Want to support India's C++ community?
        <RouterLink to="/contact" class="text-secondary underline hover:text-primary transition-colors duration-fast ml-1">
          Become a sponsor
        </RouterLink>
      </p>

    </div>
  </section>
</template>

<script setup>
const goldSponsors = [
  { name: 'MulticoreWare',  desc: 'AI & Multimedia Technology',    url: 'https://multicorewareinc.com' },
  { name: 'think-cell',     desc: 'C++ PowerPoint Automation',     url: 'https://www.think-cell.com' },
  { name: 'Bloomberg LP',   desc: 'Global Financial Technology',   url: 'https://www.bloomberg.com/company/values/tech-at-bloomberg/cplusplus/' },
]

const communitySponsors = [
  { name: 'Meeting C++',    url: 'https://meetingcpp.com' },
  { name: 'SwedenCpp',      url: 'https://swedencpp.se' },
  { name: '#include <C++>', url: 'https://www.includecpp.org' },
]
</script>
