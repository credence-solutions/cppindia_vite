// =============================================================================
// NAVIGATION STORE — Controls mobile menu, mega menu, scroll state
// =============================================================================
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNavigationStore = defineStore('navigation', () => {
  // State
  const mobileMenuOpen  = ref(false)
  const activeMegaMenu  = ref(null)   // slug of open mega menu panel
  const isScrolled      = ref(false)  // true when page scrolled > threshold
  const scrollY         = ref(0)

  // Getters
  const isNavTransparent = computed(() => !isScrolled.value && scrollY.value < 80)

  // Actions
  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  function closeMobileMenu() {
    mobileMenuOpen.value = false
  }

  function setMegaMenu(slug) {
    activeMegaMenu.value = activeMegaMenu.value === slug ? null : slug
  }

  function closeMegaMenu() {
    activeMegaMenu.value = null
  }

  function setScroll(y) {
    scrollY.value = y
    isScrolled.value = y > 60
  }

  return {
    mobileMenuOpen,
    activeMegaMenu,
    isScrolled,
    scrollY,
    isNavTransparent,
    toggleMobileMenu,
    closeMobileMenu,
    setMegaMenu,
    closeMegaMenu,
    setScroll,
  }
})
