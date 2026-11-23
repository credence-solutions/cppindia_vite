<!--
  SpeakCta — invites visitors to propose a talk (sits after Recent Talks)
-->
<template>
  <section class="section--sm" aria-label="Speak at CppIndia">
    <div class="container">
      <div class="relative overflow-hidden rounded-2xl px-6 py-8 sm:px-10 sm:py-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
        style="background: linear-gradient(120deg, #0f172a 0%, #1e3a8a 60%, #0e7490 100%);">

        <!-- Dot grid -->
        <div class="absolute inset-0 pointer-events-none opacity-[0.12]" style="
          background-image: radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px);
          background-size: 28px 28px;
        " />

        <div class="relative flex-1">
          <p class="text-xs font-bold uppercase tracking-[0.14em] mb-2" style="color:#67E8F9;">Speak at CppIndia</p>
          <h2 class="font-display font-extrabold leading-tight mb-2 text-white"
            style="font-size: clamp(1.5rem, 3vw, 2.1rem);">
            Have something to share? Give a talk.
          </h2>
          <p class="text-sm sm:text-base leading-relaxed" style="color: rgba(226,232,240,0.8);">
            First-time speakers are welcome. Pitch a 60-minute tech talk or a CppIndiaCon session,
            on any C++ topic at any level, and we'll help you shape it.
          </p>
        </div>

        <div class="relative flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 flex-shrink-0">
          <RouterLink to="/call-for-speakers"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:-translate-y-px"
            style="background:#fff; color:#0f172a;">
            Propose a Talk
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </RouterLink>
          <a :href="SITE.discordInvite" target="_blank" rel="noopener"
            class="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200"
            style="border:1px solid rgba(255,255,255,0.35); background:rgba(255,255,255,0.06);">
            Discuss an Idea on Discord
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { SITE } from '@/constants'
</script>
