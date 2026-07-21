// =============================================================================
// useAssetPath — resolves root-absolute asset paths against the app's base URL
// so images load correctly whether the app is served from '/' or a subpath
// like '/cppindia_vite/' (GitHub Pages project page).
// =============================================================================

export function useAssetPath() {
  function assetPath(path) {
    if (!path) return path
    const base = import.meta.env.BASE_URL // e.g. '/' or '/cppindia_vite/'
    const relative = path.startsWith('/') ? path.slice(1) : path
    return `${base}${relative}`
  }

  return { assetPath }
}
