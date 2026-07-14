<!--
  HeroBanner — CppIndia homepage hero
-->
<template>
  <section class="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero banner"
    style="background: linear-gradient(135deg, #060B1A 0%, #0D1A35 50%, #061020 100%);">

    <!-- Ambient glow blobs -->
    <div class="absolute pointer-events-none rounded-full"
      style="width:680px;height:680px;background:radial-gradient(circle,rgba(79,142,247,0.14) 0%,transparent 70%);top:-120px;left:-120px;" />
    <div class="absolute pointer-events-none rounded-full"
      style="width:560px;height:560px;background:radial-gradient(circle,rgba(155,116,245,0.12) 0%,transparent 70%);bottom:-80px;right:-80px;" />

    <!-- Grid pattern -->
    <div class="absolute inset-0 pointer-events-none"
      style="background-image:linear-gradient(rgba(79,142,247,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(79,142,247,0.05) 1px,transparent 1px);background-size:48px 48px;" />

    <div class="container relative z-[1] py-8" style="padding-top: calc(68px + 3rem); padding-bottom: 4rem;">
      <div class="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-16">

        <!-- Left: content -->
        <div>
          <!-- Badge -->
          <div class="gsap-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
            border border-[rgba(79,142,247,0.28)] bg-[rgba(79,142,247,0.1)]
            text-xs font-semibold text-primary-light tracking-[0.04em]">
            <span class="w-2 h-2 rounded-full bg-success animate-pulse-dot flex-shrink-0" />
            India's C++ User Group · Est. {{ SITE.founded }}
          </div>

          <!-- Title -->
          <h1
            class="gsap-reveal font-display font-extrabold text-white leading-[1.08] tracking-tight mb-5"
            style="font-size: clamp(2.5rem, 5vw, 4.2rem);"
          >
            India's very own<br />
            <span class="text-gradient-brand">C++ Community</span>
          </h1>

          <!-- Subtitle -->
          <p class="gsap-reveal text-white/75 leading-relaxed max-w-[520px] mb-8"
            style="font-size: clamp(1rem, 1.8vw, 1.2rem);">
            A welcoming space for C++ developers — from students to seasoned engineers —
            to connect, learn, and grow together through regular tech talks and our
            annual conference, CppIndiaCon.
          </p>

          <!-- CTAs -->
          <div class="gsap-reveal flex flex-wrap items-center gap-4 mb-10">
            <a :href="SITE.discordInvite" class="btn btn--lg inline-flex items-center gap-2"
              style="background:#5865F2;color:white;border-color:#5865F2;"
              target="_blank" rel="noopener noreferrer"
            >
              <IconDiscord />
              Join on Discord
            </a>
            <RouterLink to="/tech-talks" class="btn btn--outline-white btn--lg">
              Watch Tech Talks
            </RouterLink>
          </div>

          <!-- Stats -->
          <div class="gsap-reveal flex flex-wrap items-center gap-8 pt-6 border-t border-white/10">
            <div v-for="stat in STATS" :key="stat.label" class="flex flex-col gap-[2px]">
              <span class="font-display font-extrabold text-white leading-none"
                style="font-size: clamp(1.5rem, 2.5vw, 2.2rem);">
                {{ stat.value }}{{ stat.suffix }}
              </span>
              <span class="text-xs text-white/55 uppercase tracking-[0.06em]">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <!-- Right: conference card -->
        <div class="gsap-reveal-right">
          <div class="relative rounded-2xl overflow-hidden p-8"
            style="background:rgba(255,255,255,0.07);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.12);">

            <!-- Card tag -->
            <div class="inline-block px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold tracking-[0.04em] mb-4">
              CppIndiaCon 2024
            </div>

            <h2 class="font-display font-bold text-white leading-tight mb-3" style="font-size: clamp(1.25rem, 2vw, 1.75rem);">
              The C++ Festival of India
            </h2>
            <p class="text-sm text-white/65 leading-relaxed mb-5">
              Our 4th annual conference brought together 8 international C++ experts for
              two days of talks, workshops, and networking.
            </p>

            <!-- Speaker tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span v-for="speaker in speakers" :key="speaker"
                class="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80">
                {{ speaker }}
              </span>
            </div>

            <!-- Card actions -->
            <div class="flex items-center gap-3 mb-6">
              <RouterLink to="/conference?year=2024"
                class="inline-flex items-center gap-1 px-4 py-2 rounded-md bg-secondary text-white text-sm font-semibold transition-all duration-fast hover:bg-secondary-dark">
                View Conference
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </RouterLink>
              <RouterLink to="/tech-talks"
                class="inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-all duration-fast hover:bg-white/10"
                style="background:transparent;border:1px solid rgba(255,255,255,0.25);color:white;">
                Past Talks
              </RouterLink>
            </div>

            <!-- Code snippet -->
            <pre class="rounded-lg p-4 text-[12px] leading-[1.7] text-white/60"
              style="background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.08);font-family:var(--font-mono);"
              aria-hidden="true"><code><span style="color:#c792ea">template</span>&lt;<span style="color:#c792ea">typename</span> T&gt;
<span style="color:#c792ea">concept</span> <span style="color:#82aaff">CppDev</span> =
  std::is_curious_v&lt;T&gt; &amp;&amp;
  std::loves_cpp&lt;T&gt;;</code></pre>
          </div>
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40 text-xs tracking-[0.1em] uppercase">
      <span>Scroll</span>
      <div class="w-[1px] h-10 animate-scroll-line" style="background:linear-gradient(to bottom,rgba(255,255,255,0.4),transparent);" />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { SITE, STATS } from '@/constants'
import { useGsap } from '@/composables/useGsap'

const IconDiscord = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>` }

const speakers = ['Alex Dathskovsky', 'Ankur Satle', 'Jonathan Müller', 'Mike Shah']

const { staggerReveal, slideRight } = useGsap()
onMounted(() => {
  staggerReveal('.gsap-reveal', { y: 30, delay: 0.1 })
  slideRight('.gsap-reveal-right')
})
</script>
