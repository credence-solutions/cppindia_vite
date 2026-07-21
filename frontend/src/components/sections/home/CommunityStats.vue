<!--
  CommunityStats — Community numbers strip with animated count-up
-->
<template>
  <section
    class="section"
    style="background: var(--emphasis-bg);"
    aria-label="Community statistics"
  >
    <div class="container">
      <p class="text-center text-xs font-semibold uppercase tracking-[0.12em] mb-6 md:mb-10" style="color: var(--color-text-muted);">
        Trusted by developers across India
      </p>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y divide-wire lg:divide-y-0 lg:divide-x lg:divide-wire">
        <div
          v-for="stat in displayStats"
          :key="stat.label"
          class="flex flex-col items-center text-center px-3 py-6 sm:px-6 sm:py-8"
        >
          <div
            class="font-display font-extrabold leading-none mb-3"
            style="font-size: clamp(2.5rem, 5vw, 4rem); text-shadow: 0 0 40px rgba(79,142,247,0.5), 0 0 80px rgba(79,142,247,0.2);"
          >
            <span class="text-gradient-brand">{{ stat.displayed }}</span><span
              class="text-gradient-brand"
              style="font-size: 0.55em; opacity: 0.75; vertical-align: super;"
            >{{ stat.suffix }}</span>
          </div>
          <span class="text-xs uppercase tracking-[0.1em] font-medium" style="color: var(--color-text-muted);">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { STATS } from '@/constants'

const displayStats = ref(STATS.map(s => ({ ...s, displayed: 0 })))

onMounted(() => {
  STATS.forEach((stat, i) => {
    const duration = 1800
    const steps = 60
    const increment = stat.value / steps
    let count = 0
    const timer = setInterval(() => {
      count++
      displayStats.value[i].displayed = Math.min(Math.round(increment * count), stat.value)
      if (count >= steps) clearInterval(timer)
    }, duration / steps)
  })
})
</script>
