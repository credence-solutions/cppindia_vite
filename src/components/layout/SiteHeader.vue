<template>
  <header
    class="header"
    :class="{
      'header--scrolled': nav.isScrolled,
      'header--menu-open': nav.mobileMenuOpen,
    }"
    role="banner"
  >
    <!-- Main navigation bar -->
    <div class="header__nav-bar">
      <div class="container header__nav-inner">
        <!-- Logo -->
        <RouterLink to="/" class="header__logo" aria-label="CppIndia — Home">
          <img
            src="/assets/images/logo.png"
            alt="CppIndia"
            class="site-logo-img"
          />
          <div class="header__logo-text">
            <span class="header__logo-name">CppIndia</span>
            <span class="header__logo-tagline">India's C++ Community</span>
          </div>
        </RouterLink>

        <!-- Desktop navigation -->
        <nav class="header__nav" aria-label="Main navigation">
          <ul class="header__nav-list" role="list">
            <li
              v-for="link in NAV_LINKS"
              :key="link.path"
              class="header__nav-item"
              :class="{ 'header__nav-item--has-children': link.children }"
              @mouseenter="link.children && nav.setMegaMenu(link.path)"
              @mouseleave="nav.closeMegaMenu()"
            >
              <RouterLink
                :to="link.path"
                class="header__nav-link"
                :class="{ 'header__nav-link--active': isActive(link.path) }"
              >
                {{ link.label }}
                <IconChevronDown v-if="link.children" class="header__nav-chevron" />
              </RouterLink>

              <!-- Mega menu -->
              <MegaMenu
                v-if="link.mega && link.children"
                :items="link.children"
                :visible="nav.activeMegaMenu === link.path"
                @close="nav.closeMegaMenu"
              />

              <!-- Simple dropdown -->
              <SimpleDropdown
                v-else-if="link.children"
                :items="link.children"
                :visible="nav.activeMegaMenu === link.path"
              />
            </li>
          </ul>
        </nav>

        <!-- CTA button -->
        <div class="header__actions">
          <RouterLink to="/join" class="btn btn--primary btn--sm">
            Join Community
          </RouterLink>

          <!-- Mobile hamburger -->
          <button
            class="header__hamburger"
            :class="{ 'header__hamburger--open': nav.mobileMenuOpen }"
            aria-label="Toggle mobile menu"
            :aria-expanded="nav.mobileMenuOpen"
            aria-controls="mobile-menu"
            @click="nav.toggleMobileMenu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <MobileMenu :open="nav.mobileMenuOpen" @close="nav.closeMobileMenu" />
  </header>

  <!-- Spacer so page content starts below fixed header -->
  <div class="header__spacer" aria-hidden="true" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'
import { NAV_LINKS } from '@/constants'
import MegaMenu from '@/components/navigation/MegaMenu.vue'
import SimpleDropdown from '@/components/navigation/SimpleDropdown.vue'
import MobileMenu from '@/components/navigation/MobileMenu.vue'

const IconChevronDown = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>` }

const route = useRoute()
const nav   = useNavigationStore()

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<style lang="scss" scoped>
// ----------------------------------------------------------------------------
// HEADER
// ----------------------------------------------------------------------------
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  transition: box-shadow var(--transition-base), background var(--transition-base);

  &--scrolled {
    .header__nav-bar {
      background: rgba(6, 9, 15, 0.97);
      backdrop-filter: blur(20px);
      box-shadow: 0 1px 0 rgba(139, 153, 187, 0.08), var(--shadow-md);
    }
  }
}

// Nav bar
.header__nav-bar {
  background: rgba(6, 9, 15, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border-light);
  transition: all var(--transition-base);
}

.header__nav-inner {
  @include flex(center, space-between);
  height: var(--navbar-height);
  gap: var(--space-8);
}

// Logo
.header__logo {
  @include flex(center, flex-start, var(--space-3));
  text-decoration: none;
  flex-shrink: 0;

  &-text {
    display: flex;
    flex-direction: column;
  }

  &-name {
    font-family: var(--font-secondary);
    font-weight: var(--weight-bold);
    font-size: var(--text-lg);
    color: var(--color-text);
    line-height: 1.1;
    letter-spacing: -0.01em;
  }

  &-tagline {
    font-size: 10px;
    font-weight: var(--weight-medium);
    color: var(--color-text-secondary);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
}

// Desktop nav
.header__nav {
  flex: 1;
  @include below(lg) { display: none; }
}

.header__nav-list {
  @include flex(center, flex-end, 0);
}

.header__nav-item {
  position: relative;

  &--has-children:hover .simple-dropdown {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0);
  }
}

.header__nav-link {
  @include flex(center, flex-start, 4px);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text);
  white-space: nowrap;
  border-radius: var(--radius-md);
  transition: color var(--transition-fast), background var(--transition-fast);

  &:hover,
  &--active {
    color: var(--color-primary);
  }

  &--active { font-weight: var(--weight-semibold); }
}

.header__nav-chevron {
  transition: transform var(--transition-fast);
  .header__nav-item:hover & { transform: rotate(180deg); }
}

// Actions (CTA + hamburger)
.header__actions {
  @include flex(center, flex-start, var(--space-3));
  flex-shrink: 0;
}

// Hamburger button
.header__hamburger {
  display: none;
  width: 36px;
  height: 36px;
  @include flex(center, center);
  flex-direction: column;
  gap: 5px;
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
  cursor: pointer;

  @include below(lg) { display: flex; }

  span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--color-text);
    border-radius: var(--radius-full);
    transition: transform var(--transition-base), opacity var(--transition-fast);
    transform-origin: center;
  }

  &--open {
    span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  }

  &:hover { background: var(--color-surface-alt); }
}

// Spacer pushes page content below fixed header
.header__spacer {
  height: var(--navbar-height);
}

// Global button styles (used here and across site)
:global(.btn) {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  line-height: 1;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all var(--transition-base);
  text-decoration: none;
  white-space: nowrap;

  &:focus-visible { @include focus-ring; }
}

:global(.btn--primary) {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);

  &:hover {
    background: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
    transform: translateY(-1px);
    box-shadow: var(--shadow-primary);
  }
}

:global(.btn--secondary) {
  background: var(--color-secondary);
  color: white;
  border-color: var(--color-secondary);

  &:hover {
    background: var(--color-secondary-dark);
    border-color: var(--color-secondary-dark);
    transform: translateY(-1px);
  }
}

:global(.btn--outline) {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);

  &:hover {
    background: var(--color-primary);
    color: white;
  }
}

:global(.btn--outline-white) {
  background: transparent;
  color: white;
  border-color: rgba(255, 255, 255, 0.6);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: white;
  }
}

:global(.btn--sm) {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
}

:global(.btn--lg) {
  padding: var(--space-4) var(--space-10);
  font-size: var(--text-md);
}
</style>
