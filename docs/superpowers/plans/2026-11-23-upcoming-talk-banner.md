# Upcoming Talk Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** While a talk is upcoming, replace the home hero's right-hand IDE card with a talk card that has Register, Add to Calendar (Google + .ics) and Join Discord buttons.

**Architecture:** Pure date and calendar helpers live in `src/utils/events.js`. They have no Vue, Vite or alias imports, so `node --test` can test them directly. `HeroBanner.vue` picks the next talk from `events.json` and renders `UpcomingTalkCard.vue` in place of the IDE card. `EventsView.vue` uses the same helper to decide "upcoming", so both places agree.

**Tech Stack:** Vue 3 `<script setup>`, Tailwind and inline styles (as in HeroBanner), and the Node 24 built-in test runner. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-23-upcoming-talk-banner-design.md`

## Global Constraints

- All times are IST (UTC+05:30). `time` and `endTime` use the existing `events.json` format: `"HH:MM IST"` / `"HH:MM"`.
- A talk is upcoming until its `endTime` on its `date`. With no `endTime`, it's upcoming until 23:59:59 IST that day.
- Only `type: "talk"` events drive the card. When there are several, the earliest wins.
- Register is hidden when `registrationUrl` is falsy. Calendar and Discord buttons always show.
- Discord URL comes from `SITE.discordInvite`. The calendar description includes the registration link (if any) and the Discord invite.
- The card matches the IDE card's dark glass style (`rgba(15,17,45,0.9)`, border `rgba(8,145,178,0.25)`). External links use `target="_blank" rel="noopener"`.
- Speaker details come from the app: the event has `speakerId` (a `speakers.json` id). The card uses that speaker's `image` (via `assetPath`) and links the name to `/speakers/<speakerId>`. If `speakerId` is missing, the card falls back to the plain `speaker` string with no photo.

## Review Focus

- A talk happening today, before its end time → the card still shows (not hidden because of a UTC date comparison). Pinned in Task 1 (`isUpcoming` same-day test).
- Commas, semicolons or newlines in the title or description → the `.ics` file stays valid (escaped). Pinned in Task 1.
- A talk with no `time` → the calendar gets an all-day event rather than `NaN` dates. Pinned in Task 1.
- Several upcoming talks listed out of order → the earliest is shown. Pinned in Task 1.
- No upcoming talk → the hero renders exactly the current IDE card. Checked in Task 4 by temporarily setting the test talk's date in the past.

---

### Task 1: Event date and calendar helpers

**Files:**
- Create: `frontend/src/utils/events.js`
- Create: `frontend/src/utils/events.test.js`
- Modify: `frontend/package.json` (add `"test": "node --test src/"`)

**Interfaces:**
- Produces:
  - `eventStart(event) -> Date | null`: start instant from `date` + `time` in IST. `null` if there's no `time`.
  - `eventEnd(event) -> Date`: from `endTime` in IST, or 23:59:59 IST on `date`.
  - `isUpcoming(event, now = new Date()) -> boolean`: `now < eventEnd(event)`.
  - `nextUpcomingTalk(events, now = new Date()) -> event | null`
  - `googleCalendarUrl(event, details) -> string`
  - `buildIcs(event, details) -> string`: CRLF line endings.
  - `details` is a plain string (built by the caller from the registration and Discord links).

- [ ] **Step 1: Write the failing tests** (in `events.test.js`, using `node:test` + `node:assert/strict`)
  - `eventStart({date:'2027-01-14', time:'19:00 IST'}).toISOString() === '2027-01-14T13:30:00.000Z'`
  - `eventEnd({date:'2027-01-14', time:'19:00 IST', endTime:'20:00'}).toISOString() === '2027-01-14T14:30:00.000Z'`
  - `eventEnd({date:'2027-01-14'}).toISOString() === '2027-01-14T18:29:59.000Z'`
  - Same day: `isUpcoming(talk, new Date('2027-01-14T14:00:00Z')) === true` and `isUpcoming(talk, new Date('2027-01-14T14:31:00Z')) === false`
  - `nextUpcomingTalk` over `[laterTalk, conference(earlier), pastTalk, earlierTalk]` returns `earlierTalk`. It returns `null` for `[pastTalk]`.
  - `googleCalendarUrl(talk, 'd')` contains `action=TEMPLATE`, `dates=20270114T133000Z%2F20270114T143000Z` (or an unencoded `/`, matching whatever `URLSearchParams` produces), and the encoded title.
  - `buildIcs(talk, 'a, b; c\nd')` contains `DTSTART:20270114T133000Z`, `DTEND:20270114T143000Z`, `UID:<id>@cppindia.co.in` and `DESCRIPTION:a\, b\; c\nd`. Every line ends in `\r\n`.
  - With no time, `buildIcs` gives `DTSTART;VALUE=DATE:20270114` and `DTEND;VALUE=DATE:20270115`. The Google URL uses `dates=20270114%2F20270115`.

- [ ] **Step 2: Run the tests and verify they fail**
  Run: `cd frontend && npm test`. Expected: FAIL (module not found).

- [ ] **Step 3: Implement the helpers in `src/utils/events.js`**
  Parse `HH:MM` with a regex, then build `Date.UTC(y, m-1, d, h, min) - 330*60*1000`. Escape `\`, `;`, `,` and newline in `.ics` text.

- [ ] **Step 4: Run the tests and verify they pass**
  Run: `cd frontend && npm test`. Expected: all pass.

- [ ] **Step 5: Commit** — `feat(events): add IST date and calendar helpers`

### Task 2: Events page uses the shared helper

**Files:**
- Modify: `frontend/src/views/Events/EventsView.vue:116-117`

**Interfaces:** Consumes `isUpcoming` from Task 1.

- [ ] **Step 1:** Replace the `today` string comparison with `status: isUpcoming(e) ? 'upcoming' : 'past'`.
- [ ] **Step 2:** Run `cd frontend && npm run build`. Expected: build succeeds.
- [ ] **Step 3: Commit** — `fix(events): decide upcoming status in IST`

### Task 3: Upcoming talk card in the hero

**Files:**
- Create: `frontend/src/components/sections/home/UpcomingTalkCard.vue`
- Modify: `frontend/src/components/sections/home/HeroBanner.vue` (the right column, around lines 106 onward, plus the script)

**Interfaces:**
- Consumes: `nextUpcomingTalk`, `googleCalendarUrl`, `buildIcs`, `eventStart` (Task 1); `SITE.discordInvite`; `useAssetPath`; `speakers.json`.
- Produces: `<UpcomingTalkCard :talk="talk" />`, where `talk` is an `events.json` entry.

- [ ] **Step 1: Build the card.** It contains a green "● Upcoming talk" pill, the title (`topic`), the speaker photo and name (a RouterLink to `/speakers/<speakerId>` when that id is found), the date line (`Thu, 14 Jan 2027 · 19:00–20:00 IST · Online`), the `description` clamped to 3 lines, and three buttons:
  - Register: `<a>` to `registrationUrl`, primary blue `#2563EB`, only shown with `v-if`.
  - Add to Calendar: a toggle that opens two items. "Google Calendar" is an `<a>` to `googleCalendarUrl`. "Apple / Outlook (.ics)" is a button that downloads `buildIcs(...)` as a `Blob` named `<id>.ics` with `type: 'text/calendar'`.
  - Join Discord: `<a>` to `SITE.discordInvite`, Discord color `#5865F2`.
