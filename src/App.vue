<template>
  <!-- Root transition wrapper — applies page transitions -->
  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>

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
