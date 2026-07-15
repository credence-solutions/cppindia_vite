<template>
  <div>
    <PageHero
      overline="About CppIndia"
      title="India's very own C++ Community"
      subtitle="A community platform that brings together C++ developers from all walks of life — united by a mutual interest in C++."
      :breadcrumb="[{ label: 'About', path: '/about' }]"
    />

    <section class="section" style="background: #0B0D2E;">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">

          <!-- Story -->
          <div>
            <h2 class="font-display text-2xl font-bold mt-0 mb-5"
              style="background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              Our Story
            </h2>
            <p class="text-base leading-relaxed mb-5" style="color: rgba(148,163,184,0.8);">
              CppIndia started with a simple idea: India has a huge developer community, but C++ developers
              lacked a dedicated platform to connect, learn from each other, and grow together.
              We wanted to fix that.
            </p>
            <p class="text-base leading-relaxed mb-5" style="color: rgba(148,163,184,0.8);">
              What began as a small group of enthusiasts has grown into a thriving community of over
              a thousand C++ developers — students, fresh graduates, and seasoned engineers —
              united by their love for C++.
            </p>

            <h2 class="font-display text-2xl font-bold mt-10 mb-5"
              style="background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              What We Do
            </h2>
            <ul class="flex flex-col gap-4 pl-6 list-disc">
              <li class="text-base leading-relaxed" style="color: rgba(148,163,184,0.8);">
                <strong style="color: #E2E8F5;">Tech Talks</strong> — Regular sessions on alternate Saturdays.
                60-minute talks followed by Q&amp;A, covering everything from Modern C++ features
                to real-world engineering challenges.
              </li>
              <li class="text-base leading-relaxed" style="color: rgba(148,163,184,0.8);">
                <strong style="color: #E2E8F5;">CppIndiaCon</strong> — Our annual conference, now in its 4th edition.
                Two days of talks, workshops, and networking with global C++ experts.
              </li>
              <li class="text-base leading-relaxed" style="color: rgba(148,163,184,0.8);">
                <strong style="color: #E2E8F5;">Mentorship</strong> — Connecting junior developers with experienced
                engineers for guidance and career support.
              </li>
              <li class="text-base leading-relaxed" style="color: rgba(148,163,184,0.8);">
                <strong style="color: #E2E8F5;">Job Board</strong> — Helping companies find great C++ talent, and
                developers find meaningful opportunities.
              </li>
              <li class="text-base leading-relaxed" style="color: rgba(148,163,184,0.8);">
                <strong style="color: #E2E8F5;">Resources</strong> — Curating the best C++ learning materials —
                standards, references, articles, and monthly community picks.
              </li>
            </ul>

            <h2 class="font-display text-2xl font-bold mt-10 mb-5"
              style="background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              Our Values
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="value in values"
                :key="value.title"
                class="p-5 rounded-xl transition-all duration-200"
                style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2);"
                onmouseover="this.style.borderColor='rgba(99,102,241,0.4)'; this.style.boxShadow='0 0 16px rgba(99,102,241,0.15)'"
                onmouseout="this.style.borderColor='rgba(99,102,241,0.2)'; this.style.boxShadow='none'"
              >
                <h3 class="font-display text-base font-bold mb-2" style="color: #A78BFA;">{{ value.title }}</h3>
                <p class="text-sm leading-relaxed" style="color: rgba(148,163,184,0.75);">{{ value.body }}</p>
              </div>
            </div>
          </div>

          <!-- Sidebar quick links -->
          <div class="sticky top-[calc(var(--navbar-height,64px)+1.5rem)] flex flex-col gap-4">
            <div class="rounded-xl p-6" style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2);">
              <h3 class="font-display text-base font-bold mb-4" style="color: #E2E8F5;">Quick Links</h3>
              <ul class="flex flex-col gap-3">
                <li>
                  <RouterLink
                    to="/team"
                    class="text-sm transition-colors flex items-center gap-2 group"
                    style="color: rgba(148,163,184,0.7);"
                    onmouseover="this.style.color='#A78BFA'"
                    onmouseout="this.style.color='rgba(148,163,184,0.7)'"
                  >
                    <span style="color: #A78BFA;">→</span> Meet the Team
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/join"
                    class="text-sm transition-colors flex items-center gap-2"
                    style="color: rgba(148,163,184,0.7);"
                    onmouseover="this.style.color='#A78BFA'"
                    onmouseout="this.style.color='rgba(148,163,184,0.7)'"
                  >
                    <span style="color: #A78BFA;">→</span> Join CppIndia
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/code-of-conduct"
                    class="text-sm transition-colors flex items-center gap-2"
                    style="color: rgba(148,163,184,0.7);"
                    onmouseover="this.style.color='#A78BFA'"
                    onmouseout="this.style.color='rgba(148,163,184,0.7)'"
                  >
                    <span style="color: #A78BFA;">→</span> Code of Conduct
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/call-for-speakers"
                    class="text-sm transition-colors flex items-center gap-2"
                    style="color: rgba(148,163,184,0.7);"
                    onmouseover="this.style.color='#A78BFA'"
                    onmouseout="this.style.color='rgba(148,163,184,0.7)'"
                  >
                    <span style="color: #A78BFA;">→</span> Call for Speakers
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/contact"
                    class="text-sm transition-colors flex items-center gap-2"
                    style="color: rgba(148,163,184,0.7);"
                    onmouseover="this.style.color='#A78BFA'"
                    onmouseout="this.style.color='rgba(148,163,184,0.7)'"
                  >
                    <span style="color: #A78BFA;">→</span> Contact Us
                  </RouterLink>
                </li>
              </ul>
            </div>

            <div class="rounded-xl p-6" style="background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); box-shadow: 0 0 24px rgba(99,102,241,0.3);">
              <h3 class="font-display text-base font-bold text-white mb-4">Join the Community</h3>
              <p class="text-sm leading-relaxed mb-4" style="color: rgba(255,255,255,0.75);">Chat with fellow C++ developers on Discord.</p>
              <a
                :href="SITE.discordInvite"
                class="inline-flex w-full justify-center items-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200"
                style="border: 1px solid rgba(255,255,255,0.35); color: white; background: rgba(255,255,255,0.1);"
                onmouseover="this.style.background='rgba(255,255,255,0.2)'"
                onmouseout="this.style.background='rgba(255,255,255,0.1)'"
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
