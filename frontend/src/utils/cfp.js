// =============================================================================
// cfp — status helpers for cfp.json entries.
// Kept free of Vue/Vite imports so it runs under `node --test`.
// =============================================================================

// Whole days from today until the deadline (0 = today, negative = passed).
export function daysUntil(deadline, now = new Date()) {
  const diff = new Date(deadline).setHours(0, 0, 0, 0) - new Date(now).setHours(0, 0, 0, 0)
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// A CFP is open until its deadline passes; "closed" in the data closes it early.
export function cfpStatus(cfp, now = new Date()) {
  if (cfp.status === 'closed') return 'closed'
  return daysUntil(cfp.cfpDeadline, now) >= 0 ? 'open' : 'closed'
}
