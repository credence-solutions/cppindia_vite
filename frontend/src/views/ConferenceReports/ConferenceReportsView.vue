<template>
  <div>
    <PageHero
      overline="Community"
      title="Conference Reports"
      subtitle="Trip reports, guides, and behind-the-scenes coverage from CppIndiaCon every year."
      :breadcrumb="[{ label: 'Conference Reports', path: '/conference-reports' }]"
    />

    <section class="section--sm" style="background: var(--emphasis-bg);">
      <div class="container">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <component
            :is="item.external ? 'a' : 'RouterLink'"
            v-for="item in reports"
            :key="item.title"
            v-bind="item.external
              ? { href: item.path, target: '_blank', rel: 'noopener noreferrer' }
              : { to: item.path }"
            class="flex flex-col gap-4 p-6 rounded-2xl transition-all duration-200"
            style="background: var(--card-bg); border: 1px solid var(--card-border);"
            onmouseover="this.style.borderColor='rgba(8,145,178,0.45)'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 32px rgba(8,145,178,0.12)'"
            onmouseout="this.style.borderColor='var(--card-border)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'"
          >
            <!-- Year badge -->
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold px-2.5 py-1 rounded-full"
                style="background: rgba(8,145,178,0.1); border: 1px solid rgba(8,145,178,0.2); color: var(--color-primary-soft);">
                {{ item.year }}
              </span>
              <span class="text-xs font-semibold px-2 py-0.5 rounded"
                :style="item.tagStyle">{{ item.tag }}</span>
            </div>

            <div class="flex-1">
              <h3 class="font-display font-bold text-base leading-snug mb-2" style="color: var(--color-text);">{{ item.title }}</h3>
              <p class="text-sm leading-relaxed" style="color: var(--color-text-secondary);">{{ item.desc }}</p>
            </div>

            <div class="flex items-center justify-between mt-auto">
              <span class="text-xs" style="color: var(--color-text-muted);">{{ item.author }}</span>
              <span class="text-xs font-semibold" style="color: var(--color-primary-soft);">Read →</span>
            </div>
          </component>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'

useHead({
  title: 'Conference Reports | CppIndia',
  description: 'Trip reports, guides, and coverage from CppIndiaCon — India\'s annual C++ conference.',
})

const reports = [
  {
    year: 'CppIndiaCon 2023',
    tag: 'Trip Report',
    tagStyle: 'background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.25); color: #A855F7;',
    title: "A Reflection on CppIndiaCon 2023's Spectacular Journey",
    desc: 'Highlights, speaker ratings, volunteer stories, and the community moments that made CppIndiaCon 2023 special.',
    author: 'Dheeraj Jha',
    path: '/blog/cppindiaacon-2023-conference-report',
    external: false,
  },
  {
    year: 'CppIndiaCon 2024',
    tag: 'Attendee Guide',
    tagStyle: 'background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.25); color: #059669;',
    title: 'Conference Self-Help & Tech Setup Guide',
    desc: 'Everything attendees and speakers need — Zoom configuration, audio tips, and how to get help during the conference.',
    author: 'CppIndia Team',
    path: '/conference/2024/tech-help',
    external: false,
  },
  {
    year: 'CppIndiaCon 2024',
    tag: 'Networking',
    tagStyle: 'background: rgba(88,101,242,0.1); border: 1px solid rgba(88,101,242,0.25); color: #5865F2;',
    title: 'Networking Guide — Discord Channels & Tables',
    desc: 'How to connect with speakers and attendees during CppIndiaCon 2024 via Discord — Q&A stages, networking tables, and key channels.',
    author: 'CppIndia Team',
    path: '/conference/2024/networking',
    external: false,
  },
]
</script>
