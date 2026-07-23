<template>
  <div>
    <PageHero
      overline="Become a Member"
      title="Join CppIndia"
      subtitle="Connect with C++ developers across India. Fill in the form below to join our community and stay updated on events, talks, and more."
      :breadcrumb="[{ label: 'Join Us', path: '/join-us' }]"
    />

    <section class="section--sm">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start">

          <!-- Left: why join -->
          <div>
            <h2 class="font-display text-2xl font-bold text-ink mb-6">Why join CppIndia?</h2>

            <div class="flex flex-col gap-5">
              <div v-for="item in benefits" :key="item.title" class="flex gap-4">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style="background: rgba(8,145,178,0.1); border: 1px solid rgba(8,145,178,0.2);">
                  <span v-html="item.icon" />
                </div>
                <div>
                  <p class="font-semibold text-sm mb-0.5" style="color: var(--color-text);">{{ item.title }}</p>
                  <p class="text-sm leading-relaxed" style="color: var(--color-text-secondary);">{{ item.desc }}</p>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="mt-10 grid grid-cols-2 gap-4">
              <div v-for="stat in stats" :key="stat.label"
                class="rounded-xl p-4 text-center"
                style="background: var(--card-bg); border: 1px solid var(--card-border);">
                <p class="font-display font-extrabold text-2xl mb-0.5"
                  style="background: linear-gradient(135deg,#2563EB,#06B6D4); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;">
                  {{ stat.value }}
                </p>
                <p class="text-xs font-medium" style="color: var(--color-text-muted);">{{ stat.label }}</p>
              </div>
            </div>

            <!-- Discord CTA -->
            <div class="mt-8 flex items-center gap-3 p-4 rounded-xl"
              style="background: rgba(88,101,242,0.08); border: 1px solid rgba(88,101,242,0.2);">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-discord)"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              <div>
                <p class="text-sm font-semibold" style="color: var(--color-text);">Already a member?</p>
                <a :href="SITE.discordInvite" target="_blank" rel="noopener noreferrer"
                  class="text-xs font-semibold hover:underline" style="color: var(--color-discord);">
                  Join us on Discord →
                </a>
              </div>
            </div>
          </div>

          <!-- Right: Registration form -->
          <div>
            <div class="mb-5">
              <h2 class="font-display text-xl font-bold text-ink mb-1">Registration Form</h2>
              <p class="text-sm text-ink-2">Fill this form so we can keep you updated about upcoming events and talks.</p>
            </div>

            <div class="relative rounded-2xl overflow-hidden border border-wire-light bg-surface" style="min-height: 600px;">
              <!-- Loading state -->
              <div
                v-if="formLoading"
                class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-surface z-10"
              >
                <div class="w-8 h-8 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
                <p class="text-sm text-ink-3">Loading registration form…</p>
              </div>

              <iframe
                src="https://forms.office.com/r/Veyy0SY962?embed=true"
                frameborder="0"
                marginwidth="0"
                marginheight="0"
                allowfullscreen
                class="w-full block"
                style="height: 600px;"
                title="CppIndia Registration Form"
                @load="formLoading = false"
              />
            </div>

            <p class="text-xs text-ink-3 mt-3">
              Having trouble with the form?
              <a :href="`mailto:${SITE.email}`" class="text-secondary hover:underline">Contact us</a>
              or join directly via our
              <a :href="SITE.discordInvite" target="_blank" rel="noopener noreferrer" class="text-secondary hover:underline">Discord server</a>.
            </p>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import { SITE } from '@/constants'

useHead({
  title: 'Join CppIndia | India\'s C++ Community',
  description: 'Join CppIndia — India\'s C++ user group. Register to stay connected, get event updates, and be part of the community.',
})

const formLoading = ref(true)

const benefits = [
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    title: 'India\'s largest C++ community',
    desc: 'Connect with 1,000+ C++ developers — students, professionals, and researchers from across India.',
  },
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>',
    title: 'Exclusive tech talks',
    desc: 'Monthly sessions on modern C++ — performance, concurrency, tooling, and real-world engineering.',
  },
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    title: 'Annual conference — CppIndiaCon',
    desc: 'Two days of international speakers, workshops, and networking. Free to attend, open to all.',
  },
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    title: 'Mentorship & career support',
    desc: 'Connect with experienced engineers, get code reviews, find collaborators, and grow your career.',
  },
]

const stats = [
  { value: '1,000+', label: 'Community Members' },
  { value: '80+',    label: 'Tech Talks Recorded' },
  { value: '4',      label: 'Annual Conferences' },
  { value: '7+',     label: 'Years of Community' },
]
</script>
