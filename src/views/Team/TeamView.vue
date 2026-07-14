<template>
  <div>
    <PageHero
      overline="The People Behind CppIndia"
      title="Our Team"
      subtitle="CppIndia is run by a small team of passionate C++ developers who volunteer their time to build and grow the community."
      :breadcrumb="[{ label: 'About', path: '/about' }, { label: 'Team', path: '/team' }]"
    />

    <section class="section">
      <div class="container">
        <!-- Team grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div
            v-for="member in team"
            :key="member.id"
            class="bg-surface border border-wire-light rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20 group"
          >
            <div class="team-photo-wrap">
              <img
                v-if="member.photo"
                :src="member.photo"
                :alt="member.name"
                class="team-photo-img"
                loading="lazy"
              />
              <span
                v-else
                class="absolute inset-0 flex items-center justify-center font-display text-[5rem] font-extrabold text-white/30"
              >{{ member.name.charAt(0) }}</span>
            </div>

            <div class="p-6">
              <p class="text-xs font-semibold text-secondary uppercase tracking-widest mb-1">{{ member.role }}</p>
              <h2 class="font-display text-xl font-bold text-ink mb-3">{{ member.name }}</h2>
              <p class="text-sm text-ink-2 leading-relaxed mb-4">{{ member.bio }}</p>

              <div class="flex items-center gap-3">
                <a
                  v-if="member.links.website"
                  :href="member.links.website"
                  class="w-8 h-8 flex items-center justify-center bg-surface-alt rounded-md text-ink-2 hover:bg-secondary hover:text-white transition-all duration-150"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                </a>
                <a
                  v-if="member.links.linkedin"
                  :href="member.links.linkedin"
                  class="w-8 h-8 flex items-center justify-center bg-surface-alt rounded-md text-ink-2 hover:bg-secondary hover:text-white transition-all duration-150"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Volunteer CTA -->
        <div class="text-center p-12 bg-surface-alt border border-wire-light rounded-2xl max-w-[600px] mx-auto">
          <h2 class="font-display text-2xl font-bold text-ink mb-3">Want to help run CppIndia?</h2>
          <p class="text-base text-ink-2 leading-relaxed mb-6">
            We're always looking for enthusiastic volunteers — whether you want to help
            organise events, moderate Discord, curate resources, or bring in speakers.
          </p>
          <RouterLink to="/contact" class="btn btn--primary">Get in Touch</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import teamData from '@/data/team.json'

useHead({
  title: 'Our Team | CppIndia',
  description: 'Meet the volunteers who run CppIndia — founders, co-founders, and moderators.',
})

const team = teamData
</script>
