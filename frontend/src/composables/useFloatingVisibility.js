// =============================================================================
// useFloatingVisibility — On phones, floating widgets wait until the visitor
// has scrolled past the hero so they don't sit on top of its content.
// Wider screens have room in the margins, so they always show there.
// =============================================================================
import { ref, onMounted, onUnmounted } from 'vue'

const PHONE_QUERY = '(max-width: 639px)'
const SCROLL_THRESHOLD = 600

export function useFloatingVisibility() {
  const visible = ref(true)

  function update() {
    visible.value = !window.matchMedia(PHONE_QUERY).matches || window.scrollY > SCROLL_THRESHOLD
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  })

  return { visible }
}
