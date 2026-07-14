<template>
  <div class="cfs-page">
    <PageHero
      overline="Share Your Knowledge"
      title="Call for Speakers"
      subtitle="Have something interesting to share about C++? We'd love to hear from you — all experience levels are welcome."
      :breadcrumb="[{ label: 'Call for Speakers', path: '/call-for-speakers' }]"
    />

    <section class="section cfs-page__body">
      <div class="container cfs-page__layout">
        <!-- Left: what to expect -->
        <div class="cfs-page__info">
          <h2 class="cfs-page__section-title">What we're looking for</h2>
          <p class="cfs-page__body-text">
            CppIndia welcomes talks on any C++-related topic — language features, tools, libraries,
            real-world experiences, debugging stories, performance wins, and more.
            Talks run approximately 60 minutes with a 15-minute Q&amp;A.
          </p>

          <div class="cfs-page__topics">
            <p class="cfs-page__topics-label">Popular topics include:</p>
            <div class="cfs-page__topic-grid">
              <span v-for="topic in topics" :key="topic" class="cfs-page__topic">{{ topic }}</span>
            </div>
          </div>

          <div class="cfs-page__faqs">
            <h2 class="cfs-page__section-title">FAQs</h2>
            <div v-for="faq in faqs" :key="faq.q" class="cfs-page__faq">
              <h3 class="cfs-page__faq-q">{{ faq.q }}</h3>
              <p class="cfs-page__faq-a">{{ faq.a }}</p>
            </div>
          </div>
        </div>

        <!-- Right: submit form -->
        <div class="cfs-page__form-wrap">
          <div class="cfs-page__form-card">
            <h2 class="cfs-page__form-title">Submit a Talk Proposal</h2>
            <p class="cfs-page__form-note">
              Fill out this form and we'll get back to you within a week.
            </p>

            <form class="cfs-page__form" @submit.prevent="submit">
              <div class="cfs-page__field">
                <label for="name">Your Name *</label>
                <input id="name" v-model="form.name" type="text" required placeholder="Ankur Satle" />
              </div>
              <div class="cfs-page__field">
                <label for="email">Email Address *</label>
                <input id="email" v-model="form.email" type="email" required placeholder="you@example.com" />
              </div>
              <div class="cfs-page__field">
                <label for="title">Talk Title *</label>
                <input id="title" v-model="form.title" type="text" required placeholder="e.g. Concepts in Practice" />
              </div>
              <div class="cfs-page__field">
                <label for="abstract">Abstract *</label>
                <textarea
                  id="abstract"
                  v-model="form.abstract"
                  required
                  rows="5"
                  placeholder="Brief description of your talk — what will attendees learn?"
                />
              </div>
              <div class="cfs-page__field">
                <label for="bio">Short Bio</label>
                <textarea
                  id="bio"
                  v-model="form.bio"
                  rows="3"
                  placeholder="A few sentences about yourself"
                />
              </div>

              <div v-if="submitted" class="cfs-page__success">
                Thank you! We'll be in touch soon.
              </div>
              <div v-else-if="error" class="cfs-page__error">{{ error }}</div>

              <button type="submit" class="btn btn--primary cfs-page__submit" :disabled="submitting">
                {{ submitting ? 'Submitting...' : 'Submit Proposal' }}
              </button>
            </form>

            <p class="cfs-page__or">
              Or email us directly at
              <a :href="`mailto:${SITE.email}`" class="cfs-page__email-link">{{ SITE.email }}</a>
            </p>
          </div>
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

<style lang="scss" scoped>
.cfs-page {
  &__body { background: var(--color-bg); }

  &__layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: flex-start;

    @include below(lg) { grid-template-columns: 1fr; }
  }

  &__section-title {
    font-family: var(--font-secondary);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-4);
  }

  &__body-text {
    font-size: var(--text-base);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-7);
  }

  &__topics { margin-bottom: var(--space-10); }

  &__topics-label {
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-3);
  }

  &__topic-grid {
    @include flex(flex-start, flex-start, var(--space-2));
    flex-wrap: wrap;
  }

  &__topic {
    padding: var(--space-1) var(--space-3);
    background: rgba(79, 142, 247, 0.08);
    border: 1px solid rgba(79, 142, 247, 0.20);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    color: $color-secondary;
  }

  &__faqs { display: flex; flex-direction: column; gap: var(--space-5); }

  &__faq {
    padding: var(--space-5);
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);

    &-q {
      font-family: var(--font-secondary);
      font-size: var(--text-base);
      font-weight: var(--weight-bold);
      color: var(--color-text);
      margin-bottom: var(--space-2);
    }

    &-a {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      line-height: var(--leading-relaxed);
    }
  }

  // Form
  &__form-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    position: sticky;
    top: calc(var(--navbar-height) + var(--space-6));
  }

  &__form-title {
    font-family: var(--font-secondary);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-2);
  }

  &__form-note {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin-bottom: var(--space-6);
  }

  &__form { display: flex; flex-direction: column; gap: var(--space-4); }

  &__field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);

    label {
      font-size: var(--text-sm);
      font-weight: var(--weight-medium);
      color: var(--color-text);
    }

    input, textarea {
      padding: var(--space-3) var(--space-4);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-family: var(--font-primary);
      font-size: var(--text-sm);
      color: var(--color-text);
      background: var(--color-bg);
      transition: border-color var(--transition-fast);
      resize: vertical;

      &:focus {
        outline: none;
        border-color: $color-secondary;
        box-shadow: 0 0 0 3px rgba(79, 142, 247, 0.10);
      }

      &::placeholder { color: var(--color-text-muted); }
    }
  }

  &__success {
    padding: var(--space-4);
    background: rgba(46,125,50,0.1);
    border: 1px solid rgba(46,125,50,0.3);
    border-radius: var(--radius-md);
    color: var(--color-success);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
  }

  &__error {
    padding: var(--space-4);
    background: rgba(211,47,47,0.08);
    border: 1px solid rgba(211,47,47,0.25);
    border-radius: var(--radius-md);
    color: var(--color-error);
    font-size: var(--text-sm);
  }

  &__submit { width: 100%; justify-content: center; }

  &__or {
    margin-top: var(--space-4);
    text-align: center;
    font-size: var(--text-xs);
    color: var(--color-text-muted);
  }

  &__email-link {
    color: $color-secondary;
    text-decoration: underline;
  }
}
</style>
