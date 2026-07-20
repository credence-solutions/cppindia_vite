<!--
  SponsorsSection — Sponsors & community supporters
-->
<template>
  <section class="section--sm" style="background: var(--emphasis-bg); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
    <div class="container">

      <!-- Label -->
      <p class="text-center text-xs font-semibold uppercase tracking-[0.12em] mb-8" style="color: var(--color-text-muted);">
        Supported by leading companies &amp; communities
      </p>

      <!-- Gold Sponsors -->
      <div class="mb-3">
        <div class="flex items-center justify-center gap-2 mb-5">
          <span class="h-px flex-1 max-w-[60px]" style="background: rgba(234,179,8,0.2);" />
          <span class="text-[10px] font-bold uppercase tracking-[0.15em]" style="color: rgba(234,179,8,0.65);">Gold Sponsors 2024</span>
          <span class="h-px flex-1 max-w-[60px]" style="background: rgba(234,179,8,0.2);" />
        </div>
        <div class="flex flex-wrap justify-center items-stretch gap-4">
          <a
            v-for="sponsor in goldSponsors"
            :key="sponsor.name"
            :href="sponsor.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center justify-center gap-1 px-6 py-4 rounded-xl transition-all duration-200 min-w-[160px]"
            style="border: 1px solid rgba(234,179,8,0.25); background: rgba(234,179,8,0.05);"
            onmouseover="this.style.borderColor='rgba(234,179,8,0.55)'; this.style.background='rgba(234,179,8,0.1)'"
            onmouseout="this.style.borderColor='rgba(234,179,8,0.25)'; this.style.background='rgba(234,179,8,0.05)'"
            :title="sponsor.name"
          >
            <span class="font-display font-bold text-base transition-colors duration-200" style="color: var(--color-text);">{{ sponsor.name }}</span>
            <span class="text-[10px] text-center leading-snug" style="color: var(--color-text-muted);">{{ sponsor.desc }}</span>
          </a>
        </div>
      </div>

      <!-- Community Sponsors -->
      <div class="mt-7 mb-6">
        <div class="flex items-center justify-center gap-2 mb-5">
          <span class="h-px flex-1 max-w-[60px]" style="background: rgba(99,102,241,0.2);" />
          <span class="text-[10px] font-bold uppercase tracking-[0.15em]" style="color: var(--color-text-muted);">Community Sponsors</span>
          <span class="h-px flex-1 max-w-[60px]" style="background: rgba(99,102,241,0.2);" />
        </div>
        <div class="flex flex-wrap justify-center items-center gap-3">
          <a
            v-for="sponsor in communitySponsors"
            :key="sponsor.name"
            :href="sponsor.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style="border: 1px solid var(--color-border); color: var(--color-text-secondary);"
            onmouseover="this.style.borderColor='rgba(99,102,241,0.45)'; this.style.color='var(--color-primary-soft)'; this.style.background='rgba(99,102,241,0.07)'"
            onmouseout="this.style.borderColor='var(--color-border)'; this.style.color='var(--color-text-secondary)'; this.style.background='transparent'"
            :title="sponsor.name"
          >
            {{ sponsor.name }}
          </a>
        </div>
      </div>

      <!-- Footer CTA -->
      <p class="text-center text-sm" style="color: var(--color-text-muted);">
        Want to support India's C++ community?
        <RouterLink to="/contact"
          class="underline transition-colors duration-fast ml-1"
          style="color: var(--color-secondary-mid);"
          onmouseover="this.style.color='var(--color-primary-soft)'"
          onmouseout="this.style.color='var(--color-secondary-mid)'"
        >
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
