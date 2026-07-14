<!--
  CommunityStats — Community numbers strip
-->
<template>
  <section class="stats-strip" aria-label="Community statistics">
    <div class="container stats-strip__inner">
      <div
        v-for="(stat, i) in STATS"
        :key="stat.label"
        class="stats-strip__item"
        :class="{ 'stats-strip__item--divided': i > 0 }"
      >
        <span ref="counters" class="stats-strip__value">{{ stat.value }}{{ stat.suffix }}</span>
        <span class="stats-strip__label">{{ stat.label }}</span>
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

<style lang="scss" scoped>
.stats-strip {
  background:
    linear-gradient(135deg, rgba(79, 142, 247, 0.15) 0%, rgba(155, 116, 245, 0.15) 100%),
    var(--color-surface-alt);
  border-top: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
  padding: var(--space-12) 0;

  &__inner {
    @include flex(center, space-around);
    flex-wrap: wrap;
    gap: var(--space-8);
  }

  &__item {
    text-align: center;
    position: relative;
    flex: 1;
    min-width: 140px;

    &--divided::before {
      content: '';
      position: absolute;
      left: 0; top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 40px;
      background: var(--color-border);

      @include below(md) { display: none; }
    }
  }

  &__value {
    display: block;
    font-family: var(--font-secondary);
    font-size: clamp(var(--text-3xl), 4vw, 3rem);
    font-weight: var(--weight-extrabold);
    color: var(--color-text);
    line-height: 1;
    margin-bottom: var(--space-2);
  }

  &__label {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }
}
</style>
