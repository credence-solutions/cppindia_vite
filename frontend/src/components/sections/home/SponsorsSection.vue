<!--
  SponsorsSection — every company and community that has backed CppIndiaCon,
  built from sponsors.json (one tile per sponsor, newest first).
-->
<template>
  <section class="section--sm" style="background: var(--emphasis-bg); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
    <div class="container">

      <p class="text-center text-xs font-semibold uppercase tracking-[0.12em] mb-8" style="color: var(--color-text-muted);">
        Supported by leading companies &amp; communities since {{ firstYear }}
      </p>

      <div v-for="group in groups" :key="group.label" class="mb-7">
        <div class="flex items-center justify-center gap-2 mb-5">
          <span class="h-px flex-1 max-w-[60px]" :style="`background:${group.line};`" />
          <span class="text-[10px] font-bold uppercase tracking-[0.15em]" :style="`color:${group.text};`">{{ group.label }}</span>
          <span class="h-px flex-1 max-w-[60px]" :style="`background:${group.line};`" />
        </div>
        <div class="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          <a
            v-for="sponsor in group.sponsors"
            :key="sponsor.name"
            :href="sponsor.url"
            target="_blank"
            rel="noopener noreferrer"
            :title="`${sponsor.name} — CppIndiaCon ${sponsor.years.join(', ')}`"
            class="w-[calc(50%-0.375rem)] sm:w-40 flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            style="background:#fff; border:1px solid var(--color-border);"
          >
            <img :src="assetPath(sponsor.logo)" :alt="sponsor.name" loading="lazy"
              class="h-10 w-full object-contain" />
            <span class="text-[10px] font-medium" style="color:#64748B;">{{ sponsor.years.join(' · ') }}</span>
          </a>
        </div>
      </div>

      <p class="text-center text-sm" style="color: var(--color-text-muted);">
        Want to support India's C++ community?
        <RouterLink to="/sponsors" class="underline ml-1" style="color: var(--color-secondary-mid);">
          Become a sponsor
        </RouterLink>
      </p>
    </div>
  </section>
</template>

<script setup>
import { useAssetPath } from '@/composables/useAssetPath'
import sponsorsData from '@/data/sponsors.json'

const { assetPath } = useAssetPath()

// sponsors.json has one row per sponsor per conference; merge them by name.
function merge(type) {
  const byName = new Map()
  for (const s of sponsorsData.filter(s => s.type === type)) {
    const entry = byName.get(s.name) ?? { ...s, years: [] }
    entry.years.push(s.conference)
    byName.set(s.name, entry)
  }
  return [...byName.values()]
    .map(s => ({ ...s, years: [...new Set(s.years)].sort((a, b) => b - a) }))
    .sort((a, b) => b.years[0] - a.years[0] || b.years.length - a.years.length)
}

const firstYear = Math.min(...sponsorsData.map(s => s.conference))

const groups = [
  { label: 'Gold Sponsors',      sponsors: merge('gold'),      line: 'rgba(234,179,8,0.2)', text: 'var(--tag-amber)' },
  { label: 'Community Partners', sponsors: merge('community'), line: 'rgba(8,145,178,0.2)', text: 'var(--color-text-muted)' },
].filter(g => g.sponsors.length)
</script>
