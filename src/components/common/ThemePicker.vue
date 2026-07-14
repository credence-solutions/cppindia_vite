<template>
  <div class="theme-picker" :class="{ 'theme-picker--open': open }">
    <!-- Toggle -->
    <button
      class="theme-picker__toggle"
      :title="open ? 'Close theme picker' : 'Change theme'"
      aria-label="Toggle theme picker"
      @click="open = !open"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    </button>

    <!-- Panel -->
    <Transition name="theme-panel">
      <div v-if="open" class="theme-picker__panel" role="listbox" aria-label="Select theme">
        <p class="theme-picker__label">Theme</p>
        <div
          v-for="t in THEMES"
          :key="t.id"
          class="theme-picker__option"
          :class="{ 'theme-picker__option--active': theme.active === t.id }"
          role="option"
          :aria-selected="theme.active === t.id"
          @click="select(t.id)"
        >
          <div class="theme-picker__swatches">
            <span
              v-for="color in t.preview"
              :key="color"
              class="theme-picker__swatch"
              :style="{ background: color }"
            />
          </div>
          <div class="theme-picker__meta">
            <span class="theme-picker__name">{{ t.name }}</span>
            <span class="theme-picker__desc">{{ t.description }}</span>
          </div>
          <svg v-if="theme.active === t.id" class="theme-picker__check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useThemeStore, THEMES } from '@/stores/theme'

const theme = useThemeStore()
const open = ref(false)

function select(id) {
  theme.setTheme(id)
  open.value = false
}
</script>

<style lang="scss" scoped>
.theme-picker {
  position: fixed;
  bottom: calc(var(--space-6) + 72px); // above FloatingContact
  right: var(--space-6);
  z-index: var(--z-floating);

  &__toggle {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-full);
    background: var(--color-surface-raised);
    border: 1px solid var(--color-border);
    color: var(--color-text-secondary);
    @include flex(center, center);
    cursor: pointer;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-md);

    &:hover {
      color: var(--color-primary);
      border-color: var(--color-primary);
      box-shadow: var(--shadow-primary);
    }

    .theme-picker--open & {
      color: var(--color-primary);
      border-color: var(--color-primary);
      background: var(--color-surface-raised);
    }
  }

  &__panel {
    position: absolute;
    bottom: calc(100% + var(--space-3));
    right: 0;
    width: 240px;
    background: var(--color-surface-raised);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: var(--space-3);
    box-shadow: var(--shadow-xl);
    backdrop-filter: blur(16px);
  }

  &__label {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: var(--space-1) var(--space-2);
    margin-bottom: var(--space-2);
  }

  &__option {
    @include flex(center, flex-start, var(--space-3));
    padding: var(--space-2) var(--space-2);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: background var(--transition-fast);

    &:hover { background: var(--color-surface-alt); }

    &--active { background: rgba(79, 142, 247, 0.08); }
  }

  &__swatches {
    @include flex(center, flex-start);
    gap: 3px;
    flex-shrink: 0;
  }

  &__swatch {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.15);

    &:last-child {
      width: 16px;
      height: 16px;
      border-radius: var(--radius-sm);
      margin-left: 2px;
    }
  }

  &__meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__name {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--color-text);
    white-space: nowrap;
  }

  &__desc {
    font-size: 10px;
    color: var(--color-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__check {
    color: var(--color-primary);
    flex-shrink: 0;
  }
}

// Transition
.theme-panel-enter-active,
.theme-panel-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.theme-panel-enter-from,
.theme-panel-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
