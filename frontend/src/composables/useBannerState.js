import { ref } from 'vue'

const STORAGE_KEY = 'cppindia-banner-cppindiacon2026'
const TWO_HOURS_MS = 2 * 60 * 60 * 1000

function isDismissed() {
  if (typeof window === 'undefined') return false
  const ts = localStorage.getItem(STORAGE_KEY)
  if (!ts) return false
  return Date.now() - Number(ts) < TWO_HOURS_MS
}

const visible = ref(!isDismissed())

export function useBannerState() {
  function dismiss() {
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
    visible.value = false
  }
  return { visible, dismiss }
}
