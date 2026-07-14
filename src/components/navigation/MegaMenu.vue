<template>
  <Transition name="megamenu">
    <div v-if="visible" class="mega-menu" role="menu" aria-label="Products mega menu">
      <div class="container mega-menu__inner">
        <!-- Categories -->
        <div
          v-for="group in items"
          :key="group.category"
          class="mega-menu__group"
        >
          <p class="mega-menu__category">{{ group.category }}</p>
          <ul class="mega-menu__list" role="list">
            <li v-for="item in group.items" :key="item.path">
              <RouterLink
                :to="item.path"
                class="mega-menu__link"
                role="menuitem"
                @click="$emit('close')"
              >
                <span class="mega-menu__link-dot" aria-hidden="true" />
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Featured banner -->
        <div class="mega-menu__featured">
          <div class="mega-menu__featured-inner">
            <p class="mega-menu__featured-label">Community</p>
            <h3 class="mega-menu__featured-title">
              Join India's<br />C++ Community
            </h3>
            <p class="mega-menu__featured-text">
              Connect with C++ developers across India on Discord, attend talks, and grow together.
            </p>
            <a :href="SITE.discordInvite" target="_blank" rel="noopener" class="btn btn--outline-white btn--sm" @click="$emit('close')">
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

<style lang="scss" scoped>
.mega-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  max-width: var(--container-max);
  background: var(--color-surface-raised);
  backdrop-filter: blur(16px);
  border-top: 2px solid rgba(155, 116, 245, 0.5);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(79, 142, 247, 0.08);
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  overflow: hidden;
  z-index: var(--z-dropdown);

  &__inner {
    display: grid;
    grid-template-columns: repeat(3, 1fr) 280px;
    gap: 0;
    padding-block: var(--space-8);
  }

  &__group {
    padding: var(--space-4) var(--space-8);
    border-right: 1px solid var(--color-border-light);

    &:last-of-type { border-right: none; }
  }

  &__category {
    @include label(var(--text-xs), var(--weight-semibold));
    color: var(--color-text-muted);
    margin-bottom: var(--space-3);
    padding-bottom: var(--space-2);
    border-bottom: 1px solid var(--color-border-light);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  &__link {
    @include flex(center, flex-start, var(--space-2));
    padding: var(--space-2) var(--space-3);
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);

    &:hover {
      color: var(--color-primary);
      background: var(--color-surface-alt);
      padding-left: var(--space-4);
    }
  }

  &__link-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: $color-secondary;
    flex-shrink: 0;
    opacity: 0;
    transition: opacity var(--transition-fast);

    .mega-menu__link:hover & { opacity: 1; }
  }

  // Featured panel
  &__featured {
    background: linear-gradient(135deg, rgba(79, 142, 247, 0.12) 0%, rgba(155, 116, 245, 0.18) 100%);
    border-left: 1px solid rgba(155, 116, 245, 0.2);
    padding: var(--space-8);
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -40px;
      right: -40px;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(155, 116, 245, 0.15), transparent 70%);
    }

    &-inner {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      position: relative;
    }

    &-label {
      @include label(var(--text-xs), var(--weight-semibold));
      color: $color-secondary;
      letter-spacing: 0.08em;
    }

    &-title {
      font-family: var(--font-secondary);
      font-size: var(--text-xl);
      font-weight: var(--weight-bold);
      color: var(--color-text);
      line-height: var(--leading-snug);
    }

    &-text {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      line-height: var(--leading-relaxed);
    }
  }
}

// Transitions
.megamenu-enter-active,
.megamenu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.megamenu-enter-from,
.megamenu-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}
</style>
