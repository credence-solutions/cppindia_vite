<template>
  <header
    class="fixed top-0 left-0 right-0 z-sticky transition-[box-shadow,background] duration-base"
    role="banner"
  >
    <!-- Announcement banner -->
    <AnnouncementBanner />

    <!-- Nav bar -->
    <div
      class="transition-all duration-base backdrop-glass"
      :style="nav.isScrolled
        ? `background: var(--nav-bg-scrolled); box-shadow: var(--nav-shadow);`
        : `background: var(--nav-bg);`"
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
        <nav ref="navRef" class="flex-1 hidden lg:block" aria-label="Main navigation">
          <ul class="flex items-center justify-end gap-0" role="list">
            <li
              v-for="link in NAV_LINKS"
              :key="link.path"
              class="relative"
            >
              <!-- Items with children: button toggle only, no page navigation -->
              <button
                v-if="link.children"
                class="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-fast whitespace-nowrap cursor-pointer"
                :class="isActive(link.path) ? 'text-primary font-semibold' : 'text-ink hover:text-primary'"
                :aria-expanded="nav.activeMegaMenu === link.path"
                @click.stop="nav.setMegaMenu(link.path)"
              >
                {{ link.label }}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  class="transition-transform duration-fast"
                  :class="nav.activeMegaMenu === link.path ? 'rotate-180' : ''"
                ><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              <!-- Leaf links: navigate normally -->
              <RouterLink
                v-else
                :to="link.path"
                class="flex items-center px-4 py-2 text-sm font-medium text-ink rounded-md transition-colors duration-fast whitespace-nowrap hover:text-primary"
                :class="isActive(link.path) ? 'text-primary font-semibold' : ''"
              >{{ link.label }}</RouterLink>

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
                @close="nav.closeMegaMenu"
              />
            </li>
          </ul>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-3 flex-shrink-0">
          <a :href="SITE.discordInvite" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm hidden lg:inline-flex">
            Join Community
          </a>

          <!-- Hamburger -->
          <button
            class="hamburger"
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

  <!-- Spacer — accounts for banner (when visible) + navbar height -->
  <div :style="{ height: bannerVisible ? 'calc(var(--navbar-height) + 42px)' : 'var(--navbar-height)' }" aria-hidden="true" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import AnnouncementBanner from './AnnouncementBanner.vue'
import { useNavigationStore } from '@/stores/navigation'
import { NAV_LINKS, SITE } from '@/constants'
import MegaMenu from '@/components/navigation/MegaMenu.vue'
import SimpleDropdown from '@/components/navigation/SimpleDropdown.vue'
import MobileMenu from '@/components/navigation/MobileMenu.vue'
import { useBannerState } from '@/composables/useBannerState'

const route  = useRoute()
const nav    = useNavigationStore()
const navRef = ref(null)
const { visible: bannerVisible } = useBannerState()

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function handleClickOutside(e) {
  if (navRef.value && !navRef.value.contains(e.target)) {
    nav.closeMegaMenu()
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside, true))
onUnmounted(() => document.removeEventListener('click', handleClickOutside, true))
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
@media (min-width: 1024px) { .hamburger { display: none !important; } }
</style>
