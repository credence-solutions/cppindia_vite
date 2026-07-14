<template>
  <div>
    <PageHero
      overline="Share Your Knowledge"
      title="Call for Speakers"
      subtitle="Have something interesting to share about C++? We'd love to hear from you — all experience levels are welcome."
      :breadcrumb="[{ label: 'Call for Speakers', path: '/call-for-speakers' }]"
    />

    <section class="section">
      <div class="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        <!-- Left: what to expect -->
        <div>
          <h2 class="font-display text-xl font-bold text-ink mb-4">What we're looking for</h2>
          <p class="text-base text-ink-2 leading-relaxed mb-7">
            CppIndia welcomes talks on any C++-related topic — language features, tools, libraries,
            real-world experiences, debugging stories, performance wins, and more.
            Talks run approximately 60 minutes with a 15-minute Q&amp;A.
          </p>

          <!-- Topics -->
          <div class="mb-10">
            <p class="text-sm font-medium text-ink-2 mb-3">Popular topics include:</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="topic in topics"
                :key="topic"
                class="px-3 py-1 bg-[rgba(79,142,247,0.08)] border border-[rgba(79,142,247,0.20)] rounded-full text-xs font-medium text-secondary"
              >{{ topic }}</span>
            </div>
          </div>

          <!-- FAQs -->
          <div>
            <h2 class="font-display text-xl font-bold text-ink mb-4">FAQs</h2>
            <div class="flex flex-col gap-5">
              <div
                v-for="faq in faqs"
                :key="faq.q"
                class="p-5 bg-surface border border-wire-light rounded-xl"
              >
                <h3 class="font-display text-base font-bold text-ink mb-2">{{ faq.q }}</h3>
                <p class="text-sm text-ink-2 leading-relaxed">{{ faq.a }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: submit form -->
        <div class="bg-surface border border-wire-light rounded-2xl p-8 sticky top-[calc(var(--navbar-height,64px)+1.5rem)]">
          <h2 class="font-display text-xl font-bold text-ink mb-2">Submit a Talk Proposal</h2>
          <p class="text-sm text-ink-3 mb-6">Fill out this form and we'll get back to you within a week.</p>

          <form class="flex flex-col gap-4" @submit.prevent="submit">
            <div class="flex flex-col gap-2">
              <label for="name" class="text-sm font-medium text-ink">Your Name *</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Ankur Satle"
                class="px-4 py-3 border border-wire rounded-md font-sans text-sm text-ink bg-canvas placeholder:text-ink-3 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-primary/10 transition-colors"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="email" class="text-sm font-medium text-ink">Email Address *</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="you@example.com"
                class="px-4 py-3 border border-wire rounded-md font-sans text-sm text-ink bg-canvas placeholder:text-ink-3 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-primary/10 transition-colors"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="title" class="text-sm font-medium text-ink">Talk Title *</label>
              <input
                id="title"
                v-model="form.title"
                type="text"
                required
                placeholder="e.g. Concepts in Practice"
                class="px-4 py-3 border border-wire rounded-md font-sans text-sm text-ink bg-canvas placeholder:text-ink-3 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-primary/10 transition-colors"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="abstract" class="text-sm font-medium text-ink">Abstract *</label>
              <textarea
                id="abstract"
                v-model="form.abstract"
                required
                rows="5"
                placeholder="Brief description of your talk — what will attendees learn?"
                class="px-4 py-3 border border-wire rounded-md font-sans text-sm text-ink bg-canvas placeholder:text-ink-3 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-primary/10 transition-colors resize-y"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="bio" class="text-sm font-medium text-ink">Short Bio</label>
              <textarea
                id="bio"
                v-model="form.bio"
                rows="3"
                placeholder="A few sentences about yourself"
                class="px-4 py-3 border border-wire rounded-md font-sans text-sm text-ink bg-canvas placeholder:text-ink-3 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-primary/10 transition-colors resize-y"
              />
            </div>

            <div
              v-if="submitted"
              class="p-4 bg-[rgba(46,125,50,0.1)] border border-[rgba(46,125,50,0.3)] rounded-md text-sm font-medium text-green-400"
            >
              Thank you! We'll be in touch soon.
            </div>
            <div
              v-else-if="error"
              class="p-4 bg-[rgba(211,47,47,0.08)] border border-[rgba(211,47,47,0.25)] rounded-md text-sm text-red-400"
            >{{ error }}</div>

            <button
              type="submit"
              class="btn btn--primary w-full justify-center"
              :disabled="submitting"
            >
              {{ submitting ? 'Submitting...' : 'Submit Proposal' }}
            </button>
          </form>

          <p class="mt-4 text-center text-xs text-ink-3">
            Or email us directly at
            <a :href="`mailto:${SITE.email}`" class="text-secondary underline">{{ SITE.email }}</a>
          </p>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import { SITE } from '@/constants'

useHead({
  title: 'Call for Speakers | CppIndia',
  description: 'Submit a talk proposal for CppIndia tech talks or CppIndiaCon. All C++ topics and experience levels welcome.',
})

const form = reactive({ name: '', email: '', title: '', abstract: '', bio: '' })
const submitting = ref(false)
const submitted  = ref(false)
const error      = ref('')

async function submit() {
  submitting.value = true
  error.value = ''
  try {
    // TODO: wire to backend / formspree / etc.
    await new Promise((r) => setTimeout(r, 800))
    submitted.value = true
    Object.keys(form).forEach((k) => { form[k] = '' })
  } catch {
    error.value = 'Something went wrong. Please email us directly.'
  } finally {
    submitting.value = false
  }
}

const topics = [
  'Modern C++ (C++20/23)', 'Concurrency & Parallelism', 'Template Metaprogramming',
  'Performance & Profiling', 'Build Systems & Tooling', 'Embedded C++',
  'Design Patterns', 'Testing & TDD', 'Compilers & Optimization',
  'Real-world Case Studies', 'Cross-platform Development', 'Memory Management',
]

const faqs = [
  { q: 'Do I need to be an expert?', a: 'Not at all. We welcome speakers at all levels — a fresh perspective from a learner is just as valuable as an expert deep-dive.' },
  { q: 'What is the talk format?', a: 'Most talks run 60 minutes with a 15–20 minute Q&A. Lightning talks (5–10 min) are also welcome for N-Lighting Talk sessions.' },
  { q: 'Is the talk recorded?', a: 'Yes, with your permission we record all talks and post them to our YouTube channel.' },
  { q: 'Can I talk about my company\'s product?', a: 'Talks should be educational, not promotional. Sharing learnings from building something is fine; sales pitches are not.' },
]
</script>
