<!--
  CommunityAbout — Brief about section on homepage
-->
<template>
  <section class="section bg-canvas">
    <div class="container">
      <div class="grid grid-cols-1 gap-10 items-center lg:grid-cols-2 lg:gap-16">

        <!-- Left: text -->
        <div class="gsap-reveal">
          <p class="overline mb-3">About CppIndia</p>
          <h2 class="font-display font-bold text-ink leading-[1.2] mb-5"
            style="font-size: clamp(1.5rem, 3vw, 2.5rem);">
            A community for C++ developers — at every stage of their journey
          </h2>
          <p class="text-base text-ink-2 leading-relaxed mb-7">
            CppIndia was founded to create a common platform that brings together
            people from all walks of life — students, fresh graduates, and experienced
            engineers — united by a mutual interest in C++. We run meetups on alternate
            Saturdays, mentor junior programmers, and connect companies with talented developers.
          </p>
          <div class="flex flex-wrap items-center gap-4">
            <RouterLink to="/about" class="btn btn--primary">Learn More</RouterLink>
            <RouterLink to="/join"  class="btn btn--outline">Join the Community</RouterLink>
          </div>
        </div>

        <!-- Right: pillars grid -->
        <div class="gsap-reveal grid grid-cols-2 gap-5">
          <div
            v-for="pillar in pillars"
            :key="pillar.title"
            class="pillar-card group p-6 bg-surface border border-wire-light rounded-xl transition-all duration-base
                   hover:border-[rgba(79,142,247,0.25)] hover:shadow-glow-primary hover:-translate-y-[2px]"
          >
            <div class="w-[52px] h-[52px] flex items-center justify-center rounded-lg mb-4 text-primary"
              style="background:rgba(79,142,247,0.08);"
              v-html="pillar.icon"
            />
            <h3 class="font-display font-bold text-base text-ink mb-2">{{ pillar.title }}</h3>
            <p class="text-sm text-ink-2 leading-relaxed">{{ pillar.body }}</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGsap } from '@/composables/useGsap'

const { staggerReveal } = useGsap()
onMounted(() => staggerReveal('.gsap-reveal', { y: 30 }))

const pillars = [
  {
    title: 'Tech Talks',
    body: 'Regular sessions every alternate Saturday — 60-minute talks on modern C++, tooling, and best practices.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  },
  {
    title: 'CppIndiaCon',
    body: 'Our annual C++ conference featuring international speakers, hands-on workshops, and networking.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  },
  {
    title: 'Mentorship',
    body: 'Connecting junior developers with experienced engineers for career guidance and code reviews.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
  },
  {
    title: 'Resources',
    body: 'Curated C++ standards, references, articles, and community-recommended learning materials.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
  },
]
</script>
