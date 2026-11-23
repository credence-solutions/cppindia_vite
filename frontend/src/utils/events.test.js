import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  eventStart,
  eventEnd,
  isUpcoming,
  nextUpcomingTalk,
  googleCalendarUrl,
  buildIcs,
} from './events.js'

const talk = {
  id: 'talk-2027-01-14',
  type: 'talk',
  topic: 'SIMD in Modern C++',
  date: '2027-01-14',
  time: '19:00 IST',
  endTime: '20:00',
  location: 'Online',
}

test('eventStart converts IST start time to UTC', () => {
  assert.equal(eventStart(talk).toISOString(), '2027-01-14T13:30:00.000Z')
})

test('eventStart is null when the event has no time', () => {
  assert.equal(eventStart({ date: '2027-01-14' }), null)
})

test('eventEnd uses endTime in IST', () => {
  assert.equal(eventEnd(talk).toISOString(), '2027-01-14T14:30:00.000Z')
})

test('eventEnd falls back to the end of the IST day', () => {
  assert.equal(eventEnd({ date: '2027-01-14' }).toISOString(), '2027-01-14T18:29:59.000Z')
})

test('isUpcoming stays true on the talk day until it ends', () => {
  assert.equal(isUpcoming(talk, new Date('2027-01-14T14:00:00Z')), true)
  assert.equal(isUpcoming(talk, new Date('2027-01-14T14:31:00Z')), false)
})

test('nextUpcomingTalk picks the earliest upcoming talk only', () => {
  const now = new Date('2026-12-01T00:00:00Z')
  const pastTalk    = { ...talk, id: 'past', date: '2026-01-01' }
  const laterTalk   = { ...talk, id: 'later', date: '2027-03-01' }
  const earlierTalk = { ...talk, id: 'earlier', date: '2027-01-14' }
  const conference  = { ...talk, id: 'conf', type: 'conference', date: '2026-12-10' }
  assert.equal(nextUpcomingTalk([laterTalk, conference, pastTalk, earlierTalk], now).id, 'earlier')
  assert.equal(nextUpcomingTalk([pastTalk], now), null)
})

test('googleCalendarUrl builds a Google Calendar template link', () => {
  const url = new URL(googleCalendarUrl(talk, 'd'))
  assert.equal(url.origin + url.pathname, 'https://calendar.google.com/calendar/render')
  assert.equal(url.searchParams.get('action'), 'TEMPLATE')
  assert.equal(url.searchParams.get('text'), 'SIMD in Modern C++')
  assert.equal(url.searchParams.get('dates'), '20270114T133000Z/20270114T143000Z')
  assert.equal(url.searchParams.get('details'), 'd')
  assert.equal(url.searchParams.get('location'), 'Online')
})

test('googleCalendarUrl uses all-day dates when there is no time', () => {
  const url = new URL(googleCalendarUrl({ ...talk, time: null, endTime: null }, 'd'))
  assert.equal(url.searchParams.get('dates'), '20270114/20270115')
})

test('buildIcs produces a timed event with escaped text and CRLF lines', () => {
  const ics = buildIcs(talk, 'a, b; c\nd')
  assert.ok(ics.includes('DTSTART:20270114T133000Z\r\n'))
  assert.ok(ics.includes('DTEND:20270114T143000Z\r\n'))
  assert.ok(ics.includes('UID:talk-2027-01-14@cppindia.co.in\r\n'))
  assert.ok(ics.includes('SUMMARY:SIMD in Modern C++\r\n'))
  assert.ok(ics.includes('DESCRIPTION:a\\, b\\; c\\nd\r\n'))
  assert.ok(ics.startsWith('BEGIN:VCALENDAR\r\n'))
  assert.ok(ics.endsWith('END:VCALENDAR\r\n'))
  assert.ok(!/[^\r]\n/.test(ics), 'every newline is CRLF')
})

test('buildIcs produces an all-day event when there is no time', () => {
  const ics = buildIcs({ ...talk, time: null, endTime: null }, 'd')
  assert.ok(ics.includes('DTSTART;VALUE=DATE:20270114\r\n'))
  assert.ok(ics.includes('DTEND;VALUE=DATE:20270115\r\n'))
})
