import speakersData from '@/data/speakers.json'

export async function fetchSpeakers() {
  return speakersData
}

export async function fetchSpeakerById(id) {
  return speakersData.find((s) => s.id === id) ?? null
}

export async function fetchSpeakersByConference(year) {
  return speakersData.filter((s) => s.conference === year)
}
