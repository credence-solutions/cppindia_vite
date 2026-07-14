<template>
  <div>
    <PageHero
      overline="About CppIndia"
      title="India's very own C++ Community"
      subtitle="A community platform that brings together C++ developers from all walks of life — united by a mutual interest in C++."
      :breadcrumb="[{ label: 'About', path: '/about' }]"
    />

    <section class="section">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">

          <!-- Story -->
          <div>
            <h2 class="font-display text-2xl font-bold text-ink mt-0 mb-5">Our Story</h2>
            <p class="text-base text-ink-2 leading-relaxed mb-5">
              CppIndia started with a simple idea: India has a huge developer community, but C++ developers
              lacked a dedicated platform to connect, learn from each other, and grow together.
              We wanted to fix that.
            </p>
            <p class="text-base text-ink-2 leading-relaxed mb-5">
              What began as a small group of enthusiasts has grown into a thriving community of over
              a thousand C++ developers — students, fresh graduates, and seasoned engineers —
              united by their love for C++.
            </p>

            <h2 class="font-display text-2xl font-bold text-ink mt-10 mb-5">What We Do</h2>
            <ul class="flex flex-col gap-4 pl-6 list-disc">
              <li class="text-base text-ink-2 leading-relaxed">
                <strong class="text-ink">Tech Talks</strong> — Regular sessions on alternate Saturdays.
                60-minute talks followed by Q&amp;A, covering everything from Modern C++ features
                to real-world engineering challenges.
              </li>
              <li class="text-base text-ink-2 leading-relaxed">
                <strong class="text-ink">CppIndiaCon</strong> — Our annual conference, now in its 4th edition.
                Two days of talks, workshops, and networking with global C++ experts.
              </li>
              <li class="text-base text-ink-2 leading-relaxed">
                <strong class="text-ink">Mentorship</strong> — Connecting junior developers with experienced
                engineers for guidance and career support.
              </li>
              <li class="text-base text-ink-2 leading-relaxed">
                <strong class="text-ink">Job Board</strong> — Helping companies find great C++ talent, and
                developers find meaningful opportunities.
              </li>
              <li class="text-base text-ink-2 leading-relaxed">
                <strong class="text-ink">Resources</strong> — Curating the best C++ learning materials —
                standards, references, articles, and monthly community picks.
              </li>
            </ul>

            <h2 class="font-display text-2xl font-bold text-ink mt-10 mb-5">Our Values</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="value in values"
                :key="value.title"
                class="p-5 bg-surface border border-wire-light rounded-xl"
              >
                <h3 class="font-display text-base font-bold text-secondary mb-2">{{ value.title }}</h3>
                <p class="text-sm text-ink-2 leading-relaxed">{{ value.body }}</p>
              </div>
            </div>
          </div>

          <!-- Sidebar quick links -->
          <div class="sticky top-[calc(var(--navbar-height,64px)+1.5rem)] flex flex-col gap-4">
            <div class="bg-surface border border-wire-light rounded-xl p-6">
              <h3 class="font-display text-base font-bold text-ink mb-4">Quick Links</h3>
              <ul class="flex flex-col gap-3">
                <li>
                  <RouterLink
                    to="/team"
                    class="text-sm text-ink-2 hover:text-secondary transition-colors flex items-center gap-2 group"
                  >
                    <span class="text-secondary">→</span> Meet the Team
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/join"
                    class="text-sm text-ink-2 hover:text-secondary transition-colors flex items-center gap-2"
                  >
                    <span class="text-secondary">→</span> Join CppIndia
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/code-of-conduct"
                    class="text-sm text-ink-2 hover:text-secondary transition-colors flex items-center gap-2"
                  >
                    <span class="text-secondary">→</span> Code of Conduct
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/call-for-speakers"
                    class="text-sm text-ink-2 hover:text-secondary transition-colors flex items-center gap-2"
                  >
                    <span class="text-secondary">→</span> Call for Speakers
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/contact"
                    class="text-sm text-ink-2 hover:text-secondary transition-colors flex items-center gap-2"
                  >
                    <span class="text-secondary">→</span> Contact Us
                  </RouterLink>
                </li>
              </ul>
            </div>

            <div class="bg-primary rounded-xl p-6">
              <h3 class="font-display text-base font-bold text-white mb-4">Join the Community</h3>
              <p class="text-sm text-white/70 leading-relaxed mb-4">Chat with fellow C++ developers on Discord.</p>
              <a
                :href="SITE.discordInvite"
                class="btn btn--outline-white w-full justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >Join Discord</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import { SITE } from '@/constants'

useHead({
  title: 'About Us | CppIndia',
  description: "Learn about CppIndia — India's C++ user group. Our mission, story, and how we bring the C++ community together.",
})

const values = [
  {
    title: 'Inclusive',
    body: 'We welcome everyone — beginners are just as important as experts. No gatekeeping.',
  },
  {
    title: 'Community-first',
    body: "We're volunteer-run and community-owned. Everything we do is for the members.",
  },
  {
    title: 'Learning-focused',
    body: 'Every session is an opportunity to learn something new, no matter your experience level.',
  },
  {
    title: 'Open',
    body: 'Our sessions are free, our resources are public, and our doors are always open.',
  },
]
</script>
