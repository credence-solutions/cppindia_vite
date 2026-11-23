# Upcoming Talk Banner — Design

**Date:** 2026-11-23
**Size:** Small change

## Intent

Promote the next CppIndia tech talk on the home page so visitors can register, add it to their calendar, and join Discord. The banner exists only while a talk is upcoming. Once the talk is over, it disappears without anyone having to remember to remove it.

## Goals

- When an upcoming talk exists, the hero's right-hand card shows it: title, speaker, date and time (IST), location, a short abstract line and an optional speaker photo.
- The card has three actions: **Register** (`registrationUrl`), **Add to Calendar** (Google Calendar link plus an `.ics` download for Apple/Outlook) and **Join Discord** (`SITE.discordInvite`).
- When there is no upcoming talk, the hero looks exactly as it does today, with the IDE card and the CppIndiaCon strip.

## Non-goals

- A general home-page redesign. That's separate follow-up work.
- An admin UI, a CMS, or fetching talks from Meetup or Luma.
- Promoting non-talk events such as conferences and hackathons.

## Anti-goals

- A stale banner advertising a talk that has already happened.
- Layout shift or a flash in the hero on load.

## Approaches considered

1. **Entry in `src/data/events.json` and redeploy (chosen).** One source of truth shared with the Events page. It's static like the rest of the site and the card renders at build time with no shift. The cost is a rebuild for each new talk.
2. Runtime-fetched `public/upcoming-talk.json`. Updating it needs no rebuild, but it duplicates the data and causes a load-time shift in the hero.
3. Meetup or Luma API. Fully automatic, but it needs a backend or proxy for CORS and adds an outside dependency.

**Placement considered:** (A) a slim strip under the header, (B) a featured card inside the hero, and (C) a full-width band below the hero. **B was chosen.**

## Decided

- **Placement B:** the talk card replaces the hero's right-hand IDE card while a talk is upcoming.
- **Data:** talks are entries in `events.json` with `"type": "talk"`, using the existing fields (`date`, `time`, `endTime`, `speaker`, `topic`, `registrationUrl`, `location`, `description`), plus an optional `speakerPhoto`.
- **Buttons:** Register, Add to Calendar and Join Discord.

## Claude's calls (correct if wrong)

- **Which talk is shown:** the earliest `type: "talk"` event whose end has not passed, using IST. A talk stays visible through the end of its scheduled time on the day. If no end time is given, it stays visible until the end of that day.
- **The same "upcoming" logic in both places:** a small shared helper (for example, a composable) is used by both the home card and `EventsView`. The `EventsView` date check is fixed to use IST rather than UTC.
- **Register button:** hidden when `registrationUrl` is empty. The other two buttons always show.
- **Styling:** the card uses the IDE card's dark glass style, so the hero keeps its look, with the site's blue-to-cyan accent and a green "Upcoming talk" pill. The white card in the mockup was only a layout sketch.
- **Calendar event:** its description includes the registration link and the Discord invite.

## Left to the builder

- The exact markup and spacing, and how the card behaves on mobile (it stacks under the headline the way the IDE card does today).
- Generating the `.ics` file in the browser (a Blob download, with no dependency).
