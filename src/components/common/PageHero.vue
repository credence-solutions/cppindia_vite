<template>
  <section
    class="relative py-20 pb-16 overflow-hidden bg-cover bg-center"
    :style="bgStyle"
    :aria-label="`${title} page hero`"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(135deg, rgba(6,9,15,0.8) 0%, rgba(13,26,53,0.7) 100%);" />

    <!-- Decorative grid -->
    <div class="absolute inset-0 pointer-events-none opacity-30"
      style="background-image: linear-gradient(rgba(79,142,247,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.07) 1px, transparent 1px); background-size: 48px 48px;" />

    <div class="container relative z-[1]">
      <!-- Breadcrumb -->
      <nav v-if="breadcrumb?.length" class="mb-6" aria-label="Breadcrumb">
        <ol class="flex flex-wrap items-center gap-2 text-xs text-white/50" role="list">
          <li><RouterLink to="/" class="text-white/65 hover:text-white transition-colors duration-fast">Home</RouterLink></li>
          <li v-for="crumb in breadcrumb" :key="crumb.path" class="flex items-center gap-2">
            <span class="text-white/30" aria-hidden="true">/</span>
            <RouterLink v-if="crumb.path" :to="crumb.path" class="text-white/65 hover:text-white transition-colors duration-fast">{{ crumb.label }}</RouterLink>
            <span v-else>{{ crumb.label }}</span>
          </li>
        </ol>
      </nav>

      <!-- Content -->
      <div>
        <p v-if="overline" class="text-xs font-semibold text-white/65 uppercase tracking-widest mb-3">{{ overline }}</p>
        <h1
          class="font-display font-extrabold text-white leading-tight tracking-tight mb-4"
          style="font-size: clamp(2rem, 4vw, 3.5rem);"
        >{{ title }}</h1>
        <p v-if="subtitle" class="text-lg text-white/70 max-w-[560px] leading-relaxed">{{ subtitle }}</p>
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title:      { type: String, required: true },
  overline:   { type: String, default: '' },
  subtitle:   { type: String, default: '' },
  image:      { type: String, default: '' },
  breadcrumb: { type: Array,  default: () => [] },
})

const bgStyle = computed(() => ({
  backgroundImage: props.image
    ? `url(${props.image})`
    : 'linear-gradient(135deg, #060B1A 0%, #0D1A35 60%, #061020 100%)',
}))
</script>
