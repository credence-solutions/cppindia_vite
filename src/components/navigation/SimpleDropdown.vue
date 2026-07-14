<template>
  <Transition name="dropdown">
    <ul v-if="visible" class="simple-dropdown" role="menu">
      <li v-for="item in items" :key="item.path" role="none">
        <RouterLink
          :to="item.path"
          class="simple-dropdown__link"
          role="menuitem"
        >
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </Transition>
</template>

<script setup>
defineProps({
  items:   { type: Array,   required: true },
  visible: { type: Boolean, default: false },
})
</script>

<style lang="scss" scoped>
.simple-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 220px;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: var(--space-2);
  z-index: var(--z-dropdown);
  backdrop-filter: blur(16px);

  &__link {
    display: block;
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);

    &:hover,
    &.router-link-active {
      color: var(--color-primary);
      background: var(--color-surface-alt);
      padding-left: var(--space-5);
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
