// =============================================================================
// ROUTER — CppIndia community website routes
// =============================================================================
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/HomeView.vue'),
        meta: {
          title: 'CppIndia — India\'s C++ Community',
          description:
            'CppIndia is India\'s C++ user group — a welcoming space for C++ developers to connect, learn, and grow through tech talks, conferences, and shared resources.',
        },
      },
      {
        path: 'tech-talks',
        name: 'TechTalks',
        component: () => import('@/views/TechTalks/TechTalksView.vue'),
        meta: {
          title: 'Community Tech Talks | CppIndia',
          description:
            'Watch recorded CppIndia tech talks from 2020–2024. Sessions on modern C++, concurrency, performance, tooling, and more.',
          breadcrumb: [{ label: 'Tech Talks', path: '/tech-talks' }],
        },
      },
      {
        path: 'conference',
        name: 'Conference',
        component: () => import('@/views/Conference/ConferenceView.vue'),
        meta: {
          title: 'CppIndiaCon — India\'s C++ Conference',
          description:
            'CppIndiaCon is India\'s annual C++ conference featuring international speakers, workshops, and networking.',
          breadcrumb: [{ label: 'CppIndiaCon', path: '/conference' }],
        },
      },
      {
        path: 'resources',
        name: 'Resources',
        component: () => import('@/views/Resources/ResourcesView.vue'),
        meta: {
          title: 'C++ Resources | CppIndia',
          description:
            'Curated C++ learning resources — standards, references, articles, and monthly recommendations from the CppIndia community.',
          breadcrumb: [{ label: 'Resources', path: '/resources' }],
        },
      },
      {
        path: 'code-of-conduct',
        name: 'CodeOfConduct',
        component: () => import('@/views/CodeOfConduct/CodeOfConductView.vue'),
        meta: {
          title: 'Code of Conduct | CppIndia',
          description: 'CppIndia is committed to providing a safe, inclusive, and welcoming environment for all community members.',
          breadcrumb: [{ label: 'Code of Conduct', path: '/code-of-conduct' }],
        },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About/AboutView.vue'),
        meta: {
          title: 'About Us | CppIndia',
          description:
            'Learn about CppIndia — India\'s C++ user group. Our mission, story, and how we bring the C++ community together.',
          breadcrumb: [{ label: 'About', path: '/about' }],
        },
      },
      {
        path: 'team',
        name: 'Team',
        component: () => import('@/views/Team/TeamView.vue'),
        meta: {
          title: 'Our Team | CppIndia',
          description: 'Meet the volunteers who run CppIndia — founders, co-founders, and moderators.',
          breadcrumb: [
            { label: 'About', path: '/about' },
            { label: 'Team', path: '/team' },
          ],
        },
      },
      {
        path: 'call-for-speakers',
        name: 'CallForSpeakers',
        component: () => import('@/views/CallForSpeakers/CallForSpeakersView.vue'),
        meta: {
          title: 'Call for Speakers | CppIndia',
          description: 'Share your C++ knowledge with the community. Submit a talk proposal for CppIndia tech talks or CppIndiaCon.',
          breadcrumb: [{ label: 'Call for Speakers', path: '/call-for-speakers' }],
        },
      },
      {
        path: 'join-us',
        name: 'JoinUs',
        component: () => import('@/views/JoinUs/JoinUsView.vue'),
        meta: {
          title: 'Join CppIndia | India\'s C++ Community',
          description: 'Join CppIndia — India\'s C++ user group. Register to stay connected, get event updates, and be part of the community.',
          breadcrumb: [{ label: 'Join Us', path: '/join-us' }],
        },
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/views/Contact/ContactView.vue'),
        meta: {
          title: 'Contact | CppIndia',
          description: 'Get in touch with the CppIndia team.',
          breadcrumb: [{ label: 'Contact', path: '/contact' }],
        },
      },
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('@/views/Blog/BlogView.vue'),
        meta: {
          title: 'Blog & Articles | CppIndia',
          description: 'C++ tutorials, trip reports, and community articles from CppIndia members.',
          breadcrumb: [{ label: 'Blog', path: '/blog' }],
        },
      },
      {
        path: 'blog/:slug',
        name: 'BlogDetail',
        component: () => import('@/views/Blog/BlogDetailView.vue'),
        meta: {
          title: 'Blog | CppIndia',
          breadcrumb: [{ label: 'Blog', path: '/blog' }],
        },
      },
      {
        path: 'events',
        name: 'Events',
        component: () => import('@/views/Events/EventsView.vue'),
        meta: {
          title: 'Events | CppIndia',
          description: 'Upcoming and past CppIndia meetups, talks, and conferences.',
          breadcrumb: [{ label: 'Events', path: '/events' }],
        },
      },
      {
        path: 'jobs',
        name: 'Jobs',
        component: () => import('@/views/Jobs/JobsView.vue'),
        meta: {
          title: 'C++ Jobs Board | CppIndia',
          description: 'C++ job listings curated for the Indian developer community.',
          breadcrumb: [{ label: 'Jobs', path: '/jobs' }],
        },
      },
      {
        path: 'members',
        name: 'Members',
        component: () => import('@/views/Members/MembersView.vue'),
        meta: {
          title: 'Members & Hall of Fame | CppIndia',
          description: 'Spotlight on active contributors, speakers, and top helpers in the CppIndia community.',
          breadcrumb: [{ label: 'Members', path: '/members' }],
        },
      },
      {
        path: 'roadmap',
        name: 'Roadmap',
        component: () => import('@/views/Roadmap/RoadmapView.vue'),
        meta: {
          title: 'C++ Learning Roadmap | CppIndia',
          description: 'A curated path from C++ beginner to expert — resources, milestones, and community guidance.',
          breadcrumb: [{ label: 'Roadmap', path: '/roadmap' }],
        },
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('@/views/Projects/ProjectsView.vue'),
        meta: {
          title: 'Community Projects | CppIndia',
          description: 'Open-source C++ projects built and maintained by CppIndia community members.',
          breadcrumb: [{ label: 'Projects', path: '/projects' }],
        },
      },
      {
        path: 'playground',
        name: 'Playground',
        component: () => import('@/views/Playground/PlaygroundView.vue'),
        meta: {
          title: 'C++ Playground | CppIndia',
          description: 'Curated C++17/20/23 code snippets with live Compiler Explorer integration.',
          breadcrumb: [{ label: 'Playground', path: '/playground' }],
        },
      },
      {
        path: 'faq',
        name: 'FAQ',
        component: () => import('@/views/FAQ/FAQView.vue'),
        meta: {
          title: 'FAQ | CppIndia',
          description: 'Frequently asked questions about CppIndia, C++ learning, speaking, and sponsorship.',
          breadcrumb: [{ label: 'FAQ', path: '/faq' }],
        },
      },
      {
        path: 'sponsors',
        name: 'Sponsors',
        component: () => import('@/views/Sponsors/SponsorsView.vue'),
        meta: {
          title: 'Sponsors | CppIndia',
          description: 'Support India\'s C++ community. View sponsorship tiers and benefits.',
          breadcrumb: [{ label: 'Sponsors', path: '/sponsors' }],
        },
      },
      {
        path: 'speakers/:slug',
        name: 'SpeakerDetail',
        component: () => import('@/views/Speakers/SpeakerDetailView.vue'),
        meta: {
          title: 'Speaker | CppIndia',
          breadcrumb: [{ label: 'Conference', path: '/conference' }],
        },
      },
      {
        path: 'cfp',
        name: 'CFP',
        component: () => import('@/views/CFP/CFPView.vue'),
        meta: {
          title: 'CFP Tracker | CppIndia',
          description: 'Open Calls for Proposals at C++ conferences worldwide — deadlines, links, and everything you need to submit.',
          breadcrumb: [{ label: 'CFP Tracker', path: '/cfp' }],
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound/NotFoundView.vue'),
    meta: { title: '404 Not Found | CppIndia' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    // Delayed to let the <Transition mode="out-in"> page transition in
    // DefaultLayout finish mounting the new route before we scroll —
    // otherwise this runs against the outgoing page's stale layout.
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) return resolve(savedPosition)
        if (to.hash)       return resolve({ el: to.hash, behavior: 'smooth', top: 80 })
        resolve({ top: 0, behavior: 'smooth' })
      }, 300)
    })
  },
})

router.afterEach((to) => {
  const { title, description } = to.meta
  if (title) document.title = title
  if (description) {
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
  }
})

export default router
