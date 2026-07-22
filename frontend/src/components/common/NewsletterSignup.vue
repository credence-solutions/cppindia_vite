<template>
  <div
    class="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
    style="background: linear-gradient(135deg, rgba(8,145,178,0.07), rgba(34,211,238,0.04)); border: 1px solid rgba(8,145,178,0.2);"
  >
    <div class="flex items-start gap-4">
      <!-- Icon -->
      <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style="background:rgba(8,145,178,0.12); border:1px solid rgba(8,145,178,0.2);">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-soft)" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      </div>
      <div>
        <p class="font-display font-bold text-base mb-1" style="color:var(--color-text);">
          {{ title }}
        </p>
        <p class="text-sm leading-relaxed" style="color:var(--color-text-secondary);">
          {{ description }}
        </p>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-2 flex-shrink-0 w-full sm:w-auto">
      <a
        :href="SITE.discordInvite"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-opacity duration-150"
        style="background: var(--gradient-btn);"
        onmouseover="this.style.opacity='0.9'"
        onmouseout="this.style.opacity='1'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.132 18.112a19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
        Join Discord
      </a>
      <a
        v-if="showArchive"
        href="/resources#newsletter"
        class="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-150"
        style="background:rgba(8,145,178,0.07); color:var(--color-primary-soft); border:1px solid rgba(8,145,178,0.2);"
        onmouseover="this.style.background='rgba(8,145,178,0.14)'; this.style.borderColor='rgba(8,145,178,0.4)'"
        onmouseout="this.style.background='rgba(8,145,178,0.07)'; this.style.borderColor='rgba(8,145,178,0.2)'"
      >
        Read Archive
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { SITE } from '@/constants'

defineProps({
  title: {
    type: String,
    default: 'Stay in the loop',
  },
  description: {
    type: String,
    default: 'Get the CppIndia monthly newsletter — talks, resources, community highlights. No spam, unsubscribe anytime.',
  },
  showArchive: {
    type: Boolean,
    default: false,
  },
})
</script>
