<template>
  <section
    class="relative py-20 pb-16 overflow-hidden"
    :style="bgStyle"
    :aria-label="`${title} page hero`"
  >
    <!-- Radial glow blob top-left -->
    <div class="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full pointer-events-none"
      style="background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(6,182,212,0.1) 50%, transparent 70%); filter: blur(48px);" />

    <!-- Secondary glow bottom-right -->
    <div class="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full pointer-events-none"
      style="background: radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%); filter: blur(40px);" />

    <!-- Dot grid with indigo dots -->
    <div class="absolute inset-0 pointer-events-none opacity-40"
      style="background-image: radial-gradient(circle, rgba(99,102,241,0.35) 1px, transparent 1px); background-size: 32px 32px;" />

    <!-- Bottom gradient fade -->
    <div class="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
      style="background: linear-gradient(to bottom, transparent, var(--hero-fade));" />

    <div class="container relative z-[1]">
      <!-- Breadcrumb -->
      <nav v-if="breadcrumb?.length" class="mb-6" aria-label="Breadcrumb">
        <ol class="flex flex-wrap items-center gap-2 text-xs" role="list">
          <li>
            <RouterLink to="/"
              class="transition-colors duration-fast"
              style="color: rgba(129,140,248,0.65);"
              onmouseover="this.style.color='rgba(129,140,248,1)'"
              onmouseout="this.style.color='rgba(129,140,248,0.65)'"
            >Home</RouterLink>
          </li>
          <li v-for="crumb in breadcrumb" :key="crumb.path" class="flex items-center gap-2">
            <span style="color: rgba(99,102,241,0.3);" aria-hidden="true">/</span>
            <RouterLink
              v-if="crumb.path"
              :to="crumb.path"
              class="transition-colors duration-fast"
              style="color: rgba(129,140,248,0.65);"
              onmouseover="this.style.color='rgba(129,140,248,1)'"
              onmouseout="this.style.color='rgba(129,140,248,0.65)'"
            >{{ crumb.label }}</RouterLink>
            <span v-else style="color: rgba(226,232,245,0.8);">{{ crumb.label }}</span>
          </li>
        </ol>
      </nav>

      <!-- Content -->
      <div>
        <p v-if="overline"
          class="text-xs font-bold uppercase tracking-widest mb-3"
          style="color: #A78BFA; letter-spacing: 0.14em;"
        >{{ overline }}</p>
        <h1
          class="font-display font-extrabold leading-tight tracking-tight mb-4"
          style="font-size: clamp(2rem, 4vw, 3.5rem); background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
        >{{ title }}</h1>
        <p v-if="subtitle" class="text-lg max-w-[560px] leading-relaxed" style="color: var(--hero-subtitle);">{{ subtitle }}</p>
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

const bgStyle = computed(() => {
  if (props.image) {
    return {
      backgroundImage: `linear-gradient(135deg, rgba(7,9,28,0.92) 0%, rgba(11,13,46,0.85) 100%), url(${props.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }
  return { background: 'var(--hero-bg)' }
})
</script>
