import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const THEMES = [
  {
    id: 'nebula',
    name: 'Nebula Dark',
    description: 'Electric blue + violet — deep space',
    preview: ['#4F8EF7', '#9B74F5', '#06090F'],
  },
  {
    id: 'carbon',
    name: 'Carbon Pro',
    description: 'Vivid orange + violet — hacker workspace',
    preview: ['#F97316', '#A78BFA', '#0D0D0D'],
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Emerald + indigo — open-source fresh',
    preview: ['#10B981', '#818CF8', '#060C08'],
  },
  {
    id: 'midnight',
    name: 'Midnight Gold',
    description: 'Gold + rose — premium conference',
    preview: ['#F59E0B', '#F472B6', '#06080F'],
  },
]

export const useThemeStore = defineStore('theme', () => {
  const active = ref(localStorage.getItem('cppindia-theme') || 'nebula')

  function setTheme(id) {
    active.value = id
  }

  watch(active, (id) => {
    document.documentElement.setAttribute('data-theme', id)
    localStorage.setItem('cppindia-theme', id)
  }, { immediate: true })

  return { active, setTheme, THEMES }
})
