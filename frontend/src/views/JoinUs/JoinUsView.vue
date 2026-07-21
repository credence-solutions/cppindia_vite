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
        <div>

          <!-- Registration form -->
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
</script>
