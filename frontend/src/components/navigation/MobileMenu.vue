<template>
  <!-- Backdrop -->
  <Transition name="backdrop">
    <div
      v-if="open"
      class="fixed inset-0 bg-black/50 backdrop-blur-[4px] z-overlay"
      aria-hidden="true"
      style="z-index: 299;"
      @click="$emit('close')"
    />
  </Transition>

  <!-- Drawer -->
  <Transition name="drawer">
    <nav
      v-if="open"
      id="mobile-menu"
      class="fixed top-0 right-0 flex flex-col bg-surface overflow-y-auto hide-scrollbar"
      style="width: min(360px, 92vw); height: 100dvh; z-index: 300;"
      aria-label="Mobile navigation"
      role="dialog"
      aria-modal="true"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-wire-light flex-shrink-0">
        <RouterLink to="/" class="flex items-center gap-2 no-underline" @click="$emit('close')">
          <img :src="assetPath('/assets/images/logo.png')" alt="CppIndia" class="site-logo-img site-logo-img--sm" />
          <span class="font-display text-xl font-bold text-ink">CppIndia</span>
        </RouterLink>
        <button
          class="w-9 h-9 flex items-center justify-center rounded-md text-ink hover:bg-surface-alt transition-colors duration-fast cursor-pointer"
          aria-label="Close menu"
          @click="$emit('close')"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Links -->
      <div class="flex-1 py-4 overflow-y-auto">
        <div v-for="link in NAV_LINKS" :key="link.path" class="border-b border-wire-light">
          <div v-if="link.children" class="flex items-center">
            <RouterLink
              :to="link.path"
              class="flex-1 px-6 py-4 text-base font-medium text-ink no-underline hover:text-primary hover:bg-surface-alt transition-all duration-fast"
              :class="expanded === link.path ? 'text-primary' : ''"
              @click="$emit('close')"
            >{{ link.label }}</RouterLink>
            <button
              class="px-4 py-4 text-ink hover:text-primary hover:bg-surface-alt transition-all duration-fast cursor-pointer border-l border-wire-light"
              :class="expanded === link.path ? 'text-primary' : ''"
              :aria-label="`Toggle ${link.label} submenu`"
              @click="toggle(link.path)"
            >
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                class="transition-transform duration-base"
                :class="expanded === link.path ? 'rotate-180' : ''"
              ><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
          <RouterLink
            v-else
            :to="link.path"
            class="flex items-center px-6 py-4 text-base font-medium text-ink no-underline hover:text-primary hover:bg-surface-alt transition-all duration-fast"
            @click="$emit('close')"
          >{{ link.label }}</RouterLink>

          <Transition name="accordion">
            <ul v-if="link.children && expanded === link.path" class="bg-surface-alt py-2">
              <template v-for="child in link.children" :key="child.path ?? child.category">
                <template v-if="child.items">
                  <li v-for="sub in child.items" :key="sub.path">
                    <RouterLink :to="sub.path" class="block px-8 py-3 text-sm text-ink-2 no-underline hover:text-primary hover:pl-10 transition-all duration-fast" @click="$emit('close')">{{ sub.label }}</RouterLink>
                  </li>
                </template>
                <li v-else>
                  <RouterLink :to="child.path" class="block px-8 py-3 text-sm text-ink-2 no-underline hover:text-primary hover:pl-10 transition-all duration-fast" @click="$emit('close')">{{ child.label }}</RouterLink>
                </li>
              </template>
            </ul>
          </Transition>
        </div>
      </div>

      <!-- Footer CTA -->
      <div class="px-6 py-6 border-t border-wire-light flex-shrink-0 flex flex-col gap-4">
        <a :href="SITE.discordInvite" target="_blank" rel="noopener" class="btn btn--primary w-full justify-center" @click="$emit('close')">
          Join Discord
        </a>
        <p class="text-center text-sm text-ink-2">
          <a :href="`mailto:${SITE.email}`" class="hover:text-primary transition-colors duration-fast">{{ SITE.email }}</a>
        </p>
      </div>
    </nav>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useScrollLock } from '@/composables/useScrollLock'
import { NAV_LINKS, SITE } from '@/constants'
import { useAssetPath } from '@/composables/useAssetPath'

const props = defineProps({ open: { type: Boolean, required: true } })
defineEmits(['close'])

const { lock, unlock } = useScrollLock()
const { assetPath } = useAssetPath()
const expanded = ref(null)

watch(() => props.open, (val) => {
  val ? lock() : unlock()
  if (!val) expanded.value = null
})

function toggle(path) {
  expanded.value = expanded.value === path ? null : path
}
</script>
