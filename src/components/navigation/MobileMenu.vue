<template>
  <!-- Backdrop -->
  <Transition name="backdrop">
    <div v-if="open" class="mobile-menu__backdrop" aria-hidden="true" @click="$emit('close')" />
  </Transition>

  <!-- Drawer -->
  <Transition name="drawer">
    <nav
      v-if="open"
      id="mobile-menu"
      class="mobile-menu"
      aria-label="Mobile navigation"
      role="dialog"
      aria-modal="true"
    >
      <!-- Header -->
      <div class="mobile-menu__header">
        <RouterLink to="/" class="mobile-menu__logo" @click="$emit('close')">
          <img src="/assets/images/logo.png" alt="CppIndia" class="site-logo-img site-logo-img--sm" />
          <span>CppIndia</span>
        </RouterLink>
        <button
          class="mobile-menu__close"
          aria-label="Close menu"
          @click="$emit('close')"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Links -->
      <div class="mobile-menu__body">
        <div v-for="link in NAV_LINKS" :key="link.path" class="mobile-menu__item">
          <!-- Toggle for items with children -->
          <button
            v-if="link.children"
            class="mobile-menu__link mobile-menu__link--toggle"
            :class="{ 'mobile-menu__link--expanded': expanded === link.path }"
            @click="toggle(link.path)"
          >
            {{ link.label }}
            <svg class="mobile-menu__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          <!-- Plain link -->
          <RouterLink
            v-else
            :to="link.path"
            class="mobile-menu__link"
            @click="$emit('close')"
          >
            {{ link.label }}
          </RouterLink>

          <!-- Sub-items (simple list, no mega panels on mobile) -->
          <Transition name="accordion">
            <ul v-if="link.children && expanded === link.path" class="mobile-menu__sub">
              <template v-for="child in link.children" :key="child.path ?? child.category">
                <!-- Mega menu groups flatten to links -->
                <template v-if="child.items">
                  <li v-for="sub in child.items" :key="sub.path">
                    <RouterLink :to="sub.path" class="mobile-menu__sub-link" @click="$emit('close')">
                      {{ sub.label }}
                    </RouterLink>
                  </li>
                </template>
                <li v-else>
                  <RouterLink :to="child.path" class="mobile-menu__sub-link" @click="$emit('close')">
                    {{ child.label }}
                  </RouterLink>
                </li>
              </template>
            </ul>
          </Transition>
        </div>
      </div>

      <!-- Footer CTA -->
      <div class="mobile-menu__footer">
        <a :href="SITE.discordInvite" target="_blank" rel="noopener" class="btn btn--primary w-full" @click="$emit('close')">
          Join Discord
        </a>
        <div class="mobile-menu__contact">
          <a :href="`mailto:${SITE.email}`">{{ SITE.email }}</a>
        </div>
      </div>
    </nav>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useScrollLock } from '@/composables/useScrollLock'
import { NAV_LINKS, SITE } from '@/constants'

const props = defineProps({
  open: { type: Boolean, required: true },
})
defineEmits(['close'])

const { lock, unlock } = useScrollLock()
const expanded = ref(null)

watch(() => props.open, (val) => {
  val ? lock() : unlock()
  if (!val) expanded.value = null
})

function toggle(path) {
  expanded.value = expanded.value === path ? null : path
}
</script>

<style lang="scss" scoped>
// Backdrop
.mobile-menu__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: calc(var(--z-overlay) - 1);
  backdrop-filter: blur(4px);
}

// Drawer
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: min(360px, 92vw);
  height: 100dvh;
  background: var(--color-surface);
  z-index: var(--z-overlay);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  @include hide-scrollbar;

  &__header {
    @include flex(center, space-between);
    padding: var(--space-4) var(--space-6);
    border-bottom: 1px solid var(--color-border-light);
    flex-shrink: 0;
  }

  &__logo {
    @include flex(center, flex-start, var(--space-2));
    font-family: var(--font-secondary);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    text-decoration: none;
  }


  &__close {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    @include flex(center, center);
    color: var(--color-text);
    cursor: pointer;
    transition: background var(--transition-fast);

    &:hover { background: var(--color-surface-alt); }
  }

  &__body {
    flex: 1;
    padding: var(--space-4) 0;
    overflow-y: auto;
  }

  &__item {
    border-bottom: 1px solid var(--color-border-light);
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--space-4) var(--space-6);
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: var(--color-text);
    text-decoration: none;
    transition: all var(--transition-fast);
    cursor: pointer;

    &:hover { color: var(--color-primary); background: var(--color-surface-alt); }

    &--expanded { color: var(--color-primary); }
  }

  &__chevron {
    transition: transform var(--transition-base);
    .mobile-menu__link--expanded & { transform: rotate(180deg); }
  }

  &__sub {
    background: var(--color-surface-alt);
    padding: var(--space-2) 0;
  }

  &__sub-link {
    display: block;
    padding: var(--space-3) var(--space-8);
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: all var(--transition-fast);

    &:hover { color: var(--color-primary); padding-left: calc(var(--space-8) + 8px); }
  }

  &__footer {
    padding: var(--space-6);
    border-top: 1px solid var(--color-border-light);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;

    a {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }
  }
}

// Transitions
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.25s ease;
}
.backdrop-enter-from,
.backdrop-leave-to { opacity: 0; }

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-enter-from,
.drawer-leave-to { transform: translateX(100%); }

.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease, opacity 0.2s ease;
  max-height: 600px;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
