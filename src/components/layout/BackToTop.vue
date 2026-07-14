<template>
  <Transition name="btt">
    <button
      v-if="visible"
      class="back-to-top"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  bottom: var(--space-8);
  right: var(--space-8);
  width: 44px;
  height: 44px;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-full);
  @include flex(center, center);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-dropdown);
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-3px);
    box-shadow: var(--shadow-xl);
  }

  &:focus-visible { @include focus-ring; }
}

.btt-enter-active,
.btt-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.btt-enter-from,
.btt-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
