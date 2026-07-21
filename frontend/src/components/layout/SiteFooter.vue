<template>
  <footer class="bg-pitch text-white/75" role="contentinfo">
    <!-- Main body -->
    <div class="py-16 pb-10">
      <div class="container">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1.2fr]">

          <!-- Brand column -->
          <div class="flex flex-col">
            <RouterLink to="/" class="flex items-center gap-3 no-underline mb-4" aria-label="CppIndia">
              <img :src="assetPath('/assets/images/logo.png')" alt="CppIndia" class="site-logo-img" />
              <div class="flex flex-col">
                <span class="font-display font-bold text-lg text-white leading-tight">CppIndia</span>
                <span class="text-[10px] font-medium text-white/50 tracking-[0.06em] uppercase">India's C++ Community</span>
              </div>
            </RouterLink>

            <p class="text-sm text-white/55 leading-relaxed mb-5">
              A community for C++ developers across India — students to seasoned engineers —
              united through tech talks, conferences, and shared resources.
            </p>

            <div class="flex items-center gap-2 flex-wrap">
              <a :href="SITE.social.discord"  aria-label="Discord"    target="_blank" rel="noopener noreferrer" class="social-icon-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
              <a :href="SITE.social.youtube"  aria-label="YouTube"    target="_blank" rel="noopener noreferrer" class="social-icon-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              </a>
              <a :href="SITE.social.linkedin" aria-label="LinkedIn"   target="_blank" rel="noopener noreferrer" class="social-icon-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a :href="SITE.social.twitter"  aria-label="Twitter / X" target="_blank" rel="noopener noreferrer" class="social-icon-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a :href="SITE.social.github"   aria-label="GitHub"     target="_blank" rel="noopener noreferrer" class="social-icon-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a :href="SITE.social.facebook" aria-label="Facebook"   target="_blank" rel="noopener noreferrer" class="social-icon-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a :href="`mailto:${SITE.email}`" aria-label="Email" class="social-icon-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>

          <!-- Quick links — merged community + about, essentials only -->
          <div class="flex flex-col">
            <h4 class="font-display font-semibold text-sm text-white uppercase tracking-[0.07em] mb-4">Explore</h4>
            <ul class="flex flex-col gap-2">
              <li><RouterLink to="/tech-talks"        class="footer-link">Tech Talks</RouterLink></li>
              <li><RouterLink to="/conference"        class="footer-link">CppIndiaCon</RouterLink></li>
              <li><RouterLink to="/call-for-speakers" class="footer-link">Speak at CppIndia</RouterLink></li>
            </ul>
          </div>

          <!-- Discord CTA -->
          <div class="flex flex-col">
            <h4 class="font-display font-semibold text-sm text-white uppercase tracking-[0.07em] mb-4">Community</h4>
            <p class="text-sm text-white/55 leading-relaxed mb-4">
              Join fellow C++ developers on Discord — ask questions, share ideas, stay updated.
            </p>
            <a
              :href="SITE.discordInvite"
              class="inline-flex items-center gap-2 px-4 py-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-md text-sm font-semibold transition-all duration-[150ms] w-fit mb-4 hover:-translate-y-px"
              target="_blank" rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              Join Discord
            </a>
          </div>

        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/[0.08] py-5">
      <div class="container flex flex-wrap items-center justify-between gap-4">
        <p class="text-xs text-white/45">
          &copy; {{ currentYear }} CppIndia User Group. All rights reserved.
        </p>
        <p class="text-xs text-white/40">
          Designed &amp; built by
          <a href="https://credencesolutions.in" target="_blank" rel="noopener noreferrer"
            class="text-white/60 hover:text-white transition-colors duration-[150ms] underline underline-offset-2">
            Credence Solutions
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { SITE } from '@/constants'
import { useAssetPath } from '@/composables/useAssetPath'

const currentYear = computed(() => new Date().getFullYear())
const { assetPath } = useAssetPath()
</script>

<style scoped>
.social-icon-btn {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.65);
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}
.social-icon-btn:hover {
  background: rgba(255,255,255,0.16);
  color: white;
  transform: translateY(-1px);
}
.social-icon-btn svg { flex-shrink: 0; }

.footer-link {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color 150ms ease;
}
.footer-link:hover { color: white; }
</style>
