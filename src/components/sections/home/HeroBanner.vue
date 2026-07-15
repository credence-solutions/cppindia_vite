<!--
  HeroBanner — CppIndia homepage hero
-->
<template>
  <section
    class="relative min-h-screen flex items-center overflow-hidden"
    aria-label="Hero banner"
    style="background: #060B1A;"
  >

    <!-- Background layers -->
    <!-- Aurora top-left: primary blue -->
    <div class="absolute pointer-events-none"
      style="width:900px;height:700px;background:radial-gradient(ellipse at 30% 40%,rgba(79,142,247,0.18) 0%,transparent 65%);top:-200px;left:-200px;" />
    <!-- Aurora bottom-right: violet -->
    <div class="absolute pointer-events-none"
      style="width:700px;height:600px;background:radial-gradient(ellipse at 70% 60%,rgba(155,116,245,0.14) 0%,transparent 65%);bottom:-150px;right:-100px;" />
    <!-- Mid accent: teal -->
    <div class="absolute pointer-events-none"
      style="width:500px;height:400px;background:radial-gradient(ellipse,rgba(45,212,191,0.07) 0%,transparent 70%);top:40%;right:20%;" />

    <!-- Dot grid pattern -->
    <div class="absolute inset-0 pointer-events-none" style="
      background-image: radial-gradient(circle, rgba(79,142,247,0.12) 1px, transparent 1px);
      background-size: 40px 40px;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
    " />

    <!-- Bottom fade to next section -->
    <div class="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
      style="background: linear-gradient(to bottom, transparent, #060B1A);" />

    <div class="container relative z-[1]"
      style="padding-top: calc(68px + 2.5rem); padding-bottom: 3.5rem;">
      <div class="grid grid-cols-1 gap-10 items-center lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_480px] lg:gap-14">

        <!-- ── Left: content ── -->
        <div>

          <!-- Live badge -->
          <div class="gsap-reveal inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7"
            style="border:1px solid rgba(79,142,247,0.3);background:rgba(79,142,247,0.08);">
            <span class="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse-dot flex-shrink-0" />
            <span class="text-xs font-semibold text-[#93C5FD] tracking-[0.05em]">
              India's C++ User Group &nbsp;·&nbsp; Est. {{ SITE.founded }}
            </span>
          </div>

          <!-- Headline -->
          <h1 class="gsap-reveal font-display font-extrabold text-white tracking-tight leading-[1.06] mb-5"
            style="font-size: clamp(2.6rem, 5.5vw, 4.5rem);">
            India's very own<br />
            <span style="
              background: linear-gradient(90deg, #4F8EF7 0%, #9B74F5 50%, #2DD4BF 100%);
              -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
            ">C++ Community</span>
          </h1>

          <!-- Sub-headline -->
          <p class="gsap-reveal text-white/70 leading-[1.75] mb-8 max-w-[500px]"
            style="font-size: clamp(1rem, 1.6vw, 1.15rem);">
            A welcoming space for C++ developers — from students to seasoned engineers —
            to connect, learn, and grow through regular tech talks and our
            annual conference, <strong class="text-white/90 font-semibold">CppIndiaCon</strong>.
          </p>

          <!-- CTAs -->
          <div class="gsap-reveal flex flex-wrap items-center gap-3 mb-10">
            <a :href="SITE.discordInvite"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:brightness-110 hover:-translate-y-px active:translate-y-0"
              style="background:linear-gradient(135deg,#5865F2,#7289DA);box-shadow:0 4px 20px rgba(88,101,242,0.4);"
              target="_blank" rel="noopener noreferrer"
            >
              <IconDiscord />
              Join on Discord
            </a>
            <RouterLink to="/tech-talks"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 hover:-translate-y-px"
              style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);color:rgba(255,255,255,0.9);backdrop-filter:blur(8px);"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Watch Tech Talks
            </RouterLink>
          </div>

          <!-- Stats row -->
          <div class="gsap-reveal flex flex-wrap items-center gap-x-8 gap-y-4 pt-5"
            style="border-top:1px solid rgba(255,255,255,0.08);">
            <div v-for="(stat, i) in STATS" :key="stat.label" class="flex items-baseline gap-1.5">
              <span class="font-display font-extrabold text-white"
                style="font-size: clamp(1.6rem, 2.5vw, 2.2rem); letter-spacing:-0.02em;">
                {{ stat.value }}{{ stat.suffix }}
              </span>
              <span class="text-[11px] font-medium text-white/45 uppercase tracking-[0.07em] leading-tight">{{ stat.label }}</span>
              <span v-if="i < STATS.length - 1" class="hidden sm:block w-px h-6 bg-white/10 ml-4" />
            </div>
          </div>

        </div>

        <!-- ── Right: IDE card ── -->
        <div class="gsap-reveal-right">
          <div class="rounded-2xl overflow-hidden"
            style="background:rgba(12,18,32,0.85);border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(20px);box-shadow:0 24px 64px rgba(0,0,0,0.5),0 0 0 1px rgba(79,142,247,0.08);">

            <!-- Editor titlebar -->
            <div class="flex items-center gap-2 px-4 py-3"
              style="background:rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.07);">
              <span class="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span class="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span class="w-3 h-3 rounded-full bg-[#28C840]" />
              <span class="ml-3 text-[11px] font-mono text-white/35 tracking-[0.04em]">community.cpp</span>
            </div>

            <!-- Code block -->
            <div class="px-5 py-5 font-mono text-[13px] leading-[1.85]"
              style="color:rgba(255,255,255,0.5);">
              <div class="flex gap-4">
                <div class="select-none text-right text-white/20 text-[11px] leading-[1.85] w-4 flex-shrink-0">
                  <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>
                </div>
                <pre class="flex-1 m-0 p-0 bg-transparent overflow-x-auto" style="font-family:inherit;"><code><span style="color:#C792EA">template</span><span style="color:rgba(255,255,255,0.4)">&lt;</span><span style="color:#C792EA">typename</span> <span style="color:#82AAFF">T</span><span style="color:rgba(255,255,255,0.4)">&gt;</span>
