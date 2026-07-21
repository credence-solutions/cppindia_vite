<template>
  <section
    class="relative pt-5 pb-4 md:pt-10 md:pb-7 overflow-hidden"
    :style="bgStyle"
    :aria-label="`${title} page hero`"
  >
    <!-- Subtle dot grid -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.08]"
      style="background-image: radial-gradient(circle, rgba(8,145,178,0.4) 1px, transparent 1px); background-size: 32px 32px;" />

    <div class="container relative z-[1]">
      <!-- Breadcrumb -->
      <nav v-if="breadcrumb?.length" class="mb-6" aria-label="Breadcrumb">
        <ol class="flex flex-wrap items-center gap-2 text-xs" role="list">
          <li>
            <RouterLink to="/"
              class="transition-colors duration-fast font-medium"
              style="color: var(--color-secondary-mid);"
              onmouseover="this.style.color='var(--color-primary-soft)'"
              onmouseout="this.style.color='var(--color-secondary-mid)'"
            >Home</RouterLink>
          </li>
          <li v-for="crumb in breadcrumb" :key="crumb.path" class="flex items-center gap-2">
            <span style="color: var(--color-text-muted);" aria-hidden="true">/</span>
            <RouterLink
              v-if="crumb.path"
              :to="crumb.path"
              class="transition-colors duration-fast font-medium"
              style="color: var(--color-secondary-mid);"
              onmouseover="this.style.color='var(--color-primary-soft)'"
              onmouseout="this.style.color='var(--color-secondary-mid)'"
            >{{ crumb.label }}</RouterLink>
            <span v-else class="font-semibold" style="color: var(--color-text);">{{ crumb.label }}</span>
          </li>
        </ol>
      </nav>

      <!-- Content -->
      <div>
        <p v-if="overline"
          class="text-xs font-bold uppercase tracking-widest mb-3"
          style="color: var(--color-secondary-mid); letter-spacing: 0.14em;"
        >{{ overline }}</p>
        <h1
          class="font-display font-extrabold leading-tight tracking-tight mb-4 text-gradient-heading"
          style="font-size: clamp(2rem, 4vw, 3.5rem);"
        >{{ title }}</h1>
        <p v-if="subtitle" class="text-lg leading-relaxed" style="color: var(--hero-subtitle);">{{ subtitle }}</p>
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
