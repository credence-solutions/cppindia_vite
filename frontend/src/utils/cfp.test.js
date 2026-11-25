import { test } from 'node:test'
import assert from 'node:assert/strict'
import { daysUntil, cfpStatus } from './cfp.js'

const now = new Date('2026-11-25T10:00:00')

test('daysUntil counts whole days, 0 on the deadline itself', () => {
  assert.equal(daysUntil('2026-11-25', now), 0)
  assert.equal(daysUntil('2026-12-05', now), 10)
  assert.equal(daysUntil('2026-11-20', now), -5)
})

test('cfpStatus is open until the deadline passes', () => {
  assert.equal(cfpStatus({ status: 'open', cfpDeadline: '2026-11-25' }, now), 'open')
  assert.equal(cfpStatus({ status: 'open', cfpDeadline: '2026-12-31' }, now), 'open')
  assert.equal(cfpStatus({ status: 'open', cfpDeadline: '2025-08-01' }, now), 'closed')
})

test('cfpStatus honours a manual "closed" before the deadline', () => {
  assert.equal(cfpStatus({ status: 'closed', cfpDeadline: '2026-12-31' }, now), 'closed')
})