<span style="color:#C792EA">concept</span> <span style="color:#2DD4BF">CppDeveloper</span> <span style="color:rgba(255,255,255,0.4)">=</span>
  <span style="color:#82AAFF">std</span><span style="color:rgba(255,255,255,0.4)">::</span><span style="color:#FFCB6B">curious_about_cpp</span><span style="color:rgba(255,255,255,0.4)">&lt;</span><span style="color:#82AAFF">T</span><span style="color:rgba(255,255,255,0.4)">&gt;</span> <span style="color:#89DDFF">&amp;&amp;</span>
  <span style="color:#82AAFF">std</span><span style="color:rgba(255,255,255,0.4)">::</span><span style="color:#FFCB6B">loves_to_learn</span><span style="color:rgba(255,255,255,0.4)">&lt;</span><span style="color:#82AAFF">T</span><span style="color:rgba(255,255,255,0.4)">&gt;</span> <span style="color:#89DDFF">&amp;&amp;</span>
  <span style="color:#82AAFF">std</span><span style="color:rgba(255,255,255,0.4)">::</span><span style="color:#FFCB6B">part_of_community</span><span style="color:rgba(255,255,255,0.4)">&lt;</span><span style="color:#82AAFF">T</span><span style="color:rgba(255,255,255,0.4)">&gt;</span><span style="color:rgba(255,255,255,0.4)">;</span>
<span style="color:#89DDFF">// You qualify 🎯</span></code></pre>
              </div>
            </div>

            <!-- Conference highlight strip -->
            <div class="px-5 pb-5" style="border-top:1px solid rgba(255,255,255,0.07);padding-top:1.1rem;">
              <div class="flex items-center justify-between mb-3">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
                  style="background:rgba(155,116,245,0.18);border:1px solid rgba(155,116,245,0.28);color:#C4B5FD;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  CppIndiaCon 2024
                </span>
                <RouterLink to="/conference?year=2024"
                  class="text-[11px] font-semibold hover:text-white transition-colors"
                  style="color:rgba(255,255,255,0.45);">
                  View details →
                </RouterLink>
              </div>

              <!-- Speaker avatars -->
              <div class="flex items-center gap-2 mb-4">
                <div class="flex -space-x-2">
                  <img v-for="s in speakerAvatars" :key="s.name"
                    :src="s.img" :alt="s.name"
                    class="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    style="border:2px solid rgba(12,18,32,0.9);"
                    loading="lazy"
                  />
                </div>
                <span class="text-xs text-white/40 ml-1">8 international speakers</span>
              </div>

              <!-- Action row -->
              <div class="flex items-center gap-2">
                <RouterLink to="/conference?year=2024"
                  class="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold text-white transition-all duration-200 hover:brightness-110"
                  style="background:linear-gradient(135deg,#4F8EF7,#9B74F5);box-shadow:0 4px 16px rgba(79,142,247,0.3);">
                  Conference Highlights
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </RouterLink>
                <RouterLink to="/tech-talks"
                  class="flex items-center justify-center px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:bg-white/10"
                  style="border:1px solid rgba(255,255,255,0.14);color:rgba(255,255,255,0.65);">
                  All Talks
                </RouterLink>
              </div>
            </div>

          </div>

          <!-- Floating social proof chips -->
          <div class="flex flex-wrap items-center gap-2 mt-4 justify-end">
            <a :href="SITE.social.youtube" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all hover:bg-white/10"
              style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#FF0000"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              1K+ subscribers
            </a>
            <a :href="SITE.social.linkedin" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all hover:bg-white/10"
              style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#0A66C2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              4K+ followers
            </a>
            <a :href="SITE.discordInvite" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all hover:bg-white/10"
              style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
              Discord community
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center">
      <div class="w-[1px] h-8 animate-scroll-line"
        style="background:linear-gradient(to bottom,rgba(255,255,255,0.3),transparent);" />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { SITE, STATS } from '@/constants'
import { useGsap } from '@/composables/useGsap'

const IconDiscord = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>` }

const speakerAvatars = [
  { name: 'Alex Dathskovsky',  img: '/assets/images/speakers/2024/alex.jpg' },
  { name: 'Ankur Satle',       img: '/assets/images/speakers/2024/ankur.png' },
  { name: 'Jonathan Müller',   img: '/assets/images/speakers/2024/jonathan.png' },
  { name: 'Mike Shah',         img: '/assets/images/speakers/2024/mike.jpg' },
]

const { staggerReveal, slideRight } = useGsap()
onMounted(() => {
  staggerReveal('.gsap-reveal', { y: 24, delay: 0.1 })
  slideRight('.gsap-reveal-right')
})
</script>
