<!--
  CommunityStats — Community numbers strip
-->
<template>
  <section
    class="py-12 border-t border-wire-light border-b"
    style="background: linear-gradient(135deg, rgba(79,142,247,0.15) 0%, rgba(155,116,245,0.15) 100%), var(--color-surface-alt);"
    aria-label="Community statistics"
  >
    <div class="container">
      <div class="flex flex-wrap justify-around items-center gap-8">
        <div
          v-for="(stat, i) in STATS"
          :key="stat.label"
          class="text-center relative flex-1"
          style="min-width: 140px;"
        >
          <!-- Vertical divider -->
          <div v-if="i > 0" class="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-wire hidden md:block" />

          <span ref="counters" class="block font-display font-extrabold text-ink leading-none mb-2"
            style="font-size: clamp(1.875rem, 4vw, 3rem);">
            {{ stat.value }}{{ stat.suffix }}
          </span>
          <span class="text-sm text-ink-2 uppercase tracking-[0.07em]">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { STATS } from '@/constants'
import { useGsap } from '@/composables/useGsap'

const counters = ref([])
const { counter } = useGsap()

onMounted(() => {
  STATS.forEach((stat, i) => {
    if (counters.value[i]) {
      counter(counters.value[i], { end: stat.value, suffix: stat.suffix })
    }
  })
})
</script>
