<template>
  <div class="relative w-full">
    <!-- Search icon -->
    <div class="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        :style="`color: ${dark ? 'rgba(148,163,184,0.45)' : 'rgba(100,116,139,0.55)'}`">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    </div>

    <input
      ref="inputRef"
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      class="w-full pl-10 pr-9 py-2.5 rounded-lg text-sm outline-none transition-all duration-150"
      :style="dark
        ? `background:rgba(15,17,53,0.7); border:1px solid rgba(99,102,241,0.2); color:#E2E8F5;`
        : `background: var(--color-surface); border:1px solid var(--color-border-light); color: var(--color-text);`"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="dark
        ? ($event.target.style.borderColor='rgba(99,102,241,0.5)', $event.target.style.boxShadow='0 0 0 3px rgba(99,102,241,0.1)')
        : ($event.target.style.borderColor='var(--color-primary)', $event.target.style.boxShadow='0 0 0 3px rgba(79,142,247,0.12)')"
      @blur="dark
        ? ($event.target.style.borderColor='rgba(99,102,241,0.2)', $event.target.style.boxShadow='none')
        : ($event.target.style.borderColor='var(--color-border-light)', $event.target.style.boxShadow='none')"
    />

    <!-- Clear button -->
    <button
      v-if="modelValue"
      class="absolute inset-y-0 right-3 flex items-center transition-opacity duration-100 cursor-pointer"
      :style="`color: ${dark ? 'rgba(148,163,184,0.5)' : 'rgba(100,116,139,0.55)'}`"
      aria-label="Clear search"
      @click="$emit('update:modelValue', ''); inputRef?.focus()"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Search…' },
  dark: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])

const inputRef = ref(null)
</script>
