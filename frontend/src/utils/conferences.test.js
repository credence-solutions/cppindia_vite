import { test } from 'node:test'
import assert from 'node:assert/strict'
import { latestConference, conferenceYears, ordinal } from './conferences.js'

const confs = [{ year: 2022 }, { year: 2024 }, { year: 2021 }, { year: 2023 }]

test('latestConference returns the most recent edition regardless of order', () => {
  assert.equal(latestConference(confs).year, 2024)
  assert.equal(latestConference([]), null)
})

test('conferenceYears lists editions newest first', () => {
  assert.deepEqual(conferenceYears(confs), [2024, 2023, 2022, 2021])
})

test('ordinal formats edition numbers', () => {
  assert.deepEqual([1, 2, 3, 4, 11, 12, 13, 21, 22].map(ordinal),
    ['1st', '2nd', '3rd', '4th', '11th', '12th', '13th', '21st', '22nd'])
})
