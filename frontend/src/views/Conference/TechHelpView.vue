<template>
  <div>
    <PageHero
      overline="CppIndiaCon 2024"
      title="Conference Self-Help"
      subtitle="Everything you need to get the most out of CppIndiaCon 2024 — Zoom setup, Discord networking, and speaker guides."
      :breadcrumb="[{ label: 'CppIndiaCon', path: '/conference' }, { label: 'Tech Help' }]"
    />

    <section class="section--sm" style="background: var(--emphasis-bg);">
      <div class="container" style="max-width: 860px;">

        <!-- Quick resources -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          <a
            v-for="r in resources"
            :key="r.title"
            :href="r.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex flex-col gap-3 p-5 rounded-2xl transition-all duration-200 group"
            style="background: var(--card-bg); border: 1px solid var(--card-border);"
            onmouseover="this.style.borderColor='rgba(8,145,178,0.45)'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 32px rgba(8,145,178,0.12)'"
            onmouseout="this.style.borderColor='var(--card-border)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style="background: rgba(8,145,178,0.1); border: 1px solid rgba(8,145,178,0.2);">
              <span v-html="r.icon" />
            </div>
            <div>
              <p class="font-semibold text-sm mb-1" style="color: var(--color-text);">{{ r.title }}</p>
              <p class="text-xs leading-relaxed" style="color: var(--color-text-secondary);">{{ r.desc }}</p>
            </div>
            <span class="text-xs font-semibold mt-auto" style="color: var(--color-primary-soft);">Open guide →</span>
          </a>
        </div>

        <!-- Attendee tips -->
        <div class="mb-12">
          <h2 class="font-display text-xl font-bold mb-6" style="color: var(--color-text);">Quick Tips for Attendees</h2>
          <div class="flex flex-col gap-3">
            <div v-for="(tip, i) in tips" :key="i"
              class="flex gap-4 p-4 rounded-xl"
              style="background: var(--card-bg); border: 1px solid var(--card-border);">
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white"
                style="background: var(--gradient-btn);">{{ i + 1 }}</span>
              <p class="text-sm leading-relaxed" style="color: var(--color-text-secondary);">{{ tip }}</p>
            </div>
          </div>
        </div>

        <!-- Gold sponsors -->
        <div class="rounded-2xl p-6" style="background: var(--card-bg); border: 1px solid var(--card-border);">
          <p class="text-xs font-bold uppercase tracking-[0.1em] mb-5 text-center" style="color: var(--color-text-muted);">Gold Sponsors — CppIndiaCon 2024</p>
          <div class="flex flex-wrap items-center justify-center gap-6">
            <span v-for="s in sponsors" :key="s"
              class="text-sm font-semibold px-4 py-2 rounded-lg"
              style="background: rgba(8,145,178,0.08); color: var(--color-text-secondary); border: 1px solid rgba(8,145,178,0.15);">
              {{ s }}
            </span>
          </div>
        </div>

        <!-- Need more help? -->
        <div class="mt-8 text-center">
          <p class="text-sm mb-3" style="color: var(--color-text-secondary);">
            Still stuck? Ask in the
            <a :href="SITE.discordInvite" target="_blank" rel="noopener noreferrer"
              class="font-semibold hover:underline" style="color: var(--color-primary-soft);">
              #conference-help
            </a>
            Discord channel or
            <RouterLink to="/contact" class="font-semibold hover:underline" style="color: var(--color-primary-soft);">contact us</RouterLink>.
          </p>
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
  title: 'Tech Help — CppIndiaCon 2024 | CppIndia',
  description: 'Self-help guide for CppIndiaCon 2024 attendees and speakers — Zoom setup, Discord networking, and conference resources.',
})

const resources = [
  {
    title: 'Zoom Settings for Attendees',
    desc: 'Configure your audio, video, and display settings before the sessions begin.',
    url: 'https://support.zoom.us/hc/en-us/articles/201362623-Changing-settings-in-the-desktop-client-or-mobile-app',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>',
  },
  {
    title: 'Networking on Discord',
    desc: 'Join the CppIndia Discord server to network with speakers and fellow attendees.',
    url: '/conference/2024/networking',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
  },
  {
    title: 'Zoom Settings for Speakers',
    desc: 'Technical requirements for presenters — screen share, audio quality, and backup plans.',
    url: 'https://support.zoom.us/hc/en-us/articles/201362643-Joining-a-meeting',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  },
]

const tips = [
  'Join Zoom 10–15 minutes early to test your audio and video. Use headphones if possible to avoid echo.',
  'Mute yourself when not speaking — use the spacebar as a push-to-talk shortcut in Zoom.',
  'For Q&A, use the Raise Hand feature or type your question in the chat. Moderators will call on you.',
  'All sessions are recorded. If you miss one, recordings are uploaded to our YouTube channel afterwards.',
  'Join the CppIndia Discord server to network with speakers and fellow attendees in real time.',
]

const sponsors = ['MulticoreWare', 'think-cell', 'Bloomberg LP']
</script>
