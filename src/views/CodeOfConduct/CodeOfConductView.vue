<template>
  <div>
    <PageHero
      overline="Community Standards"
      title="Code of Conduct"
      subtitle="CppIndia is committed to providing a safe, inclusive, and welcoming environment for everyone."
      :breadcrumb="[{ label: 'Code of Conduct', path: '/code-of-conduct' }]"
    />

    <section class="section--sm">
      <div class="container max-w-[800px] mx-auto">
        <div class="bg-surface border border-wire-light rounded-2xl overflow-hidden">

          <!-- Our Commitment -->
          <div class="px-8 lg:px-12 py-10 border-b border-wire-light">
            <h2 class="font-display text-xl font-bold text-ink mb-4">Our Commitment</h2>
            <p class="text-base text-ink-2 leading-relaxed">
              CppIndia events and spaces are open, inclusive, and positive environments.
              We want everyone — regardless of gender, gender identity and expression, sexual orientation,
              disability, physical appearance, body size, race, age, religion, or programming background —
              to feel welcome and safe.
            </p>
          </div>

          <!-- Berlin Code of Conduct -->
          <div class="px-8 lg:px-12 py-10 border-b border-wire-light">
            <h2 class="font-display text-xl font-bold text-ink mb-4">Berlin Code of Conduct</h2>
            <p class="text-base text-ink-2 leading-relaxed">
              We apply the
              <a
                href="https://berlincodeofconduct.org/"
                class="text-secondary underline hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >Berlin Code of Conduct</a>
              to all CppIndia events, tech talks, online spaces, and community interactions.
            </p>
            <a
              href="https://berlincodeofconduct.org/"
              class="btn btn--outline flex items-center gap-2 w-fit mt-5"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the Berlin Code of Conduct
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
          </div>

          <!-- Core Principles -->
          <div class="px-8 lg:px-12 py-10 border-b border-wire-light">
            <h2 class="font-display text-xl font-bold text-ink mb-4">Core Principles</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
              <div
                v-for="p in principles"
                :key="p.title"
                class="p-5 bg-surface-alt rounded-xl"
              >
                <div
                  class="w-11 h-11 flex items-center justify-center bg-[rgba(79,142,247,0.10)] rounded-lg text-secondary mb-3"
                  v-html="p.icon"
                />
                <h3 class="font-display text-base font-bold text-ink mb-2">{{ p.title }}</h3>
                <p class="text-sm text-ink-2 leading-relaxed">{{ p.body }}</p>
              </div>
            </div>
          </div>

          <!-- Reporting -->
          <div class="px-8 lg:px-12 py-10">
            <h2 class="font-display text-xl font-bold text-ink mb-4">Reporting Issues</h2>
            <p class="text-base text-ink-2 leading-relaxed">
              If you experience or witness behaviour that violates this code of conduct,
              please reach out to the CppIndia team:
            </p>
            <a
              :href="`mailto:${SITE.email}`"
              class="inline-block mt-4 text-base font-semibold text-secondary underline hover:text-primary transition-colors"
            >{{ SITE.email }}</a>
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
  title: 'Code of Conduct | CppIndia',
  description: 'CppIndia applies the Berlin Code of Conduct to all events and community spaces.',
})

const principles = [
  {
    title: 'Be Respectful',
    body: 'Treat everyone with respect. Disagreements happen — address issues, not people.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
  },
  {
    title: 'Be Inclusive',
    body: 'Welcome developers at all skill levels — beginners are just as important as experts.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>`,
  },
  {
    title: 'Be Constructive',
    body: 'Offer feedback kindly. Criticism should help people grow, not discourage them.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  },
  {
    title: 'Be Patient',
    body: 'Not everyone has the same background. Take time to explain and understand.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  },
]
</script>
