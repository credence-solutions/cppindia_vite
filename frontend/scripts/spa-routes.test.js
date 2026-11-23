import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { staticRoutePaths, spaRoutePaths, pageFiles } from './spa-routes.js'

const routerSource = `
const legacyRoutes = [
  { path: '/about_us', redirect: '/about' },
  { path: '/tech_talk/:year(\\\\d{4})', redirect: '/tech-talks' },
]
const routes = [
  ...legacyRoutes,
  { path: '/', component: DefaultLayout, children: [
      { path: '', name: 'Home' },
      { path: 'events', name: 'Events' },
      { path: 'blog/:slug', name: 'BlogDetail' },
      { path: 'conference/2024/tech-help', name: 'TechHelp' },
  ] },
  { path: '/:pathMatch(.*)*', name: 'NotFound' },
]`

test('staticRoutePaths keeps only static child routes', () => {
  assert.deepEqual(staticRoutePaths(routerSource), ['events', 'conference/2024/tech-help'])
})

test('spaRoutePaths adds speaker base slugs and blog slugs, deduplicated', () => {
  const paths = spaRoutePaths({
    routerSource,
    speakers: [{ id: 'mahendra-garodi' }, { id: 'mahendra-garodi-2023' }, { id: 'ankur-satle-2021' }],
    blog: [{ slug: 'hello-world' }],
  })
  assert.deepEqual(paths, [
    'blog/hello-world',
    'conference/2024/tech-help',
    'events',
    'speakers/ankur-satle',
    'speakers/mahendra-garodi',
  ])
})

test('pageFiles serves both /path and /path/ on GitHub Pages', () => {
  assert.deepEqual(pageFiles('speakers/mike-shah'), ['speakers/mike-shah.html', 'speakers/mike-shah/index.html'])
})

test('the real router yields every static page', () => {
  const paths = staticRoutePaths(readFileSync(new URL('../src/router/index.js', import.meta.url), 'utf8'))
  for (const p of ['events', 'tech-talks', 'sponsors', 'conference', 'conference/2024/networking']) {
    assert.ok(paths.includes(p), `missing ${p}`)
  }
  assert.ok(!paths.some((p) => p.startsWith('/') || p.includes(':')))
})
