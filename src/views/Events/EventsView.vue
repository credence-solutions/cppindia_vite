<template>
  <div>
  <PageHero
    overline="Calendar"
    title="Events"
    subtitle="Upcoming meetups, webinars, and conferences from the CppIndia community."
  />

  <section class="section" style="background: #07091C;">
    <div class="container">

      <!-- Tabs -->
      <div class="flex gap-1 p-1 rounded-xl mb-10 w-fit" style="background: rgba(15,17,45,0.8); border: 1px solid rgba(99,102,241,0.18);">
        <button
          v-for="tab in ['Upcoming', 'Past']" :key="tab"
          @click="activeTab = tab"
          class="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
          :style="activeTab === tab
            ? 'background: rgba(99,102,241,0.25); color: #818CF8;'
            : 'background: transparent; color: rgba(148,163,184,0.55);'"
        >{{ tab }}</button>
      </div>

      <!-- Events list -->
      <div class="flex flex-col gap-5">
        <article
          v-for="event in filtered"
          :key="event.id"
          class="rounded-2xl p-6 flex flex-wrap md:flex-nowrap gap-5 transition-all duration-200"
          style="background: rgba(15,17,45,0.85); border: 1px solid rgba(99,102,241,0.18);"
          onmouseover="this.style.borderColor='rgba(99,102,241,0.4)'; this.style.transform='translateY(-2px)'"
          onmouseout="this.style.borderColor='rgba(99,102,241,0.18)'; this.style.transform='translateY(0)'"
        >
          <!-- Date block -->
          <div class="flex-shrink-0 flex flex-col items-center justify-center rounded-xl p-4 w-20 text-center"
            style="background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.25);">
            <span class="text-xs font-mono uppercase" style="color:rgba(148,163,184,0.55);">{{ monthStr(event.date) }}</span>
            <span class="text-3xl font-display font-bold" style="color:#818CF8;">{{ dayStr(event.date) }}</span>
            <span class="text-xs font-mono" style="color:rgba(148,163,184,0.55);">{{ yearStr(event.date) }}</span>
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-2 flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                :style="event.type === 'conference'
                  ? 'background:rgba(167,139,250,0.12); color:#A78BFA; border:1px solid rgba(167,139,250,0.3);'
                  : 'background:rgba(34,211,238,0.1); color:#22D3EE; border:1px solid rgba(34,211,238,0.25);'">
                {{ event.type }}
              </span>
              <span v-if="event.time" class="text-xs font-mono" style="color:rgba(148,163,184,0.5);">{{ event.time }}</span>
            </div>
            <h3 class="font-display font-bold text-base" style="color:#E2E8F5;">{{ event.title }}</h3>
            <p v-if="event.speaker" class="text-sm font-medium" style="color:#818CF8;">{{ event.speaker }} — {{ event.topic }}</p>
            <p class="text-sm" style="color:rgba(148,163,184,0.7);">{{ event.description }}</p>
            <div class="flex items-center gap-1.5 text-xs mt-1" style="color:rgba(148,163,184,0.5);">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {{ event.location }}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-2 justify-center flex-shrink-0">
            <a v-if="event.registrationUrl" :href="event.registrationUrl" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 whitespace-nowrap"
              style="background: linear-gradient(135deg, #6366F1, #818CF8);">Register Free</a>
            <a v-if="event.recordingUrl" :href="event.recordingUrl" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap"
              style="background:#FF0000; color:white;">Watch Recording</a>
            <a v-if="event.registrationUrl" :href="calendarUrl(event)" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap"
              style="border:1px solid rgba(99,102,241,0.25); color:rgba(148,163,184,0.65);">+ Add to Calendar</a>
          </div>
        </article>

        <div v-if="filtered.length === 0" class="text-center py-16" style="color:rgba(148,163,184,0.4);">
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

function calendarUrl(event) {
  const dateStr = event.date.replace(/-/g, '')
  const time = (event.time || '09:00').replace(':', '')
  const start = `${dateStr}T${time}00`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${start}`,
    details: event.description || '',
    location: event.location || 'Online',
  })
  return `https://calendar.google.com/calendar/render?${params}`
}
</script>
