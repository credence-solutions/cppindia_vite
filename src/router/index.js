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
        path: 'join',
        name: 'Join',
        component: () => import('@/views/JoinUs/JoinUsView.vue'),
        meta: {
          title: 'Join CppIndia | India\'s C++ Community',
          description: 'Join CppIndia on Discord, LinkedIn, YouTube and more. Attend our tech talks and annual conference.',
          breadcrumb: [{ label: 'Join Us', path: '/join' }],
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
        path: 'contact',
        name: 'Contact',
        component: () => import('@/views/Contact/ContactView.vue'),
        meta: {
          title: 'Contact | CppIndia',
          description: 'Get in touch with the CppIndia team.',
          breadcrumb: [{ label: 'Contact', path: '/contact' }],
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
    if (savedPosition) return savedPosition
    if (to.hash)       return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
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
