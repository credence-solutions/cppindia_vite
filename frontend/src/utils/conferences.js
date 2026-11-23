// =============================================================================
// conferences — helpers for conferences.json, so pages follow the newest
// edition instead of hardcoding a year. Free of Vue/Vite imports for node --test.
// =============================================================================

export function conferenceYears(conferences) {
  return conferences.map((c) => c.year).sort((a, b) => b - a)
}

export function latestConference(conferences) {
  const [year] = conferenceYears(conferences)
  return conferences.find((c) => c.year === year) ?? null
}

export function ordinal(n) {
  const teen = n % 100 >= 11 && n % 100 <= 13
  const suffix = teen ? 'th' : { 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] ?? 'th'
  return `${n}${suffix}`
}