- [ ] **Step 2: Swap it into HeroBanner.** Add `const talk = nextUpcomingTalk(eventsData)`, then `<UpcomingTalkCard v-if="talk" :talk="talk" />` and wrap the existing IDE card in `v-else`. Keep the `gsap-reveal-right` wrapper on whichever card renders.
- [ ] **Step 3:** Run `cd frontend && npm run build`. Expected: build succeeds.
- [ ] **Step 4: Commit** — `feat(home): show upcoming talk card in hero`

### Task 4: Test talk + link verification

**Files:**
- Modify: `frontend/src/data/events.json` (add the entry at the top)

- [ ] **Step 1: Add the test talk**

```json
{
  "id": "talk-2027-01-14-mahendra-garodi",
  "title": "CppIndia Tech Talk — January 2027",
  "type": "talk",
  "status": "upcoming",
  "date": "2027-01-14",
  "time": "19:00 IST",
  "endTime": "20:00",
  "speaker": "Mahendra Bhagwan Garodi",
  "speakerId": "mahendra-garodi",
  "topic": "SIMD in Modern C++: From Intrinsics to std::simd",
  "registrationUrl": "https://www.linkedin.com/company/cppindia",
  "recordingUrl": null,
  "location": "Online",
  "description": "Mahendra Bhagwan Garodi has 10+ years of experience building virtual platforms in the semiconductor industry, modelling CPUs, memories and SoC peripherals. In this session he walks through vectorising C++ code, from hand-written intrinsics to the portable std::simd API, and how to measure whether it actually got faster."
}
```

  The topic and `registrationUrl` are **test placeholders**. Replace them with the real title and registration form before going live.

- [ ] **Step 2: Unit tests + build** — run `npm test && npm run build`. Expected: both pass.
- [ ] **Step 3: Check the home page in a browser** (`npm run dev`, Playwright). Confirm the card shows the title, photo, IST time, and all three buttons. Take a screenshot at desktop and at 375px width.
- [ ] **Step 4: Check the links**
  - Register, Discord, LinkedIn: confirm the `href` values are what's expected, and `curl -sIL` each one (expect a final 2xx/3xx; note any bot-blocking, such as LinkedIn's 999).
  - Speaker link: click it and confirm `/speakers/mahendra-garodi` renders the speaker page (not 404).
  - Google Calendar: confirm the URL opens calendar.google.com with the right title and `dates`.
  - .ics: click it and confirm the download is captured and its content has the right DTSTART/DTEND.
  - The speaker photo request returns 200.
  - The Events page lists the talk under "Upcoming".
- [ ] **Step 5: Check the fallback.** Temporarily set the date to `2025-01-14`, confirm the IDE card is back on the home page, then revert.
- [ ] **Step 6: Commit** — `chore(events): add test talk for Jan 14, 2027`
