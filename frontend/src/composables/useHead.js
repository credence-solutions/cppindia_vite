// =============================================================================
// useHead — Composable for managing document head (title, meta, OG, etc.)
// Lightweight alternative to @vueuse/head for simple use cases
// =============================================================================
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { SITE } from '@/constants'

/**
 * @param {Object} options
 * @param {string} [options.title]
 * @param {string} [options.description]
 * @param {string} [options.image]
 * @param {string} [options.url]
 */
export function useHead(options = {}) {
  const route = useRoute()

  watchEffect(() => {
    const {
      title = document.title,
      description = '',
      image = `${SITE.url}/og-image.jpg`,
      url = `${SITE.url}${route?.path ?? ''}`,
    } = options

    // Title
    document.title = title

    // Helper to set meta content
    const setMeta = (selector, content) => {
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const attr = selector.includes('property') ? 'property' : 'name'
        const val = selector.match(/["']([^"']+)["']/)?.[1]
        if (attr && val) el.setAttribute(attr, val)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    if (description) {
      setMeta('meta[name="description"]', description)
      setMeta('meta[property="og:description"]', description)
      setMeta('meta[name="twitter:description"]', description)
    }

    setMeta('meta[property="og:title"]', title)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[property="og:image"]', image)
    setMeta('meta[name="twitter:image"]', image)

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  })
}
