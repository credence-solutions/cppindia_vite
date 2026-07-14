<template>
  <div class="fixed z-floating" style="bottom: calc(1.5rem + 72px); right: 1.5rem;">
    <!-- Toggle -->
    <button
      class="w-11 h-11 rounded-full flex items-center justify-center bg-surface-raised border border-wire text-ink-2 shadow-card cursor-pointer transition-all duration-fast"
      :class="open ? 'text-primary border-primary shadow-glow-primary' : 'hover:text-primary hover:border-primary hover:shadow-glow-primary'"
      :title="open ? 'Close theme picker' : 'Change theme'"
      aria-label="Toggle theme picker"
      @click="open = !open"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    </button>

    <!-- Panel -->
    <Transition name="theme-panel">
      <div
        v-if="open"
        class="absolute right-0 w-60 bg-surface-raised border border-wire rounded-xl p-3 shadow-card-lg backdrop-glass"
        style="bottom: calc(100% + 12px);"
        role="listbox"
        aria-label="Select theme"
      >
        <p class="text-[10px] font-semibold text-ink-3 uppercase tracking-[0.08em] px-2 mb-2">Theme</p>
        <div
          v-for="t in THEMES"
          :key="t.id"
          class="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors duration-fast hover:bg-surface-alt"
          :class="theme.active === t.id ? 'bg-[rgba(79,142,247,0.08)]' : ''"
          role="option"
          :aria-selected="theme.active === t.id"
          @click="select(t.id)"
        >
          <!-- Swatches -->
          <div class="flex items-center gap-[3px] flex-shrink-0">
            <span
              v-for="(color, ci) in t.preview"
              :key="color"
              class="rounded-full border border-white/15"
              :style="{
                background: color,
                width: ci === 2 ? '16px' : '12px',
                height: ci === 2 ? '16px' : '12px',
                borderRadius: ci === 2 ? '4px' : '50%',
                marginLeft: ci === 2 ? '2px' : '0',
              }"
            />
          </div>
          <!-- Meta -->
          <div class="flex-1 flex flex-col gap-[2px] min-w-0">
            <span class="text-sm font-semibold text-ink whitespace-nowrap">{{ t.name }}</span>
            <span class="text-[10px] text-ink-3 whitespace-nowrap overflow-hidden text-ellipsis">{{ t.description }}</span>
          </div>
          <!-- Check -->
          <svg v-if="theme.active === t.id" class="text-primary flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useThemeStore, THEMES } from '@/stores/theme'

const theme = useThemeStore()
const open  = ref(false)

function select(id) {
  theme.setTheme(id)
  open.value = false
}
</script>
