<!--
  CommunityAbout — Brief about section on homepage
-->
<template>
  <section class="section" style="background: var(--emphasis-bg);">
    <div class="container">
      <div class="grid grid-cols-1 gap-10 items-center lg:grid-cols-2 lg:gap-16">

        <!-- Left: text -->
        <div class="gsap-reveal">
          <p class="text-xs font-bold uppercase tracking-[0.14em] mb-3" style="color: var(--color-secondary-mid);">About CppIndia</p>
          <h2 class="font-display font-bold leading-[1.2] mb-5 text-gradient-heading"
            style="font-size: clamp(1.5rem, 3vw, 2.5rem);">
            A community for C++ developers — at every stage of their journey
          </h2>
          <p class="text-base leading-relaxed mb-7" style="color: var(--color-text-secondary);">
            CppIndia was founded to create a common platform that brings together
            people from all walks of life — students, fresh graduates, and experienced
            engineers — united by a mutual interest in C++. We run meetups on alternate
            Saturdays, mentor junior programmers, and connect companies with talented developers.
          </p>
          <div class="flex flex-wrap items-center gap-4">
            <RouterLink
              to="/about"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200"
              style="background: var(--gradient-btn); box-shadow: 0 0 20px rgba(8,145,178,0.35);"
              onmouseover="this.style.boxShadow='0 0 30px rgba(8,145,178,0.55)'"
              onmouseout="this.style.boxShadow='0 0 20px rgba(8,145,178,0.35)'"
            >Learn More</RouterLink>
            <a
              :href="SITE.discordInvite"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
              style="border: 1px solid rgba(8,145,178,0.35); color: var(--color-primary-soft); background: transparent;"
              onmouseover="this.style.borderColor='rgba(8,145,178,0.6)'; this.style.background='rgba(8,145,178,0.08)'"
              onmouseout="this.style.borderColor='rgba(8,145,178,0.35)'; this.style.background='transparent'"
            >Join the Community</a>
          </div>
        </div>

        <!-- Right: pillars grid -->
        <div class="gsap-reveal grid grid-cols-2 gap-5">
          <RouterLink
            v-for="pillar in pillars"
            :key="pillar.title"
            :to="pillar.to"
            class="pillar-card group block no-underline p-4 sm:p-6 rounded-xl transition-all duration-200"
            style="background: var(--card-bg); border: 1px solid var(--card-border);"
            onmouseover="this.style.borderColor='rgba(8,145,178,0.45)'; this.style.boxShadow='0 0 24px rgba(8,145,178,0.2)'; this.style.transform='translateY(-2px)'"
            onmouseout="this.style.borderColor='var(--card-border)'; this.style.boxShadow='none'; this.style.transform='translateY(0)'"
          >
            <div class="w-[52px] h-[52px] flex items-center justify-center rounded-lg mb-4"
              style="background: rgba(8,145,178,0.12); color: var(--color-primary-soft);"
              v-html="pillar.icon"
            />
            <h3 class="font-display font-bold text-base mb-2" style="color: var(--color-text);">{{ pillar.title }}</h3>
            <p class="text-sm leading-relaxed" style="color: var(--color-text-secondary);">{{ pillar.body }}</p>
          </RouterLink>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGsap } from '@/composables/useGsap'
import { SITE } from '@/constants'

const { staggerReveal } = useGsap()
onMounted(() => staggerReveal('.gsap-reveal', { y: 30 }))

const pillars = [
  {
    title: 'Tech Talks',
    body: 'Regular sessions every alternate Saturday — 60-minute talks on modern C++, tooling, and best practices.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
    to: '/tech-talks',
  },
  {
    title: 'CppIndiaCon',
    body: 'Our annual C++ conference featuring international speakers, hands-on workshops, and networking.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    to: '/conference',
  },
  {
    title: 'Mentorship',
    body: 'Connecting junior developers with experienced engineers for career guidance and code reviews.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
    to: '/about',
  },
  {
    title: 'Resources',
    body: 'Curated C++ standards, references, articles, and community-recommended learning materials.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
    to: '/resources',
  },
]
</script>
