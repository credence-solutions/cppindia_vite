<!--
  UpcomingTalkCard — takes over the hero's right-hand card while a talk is
  upcoming (see HeroBanner). Register / Add to Calendar / Join Discord.
-->
<template>
  <div class="rounded-2xl overflow-hidden" style="
    background: rgba(15,17,45,0.9);
    border:1px solid rgba(8,145,178,0.25);
    backdrop-filter:blur(24px);
    box-shadow: 0 0 0 1px rgba(8,145,178,0.1), 0 28px 72px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06);
  ">
    <div class="p-6">

      <!-- Badge -->
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-[0.04em] uppercase"
        style="background:rgba(22,163,74,0.15);border:1px solid rgba(52,211,153,0.3);color:#6EE7B7;">
        <span class="w-1.5 h-1.5 rounded-full animate-pulse-dot" style="background:#34D399;" />
        Upcoming talk
      </span>

      <!-- Title -->
      <h2 class="font-display font-bold leading-snug mt-4 mb-4"
        style="font-size:1.35rem;color:#F1F5F9;">
        {{ talk.topic || talk.title }}
      </h2>

      <!-- Speaker -->
      <div class="flex items-center gap-3 mb-4">
        <img v-if="speaker?.image" :src="assetPath(speaker.image)" :alt="speakerName"
          class="w-11 h-11 rounded-full object-cover flex-shrink-0"
          style="border:2px solid rgba(8,145,178,0.4);" />
        <div class="min-w-0">
          <RouterLink v-if="speaker" :to="`/speakers/${talk.speakerId}`"
            class="inline-flex items-center min-h-[24px] text-sm font-semibold hover:underline" style="color:#E2E8F0;">
            {{ speakerName }}
          </RouterLink>
          <span v-else class="text-sm font-semibold" style="color:#E2E8F0;">{{ speakerName }}</span>
          <p class="text-xs mt-0.5" style="color:rgba(148,163,184,0.95);">{{ whenLine }}</p>
        </div>
      </div>

      <!-- Abstract -->
      <p v-if="talk.description" class="text-[13px] leading-relaxed mb-5 line-clamp-3"
        style="color:rgba(203,213,225,0.7);">
        {{ talk.description }}
      </p>

      <!-- Actions -->
      <div class="flex flex-wrap gap-2">
        <a v-if="talk.registrationUrl" :href="talk.registrationUrl" target="_blank" rel="noopener"
          class="flex-1 min-w-[7rem] flex items-center justify-center py-2.5 px-3 rounded-lg text-xs font-bold text-white transition-all duration-200 hover:brightness-110 hover:-translate-y-px"
          style="background:#2563EB;box-shadow:0 4px 16px rgba(37,99,235,0.4);">
          Register
        </a>
        <button type="button" :aria-expanded="calendarOpen" @click="calendarOpen = !calendarOpen"
          class="flex-1 min-w-[7rem] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200"
          style="border:1px solid rgba(8,145,178,0.35);color:#CBD5E1;background:rgba(8,145,178,0.08);">
          + Add to Calendar
        </button>
        <a :href="SITE.discordInvite" target="_blank" rel="noopener"
          class="flex-1 min-w-[7rem] flex items-center justify-center py-2.5 px-3 rounded-lg text-xs font-bold text-white transition-all duration-200 hover:brightness-110 hover:-translate-y-px"
          style="background:#5865F2;">
          Join Discord
        </a>
      </div>

      <!-- Calendar choices -->
      <div v-if="calendarOpen" class="flex gap-2 mt-2">
        <a :href="googleUrl" target="_blank" rel="noopener"
          class="flex-1 text-center py-2 rounded-lg text-xs font-medium"
          style="background:rgba(255,255,255,0.06);color:#CBD5E1;">
          Google Calendar
        </a>
        <button type="button" @click="downloadIcs"
          class="flex-1 py-2 rounded-lg text-xs font-medium"
          style="background:rgba(255,255,255,0.06);color:#CBD5E1;">
          Apple / Outlook (.ics)
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SITE } from '@/constants'
import { useAssetPath } from '@/composables/useAssetPath'
import { googleCalendarUrl, buildIcs } from '@/utils/events'
import speakersData from '@/data/speakers.json'

const props = defineProps({
  talk: { type: Object, required: true },
})

const { assetPath } = useAssetPath()
const calendarOpen = ref(false)

const speaker = computed(() => speakersData.find(s => s.id === props.talk.speakerId) ?? null)
const speakerName = computed(() => speaker.value?.name ?? props.talk.speaker)

// "Thu, 14 Jan 2027 · 19:00–20:00 IST · Online"
const whenLine = computed(() => {
  const { date, time, endTime, location } = props.talk
  const day = new Date(`${date}T00:00:00Z`).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  })
  const start = time?.replace(/\s*IST$/, '')
  const hours = start ? `${start}${endTime ? `–${endTime}` : ''} IST` : null
  return [day, hours, location].filter(Boolean).join(' · ')
})

const calendarDetails = computed(() => [
  props.talk.registrationUrl && `Register: ${props.talk.registrationUrl}`,
  `Join the CppIndia Discord: ${SITE.discordInvite}`,
].filter(Boolean).join('\n'))

const googleUrl = computed(() => googleCalendarUrl(props.talk, calendarDetails.value))

function downloadIcs() {
  const blob = new Blob([buildIcs(props.talk, calendarDetails.value)], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.talk.id}.ics`
  a.click()
  // Revoking in the same tick can cancel the download in Safari/Firefox.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
</script>
