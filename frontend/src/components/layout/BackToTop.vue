<template>
  <Transition name="btt">
    <button
      v-if="visible && !nav.mobileMenuOpen"
      class="fixed bottom-6 left-6 w-11 h-11 flex items-center justify-center rounded-full bg-primary text-white shadow-card-lg z-dropdown cursor-pointer transition-all duration-base hover:bg-primary-dark hover:-translate-y-[3px] hover:shadow-brand"
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
import { useNavigationStore } from '@/stores/navigation'

// Bottom-left: the Join widget and theme picker own the bottom-right corner.
const nav = useNavigationStore()

const visible = ref(false)

function onScroll()   { visible.value = window.scrollY > 400 }
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

onMounted(()   => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.btt-enter-active, .btt-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.btt-enter-from, .btt-leave-to { opacity: 0; transform: translateY(12px); }
</style>
