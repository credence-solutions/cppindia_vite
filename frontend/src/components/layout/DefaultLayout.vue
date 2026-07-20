<template>
  <div class="layout">
    <!-- Sticky site header -->
    <SiteHeader />

    <!-- Main content area -->
    <main id="main-content" class="layout__main">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <!-- Footer -->
    <SiteFooter />

    <!-- Floating utilities -->
    <FloatingContact />
    <BackToTop />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useNavigationStore } from '@/stores/navigation'
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'
import FloatingContact from './FloatingContact.vue'
import BackToTop from './BackToTop.vue'

const nav = useNavigationStore()

// Track scroll position for sticky header
function onScroll() {
  nav.setScroll(window.scrollY)
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.layout { display: flex; flex-direction: column; min-height: 100vh; }
.layout__main { flex: 1; }
</style>
