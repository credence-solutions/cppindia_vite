<!--
  FloatingJoin — Quick Discord/community join widget (fixed bottom-right)
-->
<template>
  <div class="fixed bottom-6 right-6 z-floating sm:bottom-6 sm:right-6">
    <!-- Popup -->
    <Transition name="float-popup">
      <div
        v-if="open"
        class="absolute right-0 w-[260px] bg-surface border border-wire-light rounded-xl shadow-card-lg overflow-hidden"
        style="bottom: calc(100% + 12px);"
        role="dialog"
        aria-label="Join CppIndia"
      >
        <!-- Header bar -->
        <div class="flex items-center justify-between px-5 py-4" style="background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));">
          <span class="font-display font-bold text-sm text-white">Join CppIndia</span>
          <button class="text-white/70 hover:text-white cursor-pointer transition-colors" aria-label="Close" @click="open = false">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <p class="px-5 py-3 text-xs text-ink-3">Connect with India's C++ community</p>

        <div class="flex flex-col gap-2 px-3 pb-3">
          <a
            :href="SITE.discordInvite"
            class="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-fast"
            style="background:rgba(88,101,242,0.1);color:var(--color-discord);"
            target="_blank"
            rel="noopener noreferrer"
            @click="open = false"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            Join Discord
          </a>
          <RouterLink to="/tech-talks"
            class="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-ink bg-surface-alt hover:bg-[rgba(8,145,178,0.1)] hover:text-secondary transition-all duration-fast"
            @click="open = false">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Watch Talks
          </RouterLink>
          <RouterLink to="/call-for-speakers"
            class="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-ink bg-surface-alt hover:bg-[rgba(8,145,178,0.1)] hover:text-secondary transition-all duration-fast"
            @click="open = false">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 003-3v-4a3 3 0 00-6 0V4a3 3 0 003 3z"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/></svg>
            Speak at CppIndia
          </RouterLink>
        </div>
      </div>
    </Transition>

    <!-- Toggle button -->
    <button
      class="w-[52px] h-[52px] rounded-full flex items-center justify-center bg-secondary text-white cursor-pointer shadow-glow-secondary transition-all duration-base relative hover:scale-[1.08]"
      :aria-label="open ? 'Close community menu' : 'Join CppIndia'"
      :aria-expanded="open"
      @click="open = !open"
    >
      <Transition name="icon-swap" mode="out-in">
        <svg v-if="!open" key="cpp" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
        </svg>
        <svg v-else key="close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </Transition>
      <span v-if="!open"
        class="absolute -top-1 -right-1 px-[5px] py-[2px] rounded-full bg-[var(--color-discord)] text-white text-[9px] font-bold tracking-[0.04em]"
        aria-hidden="true">
        Join
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SITE } from '@/constants'

const open = ref(false)
</script>

<style scoped>
.float-popup-enter-active,
.float-popup-leave-active { transition: all 250ms ease; }
.float-popup-enter-from,
.float-popup-leave-to { opacity: 0; transform: translateY(8px) scale(0.96); }

.icon-swap-enter-active,
.icon-swap-leave-active { transition: all 0.15s; }
.icon-swap-enter-from,
.icon-swap-leave-to { opacity: 0; transform: rotate(45deg) scale(0.7); }
</style>
