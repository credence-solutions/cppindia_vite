<!--
  JoinCta — Join the community CTA section
-->
<template>
  <section class="section relative overflow-hidden" style="background: linear-gradient(135deg, #07091C 0%, #0B0D2E 50%, #07091C 100%); border-top: 1px solid rgba(99,102,241,0.15);">

    <!-- Background glow -->
    <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%);" />
    <!-- Dot grid -->
    <div class="absolute inset-0 pointer-events-none opacity-30"
      style="background-image: radial-gradient(circle, rgba(99,102,241,0.3) 1px, transparent 1px); background-size: 32px 32px;" />

    <div class="container relative z-[1]">
      <div class="gsap-reveal text-center max-w-[720px] mx-auto">
        <h2 class="font-display font-bold mb-4" style="font-size: clamp(1.5rem, 3.5vw, 2.5rem); background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
          Ready to level up your C++?
        </h2>
        <p class="text-lg leading-relaxed mb-8" style="color: rgba(226,232,245,0.75);">
          Join hundreds of C++ developers across India. Attend free tech talks, participate
          in CppIndiaCon, get mentored, and be part of a community that loves C++.
        </p>

        <!-- CTAs -->
        <div class="flex flex-wrap justify-center items-center gap-4 mb-8">
          <a
            :href="SITE.discordInvite"
            class="btn btn--lg inline-flex items-center gap-2 font-semibold text-white transition-all duration-200"
            style="background: #5865F2; border-color: #5865F2; box-shadow: 0 0 20px rgba(88,101,242,0.4);"
            onmouseover="this.style.boxShadow='0 0 30px rgba(88,101,242,0.65)'"
            onmouseout="this.style.boxShadow='0 0 20px rgba(88,101,242,0.4)'"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconDiscord />
            Join Discord Server
          </a>
          <RouterLink
            to="/about"
            class="btn btn--lg inline-flex items-center gap-2 font-semibold transition-all duration-200"
            style="border: 1px solid rgba(99,102,241,0.4); color: #818CF8; background: transparent;"
            onmouseover="this.style.borderColor='rgba(99,102,241,0.65)'; this.style.background='rgba(99,102,241,0.08)'"
            onmouseout="this.style.borderColor='rgba(99,102,241,0.4)'; this.style.background='transparent'"
          >Learn More</RouterLink>
        </div>

        <!-- Platform links -->
        <div class="flex flex-wrap justify-center items-center gap-6 pt-6" style="border-top: 1px solid rgba(99,102,241,0.15);">
          <a
            v-for="platform in platforms"
            :key="platform.label"
            :href="platform.url"
            class="flex items-center gap-2 text-xs transition-colors duration-fast"
            style="color: rgba(148,163,184,0.55);"
            onmouseover="this.style.color='rgba(226,232,245,0.9)'"
            onmouseout="this.style.color='rgba(148,163,184,0.55)'"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="platform.label"
          >
            <component :is="platform.icon" />
            <span>{{ platform.label }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { SITE } from '@/constants'
import { useGsap } from '@/composables/useGsap'

const { fadeUp } = useGsap()
onMounted(() => fadeUp('.gsap-reveal', { trigger: '.section' }))

const IconDiscord  = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>` }

const platforms = [
  { label: 'YouTube',  url: SITE.social.youtube,  icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>` } },
  { label: 'LinkedIn', url: SITE.social.linkedin, icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>` } },
  { label: 'Twitter',  url: SITE.social.twitter,  icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>` } },
  { label: 'GitHub',   url: SITE.social.github,   icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>` } },
]
</script>
