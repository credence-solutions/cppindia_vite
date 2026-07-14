import conferencesData from '@/data/conferences.json'

export async function fetchConferences() {
  await new Promise((r) => setTimeout(r, 150))
  return conferencesData
}

export async function fetchConferenceByYear(year) {
  const all = await fetchConferences()
  return all.find((c) => c.year === Number(year)) ?? null
}
