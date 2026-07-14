<template>
  <div class="about-page">
    <PageHero
      overline="About CppIndia"
      title="India's very own C++ Community"
      subtitle="A community platform that brings together C++ developers from all walks of life — united by a mutual interest in C++."
      :breadcrumb="[{ label: 'About', path: '/about' }]"
    />

    <section class="section about-page__body">
      <div class="container">
        <div class="about-page__layout">
          <!-- Story -->
          <div class="about-page__story">
            <h2 class="about-page__title">Our Story</h2>
            <p>
              CppIndia started with a simple idea: India has a huge developer community, but C++ developers
              lacked a dedicated platform to connect, learn from each other, and grow together.
              We wanted to fix that.
            </p>
            <p>
              What began as a small group of enthusiasts has grown into a thriving community of over
              a thousand C++ developers — students, fresh graduates, and seasoned engineers —
              united by their love for C++.
            </p>

            <h2 class="about-page__title">What We Do</h2>
            <ul class="about-page__list">
              <li>
                <strong>Tech Talks</strong> — Regular sessions on alternate Saturdays.
                60-minute talks followed by Q&amp;A, covering everything from Modern C++ features
                to real-world engineering challenges.
              </li>
              <li>
                <strong>CppIndiaCon</strong> — Our annual conference, now in its 4th edition.
                Two days of talks, workshops, and networking with global C++ experts.
              </li>
              <li>
                <strong>Mentorship</strong> — Connecting junior developers with experienced
                engineers for guidance and career support.
              </li>
              <li>
                <strong>Job Board</strong> — Helping companies find great C++ talent, and
                developers find meaningful opportunities.
              </li>
              <li>
                <strong>Resources</strong> — Curating the best C++ learning materials —
                standards, references, articles, and monthly community picks.
              </li>
            </ul>

            <h2 class="about-page__title">Our Values</h2>
            <div class="about-page__values">
              <div v-for="value in values" :key="value.title" class="about-page__value">
                <h3>{{ value.title }}</h3>
                <p>{{ value.body }}</p>
              </div>
            </div>
          </div>

          <!-- Sidebar quick links -->
          <div class="about-page__sidebar">
            <div class="about-page__sidebar-card">
              <h3 class="about-page__sidebar-title">Quick Links</h3>
              <ul class="about-page__sidebar-links">
                <li><RouterLink to="/team" class="about-page__sidebar-link">Meet the Team</RouterLink></li>
                <li><RouterLink to="/join" class="about-page__sidebar-link">Join CppIndia</RouterLink></li>
                <li><RouterLink to="/code-of-conduct" class="about-page__sidebar-link">Code of Conduct</RouterLink></li>
                <li><RouterLink to="/call-for-speakers" class="about-page__sidebar-link">Call for Speakers</RouterLink></li>
                <li><RouterLink to="/contact" class="about-page__sidebar-link">Contact Us</RouterLink></li>
              </ul>
            </div>

            <div class="about-page__sidebar-card about-page__sidebar-card--dark">
              <h3 class="about-page__sidebar-title about-page__sidebar-title--light">Join the Community</h3>
              <p class="about-page__sidebar-text">Chat with fellow C++ developers on Discord.</p>
              <a
                :href="SITE.discordInvite"
                class="btn btn--primary about-page__sidebar-btn"
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

<style lang="scss" scoped>
.about-page {
  &__body { background: var(--color-bg); }

  &__layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: var(--space-12);
    align-items: flex-start;

    @include below(lg) { grid-template-columns: 1fr; }
  }

  &__story {
    p {
      font-size: var(--text-base);
      color: var(--color-text-secondary);
      line-height: var(--leading-relaxed);
      margin-bottom: var(--space-5);
    }
  }

  &__title {
    font-family: var(--font-secondary);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    margin-top: var(--space-10);
    margin-bottom: var(--space-5);

    &:first-child { margin-top: 0; }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding-left: var(--space-6);

    li {
      font-size: var(--text-base);
      color: var(--color-text-secondary);
      line-height: var(--leading-relaxed);
    }

    strong { color: var(--color-text); }
  }

  &__values {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);

    @include below(sm) { grid-template-columns: 1fr; }

    h3 {
      font-family: var(--font-secondary);
      font-size: var(--text-base);
      font-weight: var(--weight-bold);
      color: $color-secondary;
      margin-bottom: var(--space-2);
    }

    p {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      line-height: var(--leading-relaxed);
      margin-bottom: 0;
    }

    > div {
      padding: var(--space-5);
      background: var(--color-surface);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-xl);
    }
  }

  // Sidebar
  &__sidebar {
    position: sticky;
    top: calc(var(--navbar-height) + var(--space-6));
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &__sidebar-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    padding: var(--space-6);

    &--dark {
      background: $color-primary;
      border-color: transparent;
    }
  }

  &__sidebar-title {
    font-family: var(--font-secondary);
    font-size: var(--text-base);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-4);

    &--light { color: white; }
  }

  &__sidebar-links {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  &__sidebar-link {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    transition: color var(--transition-fast);
    display: flex;
    align-items: center;

    &::before {
      content: '→';
      margin-right: var(--space-2);
      color: $color-secondary;
    }

    &:hover { color: $color-secondary; }
  }

  &__sidebar-text {
    font-size: var(--text-sm);
    color: rgba(255,255,255,0.7);
    margin-bottom: var(--space-4);
    line-height: var(--leading-relaxed);
  }

  &__sidebar-btn { width: 100%; justify-content: center; }
}
</style>
