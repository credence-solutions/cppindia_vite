<template>
  <RouterView />

  <!-- Global floating UI -->
  <ThemePicker />
</template>

<script setup>
import { onMounted } from 'vue'
import ThemePicker from '@/components/common/ThemePicker.vue'

onMounted(() => {
  // Remove static loader if present
  const loader = document.querySelector('.page-loader')
  if (loader) {
    loader.classList.add('fade-out')
    setTimeout(() => loader.remove(), 400)
  }
})
</script>
