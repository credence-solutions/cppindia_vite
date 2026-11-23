// =============================================================================
// spa-routes — which URLs get their own copy of index.html at build time.
//
// GitHub Pages only returns 200 for files that exist; every other URL falls
// through to 404.html. The SPA still renders there, but with a 404 status that
// search engines and link previews treat as "page missing". Writing index.html
// to <route>.html and <route>/index.html makes real pages answer 200.
// Legacy redirects (absolute paths in the router) keep using the fallback.
// =============================================================================

// Static child routes of the main layout: relative literals with no params.
export function staticRoutePaths(routerSource) {
  return [...routerSource.matchAll(/path:\s*'([^'/][^']*)'/g)]
    .map((m) => m[1])
    .filter((p) => !p.includes(':') && !p.includes('*'))
}

export function spaRoutePaths({ routerSource, speakers = [], blog = [] }) {
  // SpeakerDetailView groups ids like "ankur-satle-2021" under "ankur-satle".
  const speakerPaths = speakers.map((s) => `speakers/${s.id.replace(/-\d{4}$/, '')}`)
  const blogPaths = blog.filter((p) => p.slug).map((p) => `blog/${p.slug}`)
  return [...new Set([...staticRoutePaths(routerSource), ...speakerPaths, ...blogPaths])].sort()
}

// GitHub Pages serves /path from path.html and /path/ from path/index.html.
export function pageFiles(path) {
  return [`${path}.html`, `${path}/index.html`]
}
