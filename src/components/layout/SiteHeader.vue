<template>
  <header
    class="fixed top-0 left-0 right-0 z-sticky transition-[box-shadow,background] duration-base"
    role="banner"
  >
    <!-- Nav bar -->
    <div
      class="transition-all duration-base"
      :class="nav.isScrolled
        ? 'bg-[rgba(6,9,15,0.97)] backdrop-glass shadow-[0_1px_0_rgba(139,153,187,0.08),0_4px_12px_rgba(0,0,0,0.4)]'
        : 'bg-[rgba(6,9,15,0.88)] backdrop-glass'"
    >
      <div class="container flex items-center justify-between h-navbar gap-8">

        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-3 no-underline flex-shrink-0" aria-label="CppIndia — Home">
          <img src="/assets/images/logo.png" alt="CppIndia" class="site-logo-img" />
          <div class="flex flex-col">
            <span class="font-display font-bold text-lg text-ink leading-tight tracking-[-0.01em]">CppIndia</span>
            <span class="text-[10px] font-medium text-ink-2 tracking-[0.08em] uppercase">India's C++ Community</span>
          </div>
        </RouterLink>

        <!-- Desktop nav -->
        <nav class="flex-1 hidden lg:block" aria-label="Main navigation">
          <ul class="flex items-center justify-end gap-0" role="list">
            <li
              v-for="link in NAV_LINKS"
              :key="link.path"
              class="relative"
              @mouseenter="link.children && nav.setMegaMenu(link.path)"
              @mouseleave="nav.closeMegaMenu()"
            >
              <RouterLink
                :to="link.path"
                class="flex items-center gap-1 px-4 py-2 text-sm font-medium text-ink rounded-md transition-colors duration-fast whitespace-nowrap hover:text-primary"
                :class="isActive(link.path) ? 'text-primary font-semibold' : ''"
              >
                {{ link.label }}
                <svg v-if="link.children" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  class="transition-transform duration-fast"
                  :class="nav.activeMegaMenu === link.path ? 'rotate-180' : ''"
                ><polyline points="6 9 12 15 18 9"/></svg>
              </RouterLink>

              <MegaMenu
                v-if="link.mega && link.children"
                :items="link.children"
                :visible="nav.activeMegaMenu === link.path"
                @close="nav.closeMegaMenu"
              />
              <SimpleDropdown
                v-else-if="link.children"
                :items="link.children"
                :visible="nav.activeMegaMenu === link.path"
              />
            </li>
          </ul>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-3 flex-shrink-0">
          <RouterLink to="/join" class="btn btn--primary btn--sm hidden lg:inline-flex">
            Join Community
          </RouterLink>

          <!-- Hamburger -->
          <button
            class="hamburger lg:hidden"
            :class="{ 'hamburger--open': nav.mobileMenuOpen }"
            aria-label="Toggle mobile menu"
            :aria-expanded="nav.mobileMenuOpen"
            @click="nav.toggleMobileMenu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>

      </div>
    </div>

    <MobileMenu :open="nav.mobileMenuOpen" @close="nav.closeMobileMenu" />
  </header>

  <!-- Spacer -->
  <div class="h-navbar" aria-hidden="true" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'
import { NAV_LINKS } from '@/constants'
import MegaMenu from '@/components/navigation/MegaMenu.vue'
import SimpleDropdown from '@/components/navigation/SimpleDropdown.vue'
import MobileMenu from '@/components/navigation/MobileMenu.vue'

const route = useRoute()
const nav   = useNavigationStore()

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<style scoped>
.hamburger {
  width: 36px; height: 36px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 5px;
  border-radius: 8px;
  transition: background 150ms ease;
  cursor: pointer;
}
.hamburger:hover { background: var(--color-surface-alt); }
.hamburger span {
  display: block; width: 22px; height: 2px;
  background: var(--color-text);
  border-radius: 9999px;
  transition: transform 250ms ease, opacity 150ms ease;
  transform-origin: center;
}
.hamburger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger--open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
</style>
