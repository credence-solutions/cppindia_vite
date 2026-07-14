import talksData from '@/data/talks.json'

export async function fetchTalks() {
  await new Promise((r) => setTimeout(r, 150))
  return talksData
}

export async function fetchTalksByYear(year) {
  const all = await fetchTalks()
  return all[String(year)] ?? []
}
