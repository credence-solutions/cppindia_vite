<template>
  <div>
  <PageHero
    overline="Calendar"
    title="Events"
    subtitle="Upcoming meetups, webinars, and conferences from the CppIndia community."
  />

  <section class="section--sm" style="background: var(--emphasis-bg);">
    <div class="container">

      <!-- Tabs -->
      <div class="flex gap-1 p-1 rounded-xl mb-10 w-fit" style="background: var(--card-bg); border: 1px solid var(--card-border);">
        <button
          v-for="tab in ['Upcoming', 'Past']" :key="tab"
          @click="activeTab = tab"
          class="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
          :style="activeTab === tab
            ? 'background: rgba(8,145,178,0.25); color: var(--color-primary-soft);'
            : 'background: transparent; color: var(--color-text-muted);'"
        >{{ tab }}</button>
      </div>

      <!-- Events list -->
      <div class="flex flex-col gap-5">
        <article
          v-for="event in filtered"
          :key="event.id"
          class="rounded-2xl p-6 flex flex-wrap md:flex-nowrap gap-5 transition-all duration-200"
          style="background: var(--card-bg); border: 1px solid var(--card-border);"
          onmouseover="this.style.borderColor='rgba(8,145,178,0.55)'; this.style.transform='translateY(-2px)'"
          onmouseout="this.style.borderColor='var(--card-border)'; this.style.transform='translateY(0)'"
        >
          <!-- Date block -->
          <div class="flex-shrink-0 flex flex-col items-center justify-center rounded-xl p-4 w-20 text-center"
            style="background: rgba(8,145,178,0.12); border: 1px solid rgba(8,145,178,0.25);">
            <span class="text-xs font-mono uppercase" style="color:var(--color-text-muted);">{{ monthStr(event.date) }}</span>
            <span class="text-3xl font-display font-bold" style="color:var(--color-primary-soft);">{{ dayStr(event.date) }}</span>
            <span class="text-xs font-mono" style="color:var(--color-text-muted);">{{ yearStr(event.date) }}</span>
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-2 flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                :style="event.type === 'conference'
                  ? 'background:rgba(8,145,178,0.12); color:var(--color-secondary-mid); border:1px solid rgba(8,145,178,0.3);'
                  : 'background:rgba(34,211,238,0.1); color:#22D3EE; border:1px solid rgba(34,211,238,0.25);'">
                {{ event.type }}
              </span>
              <span v-if="event.time" class="text-xs font-mono" style="color:var(--color-text-muted);">{{ event.time }}</span>
            </div>
            <h3 class="font-display font-bold text-base" style="color:var(--color-text);">{{ event.title }}</h3>
            <p v-if="event.speaker" class="text-sm font-medium" style="color:var(--color-primary-soft);">{{ event.speaker }} — {{ event.topic }}</p>
            <p class="text-sm" style="color:var(--color-text-secondary);">{{ event.description }}</p>
            <div class="flex items-center gap-1.5 text-xs mt-1" style="color:var(--color-text-muted);">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {{ event.location }}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-2 justify-center flex-shrink-0">
            <a v-if="event.registrationUrl" :href="event.registrationUrl" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 whitespace-nowrap"
              style="background: var(--gradient-btn);">Register Free</a>
            <a v-if="event.recordingUrl" :href="event.recordingUrl" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap"
              style="background:#FF0000; color:white;">Watch Recording</a>
            <div v-if="event.status === 'upcoming'" class="flex items-center gap-2">
              <a :href="calendarUrl(event)" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap"
                style="border:1px solid rgba(8,145,178,0.25); color:var(--color-text-secondary);"
                onmouseover="this.style.borderColor='rgba(8,145,178,0.55)'; this.style.color='var(--color-primary-soft)'"
                onmouseout="this.style.borderColor='rgba(8,145,178,0.25)'; this.style.color='var(--color-text-secondary)'">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                Google
              </a>
              <a :href="icalUrl(event)" :download="`${event.id}.ics`"
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap"
                style="border:1px solid rgba(8,145,178,0.25); color:var(--color-text-secondary);"
                onmouseover="this.style.borderColor='rgba(8,145,178,0.55)'; this.style.color='var(--color-primary-soft)'"
                onmouseout="this.style.borderColor='rgba(8,145,178,0.25)'; this.style.color='var(--color-text-secondary)'">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                iCal
              </a>
            </div>
          </div>
        </article>

        <div v-if="filtered.length === 0" class="text-center py-16" style="color:var(--color-text-muted);">
          <p class="text-lg font-semibold">No {{ activeTab.toLowerCase() }} events</p>
          <p class="text-sm mt-1">Check back soon or join Discord for announcements.</p>
        </div>
      </div>

    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHero from '@/components/common/PageHero.vue'
import eventsData from '@/data/events.json'

const activeTab = ref('Upcoming')

const filtered = computed(() =>
  eventsData.filter(e => activeTab.value === 'Upcoming' ? e.status === 'upcoming' : e.status === 'past')
)

function monthStr(d) { return new Date(d).toLocaleDateString('en-IN', { month: 'short' }) }
function dayStr(d)   { return new Date(d).getDate() }
function yearStr(d)  { return new Date(d).getFullYear() }

function parseTime(timeStr) {
  return (timeStr || '09:00').replace(/\s.*/, '').replace(':', '')
}

function addOneHour(hhmm) {
  const h = parseInt(hhmm.slice(0, 2))
  const m = hhmm.slice(2)
  return String(h + 1).padStart(2, '0') + m
}

function calendarUrl(event) {
  const dateStr = event.date.replace(/-/g, '')
  const startTime = parseTime(event.time)
  const endTime   = event.endTime ? event.endTime.replace(':', '') : addOneHour(startTime)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${dateStr}T${startTime}00/${dateStr}T${endTime}00`,
    details: event.description || '',
    location: event.location || 'Online',
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

function icalUrl(event) {
  const dateStr   = event.date.replace(/-/g, '')
  const startTime = parseTime(event.time)
  const endTime   = event.endTime ? event.endTime.replace(':', '') : addOneHour(startTime)
  const uid       = `${event.id}@cppindia.co.in`
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CppIndia//CppIndia Events//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTART:${dateStr}T${startTime}00`,
    `DTEND:${dateStr}T${endTime}00`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${(event.description || '').replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location || 'Online'}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`
}
</script>
