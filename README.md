# CppIndia Website

Official community website for **CppIndia** — India's premier C++ user group.  
Built with Vue 3 + Vite, dark-first design system, full content parity with [cppindia.co.in](https://www.cppindia.co.in/).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| Build tool | [Vite 5](https://vitejs.dev/) with brotli compression |
| Routing | [Vue Router 4](https://router.vuejs.org/) |
| State | [Pinia](https://pinia.vuejs.org/) |
| Animations | [GSAP 3](https://gsap.com/) with ScrollTrigger |
| Styling | SCSS (modular partials, CSS custom properties) |
| Utilities | [@vueuse/core](https://vueuse.org/) |

---

## Project Structure

```
src/
├── components/
│   ├── common/           # PageHero, ThemePicker
│   ├── layout/           # SiteHeader, SiteFooter, FloatingContact, BackToTop
│   ├── navigation/       # MegaMenu, SimpleDropdown, MobileMenu
│   └── sections/home/    # HeroBanner, CommunityAbout, CommunityStats,
│                         # RecentTalks, ConferenceHighlight, SponsorsSection, JoinCta
├── composables/          # useGsap, useHead, useScrollLock
├── constants/            # NAV_LINKS, SITE, STATS, TALK_TAGS
├── data/                 # JSON data files (talks, conferences, speakers, team, sponsors)
├── router/               # Vue Router config
├── services/api/         # Data fetching (talks, conferences, speakers, contact)
├── stores/               # Pinia stores (navigation, theme)
├── styles/
│   └── base/
│       ├── _variables.scss   # Design tokens & CSS custom properties
│       ├── _mixins.scss      # SCSS utility mixins
│       ├── _typography.scss  # Type scale & font rules
│       ├── _animations.scss  # Keyframes & transitions
│       ├── _utilities.scss   # Helper classes
│       ├── _images.scss      # Shared image alignment styles (logos, photos, banners)
│       └── _themes.scss      # Theme overrides (Carbon Pro, Aurora, Midnight Gold)
└── views/                # Route-level page components
    ├── Home/
    ├── Conference/
    ├── TechTalks/
    ├── Team/
    ├── About/
    ├── Contact/
    ├── Resources/
    ├── JoinUs/
    ├── CallForSpeakers/
    ├── CodeOfConduct/
    └── NotFound/

public/
└── assets/images/
    ├── logo.png
    ├── speakers/2024/      # 8 speaker portraits
    ├── sponsors/gold/      # MulticoreWare, think-cell, Bloomberg LP
    ├── sponsors/community/ # Meeting C++, SwedenCpp, #include <C++>
    ├── team/               # Founder & moderator photos
    └── conferences/2024/   # Conference banner
```

---

## Getting Started

```bash
# All commands run from the frontend/ directory
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint & format
npm run lint
npm run format
```

---

## Design System — Nebula Dark

Dark-first palette with 4 switchable themes (persisted via `localStorage`):

| Theme | Primary | Secondary | Background |
|-------|---------|-----------|------------|
| **Nebula Dark** *(default)* | Electric Blue `#4F8EF7` | Violet `#9B74F5` | Deep Space `#06090F` |
| **Carbon Pro** | Vivid Orange `#F97316` | Violet `#A78BFA` | Charcoal `#0D0D0D` |
| **Aurora** | Emerald `#10B981` | Indigo `#818CF8` | Forest Dark `#060C08` |
| **Midnight Gold** | Gold `#F59E0B` | Rose `#F472B6` | Deep Navy `#06080F` |

Switch themes using the **theme picker** button (bottom-right corner of the site).

Design tokens live in `src/styles/base/_variables.scss` as both SCSS variables and CSS custom properties. Theme overrides in `_themes.scss` use `[data-theme="..."]` attribute selectors on `<html>`.

---

## Content & Data

All content is driven by static JSON files in `src/data/`:

| File | Contents |
|------|----------|
| `talks.json` | All tech talk sessions (2020–2024) with YouTube links and slides |
| `conferences.json` | CppIndiaCon editions 2021–2024: schedule, speakers, sponsors, stats |
| `speakers.json` | CppIndiaCon 2024 speaker profiles with bios, expertise, photo paths |
| `team.json` | Founders and moderators with bios and social links |
| `sponsors.json` | Gold and community sponsors with logo paths |
| `resources.json` | C++ reference links, articles, and monthly picks |

---

## Key Features

- **Full content parity** with [cppindia.co.in](https://www.cppindia.co.in/)
- **4 live themes** switchable at runtime without page reload
- **Real images** — official logo, speaker portraits, team photos, sponsor logos
- **GSAP animations** — scroll-triggered reveals, stagger effects
- **Responsive** — mobile drawer menu, fluid type scale, adaptive grids
- **Shared image styles** — `_images.scss` centralises all photo/logo alignment patterns
- **Floating contact** widget and back-to-top button

---

## Community

- Website: [cppindia.co.in](https://www.cppindia.co.in/)
- Discord: [discord.gg/Wz42tX5](https://discord.gg/Wz42tX5)
- YouTube: [CppIndia channel](https://www.youtube.com/channel/UCwB-WjSJI2D97YZcACFxJDw)
- LinkedIn: [linkedin.com/company/cppindia](https://www.linkedin.com/company/cppindia)
- Twitter/X: [@CppIndiaUG](https://twitter.com/CppIndiaUG)
