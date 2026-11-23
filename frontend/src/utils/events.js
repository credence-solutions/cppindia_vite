// =============================================================================
// events — IST date helpers and calendar links for events.json entries.
// Kept free of Vue/Vite imports so it runs under `node --test`.
// =============================================================================

const IST_OFFSET_MS = 330 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000

// date 'YYYY-MM-DD' + 'HH:MM[ IST]' (IST) → Date, or null if no usable time.
function istInstant(date, time) {
  const t = /^(\d{1,2}):(\d{2})/.exec(time || '')
  if (!t) return null
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, Number(t[1]), Number(t[2])) - IST_OFFSET_MS)
}

export function eventStart(event) {
  return istInstant(event.date, event.time)
}

// End of the event; without an endTime, the last second of its IST day.
export function eventEnd(event) {
  return (
    istInstant(event.date, event.endTime) ??
    new Date(istInstant(event.date, '23:59').getTime() + 59 * 1000)
  )
}

export function isUpcoming(event, now = new Date()) {
  return now < eventEnd(event)
}

export function nextUpcomingTalk(events, now = new Date()) {
  return (
    events
      .filter((e) => e.type === 'talk' && isUpcoming(e, now))
      .sort((a, b) => eventEnd(a) - eventEnd(b))[0] ?? null
  )
}

// ── Calendar formatting ──────────────────────────────────────────────────────

const utcStamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
const dayStamp = (d) => d.toISOString().slice(0, 10).replace(/-/g, '')

// [start, end] as calendar strings: UTC timestamps, or all-day dates when the
// event has no start time (end date is exclusive, per both formats).
function calendarRange(event) {
  const start = eventStart(event)
  if (start) {
    const end = istInstant(event.date, event.endTime) ?? new Date(start.getTime() + 60 * 60 * 1000)
    return { allDay: false, start: utcStamp(start), end: utcStamp(end) }
  }
  const day = new Date(`${event.date}T00:00:00Z`)
  return { allDay: true, start: dayStamp(day), end: dayStamp(new Date(day.getTime() + DAY_MS)) }
}

const eventTitle = (event) => event.topic || event.title

export function googleCalendarUrl(event, details) {
  const { start, end } = calendarRange(event)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventTitle(event),
    dates: `${start}/${end}`,
    details,
    location: event.location || '',
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

const icsText = (s) =>
  String(s ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')

export function buildIcs(event, details) {
  const { allDay, start, end } = calendarRange(event)
  const when = allDay
    ? [`DTSTART;VALUE=DATE:${start}`, `DTEND;VALUE=DATE:${end}`]
    : [`DTSTART:${start}`, `DTEND:${end}`]
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CppIndia//Events//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.id}@cppindia.co.in`,
    `DTSTAMP:${utcStamp(new Date())}`,
    ...when,
    `SUMMARY:${icsText(eventTitle(event))}`,
    `DESCRIPTION:${icsText(details)}`,
    `LOCATION:${icsText(event.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .map((line) => `${line}\r\n`)
    .join('')
}
