<template>
  <!-- Page transition progress bar -->
  <Transition name="progress">
    <div v-if="loading" class="page-progress" aria-hidden="true">
      <div class="page-progress__bar" />
    </div>
  </Transition>

  <RouterView />

  <!-- Global floating UI -->
  <ThemePicker />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ThemePicker from '@/components/common/ThemePicker.vue'

const router = useRouter()
const loading = ref(false)
let timer = null

router.beforeEach(() => {
  // Only show bar if navigation takes >150ms (avoids flicker on fast loads)
  timer = setTimeout(() => {
    loading.value = true
  }, 150)
})

router.afterEach(() => {
  clearTimeout(timer)
  loading.value = false
})

onMounted(() => {
  const loader = document.querySelector('.page-loader')
  if (loader) {
    loader.classList.add('fade-out')
    setTimeout(() => loader.remove(), 400)
  }
})
</script>

<style>
.page-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 9999;
  pointer-events: none;
}

.page-progress__bar {
  height: 100%;
  background: var(--gradient-btn);
  animation: progress-indeterminate 1.4s ease-in-out infinite;
  transform-origin: left center;
}

@keyframes progress-indeterminate {
  0%   { transform: scaleX(0);   margin-left: 0; }
  50%  { transform: scaleX(0.6); margin-left: 20%; }
  100% { transform: scaleX(0);   margin-left: 100%; }
}

.progress-enter-active { transition: opacity 0.1s ease; }
.progress-leave-active { transition: opacity 0.3s ease; }
.progress-enter-from,
.progress-leave-to    { opacity: 0; }
</style>
