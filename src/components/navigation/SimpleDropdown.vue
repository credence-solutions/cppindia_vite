<template>
  <Transition name="dropdown">
    <ul
      v-if="visible"
      class="absolute top-[calc(100%+8px)] left-0 min-w-[220px] bg-surface-raised border border-wire-light rounded-lg shadow-card-lg p-2 z-dropdown backdrop-glass"
      role="menu"
    >
      <li v-for="item in items" :key="item.path" role="none">
        <RouterLink
          :to="item.path"
          class="dropdown-link"
          role="menuitem"
          @click="$emit('close')"
        >{{ item.label }}</RouterLink>
      </li>
    </ul>
  </Transition>
</template>

<script setup>
defineProps({
  items:   { type: Array,   required: true },
  visible: { type: Boolean, default: false },
})
defineEmits(['close'])
</script>

<style scoped>
.dropdown-link {
  display: block;
  padding: 8px 16px;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  border-radius: 8px;
  text-decoration: none;
  transition: all 150ms ease;
}
.dropdown-link:hover,
.dropdown-link.router-link-active {
  color: var(--color-primary);
  background: var(--color-surface-alt);
  padding-left: 20px;
}

.dropdown-enter-active,
.dropdown-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.dropdown-enter-from,
.dropdown-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
