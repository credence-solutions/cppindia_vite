<template>
  <div>
    <PageHero
      overline="The People Behind CppIndia"
      title="Our Team"
      subtitle="CppIndia is run by a small team of passionate C++ developers who volunteer their time to build and grow the community."
      :breadcrumb="[{ label: 'About', path: '/about' }, { label: 'Team', path: '/team' }]"
    />

    <section class="section" style="background: #07091C;">
      <div class="container">
        <!-- Team grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div
            v-for="member in team"
            :key="member.id"
            class="rounded-2xl overflow-hidden transition-all duration-300 group"
            style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2);"
            onmouseover="this.style.transform='translateY(-4px)'; this.style.borderColor='rgba(99,102,241,0.45)'; this.style.boxShadow='0 0 28px rgba(99,102,241,0.2)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(99,102,241,0.2)'; this.style.boxShadow='none'"
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
                class="absolute inset-0 flex items-center justify-center font-display text-[5rem] font-extrabold"
                style="color: rgba(129,140,248,0.25);"
              >{{ member.emoji || member.name.charAt(0) }}</span>
            </div>

            <div class="p-6">
              <p class="text-xs font-semibold uppercase tracking-widest mb-1" style="color: #A78BFA;">{{ member.role }}</p>
              <h2 class="font-display text-xl font-bold mb-3" style="color: #E2E8F5;">{{ member.name }}</h2>
              <p class="text-sm leading-relaxed mb-4" style="color: rgba(148,163,184,0.75);">{{ member.bio }}</p>

              <div class="flex items-center gap-3">
                <a
                  v-if="member.links.website"
                  :href="member.links.website"
                  class="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
                  style="background: rgba(99,102,241,0.1); color: rgba(148,163,184,0.7);"
                  onmouseover="this.style.background='linear-gradient(135deg,#6366F1,#8B5CF6)'; this.style.color='white'"
                  onmouseout="this.style.background='rgba(99,102,241,0.1)'; this.style.color='rgba(148,163,184,0.7)'"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                </a>
                <a
                  v-if="member.links.linkedin"
                  :href="member.links.linkedin"
                  class="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
                  style="background: rgba(99,102,241,0.1); color: rgba(148,163,184,0.7);"
                  onmouseover="this.style.background='linear-gradient(135deg,#6366F1,#8B5CF6)'; this.style.color='white'"
                  onmouseout="this.style.background='rgba(99,102,241,0.1)'; this.style.color='rgba(148,163,184,0.7)'"
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
        <div class="text-center p-12 rounded-2xl max-w-[600px] mx-auto"
          style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2);">
          <h2 class="font-display text-2xl font-bold mb-3"
            style="background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            Want to help run CppIndia?
          </h2>
          <p class="text-base leading-relaxed mb-6" style="color: rgba(148,163,184,0.75);">
            We're always looking for enthusiastic volunteers — whether you want to help
            organise events, moderate Discord, curate resources, or bring in speakers.
          </p>
          <RouterLink
            to="/contact"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200"
            style="background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); box-shadow: 0 0 20px rgba(99,102,241,0.35);"
            onmouseover="this.style.boxShadow='0 0 30px rgba(99,102,241,0.55)'"
            onmouseout="this.style.boxShadow='0 0 20px rgba(99,102,241,0.35)'"
          >Get in Touch</RouterLink>
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
