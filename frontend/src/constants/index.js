// =============================================================================
// CONSTANTS — Application-wide static values for CppIndia community website
// =============================================================================

export const SITE = {
  name: 'CppIndia',
  fullName: 'CppIndia User Group',
  tagline: "India's very own C++ Community",
  url: 'https://www.cppindia.co.in',
  email: 'info@cppindia.co.in',
  social: {
    linkedin:  'https://www.linkedin.com/company/cppindia',
    twitter:   'https://twitter.com/CppIndiaUG',
    facebook:  'https://www.facebook.com/CppIndiaUG',
    discord:   'https://discord.gg/Wz42tX5',
    youtube:   'https://www.youtube.com/channel/UCwB-WjSJI2D97YZcACFxJDw',
    github:    'https://github.com/CppIndia-UserGroup/CppIndia-SessionDocuments',
  },
  discordInvite: 'https://discord.gg/Wz42tX5',
  founded: 2020,
}

// Navigation structure — drives header nav & mobile menu
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  {
    label: 'Tech Talks',
    path: '/tech-talks',
    children: [
      { label: '2025 Talks', path: '/tech-talks?year=2025' },
      { label: '2024 Talks', path: '/tech-talks?year=2024' },
      { label: '2023 Talks', path: '/tech-talks?year=2023' },
      { label: '2022 Talks', path: '/tech-talks?year=2022' },
      { label: '2021 Talks', path: '/tech-talks?year=2021' },
      { label: '2020 Talks', path: '/tech-talks?year=2020' },
    ],
  },
  {
    label: 'CppIndiaCon',
    path: '/conference',
    children: [
      { label: 'CppIndiaCon 2024', path: '/conference?year=2024' },
      { label: 'CppIndiaCon 2023', path: '/conference?year=2023' },
      { label: 'CppIndiaCon 2022', path: '/conference?year=2022' },
      { label: 'CppIndiaCon 2021', path: '/conference?year=2021' },
    ],
  },
  {
    label: 'Learn',
    path: '/resources',
    children: [
      { label: 'C++ Resources',      path: '/resources' },
      { label: 'Blog & Articles',    path: '/blog' },
      { label: 'Learning Roadmap',   path: '/roadmap' },
      { label: 'Code Playground',    path: '/playground' },
    ],
  },
  {
    label: 'Community',
    path: '/members',
    children: [
      { label: 'Hall of Fame', path: '/members' },
      { label: 'Events',                  path: '/events' },
      { label: 'Projects Showcase',       path: '/projects' },
      { label: 'Jobs Board',              path: '/jobs' },
      { label: 'Sponsors',                path: '/sponsors' },
    ],
  },
  {
    label: 'About',
    path: '/about',
    children: [
      { label: 'About Us',          path: '/about' },
      { label: 'Our Team',          path: '/team' },
      { label: 'Join Us',           path: '/join-us' },
      { label: 'FAQ',               path: '/faq' },
      { label: 'Code of Conduct',   path: '/code-of-conduct' },
      { label: 'Call for Speakers', path: '/call-for-speakers' },
    ],
  },
  { label: 'Contact', path: '/contact' },
]

// Community statistics for homepage
export const STATS = [
  { value: 50,   suffix: '+', label: 'Tech Talks',           icon: 'mic'      },
  { value: 4,    suffix: '',  label: 'Annual Conferences',   icon: 'calendar'  },
  { value: 5,    suffix: '+', label: 'Years Active',         icon: 'clock'    },
  { value: 1000, suffix: '+', label: 'Community Members',    icon: 'people'   },
]

// Talk topic tags used across the site
export const TALK_TAGS = [
  'Concurrency', 'Templates', 'Metaprogramming', 'Performance', 'Debugging',
  'Design Patterns', 'Embedded', 'Compiler', 'SIMD', 'Testing',
  'Async', 'Networking', 'CMake', 'Build Systems', 'Modern C++',
  'C++20', 'C++23', 'Memory Management', 'Algorithms',
]
