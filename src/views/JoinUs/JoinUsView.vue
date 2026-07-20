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
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          <!-- Left: platform links -->
          <div class="lg:col-span-1 flex flex-col gap-6">
            <div>
              <h2 class="font-display text-xl font-bold text-ink mb-2">Stay Connected</h2>
              <p class="text-sm text-ink-2 leading-relaxed">
                CppIndia is active across several platforms. Find us where you're most comfortable.
              </p>
            </div>

            <div class="flex flex-col gap-3">
              <!-- Discord -->
              <a
                :href="SITE.discordInvite"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 p-4 rounded-xl border border-wire-light bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5865F2]/40 hover:shadow-md group"
              >
                <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background:#5865F2;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm text-ink">Discord</p>
                  <p class="text-xs text-ink-3 truncate">Join our active discussion server</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-ink-3 flex-shrink-0"><polyline points="9 18 15 12 9 6"/></svg>
              </a>

              <!-- LinkedIn -->
              <a
                :href="SITE.social.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 p-4 rounded-xl border border-wire-light bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0A66C2]/40 hover:shadow-md group"
              >
                <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background:#0A66C2;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2" fill="white"/></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm text-ink">LinkedIn</p>
                  <p class="text-xs text-ink-3 truncate">Follow our company page</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-ink-3 flex-shrink-0"><polyline points="9 18 15 12 9 6"/></svg>
              </a>

              <!-- YouTube -->
              <a
                :href="SITE.social.youtube"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 p-4 rounded-xl border border-wire-light bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF0000]/40 hover:shadow-md group"
              >
                <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background:#FF0000;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FF0000"/></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm text-ink">YouTube</p>
                  <p class="text-xs text-ink-3 truncate">Subscribe for recorded talks</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-ink-3 flex-shrink-0"><polyline points="9 18 15 12 9 6"/></svg>
              </a>

              <!-- Twitter -->
              <a
                :href="SITE.social.twitter"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 p-4 rounded-xl border border-wire-light bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1DA1F2]/40 hover:shadow-md group"
              >
                <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background:#1DA1F2;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm text-ink">Twitter / X</p>
                  <p class="text-xs text-ink-3 truncate">@CppIndiaUG for announcements</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-ink-3 flex-shrink-0"><polyline points="9 18 15 12 9 6"/></svg>
              </a>

              <!-- Facebook -->
              <a
                :href="SITE.social.facebook"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 p-4 rounded-xl border border-wire-light bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1877F2]/40 hover:shadow-md group"
              >
                <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background:#1877F2;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm text-ink">Facebook</p>
                  <p class="text-xs text-ink-3 truncate">CppIndiaUG</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-ink-3 flex-shrink-0"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
            </div>

            <!-- Quick note -->
            <div class="rounded-xl p-4 text-sm border border-wire-light bg-surface-alt leading-relaxed text-ink-2">
              <strong class="text-ink">All are welcome.</strong> Whether you're a beginner or an industry veteran, CppIndia is a community built for every C++ enthusiast in India.
            </div>
          </div>

          <!-- Right: Registration form -->
          <div class="lg:col-span-2">
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
</script>
