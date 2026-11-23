import talksData from '@/data/talks.json'
import conferencesData from '@/data/conferences.json'
import { SITE } from '@/constants'

export function useCommunityStats() {
  const totalTalks = Object.values(talksData).reduce((sum, yr) => sum + yr.length, 0)
  const totalConferences = conferencesData.length
  const yearsActive = new Date().getFullYear() - SITE.founded + 1

  return [
    { value: totalTalks,       suffix: '+', label: 'Tech Talks'         },
    { value: totalConferences, suffix: '',  label: 'Annual Conferences'  },
    { value: yearsActive,      suffix: '+', label: 'Years Active'        },
    { value: SITE.discordMembers, suffix: '+', label: 'Discord Members' },
  ]
}
