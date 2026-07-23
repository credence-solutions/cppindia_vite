<template>
  <div>
    <PageHero
      overline="CppIndiaCon 2024"
      title="Networking Guide"
      subtitle="Discord is the official networking hub for CppIndiaCon. Here's everything you need to connect with speakers and fellow attendees."
      :breadcrumb="[{ label: 'CppIndiaCon', path: '/conference' }, { label: 'Networking' }]"
    />

    <section class="section--sm" style="background: var(--emphasis-bg);">
      <div class="container" style="max-width: 860px;">

        <!-- Discord CTA -->
        <div class="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl mb-12"
          style="background: rgba(88,101,242,0.08); border: 1px solid rgba(88,101,242,0.25);">
          <div class="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            <div>
              <p class="font-bold text-base" style="color: var(--color-text);">Join the CppIndia Discord</p>
              <p class="text-sm" style="color: var(--color-text-secondary);">Join before the conference to explore channels and get familiar with the server.</p>
            </div>
          </div>
          <a :href="SITE.discordInvite" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white flex-shrink-0"
            style="background: #5865F2;">
            Join Discord Server
          </a>
        </div>

        <!-- How to network -->
        <div class="mb-12">
          <h2 class="font-display text-xl font-bold mb-6" style="color: var(--color-text);">How Networking Works</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div v-for="item in howTo" :key="item.title"
              class="p-5 rounded-2xl"
              style="background: var(--card-bg); border: 1px solid var(--card-border);">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                style="background: rgba(8,145,178,0.1); border: 1px solid rgba(8,145,178,0.2);">
                <span v-html="item.icon" />
              </div>
              <p class="font-semibold text-sm mb-2" style="color: var(--color-text);">{{ item.title }}</p>
              <p class="text-xs leading-relaxed" style="color: var(--color-text-secondary);">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Discord channels -->
        <div class="mb-12">
          <h2 class="font-display text-xl font-bold mb-6" style="color: var(--color-text);">Discord Channels</h2>
          <div class="flex flex-col gap-2">
            <div v-for="ch in channels" :key="ch.name"
              class="flex items-start gap-4 px-4 py-3 rounded-xl"
              style="background: var(--card-bg); border: 1px solid var(--card-border);">
              <span class="font-mono text-xs font-bold flex-shrink-0 mt-0.5 px-2 py-0.5 rounded"
                :style="`background: ${ch.tagBg}; color: ${ch.tagColor};`">{{ ch.tag }}</span>
              <div>
                <p class="font-semibold text-sm" style="color: var(--color-text);">#{{ ch.name }}</p>
                <p class="text-xs mt-0.5" style="color: var(--color-text-secondary);">{{ ch.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sponsor channels -->
        <div class="rounded-2xl p-6" style="background: var(--card-bg); border: 1px solid var(--card-border);">
          <p class="font-semibold text-sm mb-1" style="color: var(--color-text);">Sponsor Channels</p>
          <p class="text-xs mb-4" style="color: var(--color-text-secondary);">
            Each sponsor has a dedicated channel with company information and career opportunities.
          </p>
          <div class="flex flex-wrap gap-2">
            <span v-for="s in sponsors" :key="s"
              class="text-xs font-semibold px-3 py-1.5 rounded-lg"
              style="background: rgba(8,145,178,0.08); color: var(--color-text-secondary); border: 1px solid rgba(8,145,178,0.15);">
              #{{ s }}
            </span>
          </div>
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
  title: 'Networking Guide — CppIndiaCon 2024 | CppIndia',
  description: 'How to network at CppIndiaCon 2024 — Discord channels, Q&A stage, and networking tables guide.',
})

const howTo = [
  {
    title: 'Q&A Stage',
    desc: 'After each session, speakers join the Q&A stage on Discord. Ask questions and chat directly with them and other community members.',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  },
  {
    title: 'Networking Tables',
    desc: 'Open voice channels where you can join, screen share, and chat freely with other attendees throughout the day.',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
  },
  {
    title: 'Text Channels',
    desc: 'Engage in C++ discussions, share code snippets, participate in trivia contests, and find mentors or collaborators.',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2"><path d="M4 12h8m-8 6h16M4 6h16"/></svg>',
  },
  {
    title: 'Introduce Yourself',
    desc: 'Use #new-member-introduction to introduce yourself with your location, profession, interests, and portfolio link.',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>',
  },
]

const channels = [
  { name: 'welcome-rules-and-coc', tag: 'rules',   tagBg: 'rgba(220,38,38,0.1)',   tagColor: '#EF4444', desc: 'Start here — read the rules and Code of Conduct before participating.' },
  { name: 'announcement',          tag: 'info',    tagBg: 'rgba(8,145,178,0.1)',   tagColor: '#06B6D4', desc: 'Read-only channel for schedule updates and important announcements throughout the day.' },
  { name: 'conference-help',       tag: 'support', tagBg: 'rgba(251,191,36,0.1)', tagColor: '#D97706', desc: 'Technical issues with Zoom or audio? Ask here for immediate help.' },
  { name: 'cpp-discussion',        tag: 'chat',    tagBg: 'rgba(52,211,153,0.1)',  tagColor: '#059669', desc: 'Open C++ discussions — questions, opinions, and talk follow-ups welcome.' },
  { name: 'contest-cpp-trivia',    tag: 'fun',     tagBg: 'rgba(168,85,247,0.1)',  tagColor: '#A855F7', desc: 'Daily C++ trivia contests, puzzles, and MCQs with prizes.' },
  { name: 'show-and-tell',         tag: 'share',   tagBg: 'rgba(52,211,153,0.1)',  tagColor: '#059669', desc: 'Share your projects, blog posts, and anything you\'ve built in C++.' },
  { name: 'recently-i-learned',    tag: 'learn',   tagBg: 'rgba(8,145,178,0.1)',   tagColor: '#06B6D4', desc: 'Share a C++ tip or insight you recently discovered with the community.' },
  { name: 'find-a-buddy',          tag: 'connect', tagBg: 'rgba(251,191,36,0.1)', tagColor: '#D97706', desc: 'Looking for a mentor, collaborator, or pair-programming partner? Post here.' },
  { name: 'compile_my_code',       tag: 'tool',    tagBg: 'rgba(148,163,184,0.1)', tagColor: '#94A3B8', desc: 'Test code snippets live using the compiler bot — powered by Compiler Explorer.' },
  { name: 'new-member-introduction', tag: 'intro', tagBg: 'rgba(168,85,247,0.1)',  tagColor: '#A855F7', desc: 'Introduce yourself: location, profession, C++ interests, and portfolio.' },
]

const sponsors = ['[Sponsor] Multicoreware', '[Sponsor] think-cell', '[Sponsor] Bloomberg']
</script>
