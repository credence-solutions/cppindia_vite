<template>
  <div v-if="visible"
    class="relative z-50 flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-semibold text-center flex-wrap"
    style="background: linear-gradient(90deg, #4338CA 0%, #6366F1 40%, #22D3EE 100%); min-height: 42px;"
  >
    <!-- Animated pulse dot -->
    <span class="relative flex-shrink-0 hidden sm:flex items-center">
      <span class="absolute inline-flex w-3 h-3 rounded-full opacity-75 animate-ping" style="background:#fff;"></span>
      <span class="relative inline-flex w-3 h-3 rounded-full" style="background:#fff;"></span>
    </span>

    <span style="color:#fff;">
      🎉 <strong>CppIndiaCon 2026</strong> is happening — <strong>November 21, 2026</strong> · Online · Free to attend
    </span>

    <a
      href="https://discord.com/invite/Wz42tX5"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-150 flex-shrink-0"
      style="background:rgba(255,255,255,0.2); color:#fff; border:1px solid rgba(255,255,255,0.4);"
      onmouseover="this.style.background='rgba(255,255,255,0.35)'"
      onmouseout="this.style.background='rgba(255,255,255,0.2)'"
    >
      Register Free
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
    </a>

    <!-- Dismiss -->
    <button
      @click="dismiss"
      class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full transition-all duration-150"
      style="color:rgba(255,255,255,0.7);"
      onmouseover="this.style.background='rgba(255,255,255,0.15)'; this.style.color='#fff'"
      onmouseout="this.style.background='transparent'; this.style.color='rgba(255,255,255,0.7)'"
      aria-label="Dismiss announcement"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const STORAGE_KEY = 'cppindia-banner-cppindiacon2026'
const visible = ref(sessionStorage.getItem(STORAGE_KEY) !== 'dismissed')

function dismiss() {
  sessionStorage.setItem(STORAGE_KEY, 'dismissed')
  visible.value = false
}
</script>
