/**
 * CppIndia Visual QA Test
 * Tests all pages (full-page screenshots + horizontal scroll check) and
 * all popups across mobile, tablet, macbook, desktop, and large-desktop.
 *
 * Usage:
 *   NODE_PATH=/Users/jayu/.npm/_npx/9833c18b2d85bc59/node_modules node test.js
 *
 * Screenshots saved to ./screenshots/<device>/
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:5173';
const BROWSER_EXEC = '/Users/jayu/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const OUT_DIR = path.join(__dirname, 'screenshots');

const PAGES = [
  { url: '/',                        name: 'home' },
  { url: '/about',                   name: 'about' },
  { url: '/team',                    name: 'team' },
  { url: '/members',                 name: 'members' },
  { url: '/conference?year=2024',    name: 'conference-2024' },
  { url: '/conference?year=2023',    name: 'conference-2023' },
  { url: '/conference?year=2022',    name: 'conference-2022' },
  { url: '/conference?year=2021',    name: 'conference-2021' },
  { url: '/conference-reports',      name: 'conference-reports' },
  { url: '/conference/2024/tech-help', name: 'tech-help' },
  { url: '/call-for-speakers',       name: 'call-for-speakers' },
  { url: '/cfp',                     name: 'cfp' },
  { url: '/tech-talks',              name: 'tech-talks' },
  { url: '/blog',                    name: 'blog' },
  { url: '/events',                  name: 'events' },
  { url: '/join-us',                 name: 'join-us' },
  { url: '/contact',                 name: 'contact' },
  { url: '/sponsors',                name: 'sponsors' },
  { url: '/press',                   name: 'press' },
  { url: '/faq',                     name: 'faq' },
  { url: '/roadmap',                 name: 'roadmap' },
  { url: '/projects',               name: 'projects' },
  { url: '/playground',              name: 'playground' },
  { url: '/resources',               name: 'resources' },
  { url: '/code-of-conduct',         name: 'code-of-conduct' },
  { url: '/jobs',                    name: 'jobs' },
  { url: '/networking',              name: 'networking' },
];

const DEVICES = [
  { name: 'mobile',        width: 390,  height: 844  },
  { name: 'tablet',        width: 768,  height: 1024 },
  { name: 'macbook',       width: 1280, height: 800  },
  { name: 'desktop',       width: 1440, height: 900  },
  { name: 'large-desktop', width: 1920, height: 1080 },
];

const issues = [];

// ── Helpers ──────────────────────────────────────────────────────────────────

function log(msg) { process.stdout.write(msg + '\n'); }

async function checkHScroll(page) {
  return page.evaluate(() => {
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    if (overflow <= 2) return null;
    const vw = document.documentElement.clientWidth;
    const offenders = [];
    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 2) {
        offenders.push(`${el.tagName}.${el.className?.toString().slice(0,50)} (right:${Math.round(r.right)})`);
        if (offenders.length >= 3) break;
      }
    }
    return { px: overflow, offenders };
  });
}

async function screenshot(page, subdir, name, fullPage = true) {
  const dir = path.join(OUT_DIR, subdir);
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage });
}

async function nav(page, url) {
  await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(600);
}

// ── Phase 1: Full-page screenshots + scroll check ────────────────────────────

async function testPages(browser) {
  log('\n══════════════════════════════════════════');
  log('  PHASE 1 — Pages (full-page screenshots)');
  log('══════════════════════════════════════════');

  for (const device of DEVICES) {
    log(`\n── ${device.name} (${device.width}×${device.height}) ──`);
    const ctx = await browser.newContext({ viewport: { width: device.width, height: device.height } });
    const page = await ctx.newPage();
    page.on('console', m => {
      if (m.type() === 'error') issues.push({ phase: 'pages', device: device.name, item: '(console)', issue: `JS ERROR: ${m.text().slice(0,120)}` });
    });

    for (const p of PAGES) {
      try {
        await nav(page, p.url);
        const scroll = await checkHScroll(page);
        if (scroll) {
          issues.push({ phase: 'pages', device: device.name, item: p.name, issue: `HORIZONTAL SCROLL +${scroll.px}px`, offenders: scroll.offenders });
          log(`  ✗ ${p.name} — hscroll +${scroll.px}px`);
        } else {
          log(`  ✓ ${p.name}`);
        }
        await screenshot(page, `pages/${device.name}`, p.name);
      } catch (e) {
        const msg = e.message.split('\n')[0];
        issues.push({ phase: 'pages', device: device.name, item: p.name, issue: msg });
        log(`  ✗ ${p.name} — ${msg}`);
      }
    }

    await ctx.close();
  }
}

// ── Phase 2: Popup tests ─────────────────────────────────────────────────────

async function testPopupOverflow(page, label, device) {
  const scroll = await checkHScroll(page);
  if (scroll) {
    issues.push({ phase: 'popups', device, item: label, issue: `HORIZONTAL SCROLL +${scroll.px}px`, offenders: scroll.offenders });
    log(`  ✗ ${label} — hscroll +${scroll.px}px`);
  } else {
    log(`  ✓ ${label}`);
  }
}

async function testPopups(browser) {
  log('\n══════════════════════════════════════════');
  log('  PHASE 2 — Popups');
  log('══════════════════════════════════════════');

  // Popup tests run on mobile, tablet, desktop only
  const popupDevices = DEVICES.filter(d => ['mobile', 'tablet', 'desktop'].includes(d.name));

  for (const device of popupDevices) {
    log(`\n── ${device.name} (${device.width}×${device.height}) ──`);
    const ctx = await browser.newContext({ viewport: { width: device.width, height: device.height } });
    const page = await ctx.newPage();
    const dir = `popups/${device.name}`;

    // 1. Conference speaker popup (all 4 years)
    for (const year of [2024, 2023, 2022, 2021]) {
      try {
        await nav(page, `/conference?year=${year}`);
        // Speaker cards have rounded-xl + cursor-pointer (not year tabs)
        const cards = await page.$$('[class*="rounded-xl"][class*="cursor-pointer"]');
        if (cards.length) {
          await cards[0].click();
          await page.waitForTimeout(500);
        }
        const modal = await page.$('.fixed.inset-0[class*="z-50"]');
        if (modal) {
          await testPopupOverflow(page, `conference-${year} speaker`, device.name);
          await screenshot(page, dir, `conference-${year}-speaker`, false);
          // scroll to bottom of modal body
          await page.evaluate(() => { const b = document.querySelector('.fixed.inset-0 .overflow-y-auto'); if (b) b.scrollTop = b.scrollHeight; });
          await screenshot(page, dir, `conference-${year}-speaker-scrolled`, false);
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
        } else {
          log(`  ✗ conference-${year} speaker — modal did not open`);
          issues.push({ phase: 'popups', device: device.name, item: `conference-${year}-speaker`, issue: 'Modal did not open' });
        }
      } catch (e) {
        log(`  ✗ conference-${year} speaker — ${e.message.split('\n')[0]}`);
        issues.push({ phase: 'popups', device: device.name, item: `conference-${year}-speaker`, issue: e.message.split('\n')[0] });
      }
    }

    // 2. Members – Talks popup
    try {
      await nav(page, '/members');
      const btns = await page.$$('[class*="cursor-pointer"]');
      let opened = false;
      for (const btn of btns) {
        const text = await btn.textContent().catch(() => '');
        if (/\d+\s*talk/i.test(text)) {
          await btn.click();
          await page.waitForTimeout(500);
          if (await page.$('.fixed.inset-0[class*="z-"]')) { opened = true; break; }
        }
      }
      if (opened) {
        await testPopupOverflow(page, 'members talks', device.name);
        await screenshot(page, dir, 'members-talks', false);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
      } else {
        log(`  ! members talks — trigger not found`);
      }
    } catch (e) {
      log(`  ✗ members talks — ${e.message.split('\n')[0]}`);
    }

    // 3. Members – Bio popup
    try {
      await nav(page, '/members');
      const cards = await page.$$('[class*="cursor-pointer"][class*="rounded"]');
      let opened = false;
      for (const card of cards) {
        const text = await card.textContent().catch(() => '');
        if (text.length > 20 && !/\d+\s*talk/i.test(text)) {
          await card.click();
          await page.waitForTimeout(500);
          if (await page.$('.fixed.inset-0[class*="z-"]')) { opened = true; break; }
        }
      }
      if (opened) {
        await testPopupOverflow(page, 'members bio', device.name);
        await screenshot(page, dir, 'members-bio', false);
        await page.evaluate(() => { const b = document.querySelector('.fixed.inset-0 .overflow-y-auto'); if (b) b.scrollTop = b.scrollHeight; });
        await screenshot(page, dir, 'members-bio-scrolled', false);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
      } else {
        log(`  ! members bio — trigger not found`);
      }
    } catch (e) {
      log(`  ✗ members bio — ${e.message.split('\n')[0]}`);
    }

    // 4. Floating contact menu
    try {
      await nav(page, '/');
      const btn = await page.$('[class*="floating"], [aria-label*="contact" i], [aria-label*="join" i]');
      if (btn) {
        await btn.click();
        await page.waitForTimeout(400);
        await testPopupOverflow(page, 'floating contact menu', device.name);
        await screenshot(page, dir, 'floating-contact', false);
      } else {
        log(`  ! floating contact — button not found`);
      }
    } catch (e) {
      log(`  ✗ floating contact — ${e.message.split('\n')[0]}`);
    }

    // 5. Theme picker
    try {
      await nav(page, '/');
      const btn = await page.$('[aria-label*="theme" i], [class*="theme-pick"], [title*="theme" i]');
      if (btn) {
        await btn.click();
        await page.waitForTimeout(400);
        await testPopupOverflow(page, 'theme picker', device.name);
        await screenshot(page, dir, 'theme-picker', false);
      } else {
        log(`  ! theme picker — button not found`);
      }
    } catch (e) {
      log(`  ✗ theme picker — ${e.message.split('\n')[0]}`);
    }

    // 6. Mobile hamburger menu (mobile/tablet only)
    if (device.width < 1024) {
      try {
        await nav(page, '/');
        const btn = await page.evaluateHandle(() => {
          return [...document.querySelectorAll('button')].find(b =>
            b.offsetParent !== null && (
              b.getAttribute('aria-label')?.toLowerCase().includes('menu') ||
              b.getAttribute('aria-label')?.toLowerCase().includes('navigation') ||
              b.innerHTML.includes('M4 6h16') || b.innerHTML.includes('M3 12h18')
            )
          );
        });
        const el = btn.asElement();
        if (el) {
          await el.click();
          await page.waitForTimeout(400);
          await testPopupOverflow(page, 'mobile menu', device.name);
          await screenshot(page, dir, 'mobile-menu', false);
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
        } else {
          log(`  ! mobile menu — hamburger not visible`);
        }
      } catch (e) {
        log(`  ✗ mobile menu — ${e.message.split('\n')[0]}`);
      }
    }

    await ctx.close();
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  const browser = await chromium.launch({ executablePath: BROWSER_EXEC });

  await testPages(browser);
  await testPopups(browser);

  await browser.close();

  log('\n\n══════════════════════════════════════════');
  log('  RESULTS');
  log('══════════════════════════════════════════');

  if (issues.length === 0) {
    log('\n✓ All tests passed — no issues found.\n');
  } else {
    log(`\n✗ ${issues.length} issue(s) found:\n`);
    const byPhase = {};
    for (const i of issues) {
      const key = `${i.phase}/${i.device}`;
      if (!byPhase[key]) byPhase[key] = [];
      byPhase[key].push(i);
    }
    for (const [key, list] of Object.entries(byPhase)) {
      log(`\n[${key}]`);
      for (const i of list) {
        log(`  ${i.item}: ${i.issue}`);
        if (i.offenders?.length) i.offenders.forEach(o => log(`    → ${o}`));
      }
    }
  }
  log(`\nTotal issues: ${issues.length}`);
  log('Screenshots saved to: ' + OUT_DIR);
})();
