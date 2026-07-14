<template>
  <Transition name="megamenu">
    <div
      v-if="visible"
      class="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-container bg-surface-raised backdrop-glass z-dropdown overflow-hidden rounded-b-xl"
      style="border-top: 2px solid rgba(155,116,245,0.5); box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(79,142,247,0.08);"
      role="menu"
    >
      <div class="container grid gap-0 py-8" style="grid-template-columns: repeat(3, 1fr) 280px;">

        <!-- Link groups -->
        <div
          v-for="group in items"
          :key="group.category"
          class="px-8 py-4 border-r border-wire-light last:border-r-0"
        >
          <p class="text-xs font-semibold text-ink-3 uppercase tracking-[0.08em] mb-3 pb-2 border-b border-wire-light">
            {{ group.category }}
          </p>
          <ul class="flex flex-col gap-1" role="list">
            <li v-for="item in group.items" :key="item.path">
              <RouterLink
                :to="item.path"
                class="mega-link"
                role="menuitem"
                @click="$emit('close')"
              >
                <span class="mega-dot" aria-hidden="true" />
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Featured panel -->
        <div
          class="px-8 py-8 flex items-center relative overflow-hidden border-l border-[rgba(155,116,245,0.2)]"
          style="background: linear-gradient(135deg, rgba(79,142,247,0.12) 0%, rgba(155,116,245,0.18) 100%);"
        >
          <!-- Ambient glow blob -->
          <div class="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
            style="background: radial-gradient(circle, rgba(155,116,245,0.15), transparent 70%);" />

          <div class="flex flex-col gap-4 relative">
            <p class="text-xs font-semibold text-secondary uppercase tracking-[0.08em]">Community</p>
            <h3 class="font-display text-xl font-bold text-ink leading-snug">
              Join India's<br />C++ Community
            </h3>
            <p class="text-sm text-ink-2 leading-relaxed">
              Connect with C++ developers across India on Discord, attend talks, and grow together.
            </p>
            <a :href="SITE.discordInvite" target="_blank" rel="noopener" class="btn btn--outline-white btn--sm w-fit" @click="$emit('close')">
              Join Discord
            </a>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { SITE } from '@/constants'

defineProps({
  items:   { type: Array,   required: true },
  visible: { type: Boolean, default: false },
})
defineEmits(['close'])
</script>

<style scoped>
.mega-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  border-radius: 8px;
  text-decoration: none;
  transition: all 150ms ease;
}
.mega-link:hover {
  color: var(--color-primary);
  background: var(--color-surface-alt);
  padding-left: 16px;
}
.mega-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--color-secondary);
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 150ms ease;
}
.mega-link:hover .mega-dot { opacity: 1; }
</style>
