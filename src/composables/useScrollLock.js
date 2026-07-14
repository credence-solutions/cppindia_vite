// =============================================================================
// useScrollLock — Prevents body scroll (e.g., when mobile menu is open)
// =============================================================================
import { ref, watch } from 'vue'

const locked = ref(false)

export function useScrollLock() {
  watch(locked, (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
  })

  const lock   = () => { locked.value = true }
  const unlock = () => { locked.value = false }
  const toggle = () => { locked.value = !locked.value }

  return { locked, lock, unlock, toggle }
}
